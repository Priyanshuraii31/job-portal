import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
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
      const res = await axios.post(
        "http://https://job-portal-iuyl.onrender.com/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert(res.data.message);

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;