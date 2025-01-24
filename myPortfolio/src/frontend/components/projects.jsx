import React from 'react';
import styles from '../../styles/projects.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import load from '../../assets/images/loading.gif';

export function Projects() {
  return (
    <section className={styles.projects}>
      <header>
        <h1>My Projects</h1>
      </header>
      <div className={styles.container}>
        <div className={styles.slide}>
          <img src={load} alt="" />
          <div className={styles.info}>
            <h5>Project Title</h5>
            <p>Project description</p>
            <div className={styles.otherInfos}>
              <ul>
                <li>Technologie 1</li>
                <li>Technologie 2</li>
                <li>Technologie 3</li>
                <li>Technologie 4</li>
                <li>Technologie 5</li>
              </ul>
            </div>
          </div>
          <button>GitHub</button>
        </div>
      </div>
      <hr />
    </section>
  );
}