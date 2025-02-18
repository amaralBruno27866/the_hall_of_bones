import React from 'react';
import { useEducationForm } from '../hooks/useEducationForm';
import { EducationTable } from './educationTable';
import { EducationEditModal } from './educationEditModal';
import { EducationDeleteModal } from './educationDeleteModal';
import styles from '../styles/education-form.module.css';
import { BsArrowRepeat } from "react-icons/bs";

export function EducationForm() {
  const {
    educationData,
    loading,
    error,
    activeIcon,
    showForm,
    showDeleteModal,
    newCard,
    editMode,
    handleIconClick,
    handleInputChange,
    handleSave,
    handleCancel,
    handleDelete,
    handleCancelDelete,
    handleRefresh,
    setShowForm,
  } = useEducationForm();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.educationForm}>
      <header className={styles.header}>
        <BsArrowRepeat size={30} className={styles.refreshIcon} onClick={handleRefresh} />
        <h2>Education Section Form</h2>
        <button onClick={() => setShowForm(true)}>Add a new content</button>
      </header>
      <EducationTable educationData={educationData} handleIconClick={handleIconClick} activeIcon={activeIcon} />
      {showForm && (
        <EducationEditModal
          newCard={newCard}
          editMode={editMode}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}
      {showDeleteModal && (
        <EducationDeleteModal
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
          />
      )}
    </section>
  );
}