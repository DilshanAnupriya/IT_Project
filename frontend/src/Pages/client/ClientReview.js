import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar.js";
import NavBar from "../../Components/Navbar.js";
import { FaPen, FaTrash } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";

const ClientReview = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const reviewDate = `${year}-${month}-${day}`;
  const userid = localStorage.getItem("userid");

  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    rating: 0,
    date: reviewDate,
    userid: userid,
    title: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);

  useEffect(() => {
    fetchData();
  }, [visibleReviews]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/review/read/${userid}`);
      setReviews(res.data.reviews);
      setFilteredReviews(res.data.reviews.slice(0, visibleReviews));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isUpdate) {
        handleUpdate(currentReviewId, formData, e);
      } else {
        try {
          const response = await axios.post("http://localhost:3000/api/review/add", formData);
          if (response.status === 200) {
            toast.success("Review added successfully");
            setFormData({
              name: "",
              email: "",
              description: "",
              rating: 0,
              date: reviewDate,
              userid: userid,
              title: "",
            });
            fetchData();
          } else {
            toast.error("Review submission failed");
          }
        } catch (error) {
          console.error("Error adding review:", error);
        }
      }
    }
  };

  const handleUpdate = async (id, updatedData, e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/review/update/${id}`, updatedData);
      if (response.status === 200) {
        toast.success("Review updated successfully");
        setShowModal(false);
        setIsUpdate(false);
        setFormData({
          name: "",
          email: "",
          description: "",
          rating: 0,
          date: reviewDate,
          userid: userid,
          title: "",
        });
        fetchData();
      } else {
        console.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/review/deletes/${id}`);
      if (response.status === 200) {
        toast.success("Review deleted successfully");
        fetchData();
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredReviews(reviews.slice(0, visibleReviews));
    } else {
      const filtered = reviews.filter((review) =>
        review.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredReviews(filtered.slice(0, visibleReviews));
    }
  };

  const openUpdateModal = (review) => {
    setFormData({
      name: review.name,
      email: review.email,
      description: review.description,
      rating: review.rating,
      date: review.date,
      userid: userid,
      title: review.title,
    });
    setCurrentReviewId(review._id);
    setIsUpdate(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsUpdate(false);
    setFormData({
      name: "",
      email: "",
      description: "",
      rating: 0,
      date: reviewDate,
      userid: userid,
      title: "", 
    });
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name)) {
      toast.error("Name cannot contain numbers or special characters.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    return true;
  };

  const handleOnChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRatingChange = (ratingValue) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: ratingValue,
    }));
  };

  const StarRating = () => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            starId={star}
            selected={star <= formData.rating}
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const Star = ({ starId, selected, onClick }) => (
    <svg
      onClick={onClick}
      className={`h-8 w-8 cursor-pointer ${selected ? "text-yellow-400" : "text-gray-400"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.974a1 1 0 00.95.69h5.239c.969 0 1.372 1.24.588 1.81l-4.243 3.084a1 1 0 00-.364 1.118l1.618 4.974c.3.921-.755 1.688-1.54 1.118l-4.243-3.084a1 1 0 00-1.176 0l-4.243 3.084c-.785.57-1.84-.197-1.54-1.118l1.618-4.974a1 1 0 00-.364-1.118L2.54 10.4c-.784-.57-.381-1.81.588-1.81h5.239a1 1 0 00.95-.69l1.618-4.974z" />
    </svg>
  );

  const handleReadMore = () => {
    setVisibleReviews(prev => prev + 5);
    setFilteredReviews(reviews.slice(0, visibleReviews + 5));
  };

  return (
    <section className="flex bg-[#9BA4BF] min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <NavBar />
        <div className="flex justify-start space-x-4 md:space-x-8 py-4">
          <button
            type="button"
            onClick={() => navigate('/complaints')}
            className="rounded-3xl bg-transparent border border-blue-700 py-2 px-6 md:py-4 md:px-10 text-blue-700 w-full md:w-auto text-center shadow-md hover:bg-[#6B75FE] hover:text-white transition"
          >
            Complaints
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-3xl bg-[#6B75FE] text-white py-2 px-6 md:py-4 md:px-10 w-full md:w-auto text-center shadow-md hover:bg-blue-800 transition"
          >
            Review
          </button>
        </div>

        <div className="flex-1 p-8 flex flex-col lg:flex-row gap-8">
   
          <div className="bg-white p-6 rounded-lg mb-6 flex-1 h-[550px] shadow-lg border border-gray-300 rounded-lg">
            <form onSubmit={handleFormSubmit} className="space-y-4 border border-[#1f1f1f] p-6 rounded-lg">
              <div>
                <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleOnChange}
                  className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold mb-2 text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block font-semibold mb-2 text-gray-700">Description:</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleOnChange}
                  className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label htmlFor="rating" className="block font-semibold mb-2 text-gray-700">Rating:</label>
                <StarRating />
              </div>
              <button
                type="submit"
                className="text-right w-full bg-[#6B75FE] text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center justify-center"
              >
                {isUpdate ? <p>Update</p> : <p>Send</p>}
              </button>
            </form>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg flex-1">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <div className="flex flex-col gap-4">
              {filteredReviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-md flex flex-col justify-between"
                >
                  <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{new Date(review.date).toLocaleDateString()}</p>
                  <p className="mb-2">{review.description}</p>
                  <p className="text-sm text-gray-500 mb-4">Rating: {review.rating}</p>
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition"
                      onClick={() => openUpdateModal(review)}
                    >
                      <FaPen className="h-5 w-5" />
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-lg flex items-center hover:bg-red-600 transition"
                      onClick={() => handleDelete(review._id)}
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredReviews.length < reviews.length && (
                <button
                  onClick={handleReadMore}
                  className="bg-[#6B75FE] text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center transition"
                >
                  <FaPlusSquare className="h-5 w-5" />
                  <span className="ml-2">Read More</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default ClientReview;
