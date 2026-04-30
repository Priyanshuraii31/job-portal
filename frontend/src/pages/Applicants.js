import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Applicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://job-portal-iuyl.onrender.com/api/applications/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setApplications(res.data.applications);

    } catch (error) {
      alert("Applicants fetch failed");
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://job-portal-iuyl.onrender.com/api/applications/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      fetchApplicants();

    } catch (error) {
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="jobs">
      <h2>Applicants</h2>

      {applications.length === 0 && (
        <p>No applicants for this job yet.</p>
      )}

      {applications.map((app) => (
        <div className="job-card" key={app._id}>
          <h3>{app.applicant?.name}</h3>
          <p><b>Email:</b> {app.applicant?.email}</p>
          <p><b>Job:</b> {app.job?.title}</p>

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
          <p><b>Status:</b> {app.status}</p>

          <button
            className="primary-btn"
            onClick={() => updateStatus(app._id, "Selected")}
          >
            Select
          </button>

          <button
            className="delete-btn"
            onClick={() => updateStatus(app._id, "Rejected")}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default Applicants;