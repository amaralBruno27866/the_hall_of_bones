import React from 'react';
import styles from './about-form.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function AboutForm() {
  return (
    <section className={styles.aboutForm}>
      <header>
        <h2>About Section Form</h2>
      </header>
      <div>
        Table
      </div>
      <div>
        Form
      </div>
    </section>
  );
}