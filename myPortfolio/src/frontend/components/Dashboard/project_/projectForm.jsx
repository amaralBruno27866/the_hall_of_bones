import React from 'react';
import { useProjectForm } from '../../../hooks/userProjectForm';
import { CardProject } from '../../../elements/card_project/card-project';
import { ProjectEditModal } from './projectEditModal';
import { ProjectDeleteModal } from './projectDeleteModal';
import styles from '../../../styles/form.module.css';
import { BsArrowRepeat } from "react-icons/bs";

// ProjectForm component to manage the Project section
export function ProjectForm() {
  // Destructure the state and functions from the custom hook useProjectForm
  const {
    projectData, // Array of project cards data
    loading, // Loading state
    error, // Error state
    activeIcon, // State to manage the active icon for edit/delete
    showForm, // State to manage the visibility of the edit form
    showDeleteModal, // State to manage the visibility of the delete modal
    newCard, // State to manage the new or edited card data
    editMode, // State to manage whether the form is in edit mode
    handleIconClick, // Function to handle icon clicks (edit/delete)
    handleInputChange, // Function to handle input changes in the form
    handleTechnologiesChange, // Function to handle technology changes in the form
    handleSave, // Function to handle saving the form data
    handleCancel, // Function to handle canceling the form
    handleDelete, // Function to handle deleting a card
    handleCancelDelete, // Function to handle canceling the delete action
    handleRefresh, // Function to handle refreshing the data
    setShowForm, // Function to set the visibility of the edit form
  } = useProjectForm();

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
        <h2>Project Section Form</h2>
        {/* Button to show the form for adding a new project */}
        <button onClick={() => setShowForm(true)}>Add a new project</button>
      </header>
      <div className={styles.cardContainer}>
        {/* Map through the projectData array and render CardProject components */}
        {Array.isArray(projectData) && projectData.map((item) => (
          <CardProject
            key={item._id}
            projectData={item}
            handleIconClick={handleIconClick}
            activeIcon={activeIcon}
          />
        ))}
      </div>
      {/* Render the ProjectEditModal if showForm is true */}
      {showForm && (
        <ProjectEditModal
          newCard={newCard}
          editMode={editMode}
          handleInputChange={handleInputChange}
          handleTechnologiesChange={handleTechnologiesChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}
      {/* Render the ProjectDeleteModal if showDeleteModal is true */}
      {showDeleteModal && (
        <ProjectDeleteModal
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </section>
  );
}