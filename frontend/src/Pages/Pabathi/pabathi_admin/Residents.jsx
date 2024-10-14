import React, { useState, useEffect } from 'react';
import { fetchResidents } from '../services/api';

const Residents = () => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const getResidents = async () => {
      const data = await fetchResidents();
      setResidents(data);
    };
    getResidents();
  }, []);

  return (
    <div className="residents-list">
      <h2>Residents</h2>
      <button className="add-resident-btn">+ Add Person</button>
      <table>
        <thead>
          <tr>
            <th>Resident ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>NIC</th>
            <th>Guardian</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident) => (
            <tr key={resident.id}>
              <td>{resident.id}</td>
              <td>{resident.name}</td>
              <td>{resident.age}</td>
              <td>{resident.nic}</td>
              <td>{resident.guardian}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-btn">Back</button>
    </div>
  );
};

export default Residents;
