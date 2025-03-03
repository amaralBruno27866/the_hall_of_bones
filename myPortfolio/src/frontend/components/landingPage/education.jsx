import React from 'react';
import styles from '../../styles/education.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import image1 from '../../../assets/images/image1.png';
import image2 from '../../../assets/images/image2.png';
import image3 from '../../../assets/images/image3.jpg';

export function Education() {
  return (
    <section className={styles.education}>
      <hr />
      <header>
        <h1>Education</h1>
      </header>
      <div className={styles.content}>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image1} className="d-block w-100" alt="First slide" />
              <div className={styles.gradientOverlay}></div>
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
                <div className={styles.info}>
                  <p>Field</p>
                  <p>Degree</p>
                  <p>Period</p>
                  <p>Address</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={image2} className="d-block w-100" alt="Second slide" />
              <div className={styles.gradientOverlay}></div>
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
                <div className={styles.info}>
                  <p>Field</p>
                  <p>Degree</p>
                  <p>Period</p>
                  <p>Address</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={image3} className="d-block w-100" alt="Third slide" />
              <div className={styles.gradientOverlay}></div>
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
                <div className={styles.info}>
                  <p>Field</p>
                  <p>Degree</p>
                  <p>Period</p>
                  <p>Address</p>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <hr />
    </section>
  );
}