import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MyLogo from '../../assets/images/my_logo.png';

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={MyLogo} alt="Logo" width="50" height="50" className="d-inline-block align-top me-2" />
          <span>Bruno's Portfolio</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#education">Education</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#job-experience">Job Experience</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects">Projects</a>
            </li>
            <li className="nav-item ms-3">
              <a className="btn btn-primary" href="#contact-form">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}