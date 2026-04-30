import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://https://job-portal-iuyl.onrender.com/api/jobs/${jobId}`);
        setForm(res.data.job);
      } catch (error) {
        alert("Job fetch failed");
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://https://job-portal-iuyl.onrender.com/api/jobs/${jobId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      navigate("/jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Edit Job</h2>

        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <button type="submit" className="primary-btn">Update Job</button>
      </form>
    </div>
  );
}

export default EditJob;