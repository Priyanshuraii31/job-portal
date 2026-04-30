import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications";
import PostJob from "./pages/PostJob";
import ApplyJob from "./pages/ApplyJob";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";
import Profile from "./pages/Profile";
import MyJobs from "./pages/MyJobs";

import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Search jobs, apply online, and build your career easily.</p>

        <Link to="/signup">
          <button className="primary-btn">Get Started</button>
        </Link>
      </section>

      <section className="jobs">
        <h2>Latest Jobs</h2>

        <div className="job-card">
          <h3>Frontend Developer</h3>
          <p><b>Company:</b> ABC Tech</p>
          <p><b>Location:</b> Gurgaon</p>
          <p><b>Salary:</b> ₹30000</p>
          <button className="primary-btn">Apply Now</button>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
          <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path="/apply/:jobId" element={<ProtectedRoute><ApplyJob /></ProtectedRoute>} />
          <Route path="/edit-job/:jobId" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
          <Route path="/applicants/:jobId" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/my-jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;