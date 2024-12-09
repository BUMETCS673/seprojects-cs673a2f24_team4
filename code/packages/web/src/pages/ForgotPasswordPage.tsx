import React from 'react';
import './ForgotPasswordPage.css'; // Ensure this file exists with the right styles

const ForgotPasswordPage = () => {
  const handleForgotPasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');

    console.log('Forgot password submitted', { email });
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password?</h2>
      <form onSubmit={handleForgotPasswordSubmit}>
        <label>Email:</label>
        <input type="email" name="email" required />
        <button type="submit">Reset Password</button>
      </form>
      <a href="/" className="take-me-back">
        Take me back
      </a>
      <footer>
        <a href="#">Terms & Conditions</a>
        <a href="#">Support</a>
        <a href="#">Customer Care</a>
      </footer>
    </div>
  );
};

export default ForgotPasswordPage;
