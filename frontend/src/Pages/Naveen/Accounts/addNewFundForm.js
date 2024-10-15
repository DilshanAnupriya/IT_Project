import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNewFundForm = () => {
    const [input, setInput] = useState({
        funds: '',
        a_amount: '',
        balance: '',
        count: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevState) => ({
            ...prevState,
            [name]: value
        }));
        validateField(name, value); // Validate individual field on change
    };

    // Validate each field
    const validateField = (name, value) => {
        let errorMsg = '';
        if (value === '' || isNaN(Number(value)) || Number(value) <= 0) {
            errorMsg = `${name} is required and must be a valid number greater than 0`;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMsg
        }));
    };

    // Validate the whole form before submission
    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!input.funds || isNaN(Number(input.funds)) || Number(input.funds) <= 0) {
            valid = false;
            newErrors.funds = 'Funds must be a valid number greater than 0';
        }
        if (!input.a_amount || isNaN(Number(input.a_amount)) || Number(input.a_amount) <= 0) {
            valid = false;
            newErrors.a_amount = 'Amount must be a valid number greater than 0';
        }
        if (!input.balance || isNaN(Number(input.balance)) || Number(input.balance) <= 0) {
            valid = false;
            newErrors.balance = 'Balance must be a valid number greater than 0';
        }
        if (!input.count || isNaN(Number(input.count)) || Number(input.count) <= 0) {
            valid = false;
            newErrors.count = 'Count must be a valid number greater than 0';
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newFund = {
                funds: Number(input.funds),
                a_amount: Number(input.a_amount),
                balance: Number(input.balance),
                count: Number(input.count)
            };

            try {
                const response = await axios.post('http://localhost:3000/fund/add', newFund); // Correct URL
                console.log(response.data);
                navigate('/funds'); // Redirect after successful submission
            } catch (error) {
                console.error('Error creating fund:', error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Fund</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="funds">
                        Funds
                    </label>
                    <input
                        type="number"
                        id="funds"
                        name="funds"
                        value={input.funds}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.funds && <p className="text-red-500 text-xs italic">{errors.funds}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="a_amount">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="a_amount"
                        name="a_amount"
                        value={input.a_amount}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.a_amount && <p className="text-red-500 text-xs italic">{errors.a_amount}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="balance">
                        Balance
                    </label>
                    <input
                        type="number"
                        id="balance"
                        name="balance"
                        value={input.balance}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.balance && <p className="text-red-500 text-xs italic">{errors.balance}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count">
                        Count
                    </label>
                    <input
                        type="number"
                        id="count"
                        name="count"
                        value={input.count}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.count && <p className="text-red-500 text-xs italic">{errors.count}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Fund
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewFundForm;
