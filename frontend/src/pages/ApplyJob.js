import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);

      const res = await axios.post(
        `https://job-portal-iuyl.onrender.com/api/applications/apply/${jobId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      navigate("/my-applications");

   } catch (error) {
  alert(error.response?.data?.message || error.message || "Apply failed");
}
  };

  return (
    <div className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Apply Job</h2>

        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />

        <button type="submit" className="primary-btn">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplyJob;