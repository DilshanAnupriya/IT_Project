import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { FaUsers, FaUserShield, FaChartBar, FaCheckCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';
import styles from './mainpage.module.css';
import axios from 'axios';
import Charts from './Charts';

const MainPage = () => {
  const [activeSection, setActiveSection] = useState('pendingApplications');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('approved');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    let endpoint = '';
    if (activeSection === 'pendingApplications' || activeSection === 'residents') {
      endpoint = 'http://localhost:3000/api/adultcare/';
    } else if (activeSection === 'guardians') {
      endpoint = 'http://localhost:3000/api/auth';
    } else if (activeSection === 'analytics') {
      endpoint = 'http://localhost:3000/api/adultcare/';
    }

    axios.get(endpoint)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [activeSection]);

  const handleApprove = (id) => {
    setStatus('approved');
    axios.put(`http://localhost:3000/api/adultcare/${id}/`, { status })
      .then(() => {
        alert('Application approved successfully.');
        setData(data.map((item) => (item._id === id ? { ...item, status: 'approved' } : item)));
      })
      .catch(error => {
        console.error('Error approving application:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/adultcare/${id}`)
      .then(() => {
        alert('Application deleted successfully.');
        setData(data.filter((item) => item._id !== id));
      })
      .catch(error => {
        console.error('Error deleting application:', error);
      });
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShowEditPopup(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/adultcare/${editData._id}`, editData);
      setData(data.map((item) => (item._id === editData._id ? editData : item)));
      setShowEditPopup(false);
      alert('Resident details updated successfully.');
    } catch (error) {
      console.error('Error updating resident details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filteredData = data.filter((item) => {
    const valuesToSearch = Object.values(item).join(' ').toLowerCase();
    return valuesToSearch.includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.buttonsContainer}>
          <button className={styles.btn} onClick={() => setActiveSection('pendingApplications')}>
            <FaUsers /> Pending Applications
          </button>
          <button className={styles.btn} onClick={() => setActiveSection('residents')}>
            <FaUsers /> Residents
          </button>
          <button className={styles.btn} onClick={() => setActiveSection('guardians')}>
            <FaUserShield /> Guardians
          </button>
          <button className={styles.btn} onClick={() => setActiveSection('analytics')}>
            <FaChartBar /> Analytics
          </button>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        {activeSection === 'pendingApplications' && (
          <div className={styles.tableContainer}>
            <h3>Pending Applications</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Birthday</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .filter((item) => item.status === 'pending')
                  .map((item) => (
                    <tr key={item._id}>

                      <td>{item.fullname}</td>
                      <td>{item.address}</td>
                      <td>{new Date(item.birthday).toLocaleDateString()}</td>
                      <td>{item.ownername}</td>
                      <td>
                        <button onClick={() => handleApprove(item._id)} className={styles.approveBtn}>
                          <FaCheckCircle />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className={styles.deleteBtn}>
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Residents Table */}
        {activeSection === 'residents' && (
          <div className={styles.tableContainer}>
            <h3>Residents</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Birthday</th>
                  <th>Owner</th>
                  <th>Contact</th>
                  <th>Actions</th> {/* New Actions Column */}
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .filter((item) => item.status !== 'pending')
                  .map((item) => (
                    <tr key={item._id}>
                      <td>{item.fullname}</td>
                      <td>{item.address}</td>
                      <td>{new Date(item.birthday).toLocaleDateString()}</td>
                      <td>{item.ownername}</td>
                      <td>{item.contact}</td>
                      <td>
                        <button onClick={() => handleEdit(item)} className={styles.editBtn}>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className={styles.deleteBtn}>
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Resident Popup */}
        {showEditPopup && (
          <div className={styles.popupContainer}>
            <div className={`${styles.popup} ${showEditPopup ? styles.show : ''}`}>
              <h3>Edit Resident</h3>
              <label>
                Name:
                <input
                  type="text"
                  name="fullname"
                  value={editData.fullname || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={editData.address || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Birthday:
                <input
                  type="date"
                  name="birthday"
                  value={editData.birthday || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Owner Name:
                <input
                  type="text"
                  name="ownername"
                  value={editData.ownername || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Contact:
                <input
                  type="text"
                  name="contact"
                  value={editData.contact || ''}
                  onChange={handleInputChange}
                />
              </label>
              <div className={styles.popupButtons}>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setShowEditPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}


        {/* Guardians Table */}
        {activeSection === 'guardians' && (
          <div className={styles.tableContainer}>
            <h3>Guardians</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Analytics Section (Placeholder for now) */}
        {activeSection === 'analytics' && <Charts />}
      </div>
    </div>
  );
};

export default MainPage;
