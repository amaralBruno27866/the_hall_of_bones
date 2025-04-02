import React from 'react';
import styles from '../../../styles/form.module.css';

// AboutEditModal component to add or edit an about card
export function AboutEditModal({ newCard, editMode, handleInputChange, handleSave, handleCancel }) {
  return (
    <div className={styles.overlay}>
      {/* Modal container */}
      <div className={styles.formContainer}>
        {/* Title indicating whether the form is for editing or adding */}
        <h2>{editMode ? 'Edit Content' : 'Add New Content'}</h2>
        <form>
          {/* Input for the image URL */}
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
          {/* Input for the title */}
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
          {/* Textarea for the paragraph */}
          <div className="form-group">
            <label>Paragraph</label>
            <textarea
              className="form-control"
              name="paragraph"
              value={newCard.paragraph}
              onChange={handleInputChange}
            />
          </div>
          {/* Buttons for saving or canceling the form */}
          <div className={styles.buttonGroup}>
            <button 
              type="button" 
              className={`${styles.btn} ${styles['btn-primary']}`} 
              onClick={handleSave}
            >
              Save
            </button>
            <button 
              type="button" 
              className={`${styles.btn} ${styles['btn-danger']}`} 
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}