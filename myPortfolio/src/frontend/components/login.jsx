import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../frontend/styles/login.module.css';
import logo from '../../assets/images/my_logo.png';
import axios from '../../config/axiosConfig';
import { BsEye, BsEyeSlash } from "react-icons/bs";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password }); // Atualizar a URL aqui
      const { token } = response.data;
      localStorage.setItem('token', token); // Armazenar o token no localStorage
      navigate('/dashboard'); // Redirecionar para o dashboard
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <header className={styles.header}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
          <h1>Dashboard Access</h1>
        </header>
        <form onSubmit={handleSubmit}>
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
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttonGroup}>
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back to home</button>
          </div>
          <div className={styles.forgotPassword}>
            <Link to="/forgot-password">I forgot my password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}