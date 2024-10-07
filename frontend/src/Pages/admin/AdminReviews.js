import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete, MdMessage } from 'react-icons/md';
import Sidebar from "../../Components/Sidebar.js";
import NavBar from "../../Components/Navbar.js";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [response, setResponse] = useState('');
  const [visibleCount, setVisibleCount] = useState(5); // State for number of visible reviews

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/review/get');
      setReviews(res.data.reviews);
    } catch (error) {
      toast.error('Error fetching reviews');
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/review/deletes/${id}`);
      setReviews(reviews.filter(review => review._id !== id));
      toast.success('Review deleted successfully');
    } catch (error) {
      toast.error('Error deleting review');
    }
  };

  const handleResponse = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/review/replies/${id}`, { response });
      toast.success('Response added successfully');
      setSelectedReview(null);
      setResponse('');
      fetchReviews(); 
    } catch (error) {
      toast.error('Error adding response');
    }
  };

  const handleReadMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  return (
    <section className="flex bg-[#D5D6D9] min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <NavBar />

        <div className="flex-1 p-8 flex flex-col gap-8">
          <div className="bg-transparent shadow-lg p-6 rounded-lg flex-1">
            {reviews.slice(0, visibleCount).map(review => (
              <div
                key={review._id}
                className="bg-white border border-gray-300 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105 mb-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
                      review.status === 'pending' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                  >
                    {review.status === 'pending' ? 'Reply' : 'Replied'}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <MdDelete size={24} />
                    </button>
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <MdMessage size={24} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{review.name}</h3>
                <p className="text-gray-600 mb-2">{review.email}</p>
                <p className="text-gray-800 mb-4">{review.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm">{`Rating: ${review.rating ?? 'No rating'}`}</p>
                  <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}

            {reviews.length > visibleCount && (
              <button
                onClick={handleReadMore}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Read More
              </button>
            )}

            {selectedReview && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                  <h2 className="text-lg font-semibold mb-4">Respond to Review</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleResponse(selectedReview._id);
                    }}
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={selectedReview.name}
                        readOnly
                        className="border border-gray-300 rounded-lg w-full py-2 px-3 bg-gray-100"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        value={selectedReview.email}
                        readOnly
                        className="border border-gray-300 rounded-lg w-full py-2 px-3 bg-gray-100"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={selectedReview.description}
                        readOnly
                        className="border border-gray-300 rounded-lg w-full py-2 px-3 bg-gray-100"
                        rows="4"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="rating">
                        Rating
                      </label>
                      <input
                        type="text"
                        id="rating"
                        value={selectedReview.rating ?? 'No rating'}
                        readOnly
                        className="border border-gray-300 rounded-lg w-full py-2 px-3 bg-gray-100"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="response">
                        Response
                      </label>
                      <textarea
                        id="response"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        className="border border-gray-300 rounded-lg w-full py-2 px-3"
                        rows="4"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedReview(null)}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default AdminReviews;
