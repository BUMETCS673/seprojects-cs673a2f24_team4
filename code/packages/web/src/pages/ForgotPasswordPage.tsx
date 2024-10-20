import React from 'react';

const ForgotPasswordPage = () => {
  const handleForgotPasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');

    // Perform forgot password logic here (e.g., API call)
    console.log('Forgot password submitted', { email });
  };

  return (
    <div>
      <h2>Forgot Password?</h2>
      <form onSubmit={handleForgotPasswordSubmit}>
        <label>Email:</label>
        <input type="email" name="email" />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;

