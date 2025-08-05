import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/register', { name, email, password });
      alert('✅ Registered successfully! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      if (err.response?.status === 400) {
        alert('⚠️ User already exists!');
      } else {
        alert('❌ Something went wrong during registration!');
      }
    }
  };

  return (
    <div className="register-container">
      {/* Decorative Circles */}
      <div className="circle top-left"></div>
      <div className="circle bottom-right"></div>

      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="welcome">Welcome to FocusNest 🚀</div>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
