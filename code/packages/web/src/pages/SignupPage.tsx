import React from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css'; 

const SignupPage = () => {
  const handleSignupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const emailOrPhone = formData.get('emailOrPhone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    
    console.log('Signup submitted', { username, emailOrPhone, password, confirmPassword });
  };

  return (
    <div className="signup-container">
      <div className="welcome-back">
        <h1>Roll the Carpet</h1>
        <button className="skip-lag">Skip the lag</button>
      </div>

      <div className="signup-box">
        <h2>Signup</h2>
        <p>Just some details to get you in.!</p>
        <form onSubmit={handleSignupSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" required />

          <label htmlFor="emailOrPhone">Email / Phone</label>
          <input type="text" name="emailOrPhone" id="emailOrPhone" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" required />

          <button type="submit" className="signup-btn">Signup</button>

          <div className="social-login">
            <p>Or</p>
            <div className="social-icons">
              <button type="button" className="google-login">G</button>
              <button type="button" className="facebook-login">f</button>
              <button type="button" className="github-login">GitHub</button>
            </div>
          </div>
        </form>

        <p className="login-text">Already Registered? <Link to="/login">Login</Link></p>
        <div className="footer-links">
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/support">Support</Link>
          <Link to="/customer-care">Customer Care</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
