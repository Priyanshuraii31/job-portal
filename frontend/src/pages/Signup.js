import { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
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
      const res = await axios.post("http://https://job-portal-iuyl.onrender.com/api/auth/signup", form);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
        />

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

        <button type="submit" className="primary-btn">Signup</button>
      </form>
    </div>
  );
}

export default Signup;