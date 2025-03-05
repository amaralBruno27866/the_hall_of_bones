import React from "react";
import styles from './card-education.module.css';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export function CardEducation({ educationData, handleIconClick, activeIcon }) {
  if (!educationData) {
    return null;
  }

  return (
    <section className={styles.education}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={educationData.image} alt={educationData.title} />
        </div>
        <h3 className={styles.title}>{educationData.title}</h3>
        <p className={styles.text}>{educationData.description}</p>
        <hr />
        <h5>{educationData.category}</h5>
        <hr />
        <h4>Technologies</h4>
        <ul className={styles.list}>
          {Array.isArray(educationData.technologies) && educationData.technologies.map((technology, index) => (
            <li key={index}>{technology}</li>
          ))}
        </ul>
        <hr />
        <a href={educationData.github} target="_blank" rel="noopener noreferrer">Access the repository on GitHub</a>
        <hr />
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <BsFillPencilFill
              size={30}
              className={`${styles.icon} ${styles['icon-pencil']} ${activeIcon?.icon === 'pencil' && activeIcon?.id === educationData._id ? styles['icon-active'] : ''}`}
              onClick={() => handleIconClick('pencil', educationData._id)}
            />
            <BsFillTrashFill
              size={30}
              className={`${styles.icon} ${styles['icon-trash']} ${activeIcon?.icon === 'trash' && activeIcon?.id === educationData._id ? styles['icon-active'] : ''}`}
              onClick={() => handleIconClick('trash', educationData._id)}
            />
          </div>
        </footer>
      </div>
    </section>
  )
}