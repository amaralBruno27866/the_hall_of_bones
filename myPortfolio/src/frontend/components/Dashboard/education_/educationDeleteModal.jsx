import React from 'react';
import styles from '../../../styles/education-form.module.css';

// EducationDeleteModal component to confirm deletion of an education entry
export function EducationDeleteModal({ handleDelete, handleCancelDelete }) {
  return (
    <div className={styles.overlay}>
      {/* Modal container */}
      <div className={styles.modal}>
        {/* Modal header with title */}
        <header className={styles.modalHeader}>
          <h2>Delete Education</h2>
        </header>
        {/* Confirmation message */}
        <p>Are you sure that you want to delete this data?</p>
        {/* Buttons for confirming or canceling the deletion */}
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            className={`${styles.btn} ${styles['btn-primary']}`} 
            onClick={handleDelete}
          >
            YES
          </button>
          <button 
            type="button" 
            className={`${styles.btn} ${styles['btn-danger']}`} 
            onClick={handleCancelDelete}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}