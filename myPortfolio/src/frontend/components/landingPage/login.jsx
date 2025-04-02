import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/login.module.css';
import logo from '../../../assets/images/my_logo.png';
import axios from '../../../config/axiosConfig';
import { BsEye, BsEyeSlash } from "react-icons/bs";

// Login component to handle user login
export function Login() {
  // State to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to manage error messages
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the API
      const response = await axios.post('/login', { email, password });
      const { token } = response.data;
      // Store the token in localStorage
      localStorage.setItem('token', token);
      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      // Set error message if login fails
      setError('Invalid email or password');
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        {/* Header with logo and title */}
        <header className={styles.header}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
          <h1>Dashboard Access</h1>
        </header>
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password input with toggle visibility */}
          <div className="form-group">
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className={styles.passwordToggle} onClick={togglePasswordVisibility}>
                {showPassword ? <BsEye size={20} color="blue" /> : <BsEyeSlash size={20} color="gray" />}
              </span>
            </div>
          </div>
          {/* Error message */}
          {error && <p className={styles.error}>{error}</p>}
          {/* Buttons for login and navigation */}
          <div className={styles.buttonGroup}>
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back to home</button>
          </div>
          {/* Forgot password link */}
          <div className={styles.forgotPassword}>
            <Link to="/forgot-password">I forgot my password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}