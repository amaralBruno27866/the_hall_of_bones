import React, { useState } from 'react';
import styles from './dashboard.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsDoorOpenFill } from "react-icons/bs";

export function Dashboard() {
  const [activeLink, setActiveLink] = useState('Home');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>My Dashboard</h1>
        <BsDoorOpenFill size={30} className={styles.icon} />
      </header>
      <div className={styles.container}>
        <nav className={styles.sidebar}>
          <ul>
            <li>
              <a
                href="#"
                className={activeLink === 'Home' ? styles.active : ''}
                onClick={() => handleLinkClick('Home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeLink === 'Profile' ? styles.active : ''}
                onClick={() => handleLinkClick('Profile')}
              >
                Profile
              </a>
            </li>
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
          </ul>
        </nav>
        <main className={styles.content}>
          <p>Welcome to the dashboard!</p>
        </main>
      </div>
    </div>
  );
}