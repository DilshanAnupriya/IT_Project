import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

// example data with new structure
const data = [
  {
    bankName: 'Bank of America',
    accNo: '123456789',
    amount: '$10,000',
  },
  {
    bankName: 'Chase Bank',
    accNo: '987654321',
    amount: '$5,500',
  },
  {
    bankName: 'Wells Fargo',
    accNo: '456123789',
    amount: '$8,250',
  },
  {
    bankName: 'Citibank',
    accNo: '789123456',
    amount: '$12,400',
  },
  {
    bankName: 'HSBC',
    accNo: '321654987',
    amount: '$4,700',
  },
];

const Dashboard = () => {
  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      {
        accessorKey: 'bankName', // key matches data field for Bank Name
        header: 'Bank Name',
        size: 150,
      },
      {
        accessorKey: 'accNo', // key matches data field for Account Number
        header: 'Acc No',
        size: 150,
      },
      {
        accessorKey: 'amount', // key matches data field for Amount
        header: 'Amount',
        size: 150,
      },
      {
        accessorKey: 'action', // Placeholder for actions like Edit/Delete
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
    console.log('Editing row:', rowData);
    // Add your edit logic here
  };

  const handleDelete = (rowData) => {
    console.log('Deleting row:', rowData);
    // Add your delete logic here
  };

  const table = useMaterialReactTable({
    columns,
    data, // data must be stable or memoized
  });

  return <MaterialReactTable table={table} />;
};

export default Dashboard;
