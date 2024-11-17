import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data and orders
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        // Fetch user data to determine role
        const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const userData = await userResponse.json();
        if (!userResponse.ok) {
          console.error(userData.message);
          navigate('/login');
          return;
        }

        setUserData(userData);
        setUserRole(userData.userType);

        // Fetch orders based on user role
        const ordersResponse = await fetch(`${process.env.REACT_APP_API_URL}/orders/history`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const ordersData = await ordersResponse.json();
        if (!ordersResponse.ok) {
          console.error(ordersData.message);
        } else {
          setOrders(ordersData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (loading) {
    return <p>Loading order history...</p>;
  }

  return (
    <div className="container-fluid">
      <Navbar onLogout={handleLogout} />
      <div className="container mt-4">
        {userData ? (
          <>
            <h2>Order History</h2>
            <h4>Welcome, {userData.name}</h4>
            <p>Role: {userRole}</p>
            {orders.length > 0 ? (
              <table className="table table-bordered mt-4">
                <thead className="thead-dark">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Outlet</th>
                    <th>Items</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.orderId}</td>
                      <td>{order.customerId?.name || 'N/A'}</td>
                      <td>{order.outlet}</td>
                      <td>{order.items.join(', ')}</td>
                      <td>₹{order.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders found.</p>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
