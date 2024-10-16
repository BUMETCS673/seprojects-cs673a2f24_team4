import React from 'react';

const SignupPage = () => {
  const handleSignupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    // Perform signup logic here (e.g., API call)
    console.log('Signup submitted', { username, email, password });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignupSubmit}>
        <label>Username:</label>
        <input type="text" name="username" />
        <label>Email:</label>
        <input type="email" name="email" />
        <label>Password:</label>
        <input type="password" name="password" />
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
