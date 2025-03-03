import React from 'react';
import styles from '../../styles/workExperience.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import load from '../../../assets/images/loading.gif';

export function WorkExperience() {
  return (
    <section className={styles.workExperience}>
      <header>
        <h1>Work Experience</h1>
      </header>
      <div className="card" style={{ width: '24rem' }}>
        <img src={load} className="card-img-top" alt="Loading..." />
        <div className="card-body">
          <h5 className="card-title">Company Name</h5>
          <p className="card-text">Responsabilities</p>
          <p className="card-text">Achievements</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Period</li>
          <li className="list-group-item">Type</li>
          <li className="list-group-item">Position</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">Company Web Site</a>
        </div>
      </div>
      <hr />
    </section>
  );
}