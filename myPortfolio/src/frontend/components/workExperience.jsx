import React from 'react';
import styles from '../../styles/workExperience.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import load from '../../assets/images/loading.gif';

export function WorkExperience() {
  return(
    <section className={styles.workExperience}>
      <header>
        <h1>Work Experience</h1>
      </header>
      <div className="card-group">
        <div className="card">
          <img src={load} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Company</h5>
            <p className="card-text">Address</p>
            <p className="card-text">Period</p>
            <p className="card-text">Type</p>
            <p className="card-text">Position</p>
            <p className="card-text">Responsibilities</p>
            <p className="card-text">Achievements</p>
          </div>
          <div className="card-footer">
            <a href="">
              <small className="text-body-secondary">Go to the company website</small>
            </a>
          </div>
        </div>
        <div className="card">
          <img src={load} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Company</h5>
            <p className="card-text">Address</p>
            <p className="card-text">Period</p>
            <p className="card-text">Type</p>
            <p className="card-text">Position</p>
            <p className="card-text">Responsibilities</p>
            <p className="card-text">Achievements</p>
          </div>
          <div className="card-footer">
            <a href="">
              <small className="text-body-secondary">Go to the company website</small>
            </a>
          </div>
        </div>
        <div className="card">
          <img src={load} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Company</h5>
            <p className="card-text">Address</p>
            <p className="card-text">Period</p>
            <p className="card-text">Type</p>
            <p className="card-text">Position</p>
            <p className="card-text">Responsibilities</p>
            <p className="card-text">Achievements</p>
          </div>
          <div className="card-footer">
            <a href="">
              <small className="text-body-secondary">Go to the company website</small>
            </a>
          </div>
        </div>
        <div className="card">
          <img src={load} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Company</h5>
            <p className="card-text">Address</p>
            <p className="card-text">Period</p>
            <p className="card-text">Type</p>
            <p className="card-text">Position</p>
            <p className="card-text">Responsibilities</p>
            <p className="card-text">Achievements</p>
          </div>
          <div className="card-footer">
            <a href="">
              <small className="text-body-secondary">Go to the company website</small>
            </a>
          </div>
        </div>
      </div>
      <hr />
    </section>
  )
}