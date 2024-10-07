import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar.js";
import NavBar from "../../Components/Navbar.js";
import { FaPen, FaTrash } from "react-icons/fa";


const ClientComplaints = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const complaintDate = `${year}-${month}-${day}`;
  const userid = localStorage.getItem("userid");

  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    date: complaintDate,
    userid: userid,
    title: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentComplaintId, setCurrentComplaintId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [visibleComplaints, setVisibleComplaints] = useState(5);

  useEffect(() => {
    fetchComplaints();
  }, [visibleComplaints]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/complaint/read/${userid}`);
      setComplaints(res.data.complaints);
      setFilteredComplaints(res.data.complaints.slice(0, visibleComplaints));
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isUpdate) {
        handleUpdate(currentComplaintId, formData, e);
      } else {
        try {
          const response = await axios.post("http://localhost:3000/api/complaint/add", formData);
          if (response.status === 200) {
            toast.success("Complaint added successfully");
            setFormData({
              name: "",
              email: "",
              description: "",
              date: complaintDate,
              userid: userid,
              title: "",
            });
            fetchComplaints();
          } else {
            toast.error("Complaint submission failed");
          }
        } catch (error) {
          console.error("Error adding complaint:", error);
        }
      }
    }
  };

  const handleUpdate = async (id, updatedData, e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/complaint/update/${id}`, updatedData);
      if (response.status === 200) {
        toast.success("Complaint updated successfully");
        setShowModal(false);
        setIsUpdate(false);
        setFormData({
          name: "",
          email: "",
          description: "",
          date: complaintDate,
          userid: userid,
          title: "",
        });
        fetchComplaints();
      } else {
        console.error("Failed to update complaint");
      }
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/complaint/deletes/${id}`);
      if (response.status === 200) {
        toast.success("Complaint deleted successfully");
        fetchComplaints();
      } else {
        console.error("Failed to delete complaint");
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredComplaints(complaints.slice(0, visibleComplaints));
    } else {
      const filtered = complaints.filter((complaint) =>
        complaint.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredComplaints(filtered.slice(0, visibleComplaints));
    }
  };

  const openUpdateModal = (complaint) => {
    setFormData({
      name: complaint.name,
      email: complaint.email,
      description: complaint.description,
      date: complaint.date,
      userid: userid,
      title: complaint.title,
    });
    setCurrentComplaintId(complaint._id);
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
      date: complaintDate,
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

  const handleReadMore = () => {
    setVisibleComplaints(prev => prev + 5);
    setFilteredComplaints(complaints.slice(0, visibleComplaints + 5));
  };

  return (
    <section className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">

        <NavBar />

        <div className="flex justify-start space-x-4 md:space-x-8 py-4">
          <button
            type="button"
            onClick={() => { navigate('/complaints') }}
            className="rounded-3xl bg-blue-700 text-white py-2 px-6 md:py-4 md:px-10 w-full md:w-auto text-center shadow-md hover:bg-[#6B75FE] transition"
          >
            Complaints
          </button>
          <button
            type="button"
            onClick={() => { navigate('/') }}
            className="rounded-3xl bg-transparent border border-blue-700 py-2 px-6 md:py-4 md:px-10 text-blue-700 w-full md:w-auto text-center shadow-md hover:bg-blue-700 hover:text-white transition"
          >
            Review
          </button>
        </div>

        <div className="flex-1 p-8 flex flex-col lg:flex-row gap-8">
  
          <div className="bg-white p-6 rounded-lg mb-6 flex-1 shadow-lg border border-gray-300">
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
                ></textarea>
              </div>
              <div>
                <label htmlFor="date" className="block font-semibold mb-2 text-gray-700">Date:</label>
                <input
                  type="text"
                  id="date"
                  value={formData.date}
                  className="p-2 border border-gray-300 rounded w-full"
                  disabled
                />
              </div>
              <div>
                <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded shadow-md hover:bg-[#6B75FE] transition">
                  {isUpdate ? "Update Complaint" : "Submit Complaint"}
                </button>
              </div>
            </form>
          </div>

    
          <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 shadow-lg border border-gray-300">
            <div className="space-y-4 h-[450px] overflow-y-scroll">
              {filteredComplaints.map((complaint, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-md">
                  <h2 className="text-lg font-semibold mb-2">{complaint.title}</h2>
                  <p className="text-gray-600 mb-2">{complaint.description}</p>
                  <p className="text-gray-400 mb-4">{complaint.date}</p>
                  <div className="flex items-center justify-between">
                    <button onClick={() => openUpdateModal(complaint)} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-blue-600 transition">
                      <FaPen className="mr-2" /> Update
                    </button>
                    <button onClick={() => handleDelete(complaint._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-red-600 transition">
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              ))}

              {complaints.length > filteredComplaints.length && (
                <button
                  onClick={handleReadMore}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded mt-4 w-full transition"
                >
                  Read More
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

export default ClientComplaints;
