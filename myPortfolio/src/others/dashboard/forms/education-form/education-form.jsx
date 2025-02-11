import React, { useState, useEffect } from 'react';
import styles from './education-form.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsFillPencilFill, BsFillTrashFill, BsCloudUploadFill, BsArrowRepeat } from "react-icons/bs";
import axios from '../../../../config/axiosConfig';

export function EducationForm() {
  return (
    <section className={styles.educationForm}>
      <header className={styles.header}>
        <h2>Education Section Form</h2>
      </header>
    </section>
  );
}