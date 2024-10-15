import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>AI-Powered Resume Shortlisting</h1>
      <p>Automate your hiring process by finding the best-fit candidates.</p>
      <Link to="/signup">
        <button>Sign up for free</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default LandingPage;
