import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import managerServices from './manager.json';
import providerServices from './provider.json';
import userServices from './user.json';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          setUserRole(data.userType); // Set role dynamically
        } else {
          console.error(data.message);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Role-based rendering using JSON data
  const renderDashboard = () => {
    let services = [];
    if (userRole === 'manager') {
      services = managerServices;
    } else if (userRole === 'provider') {
      services = providerServices;
    } else {
      services = userServices;
    }

    return (
      <>
        {services.map((service, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className={`card text-white ${service.bgColor}`} style={{ height: '200px' }}>
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container-fluid">
      <Navbar onLogout={handleLogout} />
      <div className="container mt-4">
        {userData ? (
          <>
            <h2>Welcome, {userData.name}</h2>
            <div className="row">
              {renderDashboard()}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
