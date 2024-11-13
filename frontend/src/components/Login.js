import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Login = () => {
  const { login } = useAuth();  // Access the login function from AuthContext
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage and set authentication state
        localStorage.setItem('authToken', data.token);
        login();  // Set isAuthenticated to true

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        alert(data.message);  // Show error message if login fails
      }
    } catch (error) {
      console.error("Login error", error);
    }

    // Reset form data after submission
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="container register-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="form-control"
            value={formData.email}
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="form-control"
            value={formData.password}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      
      <div className="mt-3">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
