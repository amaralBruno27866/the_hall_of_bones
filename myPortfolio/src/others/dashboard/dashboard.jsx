import React from 'react';
import styles from './dashboard.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>My Dashboard</h1>
      </header>
      <div className={styles.container}>
        <nav className={styles.sidebar}>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </nav>
        <main className={styles.content}>
          <p>Welcome to the dashboard!</p>
        </main>
      </div>
    </div>
  );
}