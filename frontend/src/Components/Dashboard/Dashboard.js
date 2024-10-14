import React, { useState, useEffect, useMemo } from 'react';
import AddAccountPopup from '../../Components/AddAccount/AddAcc'; 
import { MaterialReactTable } from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'; 
import styles from "../../Pages/Css/Acconutcss/acc.module.css"; 
import axios from 'axios'; 
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 

const Accounts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedAccount, setSelectedAccount] = useState(null); 

  // Fetch accounts from backend
  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/account'); // Replace with your actual API endpoint
      setData(response.data.accounts); // Set the fetched account data to state
      setLoading(false); // Stop the loading state
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setLoading(false); // Stop the loading state even if there's an error
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'bank', 
        header: 'Bank Name',
        size: 150,
      },
      {
        accessorKey: 'accNo',
        header: 'Account No',
        size: 150,
      },
      {
        accessorKey: 'amount',
        header: 'Amount (LKR)', // Change header to LKR
        size: 150,
        Cell: ({ cell }) => `LKR ${new Intl.NumberFormat('en-US', { style: 'decimal' }).format(cell.getValue())}`, // Format the amount as LKR
      },
      {
        accessorKey: 'branch',
        header: 'Branch',
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

  const handleEdit = (rowData) => {
    setSelectedAccount(rowData); 
    setShowPopup(true); 
  };

  const handleDelete = (rowData) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: `Are you sure you want to delete the account ${rowData.accNo}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await axios.delete(`http://localhost:3000/account/delete/${rowData.accNo}`); 
              if (response.status === 200) {
                fetchAccounts(); 
              } else {
                console.error('Delete failed:', response.status);
              }
            } catch (error) {
              console.error('Error deleting account:', error.response ? error.response.data : error.message);
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

  const reloadAccounts = () => {
    fetchAccounts(); 
  };

  const totalAccountsCount = data.length; 
  const totalAmount = data.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0); 

  const formattedTotalAmount = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(totalAmount);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Bank Name', 'Account No', 'Amount (LKR)', 'Branch']], // Change header to LKR
      body: data.map(account => [account.bank, account.accNo, `LKR ${new Intl.NumberFormat('en-US', { style: 'decimal' }).format(account.amount)}`, account.branch]), // Format amount as LKR
    });
    doc.save('accounts_report.pdf'); 
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!Array.isArray(data)) {
    return <div>No data available.</div>; 
  }

  return (
    <div>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Total Accounts</h3>
          <p>{totalAccountsCount}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Amount</h3>
          <p>LKR {formattedTotalAmount}</p> {/* Change currency to LKR */}
        </div>
      </div>

      <button onClick={() => { setShowPopup(true); setSelectedAccount(null); }} className={styles.addIcon}>
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
            <AddAccountPopup
              reloadAccounts={reloadAccounts}
              closePopup={() => setShowPopup(false)}
              accountData={selectedAccount} 
            />
          </div>
        </div>
      )}

      <MaterialReactTable columns={columns} data={data} />
    </div>
  );
};

export default Accounts;
