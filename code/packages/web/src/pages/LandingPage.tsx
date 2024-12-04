import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>AI-Powered Resume Shortlisting Made Easy</h1>
          <p>Automate your hiring process by finding the best-fit candidates in seconds.</p>
          <div className="cta-buttons">
            <Link to="/signup">
              <button className="signup-btn">Sign up for free</button>
            </Link>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={require('../../assets/external/icons1512-g8lh.svg')} alt="AI Illustration" />
        </div>
      </section>
      {/* Add other sections */}
    </div>
  );
};

export default LandingPage;
