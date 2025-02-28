import React from "react";
import styles from './card-project.module.css';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export function CardProject({ projectData, handleIconClick, activeIcon }) {
  return (
    <section className={styles.project}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={projectData.image} alt={projectData.title} />
        </div>
        <h3 className={styles.title}>{projectData.title}</h3>
        <p className={styles.text}>{projectData.description}</p>
        <hr />
        <h4>Technologies</h4>
        <ul className={styles.list}>
          {projectData.technologies.map((technology, index) => (
            <li key={index}>{technology}</li>
          ))}
        </ul>
        <hr />
        <a href={projectData.github}>Access the repository on GitHub</a>
        <hr />
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <BsFillPencilFill
              size={30}
              className={`${styles.icon} ${styles['icon-pencil']} ${activeIcon?.icon === 'pencil' && activeIcon?.id === aboutData._id ? styles['icon-active'] : ''}`}
              onClick={() => handleIconClick('pencil', aboutData._id)}
            />
            <BsFillTrashFill
              size={30}
              className={`${styles.icon} ${styles['icon-trash']} ${activeIcon?.icon === 'trash' && activeIcon?.id === aboutData._id ? styles['icon-active'] : ''}`}
              onClick={() => handleIconClick('trash', aboutData._id)}
            />
          </div>
        </footer>
      </div>
    </section>
  )
}