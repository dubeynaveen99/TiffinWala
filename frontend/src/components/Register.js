import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation
import './Register.css'; // Styles

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', userType: '' });
  const [loading, setLoading] = useState(false); // State to handle loading spinner
  const [error, setError] = useState(null); // State to capture any errors during registration
  const navigate = useNavigate(); // Hook to navigate after registration

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading when API call begins
    setError(null); // Reset error state

    // Define the API endpoint for registration
    const apiUrl = `${process.env.REACT_APP_API_URL}/users/register`; // Replace with actual API URL

    try {
      // Send POST request to register API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is successful
      if (response.ok) {
        // Registration successful
        const result = await response.json(); // Get response data
        alert(result.message || 'Registration Successful');
        setFormData({ name: '', email: '', password: '', userType: '' }); // Reset the form fields

        // Navigate to login page after successful registration
        navigate('/login');
      } else {
        // Handle registration failure (e.g., invalid input, server error)
        const result = await response.json();
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      // Handle network or other errors
      setError('An error occurred while trying to register. Please try again later.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false); // Stop loading after API call completes
    }
  };

  return (
    <div className="container register-container">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Show error if any */}
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

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="mt-3">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
