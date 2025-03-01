import React from "react";
import styles from './card-project.module.css';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export function CardProject({ projectData, handleIconClick, activeIcon }) {
  if (!projectData) {
    return null;
  }

  return (
    <section className={styles.project}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={projectData.image} alt={projectData.title} />
        </div>
        <h3 className={styles.title}>{projectData.title}</h3>
        <p className={styles.text}>{projectData.description}</p>
        <hr />
        <h5>{projectData.category}</h5>
        <hr />
        <h4>Technologies</h4>
        <ul className={styles.list}>
          {projectData.technologies.map((technology, index) => (
            <li key={index}>{technology}</li>
          ))}
        </ul>
        <hr />
        <a href={projectData.github} target="_blank" rel="noopener noreferrer">Access the repository on GitHub</a>
        <hr />
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <BsFillPencilFill
              size={30}
              className={`${styles.icon} ${styles['icon-pencil']} ${activeIcon?.icon === 'pencil' && activeIcon?.id === projectData._id ? styles['icon-active'] : ''}`}
              onClick={() => handleIconClick('pencil', projectData._id)}
            />
            <BsFillTrashFill
              size={30}
              className={`${styles.icon} ${styles['icon-trash']} ${activeIcon?.icon === 'trash' && activeIcon?.id === projectData._id ? styles['icon-active'] : ''}`}
              onClick={() => handleIconClick('trash', projectData._id)}
            />
          </div>
        </footer>
      </div>
    </section>
  );
}