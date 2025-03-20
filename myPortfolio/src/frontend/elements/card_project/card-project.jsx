import React from "react";
import styles from './card-project.module.css';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

// CardProject component to display a project card with edit and delete actions
export function CardProject({ projectData, handleIconClick, activeIcon }) {
  // Return null if no projectData is provided
  if (!projectData) {
    return null;
  }

  return (
    <section className={styles.project}>
      <div className={styles.container}>
        {/* Image section */}
        <div className={styles.image}>
          <img src={projectData.image} alt={projectData.title} />
        </div>
        {/* Title section */}
        <h3 className={styles.title}>{projectData.title}</h3>
        {/* Description section */}
        <p className={styles.text}>{projectData.description}</p>
        <hr />
        {/* Category section */}
        <h5>{projectData.category}</h5>
        <hr />
        {/* Technologies section */}
        <h4>Technologies</h4>
        <ul className={styles.list}>
          {Array.isArray(projectData.technologies) && projectData.technologies.map((technology, index) => (
            <li key={index}>{technology}</li>
          ))}
        </ul>
        <hr />
        {/* GitHub link section */}
        <a href={projectData.github} target="_blank" rel="noopener noreferrer">Access the repository on GitHub</a>
        <hr />
        {/* Footer section with action icons */}
        <footer className={styles.footer}>
          <div className={styles.actions}>
            {/* Edit icon */}
            <BsFillPencilFill
              size={30}
              className={`${styles.icon} ${styles['icon-pencil']} ${activeIcon?.icon === 'pencil' && activeIcon?.id === projectData._id ? styles['icon-active'] : ''}`}
              onClick={() => handleIconClick('pencil', projectData._id)}
            />
            {/* Delete icon */}
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