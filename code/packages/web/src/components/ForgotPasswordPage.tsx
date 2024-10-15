import React from 'react';

const ForgotPasswordPage = () => {
  return (
    <div>
      <h2>Forgot Password?</h2>
      <form>
        <label>Email:</label>
        <input type="email" name="email" />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
