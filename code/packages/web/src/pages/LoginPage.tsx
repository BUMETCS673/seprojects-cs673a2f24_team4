import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; 

const LoginPage = () => {
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    
    
    console.log('Login submitted', { username, password });
  };

  return (
    <div className="login-container">
      <div className="welcome-back">
        <h1>Welcome Back</h1>
        <button className="skip-lag">Skip the lag</button>
      </div>

      <div className="login-box">
        <h2>Login</h2>
        <p>Glad you're back!</p>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
          
          <div className="remember-forgot">
            <label>
              <input type="checkbox" name="rememberMe" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="login-btn">Login</button>

          <div className="social-login">
            <p>Or</p>
            <div className="social-icons">
              <button className="google-login">G</button>
              <button className="facebook-login">f</button>
              <button className="github-login">GitHub</button>
            </div>
          </div>
        </form>

        <p className="signup-text">Don't have an account? <Link to="/signup">Signup</Link></p>
        <div className="footer-links">
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/support">Support</Link>
          <Link to="/customer-care">Customer Care</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


