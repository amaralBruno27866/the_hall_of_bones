import React from "react";
import styles from './card-about.module.css';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

// CardAbout component to display an about card with edit and delete actions
export function CardAbout({ aboutData, handleIconClick, activeIcon }) {
  // Return null if no aboutData is provided
  if (!aboutData) {
    return null;
  }

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        {/* Image section */}
        <div className={styles.image}>
          <img src={aboutData.image} alt={aboutData.title} />
        </div>
        {/* Title section */}
        <h3 className={styles.title}>{aboutData.title}</h3>
        {/* Paragraph section */}
        <p className={styles.text}>{aboutData.paragraph}</p>
        {/* Footer section with action icons */}
        <footer className={styles.footer}>
          <div className={styles.actions}>
            {/* Edit icon */}
            <BsFillPencilFill
              size={30}
              className={`${styles.icon} ${styles['icon-pencil']} ${activeIcon?.icon === 'pencil' && activeIcon?.id === aboutData._id ? styles['icon-active'] : ''}`}
              onClick={() => handleIconClick('pencil', aboutData._id)}
            />
            {/* Delete icon */}
            <BsFillTrashFill
              size={30}
              className={`${styles.icon} ${styles['icon-trash']} ${activeIcon?.icon === 'trash' && activeIcon?.id === aboutData._id ? styles['icon-active'] : ''}`}
              onClick={() => handleIconClick('trash', aboutData._id)}
            />
          </div>
        </footer>
      </div>
    </section>
  );
}