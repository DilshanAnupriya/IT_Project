import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF autoTable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'; // Import the download icon
import styles from "../../Pages/Css/Acconutcss/acc.module.css"; 

const FinancialReport = () => {
  const [incomeData, setIncomeData] = useState({
    accountAmounts: 0,
    funds: 0,
    clubDonations: 0,
  });
  const [expenditureData, setExpenditureData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncomeData = async () => {
    try {
      const accountResponse = await axios.get('http://localhost:3000/account');
      const fundsResponse = await axios.get('http://localhost:3000/funds'); 
      const donationsResponse = await axios.get('http://localhost:3000/club'); 

      // Calculate total account amounts
      const totalAccountAmounts = accountResponse.data.accounts 
        ? accountResponse.data.accounts.reduce(
            (acc, curr) => acc + parseFloat(curr.amount || 0),
            0
          )
        : 0;

      // Calculate total funds
      const totalFunds = fundsResponse.data.fund 
        ? fundsResponse.data.fund.reduce((acc, curr) => {
            return acc + parseFloat(curr.fund_amount || 0);
          }, 0)
        : 0;

      // Calculate total donations from clubs
      const totalDonations = donationsResponse.data.clubs 
        ? donationsResponse.data.clubs.reduce((acc, curr) => {
            return acc + parseFloat(curr.donations || 0);
          }, 0)
        : 0;

      setIncomeData({
        accountAmounts: totalAccountAmounts,
        funds: totalFunds,
        clubDonations: totalDonations,
      });
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
  };

  const fetchExpenditureData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expenditure'); 
      setExpenditureData(response.data.expenditures);
    } catch (error) {
      console.error('Error fetching expenditure data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchIncomeData();
      await fetchExpenditureData();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate total expenditures
  const totalExpenditure = expenditureData.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  
  // Calculate net profit or loss
  const totalIncome = incomeData.accountAmounts + incomeData.funds + incomeData.clubDonations;
  const netProfitLoss = totalIncome - totalExpenditure;

  // Function to format numbers with thousand separators
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(value);
  };

  // Function to generate and download PDF with tables
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Profit and Loss Statement", 14, 20);

    // Add Income Table
    doc.setFontSize(14);
    doc.text("Income", 14, 30);
    doc.autoTable({
      head: [['Source', 'Amount (LKR)']],
      body: [
        ['Account Amounts', formatCurrency(incomeData.accountAmounts)],
        ['Funds', formatCurrency(incomeData.funds)],
        ['Club Donations', formatCurrency(incomeData.clubDonations)],
        ['Total Income', formatCurrency(totalIncome)],
      ],
      startY: 40,
      theme: 'grid',
      styles: { cellPadding: 5, fontSize: 12 },
    });

    // Add Expenditure Table
    doc.setFontSize(14);
    doc.text("Expenditure", 14, doc.lastAutoTable.finalY + 10); // Position after income table
    doc.autoTable({
      head: [['Expenditure Type', 'Amount (LKR)']],
      body: expenditureData.map((expenditure) => [
        expenditure.expenditure_type,
        formatCurrency(expenditure.amount),
      ]),
      startY: doc.lastAutoTable.finalY + 20, // Position after previous table
      theme: 'grid',
      styles: { cellPadding: 5, fontSize: 12 },
    });

    // Add Total Expenditure
    doc.text(`Total Expenditure: LKR ${formatCurrency(totalExpenditure)}`, 14, doc.lastAutoTable.finalY + 10);

    // Add Net Profit/Loss
    doc.text(`Net Profit/Loss: LKR ${formatCurrency(netProfitLoss)}`, 14, doc.lastAutoTable.finalY + 20);

    // Save the PDF
    doc.save("Financial_Report.pdf");
  };

  return (
    <div className={styles.financialReportContainer}>
      <h2>Profit and Loss Statement</h2>
      
      <div className={styles.incomeContainer}>
        <h3>Income</h3>
        <table className={styles.incomeTable}>
          <thead>
            <tr>
              <th>Source</th>
              <th>Amount (LKR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account Amounts</td>
              <td>{formatCurrency(incomeData.accountAmounts)}</td>
            </tr>
            <tr>
              <td>Funds</td>
              <td>{formatCurrency(incomeData.funds)}</td>
            </tr>
            <tr>
              <td>Club Donations</td>
              <td>{formatCurrency(incomeData.clubDonations)}</td>
            </tr>
            <tr>
              <td><strong>Total Income</strong></td>
              <td><strong>{formatCurrency(totalIncome)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.expenditureContainer}>
        <h3>Expenditure</h3>
        <table className={styles.expenditureTable}>
          <thead>
            <tr>
              <th>Expenditure Type</th>
              <th>Amount (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {expenditureData.map((expenditure, index) => (
              <tr key={index}>
                <td>{expenditure.expenditure_type}</td>
                <td>{formatCurrency(expenditure.amount)}</td>
              </tr>
            ))}
            <tr>
              <td><strong>Total Expenditure</strong></td>
              <td><strong>{formatCurrency(totalExpenditure)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.netProfitLossContainer}>
        <h3>Net Profit/Loss</h3>
        <h4 style={{ color: netProfitLoss >= 0 ? 'green' : 'red' }}>
          LKR {formatCurrency(netProfitLoss)}
        </h4>
      </div>

      <button onClick={downloadPDF} className={styles.downloadButton}>
        <FontAwesomeIcon icon={faDownload} style={{ marginRight: '8px' }} /> {/* Download icon */}
        Download as PDF
      </button>
    </div>
  );
};

export default FinancialReport;
