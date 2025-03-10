import React, { useState } from 'react';
import styles from '../../../styles/form.module.css';
import { BsFileEarmarkPlusFill } from "react-icons/bs";

export function ProjectEditModal({ newCard, editMode, handleInputChange, handleSave, handleCancel, handleTechnologiesChange }) {
  const [technologyInput, setTechnologyInput] = useState('');

  const handleAddTechnology = () => {
    if (technologyInput.trim()) {
      handleTechnologiesChange([...newCard.technologies, technologyInput.trim()]);
      setTechnologyInput('');
    }
  };

  const handleRemoveTechnology = (index) => {
    const updatedTechnologies = newCard.technologies.filter((_, i) => i !== index);
    handleTechnologiesChange(updatedTechnologies);
  };

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
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={newCard.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={newCard.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Technologies</label>
            <div className={styles.technologyInputGroup}>
              <input
                type="text"
                className="form-control"
                value={technologyInput}
                onChange={(e) => setTechnologyInput(e.target.value)}
              />
              <button 
                type="button" 
                className={styles.addButton} 
                onClick={handleAddTechnology}>
                  <BsFileEarmarkPlusFill 
                />
              </button>
            </div>
            <div className={styles.technologyList}>
              {newCard.technologies.map((tech, index) => (
                <div key={index} className={styles.technologyItem}>
                  {tech}
                  <button type="button" className={styles.removeButton} onClick={() => handleRemoveTechnology(index)}>x</button>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>GitHub URL</label>
            <input
              type="text"
              className="form-control"
              name="github"
              value={newCard.github}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} onClick={handleSave}>Save</button>
            <button type="button" className={`${styles.btn} ${styles['btn-danger']}`} onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}