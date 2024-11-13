import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation
import './Register.css'; // Styles

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); // Hook to navigate after registration

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating successful registration (you can integrate with API later)
    alert('Registration Successful');
    setFormData({ name: '', email: '', password: '' }); // Reset the form fields
    
    // Navigate to the login page after successful registration
    navigate('/login');
  };

  return (
    <div className="container register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              className="form-control"
              value={formData.name}
              placeholder="Name"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-4 col-form-label">Email</label>
          <div className="col-sm-8">
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
        </div>

        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-4 col-form-label">Password</label>
          <div className="col-sm-8">
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
        </div>

        <div className="row mb-3">
          <label htmlFor="userType" className="col-sm-4 col-form-label">User Type</label>
          <div className="col-sm-8">
            <select name="userType" id="userType" onChange={handleChange} className="form-select" required>
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="provider">Provider</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>

      <div className="mt-3">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
