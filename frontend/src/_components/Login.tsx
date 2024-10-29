import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqlOperations/mutations";
import { useMutation } from "@apollo/client";
export default function Login() {
  const navigate = useNavigate();

  const checkToken = localStorage.getItem("token");

  useEffect(() => {
    if (checkToken) navigate("/");
  }, []);

  const [formData, setFormData] = useState({});

  const [userLogin, { loading, error }] = useMutation(LOGIN_USER);

  if (loading) return <h1>Loading...</h1>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await userLogin({
        variables: {
          credentials: formData,
        },
      });

      if (data && data.userLogin && data.userLogin.token) {
        localStorage.setItem("token", JSON.stringify(data.userLogin.token));
        navigate("/");
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container my-container">
      {error?.message && <div className="red card-panel">{error.message}</div>}
      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <Link to="/signup">
          <p>Dont have an account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
