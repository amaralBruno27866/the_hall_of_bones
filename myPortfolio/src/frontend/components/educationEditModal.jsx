import React, { useState } from 'react';
import { BsPlus } from "react-icons/bs";
import styles from '../styles/form.module.css';

export function EducationEditModal({ newCard, editMode, handleInputChange, handleSave, handleCancel }) {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(newCard.skills || []);

  const handleAddSkill = () => {
    if (skillInput.trim() && skills.length < 7) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <h2>{editMode ? 'Edit Education' : 'Add New Education'}</h2>
        <form>
          {/* Basic information */}
          <div className="form-group">
            <label>Institution</label>
            <input
              type="text"
              className="form-control"
              name="institution"
              value={newCard.institution}
              onChange={handleInputChange}
            />
          </div>
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
            <label>Link for the Institution Website</label>
            <input
              type="text"
              className="form-control"
              name="url"
              value={newCard.url}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Field</label>
            <input
              type="text"
              className="form-control"
              name="field"
              value={newCard.field}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              className="form-control"
              name="degree"
              value={newCard.degree}
              onChange={handleInputChange}
            />
          </div>

          {/* Period */}
          <div className="form-group">
            <label>Start Month</label>
            <input
              type="number"
              className="form-control"
              name="start_month"
              value={newCard.period.start_month}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Start Year</label>
            <input
              type="number"
              className="form-control"
              name="start_year"
              value={newCard.period.start_year}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>End Month</label>
            <input
              type="number"
              className="form-control"
              name="end_month"
              value={newCard.period.end_month}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>End Year</label>
            <input
              type="number"
              className="form-control"
              name="end_year"
              value={newCard.period.end_year}
              onChange={handleInputChange}
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Number</label>
            <input
              type="number"
              className="form-control"
              name="number"
              value={newCard.address.number}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              className="form-control"
              name="street"
              value={newCard.address.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={newCard.address.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>State/Province</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={newCard.address.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>ZIP Code</label>
            <input
              type="text"
              className="form-control"
              name="zip"
              value={newCard.address.zip}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={newCard.address.country}
              onChange={handleInputChange}
            />
          </div>

          {/* Skills */}
          <div className="form-group">
            <label>Skills</label>
            <div className={styles.skillsInput}>
              <input
                type="text"
                className="form-control"
                value={skillInput}
                onChange={handleSkillInputChange}
              />
              <button type="button" className={styles.addSkillButton} onClick={handleAddSkill}>
                <BsPlus size={20} />
              </button>
            </div>
            <div className={styles.skillsList}>
              {skills.map((skill, index) => (
                <p key={index} className={styles.skillItem}>{skill}</p>
              ))}
            </div>
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