import React from 'react';
import { useAboutForm } from '../hooks/useAboutForm';
import { AboutTable } from './aboutTable';
import { AboutEditModal } from './aboutEditModal';
import { AboutDeleteModal } from './aboutDeleteModal';
import styles from '../styles/about-form.module.css';
import { BsArrowRepeat } from "react-icons/bs";

export function AboutForm() {
  const {
    aboutData,
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
  } = useAboutForm();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.aboutForm}>
      <header className={styles.header}>
        <BsArrowRepeat size={30} className={styles.refreshIcon} onClick={handleRefresh} />
        <h2>About Section Form</h2>
        <button onClick={() => setShowForm(true)}>Add a new content</button>
      </header>
      <AboutTable aboutData={aboutData} handleIconClick={handleIconClick} activeIcon={activeIcon} />
      {showForm && (
        <AboutEditModal
          newCard={newCard}
          editMode={editMode}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}
      {showDeleteModal && (
        <AboutDeleteModal
          handleDelete={handleDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </section>
  );
}