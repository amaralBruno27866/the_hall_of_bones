import React from 'react';
import styles from './about-form.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsFillPencilFill, BsFillTrashFill, BsCloudUploadFill } from "react-icons/bs";

export function AboutForm() {
  return (
    <section className={styles.aboutForm}>
      <header>
        <h2>About Section Form</h2>
        <button>Add a new content</button>
      </header>
      <div>
        Table
      </div>
    </section>
  );
}