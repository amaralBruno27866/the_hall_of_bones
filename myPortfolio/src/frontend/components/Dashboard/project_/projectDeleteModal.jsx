import React from 'react';
import styles from '../../../styles/form.module.css';

// ProjectDeleteModal component to confirm deletion of a project card
export function ProjectDeleteModal({ handleDelete, handleCancelDelete }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2>Delete Project Card</h2>
        </header>
        <p>Are you sure that you want to delete this card?</p>
        <div className={styles.buttonGroup}>
          <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} onClick={handleDelete}>YES</button>
          <button type="button" className={`${styles.btn} ${styles['btn-danger']}`} onClick={handleCancelDelete}>NO</button>
        </div>
      </div>
    </div>
  );
}