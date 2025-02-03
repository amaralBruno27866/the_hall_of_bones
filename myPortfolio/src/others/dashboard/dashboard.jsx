import React, { useState } from 'react';
import styles from './dashboard.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsDoorOpenFill } from "react-icons/bs";
import { AboutForm } from './forms/about-form/about-form.jsx';

export function Dashboard() {
  const [activeLink, setActiveLink] = useState('Home');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'About':
        return <AboutForm />;
      case 'Education':
        return <p>Education Content</p>;
      case 'Works':
        return <p>Works Content</p>;
      case 'Projects':
        return <p>Projects Content</p>;
      default:
        return <p>Welcome to the dashboard!</p>;
    }
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
          {renderContent()}
        </main>
      </div>
    </div>
  );
}