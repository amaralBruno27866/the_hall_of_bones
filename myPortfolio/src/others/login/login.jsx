import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './login.module.css';
import logo from '../../assets/images/my_logo.png';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione a lógica de autenticação aqui
    // Se a autenticação for bem-sucedida, redirecione para o dashboard
    navigate('/dashboard');
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
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
          </div>
          <div className={styles.forgotPassword}>
            <Link to="/forgot-password">I forgot my password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}