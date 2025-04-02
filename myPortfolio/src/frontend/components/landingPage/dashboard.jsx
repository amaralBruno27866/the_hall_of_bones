import React, { useState, useEffect } from 'react';
import { BsDoorOpenFill } from "react-icons/bs";
import { AboutForm } from '../Dashboard/about_/aboutForm';
import { EducationForm } from '../Dashboard/education_/educationForm';
import { ProjectForm } from '../Dashboard/project_/projectForm';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/dashboard.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from '../../../config/axiosConfig';

// Dashboard component to manage the admin dashboard
export function Dashboard() {
  // State to manage the active link in the sidebar
  const [activeLink, setActiveLink] = useState('Home');
  const navigate = useNavigate();

  // useEffect hook to check for authentication token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Function to handle sidebar link clicks
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  // Function to handle user logout
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

  // Function to render the content based on the active link
  const renderContent = () => {
    switch (activeLink) {
      case 'About':
        return <AboutForm />;
      case 'Education':
        return <EducationForm />;
      case 'Works':
        return <p>Works Content</p>;
      case 'Projects':
        return <ProjectForm />;
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
        {/* Logout icon */}
        <BsDoorOpenFill
          size={20}
          className={styles.icon}
          onClick={handleLogout}
        />
      </header>
      <div className={styles.container}>
        {/* Sidebar navigation */}
        <nav className={styles.sidebar}>
          <ul>
            {/* Sidebar links */}
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
        {/* Main content area */}
        <main className={styles.content}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}