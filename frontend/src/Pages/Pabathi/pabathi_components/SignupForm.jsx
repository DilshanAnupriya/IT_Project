import { useState } from 'react';
import axios from 'axios';
import './FormStyles.css';  // External CSS for styling
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if the name contains any numbers
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      toast.error('Name cannot contain numbers!');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/auth/signup', { email, password, name });
      setMessage('Signup successful, please login');

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Signed up successfully!',
        text: 'Redirecting to login...',
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // Display error using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data?.message || 'Something went wrong, please try again!',
      });
      setMessage('Signup failed');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">Create an Account</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-btn">Sign Up</button>
        <p>{message}</p>
        <div className="form-footer">
          <p>Already have an account? <Link to="/login" className="form-link">Log in</Link></p>
        </div>
      </form>
      {/* Toast Container for error messages */}
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
