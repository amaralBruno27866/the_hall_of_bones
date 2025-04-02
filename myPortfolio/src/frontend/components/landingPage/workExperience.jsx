import React from 'react';
import styles from '../../styles/workExperience.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import load from '../../../assets/images/loading.gif';

// WorkExperience component to display work experience information
export function WorkExperience() {
  return (
    <section className={styles.workExperience}>
      <header>
        <h1>Work Experience</h1>
      </header>
      {/* Card to display work experience details */}
      <div className="card" style={{ width: '24rem' }}>
        {/* Placeholder image */}
        <img src={load} className="card-img-top" alt="Loading..." />
        <div className="card-body">
          {/* Company name */}
          <h5 className="card-title">Company Name</h5>
          {/* Responsibilities and achievements */}
          <p className="card-text">Responsibilities</p>
          <p className="card-text">Achievements</p>
        </div>
        {/* Additional details */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Period</li>
          <li className="list-group-item">Type</li>
          <li className="list-group-item">Position</li>
        </ul>
        {/* Link to the company's website */}
        <div className="card-body">
          <a href="#" className="card-link">Company Web Site</a>
        </div>
      </div>
      <hr />
    </section>
  );
}