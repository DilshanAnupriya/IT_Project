import React, { useState, useEffect, useMemo } from 'react';
import AddExpenditurePopup from '../../Naveen/AddExpenditure/AddExpenditure';
import { MaterialReactTable } from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import styles from "../../../Pages/Naveen/Accounts/acc.module.css";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Expenditure = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpenditure, setSelectedExpenditure] = useState(null);

  // Fetch expenditures from backend
  const fetchExpenditures = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expenditure');
      console.log('Fetched expenditures:', response.data);
      setData(response.data.expenditures);
    } catch (error) {
      console.error('Error fetching expenditures:', error);
      alert("Failed to load expenditure data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenditures();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'expenditure_type', header: 'Expenditure Type', size: 150 },
      { accessorKey: 'amount', header: 'Amount', size: 150 },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        Cell: ({ row }) => (
          <span style={{ color: row.original.status === 'Allocate' ? 'green' : 'red' }}>
            {row.original.status}
          </span>
        ),
      },
      {
        accessorKey: 'action',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="edit-btn" onClick={() => handleEdit(row.original)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(row.original)}>Delete</button>
          </div>
        ),
      },
    ],
    [],
  );

  const handleEdit = (rowData) => {
    console.log('Editing row:', rowData);
    setSelectedExpenditure(rowData);
    setShowPopup(true);
  };

  const handleDelete = (rowData) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: `Are you sure you want to delete the expenditure ${rowData.expenditure_type}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await axios.delete(`http://localhost:3000/expenditure/delete/${rowData._id}`);
              if (response.status === 200) {
                console.log('Expenditure deleted:', rowData.expenditure_type);
                fetchExpenditures();
              } else {
                console.error('Delete failed:', response.status);
              }
            } catch (error) {
              console.error('Error deleting expenditure:', error.response ? error.response.data : error.message);
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

  const reloadExpenditures = () => {
    fetchExpenditures();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Expenditure Type', 'Amount', 'Status']],
      body: data.map(exp => [exp.expenditure_type, exp.amount, exp.status]),
    });
    doc.save('expenditures_report.pdf');
  };

  // Calculate total expenditure for only 'Allocate' expenditures
  const totalExpenditure = data
    .filter(exp => exp.status === 'Allocate')
    .reduce((total, expenditure) => total + expenditure.amount, 0);

  // Format the total expenditure with thousand separators
  const formattedTotalExpenditure = new Intl.NumberFormat().format(totalExpenditure);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      {/* Total Expenditure Card */}
      <div className={styles.totalExpenditureCard}>
        <h2>Total Expenditures</h2>
        <p style={{ color: 'green' }}>{formattedTotalExpenditure} LKR</p>
      </div>

      <button onClick={() => { setShowPopup(true); setSelectedExpenditure(null); }} className={styles.addIcon}>
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
            <AddExpenditurePopup
              reloadExpenditures={reloadExpenditures}
              closePopup={() => setShowPopup(false)}
              expenditureData={selectedExpenditure}
            />
          </div>
        </div>
      )}

      <MaterialReactTable columns={columns} data={data} />
    </div>
  );
};

export default Expenditure;
