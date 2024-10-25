import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Assuming you'll be using a CSS file for styling

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
          {/* Add any 3D visuals or SVGs here based on the design */}
          <img src="path-to-hero-image.png" alt="AI Illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Smart Resume Matching</h2>
        <p>Uses advanced AI algorithms to find the most suitable candidates.</p>
        <div className="features-image">
          {/* Add the mockup image of the tool */}
          <img src="path-to-tool-mockup.png" alt="Smart Resume Matching" />
        </div>
        <div className="features-list">
          <div className="feature-item">
            <img src="path-to-icon1.png" alt="Integration Ecosystem" />
            <h3>Integration Ecosystem</h3>
            <p>Enhance your productivity by connecting with your favorite tools.</p>
          </div>
          <div className="feature-item">
            <img src="path-to-icon2.png" alt="Goal Setting and Tracking" />
            <h3>Goal Setting and Tracking</h3>
            <p>Define and track your goals, breaking down objectives into achievable tasks.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <h2>Fast and Scalable</h2>
        <p>Process up to 500 resumes in minutes, saving you hours of manual work.</p>
        <div className="pricing-plans">
          <div className="plan">
            <h3>Free</h3>
            <p>$0/month</p>
            <ul>
              <li>Up to 5 comparisons per day</li>
              <li>Unlimited jobs</li>
              <li>Basic support</li>
            </ul>
            <button className="pricing-btn">Get started for free</button>
          </div>
          <div className="plan popular">
            <h3>Pro</h3>
            <p>$9/month</p>
            <ul>
              <li>Up to 50 comparisons per day</li>
              <li>Unlimited jobs</li>
              <li>Priority support</li>
            </ul>
            <button className="pricing-btn">Sign up now</button>
          </div>
          <div className="plan">
            <h3>Business</h3>
            <p>$19/month</p>
            <ul>
              <li>Up to 500 comparisons per day</li>
              <li>Unlimited jobs</li>
              <li>Advanced analytics</li>
            </ul>
            <button className="pricing-btn">Sign up now</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What our users say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"Our team's productivity has skyrocketed since we started using this tool."</p>
            <span>— Josh Smith</span>
          </div>
          <div className="testimonial">
            <p>"The customizability and integration capabilities of this app are top-notch."</p>
            <span>— Riley Smith</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <h2>Sign up for free today</h2>
        <p>Celebrate the joy of accomplishment with an app designed to track your progress and motivate your efforts.</p>
        <Link to="/signup">
          <button className="signup-footer-btn">Get started for free</button>
        </Link>
        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
