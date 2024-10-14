import React, { useState, useEffect } from "react";
import AdultCareForm from "../pabathi_components/AdultCareForm";
import NavBar from "../pabathi_components/Navbar";
import SideBar from "../pabathi_components/Sidebar";
import styles from "../pabathi_components/mainpage.module.css";
import axios from "axios";
import Nav from "../../../Components/Navbar/Navbar"
import Footer from "../../../Components/Footer/Footer"

const ApplicationForm = () => {
  const [submissions, setSubmissions] = useState([]);
  const [editSubmission, setEditSubmission] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  // Fetch submissions for the current user based on the email
  const fetchSubmissions = async () => {
    const email = localStorage.getItem("email"); // Get email from localStorage
    try {
      const response = await axios.get(
        "http://localhost:3000/api/adultcare/user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Example: Use token for auth
          },
        }
      );

      // Filter submissions based on OwnerEmail
      const filteredSubmissions = response.data.filter(
        (submission) => submission.OwnerEmail === email
      );
      setSubmissions(filteredSubmissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  // Handle edit submission
  const handleEdit = (submission) => {
    setEditSubmission(submission);
    setUpdatedData(submission); // Pre-fill the form with current submission data
    setShowEditPopup(true);
  };

  // Handle update submission
  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/adultcare/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchSubmissions(); // Refresh submissions
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating submission:", error);
    }
  };

  // Handle delete submission
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/adultcare/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchSubmissions(); // Refresh submissions
    } catch (error) {
      console.error("Error deleting submission:", error);
    }
  };

  // Handle input change for edit popup
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.pageContainer}>

      <div className={styles.mainContent}>
        <Nav />
        <div className={styles.formContainer}>
          <AdultCareForm />
          <button
            onClick={fetchSubmissions}
            style={{
              marginTop: "16px",
              backgroundColor: "#1f2937", // bg-teal-900
              color: "#ffffff", // text-white
              padding: "8px 16px",
              borderRadius: "0.375rem", // rounded
              border: "none",
              cursor: "pointer",
            }}
          >
            View Your Submissions
          </button>

          {/* Submissions Table */}
          {submissions.length > 0 && (
            <table
              style={{
                minWidth: "100%",
                marginTop: "16px",
                backgroundColor: "#ffffff", // bg-white
                borderCollapse: "collapse",
                border: "1px solid #e5e7eb", // border-gray-200
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #e5e7eb", // border-gray-200
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Full Name
                  </th>
                  <th
                    style={{
                      border: "1px solid #e5e7eb", // border-gray-200
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Address
                  </th>
                  <th
                    style={{
                      border: "1px solid #e5e7eb", // border-gray-200
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Birthday
                  </th>
                  <th
                    style={{
                      border: "1px solid #e5e7eb", // border-gray-200
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Age
                  </th>
                  <th
                    style={{
                      border: "1px solid #e5e7eb", // border-gray-200
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Gender
                  </th>
                  <th
                    style={{
                      border: "1px solid #e5e7eb", // border-gray-200
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission._id}>
                    <td
                      style={{
                        border: "1px solid #e5e7eb", // border-gray-200
                        padding: "8px",
                      }}
                    >
                      {submission.fullname}
                    </td>
                    <td
                      style={{
                        border: "1px solid #e5e7eb", // border-gray-200
                        padding: "8px",
                      }}
                    >
                      {submission.address}
                    </td>
                    <td
                      style={{
                        border: "1px solid #e5e7eb", // border-gray-200
                        padding: "8px",
                      }}
                    >
                      {submission.birthday}
                    </td>
                    <td
                      style={{
                        border: "1px solid #e5e7eb", // border-gray-200
                        padding: "8px",
                      }}
                    >
                      {submission.age}
                    </td>
                    <td
                      style={{
                        border: "1px solid #e5e7eb", // border-gray-200
                        padding: "8px",
                      }}
                    >
                      {submission.gender}
                    </td>
                    <td
                      style={{
                        border: "1px solid #e5e7eb", // border-gray-200
                        padding: "8px",
                      }}
                    >
                      <button
                        onClick={() => handleEdit(submission)}
                        style={{
                          color: "#3b82f6", // text-blue-500
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(submission._id)}
                        style={{
                          color: "#ef4444", // text-red-500
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "underline",
                          marginLeft: "8px",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Edit Submission Popup */}
          {showEditPopup && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // bg-black bg-opacity-50
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff", // bg-white
                  color: "#000000", // text-black
                  padding: "20px",
                  borderRadius: "0.375rem", // rounded
                  width: "400px", // Set a width for the form
                }}
              >
                <h2 style={{ fontSize: "1.25rem" }}>Edit Submission</h2>
                {/* Form fields */}
                <label>
                  Full Name:
                  <input
                    type="text"
                    name="fullname"
                    value={updatedData.fullname || ""}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      borderRadius: "0.375rem", // rounded
                      width: "100%",
                    }}
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={updatedData.address || ""}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      borderRadius: "0.375rem", // rounded
                      width: "100%",
                    }}
                  />
                </label>
                <label>
                  Birthday:
                  <input
                    type="date"
                    name="birthday"
                    value={updatedData.birthday || ""}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      borderRadius: "0.375rem", // rounded
                      width: "100%",
                    }}
                  />
                </label>
                <label>
                  Age:
                  <input
                    type="number"
                    name="age"
                    value={updatedData.age || ""}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      borderRadius: "0.375rem", // rounded
                      width: "100%",
                    }}
                  />
                </label>
                <label>
                  Gender:
                  <input
                    type="text"
                    name="gender"
                    value={updatedData.gender || ""}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      borderRadius: "0.375rem", // rounded
                      width: "100%",
                    }}
                  />
                </label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "16px",
                  }}
                >
                  <button
                    onClick={() => setShowEditPopup(false)}
                    style={{
                      marginRight: "8px",
                      backgroundColor: "#9ca3af", // bg-gray-400
                      color: "#ffffff", // text-white
                      padding: "8px 16px",
                      borderRadius: "0.375rem", // rounded
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdate(editSubmission._id)}
                    style={{
                      backgroundColor: "#1f2937", // bg-teal-900
                      color: "#ffffff", // text-white
                      padding: "8px 16px",
                      borderRadius: "0.375rem", // rounded
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ApplicationForm;
