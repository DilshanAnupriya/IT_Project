import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import Swal from 'sweetalert2';
import styles from './adultcareapplication.module.css';

const AdultCareForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    address: '',
    birthday: '',
    age: '',
    gender: '',
    service: '',
    ownername: '',
    contact: '',
    OwnerEmail: '',
  });

  const [errors, setErrors] = useState({});

  const calculateAge = (birth) => {
    if (!birth) return '';

    const currentDate = new Date();
    const birthdate = new Date(birth);

    let age = currentDate.getFullYear() - birthdate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthdate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthdate.getDate())) {
      age--;
    }

    return age;
  };

  // Update age when birthday changes
  useEffect(() => {
    const age = calculateAge(formData.birthday);
    setFormData((prevData) => ({ ...prevData, age }));
  }, [formData.birthday]);

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Full Name validation: No numbers allowed
    if (!/^[A-Za-z\s]+$/.test(formData.fullname)) {
      newErrors.fullname = 'Full name can only contain letters.';
    }

    // Birthday validation: Closest date is 1980
    if (new Date(formData.birthday) > new Date('1980-01-01')) {
      newErrors.birthday = 'Birthday must be before 1980.';
    }

    // Age validation: Must be a number
    if (!/^\d+$/.test(formData.age)) {
      newErrors.age = 'Age must be a number.';
    }

    // Owner Name validation: Only letters allowed
    if (!/^[A-Za-z\s]+$/.test(formData.ownername)) {
      newErrors.ownername = 'Owner name can only contain letters.';
    }

    // Contact Number validation: Must be exactly 10 digits
    if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Contact number must be exactly 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch('http://localhost:3000/api/adultcare', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          Swal.fire({
            title: 'Success!',
            text: 'Form submitted successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });

          setFormData({
            fullname: '',
            address: '',
            birthday: '',
            age: '',
            gender: '',
            service: '',
            ownername: '',
            contact: '',
            OwnerEmail: '',
          });
        } else {
          toast.error('Failed to submit the form');
        }
      } catch (error) {
        toast.error('Error submitting form');
        console.error('Error:', error);
      }
    } else {
      toast.error('Please correct the form errors before submitting.');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer /> {/* Toast container for notifications */}
      <h2 className={styles.title}>Adult Care Application</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className={styles.formGroup}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          {errors.fullname && <span className={styles.error}>{errors.fullname}</span>}
        </div>

        {/* Address */}
        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Birthday */}
        <div className={styles.formGroup}>
          <label htmlFor="birthday">Birthday</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
          {errors.birthday && <span className={styles.error}>{errors.birthday}</span>}
        </div>

        {/* Age */}
        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            readOnly
          />
          {errors.age && <span className={styles.error}>{errors.age}</span>}
        </div>

        {/* Gender */}
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Service */}
        <div className={styles.formGroup}>
          <label htmlFor="service">Service Required</label>
          <input
            type="text"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          />
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Owner's Name */}
        <div className={styles.formGroup}>
          <label htmlFor="ownername">Owner's Name</label>
          <input
            type="text"
            id="ownername"
            name="ownername"
            value={formData.ownername}
            onChange={handleChange}
            required
          />
          {errors.ownername && <span className={styles.error}>{errors.ownername}</span>}
        </div>

        {/* Contact Number */}
        <div className={styles.formGroup}>
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          {errors.contact && <span className={styles.error}>{errors.contact}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="OwnerEmail">OwnerEmail</label>
          <input
            type="text"
            id="OwnerEmail"
            name="OwnerEmail"
            value={formData.OwnerEmail}
            onChange={handleChange}
            required
          />
          {errors.OwnerEmail && <span className={styles.error}>{errors.OwnerEmail}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdultCareForm;
