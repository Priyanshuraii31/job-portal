import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await axios.get("https://job-portal-iuyl.onrender.com/api/jobs");
      setJobs(res.data.jobs);
    } catch (error) {
      alert("Jobs fetch failed");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `https://job-portal-iuyl.onrender.com/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      fetchJobs();

    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="jobs">
      <h2>All Jobs</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search by title, company, location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredJobs.map((job) => (
        <div className="job-card" key={job._id}>
          <h3>{job.title}</h3>
          <p><b>Company:</b> {job.company}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Salary:</b> ₹{job.salary}</p>
          <p>{job.description}</p>

          <Link to={`/apply/${job._id}`}>
            <button className="primary-btn">Apply Now</button>
          </Link>

          <button
            className="delete-btn"
            onClick={() => deleteJob(job._id)}
          >
            Delete
          </button>
          <Link to={`/edit-job/${job._id}`}>
  <button className="primary-btn">Edit</button>
</Link>
<Link to={`/applicants/${job._id}`}>
  <button className="primary-btn">View Applicants</button>
</Link>
        </div>
      ))}
    </div>
  );
}

export default Jobs;