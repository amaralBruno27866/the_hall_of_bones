import React from 'react';
import { useEducationForm } from '../../../hooks/useEducationForm';
import { CardEducation } from '../../../elements/card_education/card-education';
import { EducationEditModal } from './educationEditModal';
import { EducationDeleteModal } from './educationDeleteModal';
import styles from '../../../styles/form.module.css';
import { BsArrowRepeat } from "react-icons/bs";

// EducationForm component to manage the Education section
export function EducationForm() {
  // Destructure the state and functions from the custom hook useEducationForm
  const {
    educationData, // Array of education cards data
    loading, // Loading state
    error, // Error state
    activeIcon, // State to manage the active icon for edit/delete
    showForm, // State to manage the visibility of the edit form
    showDeleteModal, // State to manage the visibility of the delete modal
    newCard, // State to manage the new or edited card data
    editMode, // State to manage whether the form is in edit mode
    handleIconClick, // Function to handle icon clicks (edit/delete)
    handleInputChange, // Function to handle input changes in the form
    handleSkillChange, // Function to handle skill changes in the form
    handleSave, // Function to handle saving the form data
    handleCancel, // Function to handle canceling the form
    handleDelete, // Function to handle deleting a card
    handleCancelDelete, // Function to handle canceling the delete action
    handleRefresh, // Function to handle refreshing the data
    setShowForm, // Function to set the visibility of the edit form
  } = useEducationForm();

  // Render loading message if data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error message if there is an error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.educationForm}>
      <header className={styles.header}>
        {/* Refresh icon to reload the data */}
        <BsArrowRepeat size={30} className={styles.refreshIcon} onClick={handleRefresh} />
        <h2>Education Section Form</h2>
        {/* Button to show the form for adding a new card */}
        <button onClick={() => setShowForm(true)}>Add a new content</button>
      </header>
      <div className={styles.cardContainer}>
        {/* Centralize cards and allow vertical scrolling */}
        <div className={styles.cardList}>
          {Array.isArray(educationData) && educationData.map((item) => (
            <CardEducation
              key={item._id}
              educationData={item}
              handleIconClick={handleIconClick}
              activeIcon={activeIcon}
            />
          ))}
        </div>
      </div>
      {/* Render the EducationEditModal if showForm is true */}
      {showForm && (
        <EducationEditModal
          newCard={newCard}
          editMode={editMode}
          handleInputChange={handleInputChange}
          handleSkillChange={handleSkillChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}
      {/* Render the EducationDeleteModal if showDeleteModal is true */}
      {showDeleteModal && (
        <EducationDeleteModal
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </section>
  );
}