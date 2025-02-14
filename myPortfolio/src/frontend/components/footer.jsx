import React from 'react';
import styles from '../styles/footer.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsFacebook, BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
import logo from '../../assets/images/my_logo.png';

export function Footer() {
  return (
    <section>
      <footer className={`container ${styles.footer}`}>
        <div className="row">
          <div className={`col-12 col-md-3 ${styles.column}`}>
            <div className={styles.logo}>
              <img src={logo} alt="Logo" width="60" height="60" className="d-inline-block align-top me-2" />
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/in/brunoalencaramaral/"> <BsLinkedin size={20} /> </a>
              <a href="https://github.com/amaralBruno27866"> <BsGithub size={20} /> </a>
            </div>
          </div>

          <div className={`col-12 col-md-3 ${styles.column}`}>
            <h4>Company</h4>
            <a href="#">Business</a>
            <a href="#">Partnership</a>
            <a href="#">Network</a>
          </div>

          <div className={`col-12 col-md-3 ${styles.column}`}>
            <h4>About Us</h4>
            <a href="#">Blogs</a>
            <a href="#">Channels</a>
            <a href="#">Sponsors</a>
          </div>

          <div className={`col-12 col-md-3 ${styles.column}`}>
            <h4>Contact</h4>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </section>
  );
}