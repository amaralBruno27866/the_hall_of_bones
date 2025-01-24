import React from 'react';
import styles from '../../styles/projects.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import project1 from '../../assets/images/project1.jpg';
import project2 from '../../assets/images/project2.jpg';
import project3 from '../../assets/images/project3.png';

export function Projects() {
  return (
    <section className={styles.projects}>
      <header>
        <h1>My Projects</h1>
      </header>
      <div className={styles.content}>
        <div id="carouselExampleCaptionsProjects" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptionsProjects" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptionsProjects" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptionsProjects" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={project1} className="d-block w-100" alt="First slide" />
              <div className={styles.gradientOverlay}></div>
              <div className="carousel-caption d-none d-md-block">
                <h5>Project Title</h5>
                <p>Project description</p>
                <div className={styles.info}>
                  <p>Technologies</p>
                  <p>Technologies</p>
                  <p>Technologies</p>
                  <p>GitHub</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={project2} className="d-block w-100" alt="Second slide" />
              <div className={styles.gradientOverlay}></div>
              <div className="carousel-caption d-none d-md-block">
                <h5>Project Title</h5>
                  <p>Project description</p>
                  <div className={styles.info}>
                    <p>Technologies</p>
                    <p>Technologies</p>
                    <p>Technologies</p>
                    <p>GitHub</p>
                  </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={project3} className="d-block w-100" alt="Third slide" />
              <div className={styles.gradientOverlay}></div>
              <div className="carousel-caption d-none d-md-block">
                <h5>Project Title</h5>
                  <p>Project description</p>
                  <div className={styles.info}>
                    <p>Technologies</p>
                    <p>Technologies</p>
                    <p>Technologies</p>
                    <p>GitHub</p>
                  </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptionsProjects" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptionsProjects" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <hr />
    </section>
  );
}