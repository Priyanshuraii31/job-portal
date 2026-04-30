import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://job-portal-iuyl.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(res.data.user);

      } catch (error) {
        alert("Profile fetch failed");
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logout successful");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Welcome {user?.name} 🎉</h1>
      <p>You have successfully logged in</p>

      <div className="dashboard-buttons">
        <Link to="/jobs">
          <button className="primary-btn">View Jobs</button>
        </Link>

        <Link to="/my-applications">
          <button className="primary-btn">My Applications</button>
        </Link>

        <Link to="/post-job">
          <button className="primary-btn">Post Job</button>
        </Link>

        <Link to="/profile">
          <button className="primary-btn">Profile</button>
        </Link>
    
        <Link to="/my-jobs">
  <button className="primary-btn">My Posted Jobs</button>
</Link>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;