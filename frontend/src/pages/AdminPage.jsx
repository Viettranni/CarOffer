import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch('/api/vehicles');
      const data = await response.json();
      setVehicles(data);
    };
    fetchVehicles();
  }, []);

  const handleSend = async (vehicleId) => {
    try {
      await fetch(`/api/vehicles/${vehicleId}/send`, { method: 'POST' });
      alert('Vehicle sent to partners successfully!');
    } catch (error) {
      console.error('Error sending vehicle:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle._id}>
            {vehicle.merkki} {vehicle.malli} - {vehicle.rek}
            <button onClick={() => handleSend(vehicle._id)}>Send to Partners</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
