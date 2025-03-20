import React from 'react';
import styles from '../../../styles/form.module.css';

// AboutDeleteModal component to confirm deletion of an about card
export function AboutDeleteModal({ handleDelete, handleCancelDelete }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2>Delete About Card</h2>
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