import React from 'react';
import styles from '../../../styles/form.module.css';

// ProjectDeleteModal component to confirm deletion of a project card
export function ProjectDeleteModal({ handleDelete, handleCancelDelete }) {
  return (
    <div className={styles.overlay}>
      {/* Modal container */}
      <div className={styles.modal}>
        {/* Modal header with title */}
        <header className={styles.modalHeader}>
          <h2>Delete Project Card</h2>
        </header>
        {/* Confirmation message */}
        <p>Are you sure that you want to delete this card?</p>
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