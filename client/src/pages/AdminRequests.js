// src/pages/AdminRequests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    axios
      .get('http://localhost:3000/api/request', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching requests:', error);
      });
  }, []);

  const handleApprove = async (id, points) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:3000/api/request/${id}`,
        { pointsAssigned: points, status: 'approved' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Optionally, refresh the requests list
      setRequests(requests.filter((req) => req._id !== id));
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <div>
      <h2>Admin Requests</h2>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request._id}>
            <h3>{request.heading}</h3>
            <p>{request.description}</p>
            <img src={request.imageURL} alt="Achievement" width="100" />
            <input
              type="number"
              placeholder="Assign Points"
              onBlur={(e) => handleApprove(request._id, e.target.value)}
            />
          </div>
        ))
      ) : (
        <p>No pending requests</p>
      )}
    </div>
  );
}

export default AdminRequests;
