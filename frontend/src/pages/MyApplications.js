import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://job-portal-iuyl.onrender.com/api/applications/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setApplications(res.data.applications);

    } catch (error) {
      alert("Applications fetch failed");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const deleteApplication = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `https://job-portal-iuyl.onrender.com/api/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      fetchApplications();

    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="jobs">
      <h2>My Applications</h2>

      {applications.length === 0 && (
        <p>You have not applied for any jobs yet.</p>
      )}

      {applications.map((app) => (
        <div className="job-card" key={app._id}>
          <h3>{app.job?.title}</h3>

          <p><b>Company:</b> {app.job?.company}</p>
          <p><b>Location:</b> {app.job?.location}</p>

          <p>
            <b>Resume:</b>{" "}
            <a
              href={`https://job-portal-iuyl.onrender.com/uploads/${app.resume}`}
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
          </p>

          <p><b>Cover Letter:</b> {app.coverLetter}</p>

          <button
            className="delete-btn"
            onClick={() => deleteApplication(app._id)}
          >
            Delete Application
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;