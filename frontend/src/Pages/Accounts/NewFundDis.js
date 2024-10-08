import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewFundDis = () => {
    const [funds, setFunds] = useState([]);
    const navigate = useNavigate();

    // Fetch fund details from the backend
    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const response = await axios.get('http:localhost:3000/funds');
                setFunds(response.data.fund);
            } catch (error) {
                console.error('Error fetching funds:', error);
            }
        };

        fetchFunds();
    }, []);

    // Handle delete fund
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http:localhost:3000/funds/delete/${id}`);
            setFunds(funds.filter((fund) => fund._id !== id));
        } catch (error) {
            console.error('Error deleting fund:', error);
        }
    };

    // Handle edit fund
    const handleEdit = (id) => {
        navigate(`http:localhost:3000/funds/edit/${id}`); // Navigate to edit form (you may need to create this route)
    };

    return (
        <div className="flex">
            {/* Sidebar placeholder */}
            <div className="w-1/4 bg-gray-200 p-4">
                {/* Your sidebar content goes here */}
                <h2 className="font-bold text-lg">Sidebar</h2>
            </div>
            <div className="w-3/4 p-4">
                <h2 className="text-2xl font-bold mb-4">Funds List</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Funds</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                            <th className="py-2 px-4 border-b">Balance</th>
                            <th className="py-2 px-4 border-b">Count</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funds.map((fund) => (
                            <tr key={fund._id}>
                                <td className="py-2 px-4 border-b">{fund.funds}</td>
                                <td className="py-2 px-4 border-b">{fund.a_amout}</td>
                                <td className="py-2 px-4 border-b">{fund.balance}</td>
                                <td className="py-2 px-4 border-b">{fund.count}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleEdit(fund._id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(fund._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4">
                    <button
                        onClick={() => navigate('/funds/add')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Fund
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewFundDis;
