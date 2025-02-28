import React from "react";
import { CardProject } from '../elements/card_project/card-project';
import { useProjectForm } from "../hooks/userProjectForm";
import { BsArrowRepeat } from "react-icons/bs";
import styles from '../styles/form.module.css';

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
    handleFileChange,
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
        <button onClick={() => setShowForm(true)}>Add a new content</button>
      </header>
      <div className={styles.cardContainer}>
        {projectData.map((item) => (
          <CardProject
            key={item._id}
            projectData={item}
            handleIconClick={handleIconClick}
            activeIcon={activeIcon}
          />
        ))}
      </div>
    </section>
  )
}