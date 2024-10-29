import { useQuery } from "@apollo/client";
import { PROFILE } from "../gqlOperations/queries";
import { useNavigate } from "react-router";

export default function Profile() {
  const { data, loading, error } = useQuery(PROFILE);

  const navigate = useNavigate();

  if (error) return <div className="card-panel red">{error.message}</div>;

  if (!localStorage.getItem("token")) navigate("/login");

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.profile.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>{data.profile.firstName}</h5>
        <h6>{data.profile.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data.profile.quotes.map((item: any) => {
        return (
          <blockquote>
            <h6>{item.quote}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
