import React from 'react';
import styles from '../../styles/about.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import loading from '../../assets/images/loading.gif';

export function About() {
  return (
    <section className={styles.about}>
      <hr />
      <header>
        <h1>About</h1>
      </header>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              <img src={loading} className="card-img-top" alt="Loading..." />
              <div className="card-body">
                <h5 className="card-title">Card title 1</h5>
                <p className="card-text">This is a short card.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img src={loading} className="card-img-top" alt="Loading..." />
              <div className="card-body">
                <h5 className="card-title">Card title 2</h5>
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <img src={loading} className="card-img-top" alt="Loading..." />
              <div className="card-body">
                <h5 className="card-title">Card title 3</h5>
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}