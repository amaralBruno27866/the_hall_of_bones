import React, { useState, useEffect } from 'react';
import { BsPlus } from "react-icons/bs";
import styles from '../../../styles/education-form.module.css';

export function EducationEditModal({ newCard, editMode, handleInputChange, handleSave, handleCancel, handleSkillChange }) {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(newCard.skills || []);

  useEffect(() => {
    setSkills(newCard.skills || []);
  }, [newCard.skills]);

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const updatedSkills = [...skills, skillInput.trim()];
      setSkills(updatedSkills);
      handleSkillChange(updatedSkills);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    handleSkillChange(updatedSkills);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = [];
  for (let i = new Date().getFullYear(); i >= 1900; i--) {
    years.push(i);
  }

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
            <label>Start Date</label>
            <div className={styles.dateGroup}>
              <select
                className="form-control"
                name="period.start_month"
                value={newCard.period.start_month}
                onChange={handleInputChange}
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
              <select
                className="form-control"
                name="period.start_year"
                value={newCard.period.start_year}
                onChange={handleInputChange}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>End Date</label>
            <div className={styles.dateGroup}>
              <select
                className="form-control"
                name="period.end_month"
                value={newCard.period.end_month}
                onChange={handleInputChange}
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
              <select
                className="form-control"
                name="period.end_year"
                value={newCard.period.end_year}
                onChange={handleInputChange}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Number</label>
            <input
              type="number"
              className="form-control"
              name="address.number"
              value={newCard.address.number}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              className="form-control"
              name="address.street"
              value={newCard.address.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="address.city"
              value={newCard.address.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>State/Province</label>
            <input
              type="text"
              className="form-control"
              name="address.state"
              value={newCard.address.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>ZIP Code</label>
            <input
              type="text"
              className="form-control"
              name="address.zip"
              value={newCard.address.zip}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              className="form-control"
              name="address.country"
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
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <button 
                type="button" 
                className={styles.addSkillButton} 
                onClick={handleAddSkill}>
                <BsPlus size={20} />
              </button>
            </div>
            <div className={styles.skillsList}>
              {skills.map((skill, index) => (
                <div key={index} className={styles.skillItem}>
                  {skill}
                  <button type="button" className={styles.removeSkillButton} onClick={() => handleRemoveSkill(index)}>x</button>
                </div>
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