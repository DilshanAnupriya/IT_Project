import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './FormStyles.css';  // External CSS for styling

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      setMessage('Login successful');
      
      // Store JWT token in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email);
      
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        text: 'Redirecting to the application form...',
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect to ApplicationForm after 2 seconds
      setTimeout(() => {
        navigate('/application-form');
      }, 2000);

    } catch (error) {
      // Display error using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Incorrect credentials, please try again!',
      });
      setMessage('Login failed');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">Welcome Back!</h2>
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
        <button type="submit" className="submit-btn">Log In</button>
        <p style={{textAlign: 'center', color: '#AD0000'}}>{message}</p>
        <div className="form-footer">
          <p>Don't have an account? <Link to="/signup" className="form-link">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
