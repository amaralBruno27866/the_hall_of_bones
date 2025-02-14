import React, { useState, useEffect } from 'react';
import styles from '../../frontend/styles/dashboard.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsDoorOpenFill } from "react-icons/bs";
import { AboutForm } from './about-form';
import axios from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [activeLink, setActiveLink] = useState('Home');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'About':
        return <AboutForm />;
      case 'Education':
        return <p>Works Content</p>;
      case 'Works':
        return <p>Works Content</p>;
      case 'Projects':
        return <p>Projects Content</p>;
      case 'Users':
        return <p>Users</p>;
      default:
        return <p>Welcome to the dashboard!</p>;
    }
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>My Dashboard</h1>
        <BsDoorOpenFill
          size={30}
          className={styles.icon}
          onClick={handleLogout}
        />
      </header>
      <div className={styles.container}>
        <nav className={styles.sidebar}>
          <ul>
            <li>
              <a
                href="#"
                className={activeLink === 'About' ? styles.active : ''}
                onClick={() => handleLinkClick('About')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeLink === 'Education' ? styles.active : ''}
                onClick={() => handleLinkClick('Education')}
              >
                Education
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeLink === 'Works' ? styles.active : ''}
                onClick={() => handleLinkClick('Works')}
              >
                Works
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeLink === 'Projects' ? styles.active : ''}
                onClick={() => handleLinkClick('Projects')}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeLink === 'Users' ? styles.active : ''}
                onClick={() => handleLinkClick('Users')}
              >
                Users
              </a>
            </li>
          </ul>
        </nav>
        <main className={styles.content}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}