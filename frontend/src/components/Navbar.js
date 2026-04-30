import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logout successful");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Job Portal</Link>

      <div>
        {token ? (
          <>
            <Link to="/dashboard">
              <button>Dashboard</button>
            </Link>

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/signup">
              <button className="primary-btn">Signup</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;