import React from 'react';
import styles from '../../styles/footer.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsFacebook, BsInstagram, BsLinkedin, BsGithub, BsDoorClosedFill } from "react-icons/bs";
import logo from '../../assets/images/my_logo.png';

export function Footer() {
  return(
    <section>
      <header>
        <h1>Footer</h1>
      </header>
      <footer class="container">

        <span class="blur"></span>
        <span class="blur"></span>

        <div class="column">

            <div class="logo">
                <img src={logo} alt="Logo" width="50" height="50" className="d-inline-block align-top me-2"/>
            </div>
            
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>

            <div class="socials">
                <a href="#"> <BsFacebook size={30}/> </a>
                <a href="#"> <BsInstagram size={30}/> </a>
                <a href="#"> <BsLinkedin size={30}/> </a>
                <a href="#"> <BsGithub size={30}/> </a>
            </div>

        </div>

        <div class="column">
            <h4>Company</h4>
            <a href="#">Business</a>
            <a href="#">Patnership</a>
            <a href="#">Network</a>
        </div>

        <div class="column">
            <h4>About Us</h4>
            <a href="#">Blogs</a>
            <a href="#">Channels</a>
            <a href="#">Sponsors</a>
        </div>

        <div class="column">
            <h4>Contact</h4>
            <a href="#">Contact Us</a>
            <a href="#">Privicy Policy</a>
            <a href="#">Terms & Conditions</a>
        </div>

      </footer>
    </section>
  )
}