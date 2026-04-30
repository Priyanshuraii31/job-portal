import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://https://job-portal-iuyl.onrender.com/api/jobs/my-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setJobs(res.data.jobs);

    } catch (error) {
      alert("My jobs fetch failed");
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://https://job-portal-iuyl.onrender.com/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      fetchMyJobs();

    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="jobs">
      <h2>My Posted Jobs</h2>

      {jobs.length === 0 && (
        <p>No jobs posted yet.</p>
      )}

      {jobs.map((job) => (
        <div className="job-card" key={job._id}>
          <h3>{job.title}</h3>
          <p><b>Company:</b> {job.company}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Salary:</b> ₹{job.salary}</p>
          <p>{job.description}</p>

          <Link to={`/edit-job/${job._id}`}>
            <button className="primary-btn">Edit</button>
          </Link>

          <Link to={`/applicants/${job._id}`}>
            <button className="primary-btn">View Applicants</button>
          </Link>

          <button
            className="delete-btn"
            onClick={() => deleteJob(job._id)}
          >
            Delete Job
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyJobs;