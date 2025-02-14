import React from 'react';
import styles from '../styles/about-form.module.css';

export function AboutFormModal({ newCard, editMode, handleInputChange, handleSave, handleCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <h2>{editMode ? 'Edit Content' : 'Add New Content'}</h2>
        <form>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={newCard.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={newCard.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Paragraph</label>
            <textarea
              className="form-control"
              name="paragraph"
              value={newCard.paragraph}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" className={`${styles.btn} ${styles['btn-danger']}`} onClick={handleSave}>Save</button>
            <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}