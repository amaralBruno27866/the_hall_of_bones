import React from 'react';
import { useAboutForm } from '../../../hooks/useAboutForm';
import { CardAbout } from '../../../elements/card_about/card-about';
import { AboutEditModal } from './aboutEditModal';
import { AboutDeleteModal } from './aboutDeleteModal';
import styles from '../../../styles/form.module.css';
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
    handleFileChange,
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
    <section className={styles.basicForm}>
      <header className={styles.header}>
        <BsArrowRepeat size={30} className={styles.refreshIcon} onClick={handleRefresh} />
        <h2>About Section Form</h2>
        <button onClick={() => setShowForm(true)}>Add a new content</button>
      </header>
      <div className={styles.cardContainer}>
        {aboutData.map((item) => (
          <CardAbout
            key={item._id}
            aboutData={item}
            handleIconClick={handleIconClick}
            activeIcon={activeIcon}
          />
        ))}
      </div>
      {showForm && (
        <AboutEditModal
          newCard={newCard}
          editMode={editMode}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
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