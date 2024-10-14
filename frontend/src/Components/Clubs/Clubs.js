import React, { useState, useEffect, useMemo } from 'react';
import AddClubPopup from '../../Components/AddClubs/AddClubs'; 
import { MaterialReactTable } from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'; // Added download icon
import styles from "../../Pages/Css/Acconutcss/acc.module.css";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Utility function to format numbers with thousand separators
const formatNumber = (num) => {
  if (isNaN(num)) return '0.00';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// StatsCard component to display total clubs and total donations
const StatsCard = ({ totalClubs, totalDonations }) => {
  const formattedDonations = formatNumber(totalDonations);

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <h3>Total Clubs</h3>
        <p>{totalClubs}</p>
      </div>
      <div className={styles.card}>
        <h3>Total Donations</h3>
        <p>LKR {formattedDonations}</p> {/* Updated to LKR */}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClub, setSelectedClub] = useState(null);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalClubs, setTotalClubs] = useState(0);

  const fetchClubs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/club');
      const clubs = response.data.clubs;
      setData(clubs);
      setLoading(false);
      
      const totalDonations = clubs.reduce((acc, club) => acc + (parseFloat(club.donations) || 0), 0);
      setTotalDonations(totalDonations);
      setTotalClubs(clubs.length);
    } catch (error) {
      console.error('Error fetching clubs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Club Name', size: 150 },
      { accessorKey: 'club_types', header: 'Club Type', size: 150 },
      { accessorKey: 'event', header: 'Event', size: 150 },
      { 
        accessorKey: 'donations', 
        header: 'Donation', 
        size: 150,
        Cell: ({ cell }) => `LKR ${formatNumber(cell.getValue())}`, // Format the donation value to LKR
      },
      {
        accessorKey: 'action',
        header: 'Action',
        size: 150,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="edit-btn" onClick={() => handleEdit(row.original)}>Update</button>
            <button className="delete-btn" onClick={() => handleDelete(row.original)}>Delete</button>
          </div>
        ),
      },
    ],
    [],
  );

  const handleEdit = (rowData) => {
    setSelectedClub(rowData);
    setShowPopup(true);
  };

  const handleDelete = (rowData) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: `Are you sure you want to delete the club ${rowData.name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await axios.delete(`http://localhost:3000/club/delete/${rowData.name}`);
              if (response.status === 200) {
                fetchClubs();
              } else {
                console.error('Delete failed:', response.status);
              }
            } catch (error) {
              console.error('Error deleting club:', error.response ? error.response.data : error.message);
            }
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Deletion cancelled')
        }
      ]
    });
  };

  const reloadClubs = () => {
    fetchClubs();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Club Name', 'Club Type', 'Event', 'Donation']],
      body: data.map(club => [club.name, club.club_types, club.event, `LKR ${formatNumber(club.donations)}`]), // Format donation value for PDF
    });
    doc.save('clubs_report.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StatsCard totalClubs={totalClubs} totalDonations={totalDonations} />

      <button onClick={() => { setShowPopup(true); setSelectedClub(null); }} className={styles.addIcon}>
        <span className={styles.addIcon}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </button>

      <button onClick={generatePDF} className={styles.download}>
        <FontAwesomeIcon icon={faDownload} /> Download Report
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <AddClubPopup
              reloadClubs={reloadClubs}
              closePopup={() => setShowPopup(false)}
              clubData={selectedClub}
            />
          </div>
        </div>
      )}

      <MaterialReactTable columns={columns} data={data} />
    </div>
  );
};

export default Dashboard;
