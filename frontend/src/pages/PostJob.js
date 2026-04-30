import { useState } from "react";
import axios from "axios";

function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

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

      const res = await axios.post(
        "http://https://job-portal-iuyl.onrender.com/api/jobs/post",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Job post failed");
    }
  };

  return (
    <div className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Post New Job</h2>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit" className="primary-btn">
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;