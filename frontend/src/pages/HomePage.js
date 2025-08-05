import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1 className="animated-heading">Welcome to FocusNest 📋</h1>
      <p className="subheading">Your personal space to organize, prioritize, and conquer your tasks with ease.</p>

      <div className="features">
        <div className="feature-card">
          <h3>📝 Add Tasks</h3>
          <p>Quickly capture tasks and never miss a deadline again.</p>
        </div>
        <div className="feature-card">
          <h3>📌 Stay Focused</h3>
          <p>Prioritize with tags, dates, and reminders tailored for productivity.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Track Progress</h3>
          <p>Visualize your task completion and build better habits.</p>
        </div>
      </div>

      <button className="cta-button" onClick={() => navigate('/register')}>
        Get Started for Free
      </button>
    </div>
  );
}

export default HomePage;
