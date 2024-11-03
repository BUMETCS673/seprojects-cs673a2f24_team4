import React, { useState } from 'react';
import './SignupPage.css';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for signup
  };

  return (
    <div className="signup-page">
      <div className="left-section">
        {/* Logo Image */}
        <img src="/public/logo.png" alt="Logo" className="logo" /> {/* Update path as needed */}
        <h1>Roll the Carpet</h1>
        <button className="skip-btn">Skip the lag</button>
      </div>
      <div className="signup-container">
        <div className="signup-box">
          <h2>Signup</h2>
          <p>Just some details to get you in.!</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email / Phone"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="signup-btn">Signup</button>
          </form>
          <div className="social-login">
            <p>Or</p>
            <div className="social-icons">
              {/* Social Login Icons */}
              <button className="google-login">
                <img src="/public/google-icon.png" alt="Google" /> {/* Update path as needed */}
              </button>
              <button className="facebook-login">
                <img src="/public/facebook-icon.png" alt="Facebook" /> {/* Update path as needed */}
              </button>
              <button className="github-login">
                <img src="/public/github-icon.png" alt="GitHub" /> {/* Update path as needed */}
              </button>
            </div>
          </div>
          <p className="login-text">
            Already Registered? <a href="/login">Login</a>
          </p>
          <footer className="footer-links">
            <a href="/terms">Terms & Conditions</a>
            <a href="/support">Support</a>
            <a href="/customer-care">Customer Care</a>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
