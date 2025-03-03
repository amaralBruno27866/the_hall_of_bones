import React from 'react';
import { useProjectForm } from '../../../hooks/userProjectForm';
import { CardProject } from '../../../elements/card_project/card-project';
import { ProjectEditModal } from './projectEditModal';
import { ProjectDeleteModal } from './projectDeleteModal';
import styles from '../../../styles/form.module.css';
import { BsArrowRepeat } from "react-icons/bs";

export function ProjectForm() {
  const {
    projectData,
    loading,
    error,
    activeIcon,
    showForm,
    showDeleteModal,
    newCard,
    editMode,
    handleIconClick,
    handleInputChange,
    handleTechnologiesChange,
    handleSave,
    handleCancel,
    handleDelete,
    handleCancelDelete,
    handleRefresh,
    setShowForm,
  } = useProjectForm();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.basicForm}>
      <header className={styles.header}>
        <BsArrowRepeat size={30} className={styles.refreshIcon} onClick={handleRefresh} />
        <h2>Project Section Form</h2>
        <button onClick={() => setShowForm(true)}>Add a new project</button>
      </header>
      <div className={styles.cardContainer}>
        {Array.isArray(projectData) && projectData.map((item) => (
          <CardProject
            key={item._id}
            projectData={item}
            handleIconClick={handleIconClick}
            activeIcon={activeIcon}
          />
        ))}
      </div>
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
      {showDeleteModal && (
        <ProjectDeleteModal
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </section>
  );
}