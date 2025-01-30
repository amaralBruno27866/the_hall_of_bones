import React from 'react';
import styles from '../../styles/workExperience.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import load from '../../assets/images/loading.gif';

export function WorkExperience() {
  return (
    <section className={styles.workExperience}>
      <header>
        <h1>Work Experience</h1>
      </header>
      <div className="card" style={{ width: '24rem' }}>
        <img src={load} className="card-img-top" alt="Loading..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
      <hr />
    </section>
  );
}