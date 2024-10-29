import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const checkToken = localStorage.getItem("token");

  const navigate = useNavigate();

  return (
    <nav>
      <div className="nav-wrapper #673ab7 deep-purple">
        <Link to="/" className="brand-logo left">
          Quote App
        </Link>
        <ul id="nav-mobile" className="right">
          {checkToken ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <button
                  className="waves-effect waves-light btn-small"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
