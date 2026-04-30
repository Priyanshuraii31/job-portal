import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
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

  return (
    <div className="dashboard">
      <h1>My Profile 👤</h1>

      <div className="job-card">
        <h3>Name: {user?.name}</h3>
        <p><b>Email:</b> {user?.email}</p>
      </div>
    </div>
  );
}

export default Profile;