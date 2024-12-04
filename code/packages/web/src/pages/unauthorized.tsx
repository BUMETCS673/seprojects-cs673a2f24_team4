import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Unauthorized.css';  // Optional: Assuming you want to add some styling for this page.

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');  // Redirect to home or a different suitable route
  };

  return (
    <div className="unauthorized-container">
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page. Please contact the system administrator if you believe this is an error.</p>
      <button onClick={handleBackToHome} className="unauthorized-button">
        Back to Home
      </button>
    </div>
  );
};

export default Unauthorized;
