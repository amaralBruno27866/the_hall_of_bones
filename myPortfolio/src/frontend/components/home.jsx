import React from 'react';
import styles from '../styles/home.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function Home() {
  return (
    <section id='home' className={`${styles.home} container`}>
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className={styles.content}>
            <video autoPlay loop muted className={styles.video}>
              <source src='./src/assets/video/codingLoop.mp4' type='video/mp4'/>
            </video>
            <h4>CREATE YOUR SITE LIKE A PRO</h4>
            <h1>Hi, I'm <span>Bruno</span>, Software Developer</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Vero inventore, molestias praesentium ipsum quia 
              necessitatibus aut alias ullam optio tempora sequi enim 
              dolor sapiente velit? Quas odio blanditiis obcaecati eius.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.image}>
            <img src="./src/assets/images/programmer.png" alt="programmer" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
}