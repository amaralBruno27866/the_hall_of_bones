import React from 'react';
import styles from '../../../styles/form.module.css';
import { useAboutForm } from '../../../hooks/useAboutForm';
import { CardAbout } from '../../../elements/card_about/card-about';
import { AboutEditModal } from './aboutEditModal';
import { AboutDeleteModal } from './aboutDeleteModal';
import { BsArrowRepeat } from "react-icons/bs"; // Importing the refresh icon

// AboutForm component to manage the About section
export function AboutForm() {
  // Destructure the state and functions from the custom hook useAboutForm
  const {
    aboutData, // Array of about cards data
    loading, // Loading state
    error, // Error state
    activeIcon, // State to manage the active icon for edit/delete
    showForm, // State to manage the visibility of the edit form
    showDeleteModal, // State to manage the visibility of the delete modal
    newCard, // State to manage the new or edited card data
    editMode, // State to manage whether the form is in edit mode
    handleIconClick, // Function to handle icon clicks (edit/delete)
    handleInputChange, // Function to handle input changes in the form
    handleSave, // Function to handle saving the form data
    handleCancel, // Function to handle canceling the form
    handleDelete, // Function to handle deleting a card
    handleCancelDelete, // Function to handle canceling the delete action
    handleRefresh, // Function to handle refreshing the data
    setShowForm, // Function to set the visibility of the edit form
  } = useAboutForm();

  // Render loading message if data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error message if there is an error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.basicForm}>
      <header className={styles.header}>
        {/* Refresh icon to reload the data */}
        <BsArrowRepeat size={30} className={styles.refreshIcon} onClick={handleRefresh} />
        <h2>About Section Form</h2>
        {/* Button to show the form for adding a new card */}
        <button onClick={() => setShowForm(true)}>Add a new card</button>
      </header>
      <div className={styles.cardContainer}>
        {/* Map through the aboutData array and render CardAbout components */}
        {Array.isArray(aboutData) && aboutData.map((item) => (
          <CardAbout
            key={item._id}
            aboutData={item}
            handleIconClick={handleIconClick}
            activeIcon={activeIcon}
          />
        ))}
      </div>
      {/* Render the AboutEditModal if showForm is true */}
      {showForm && (
        <AboutEditModal
          newCard={newCard}
          editMode={editMode}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}
      {/* Render the AboutDeleteModal if showDeleteModal is true */}
      {showDeleteModal && (
        <AboutDeleteModal
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </section>
  );
}