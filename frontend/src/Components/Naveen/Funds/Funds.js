import React, { useState, useEffect, useMemo } from 'react';
import AddFundPopup from '../../../Components/Naveen/AddFunds/AddFunds'; // Import the popup component for funds
import { MaterialReactTable } from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'; // Import the plus and download icons
import styles from "../../../Pages/Naveen/Accounts/acc.module.css";
import axios from 'axios'; // Axios for API calls
import { confirmAlert } from 'react-confirm-alert'; // Import confirmation alert package
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import alert CSS
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'jspdf-autotable'; // Import jsPDF autotable for table formatting

const Funds = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]); // State to hold fund data, initialized as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedFund, setSelectedFund] = useState(null); // State to hold fund data for editing

  // Fetch funds from backend
  const fetchFunds = async () => {
    try {
      const response = await axios.get('http://localhost:3000/funds'); // Replace with your actual API endpoint for funds
      console.log('Fetched funds:', response.data); // Log the response
      setData(response.data.fund); // Set the fetched fund data to state
      setLoading(false); // Stop the loading state
    } catch (error) {
      console.error('Error fetching funds:', error);
      setLoading(false); // Stop the loading state even if there's an error
    }
  };

  // Use useEffect to fetch funds when component mounts
  useEffect(() => {
    fetchFunds();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'fund_name', // Ensure keys match with backend data
        header: 'Fund Name',
        size: 150,
      },
      {
        accessorKey: 'fund_amount',
        header: 'Fund Amount',
        size: 150,
      },
      {
        accessorKey: 'fund_date',
        header: 'Fund Date',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 150,
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

  // Handle editing logic
  const handleEdit = (rowData) => {
    console.log('Editing row:', rowData);
    setSelectedFund(rowData); // Set the selected fund data for editing
    setShowPopup(true); // Show the popup with fund details
  };

  // Handle delete logic
  const handleDelete = (rowData) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: `Are you sure you want to delete the fund ${rowData.fund_name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await axios.delete(`http://localhost:3000/funds/delete/${rowData._id}`); // Adjust the API endpoint as per your backend
              if (response.status === 200) {
                console.log('Fund deleted:', rowData.fund_name);
                fetchFunds(); // Reload funds after deletion
              } else {
                console.error('Delete failed:', response.status);
              }
            } catch (error) {
              console.error('Error deleting fund:', error.response ? error.response.data : error.message);
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

  // Reload funds after any changes (adding/updating)
  const reloadFunds = () => {
    fetchFunds(); // Reload funds when needed
  };

  // Calculate total number of funds and total fund amount
  const totalFundsCount = data.length; // Count of funds
  const totalFundAmount = data.reduce((acc, curr) => acc + parseFloat(curr.fund_amount || 0), 0); // Sum of fund amounts

  // Format the total fund amount with thousand separators
  const formattedTotalFundAmount = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(totalFundAmount);

  // Function to generate and download PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Fund Name', 'Fund Amount', 'Fund Date', 'Description']],
      body: data.map(fund => [fund.fund_name, fund.fund_amount, fund.fund_date, fund.description]),
    });
    doc.save('funds_report.pdf'); // Save the PDF with a filename
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading message
  }

  if (!Array.isArray(data)) {
    return <div>No data available.</div>; // Show a message if data is not an array
  }

  return (
    <div>
      {/* Total Funds and Amount Cards */}
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Total Funds</h3>
          <p>{totalFundsCount}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Fund Amount</h3>
          <p>${formattedTotalFundAmount}</p> {/* Display formatted total fund amount */}
        </div>
      </div>

      {/* Button to open the popup for adding a new fund */}
      <button onClick={() => { setShowPopup(true); setSelectedFund(null); }} className={styles.addIcon}>
        <span className={styles.addIcon}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </button>

      {/* Button to download report as PDF */}
      <button onClick={generatePDF} className={styles.download}>
        <FontAwesomeIcon icon={faDownload} /> Download Report
      </button>

      {/* Popup for adding/updating fund */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* Pass selected fund data for updating, or null for adding */}
            <AddFundPopup
              reloadFunds={reloadFunds}
              closePopup={() => setShowPopup(false)}
              fundData={selectedFund} // Pass selected fund for editing
            />
          </div>
        </div>
      )}

      {/* Render the MaterialReactTable with fetched data */}
      <MaterialReactTable columns={columns} data={data} />
    </div>
  );
};

export default Funds;
