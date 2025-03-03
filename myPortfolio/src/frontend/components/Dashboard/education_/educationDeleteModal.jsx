import React from 'react';
import styles from '../../../styles/education-form.module.css';

export function EducationDeleteModal({ handleDelete, handleCancelDelete }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2>Delete Education</h2>
        </header>
        <p>Are you sure that you want to delete this data?</p>
        <div className={styles.buttonGroup}>
          <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} onClick={handleDelete}>YES</button>
          <button type="button" className={`${styles.btn} ${styles['btn-danger']}`} onClick={handleCancelDelete}>NO</button>
        </div>
      </div>
    </div>
  )
}