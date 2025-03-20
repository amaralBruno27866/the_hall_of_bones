import React from "react";
import styles from './card-education.module.css';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

// CardEducation component to display an education card with edit and delete actions
export function CardEducation({ educationData, handleIconClick, activeIcon }) {
  // Return null if no educationData is provided
  if (!educationData) {
    return null;
  }

  return (
    <main className={styles.education}>
      <article className={styles.container}>
        {/* Title section */}
        <h1 className={styles.title}>{educationData.institution}</h1>
        {/* Text section */}
        <div className={styles.text}>
          <p>{educationData.field}</p>
          <p>{educationData.degree}</p>
          <p>{educationData.period.start_month} {educationData.period.start_year} - {educationData.period.end_month} {educationData.period.end_year}</p>
          <p>{educationData.address.street}, {educationData.address.city}, {educationData.address.state}, {educationData.address.country}</p>
        </div>
        {/* Skills section */}
        <div className={styles.skills}>
          <h4>Skills</h4>
          {educationData.skills.map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
        </div>
      </article>
      {/* Link section */}
      <button className={styles.link}>
        <a href={educationData.url} target="_blank" rel="noopener noreferrer">Link to website</a>
      </button>
      {/* Footer section with action icons */}
      <section className={styles.footer}>
        <div className={styles.actions}>
          {/* Edit icon */}
          <BsFillPencilFill
            size={30}
            className={`${styles.icon} ${styles['icon-pencil']} ${activeIcon?.icon === 'pencil' && activeIcon?.id === educationData._id ? styles['icon-active'] : ''}`}
            onClick={() => handleIconClick('pencil', educationData._id)}
          />
          {/* Delete icon */}
          <BsFillTrashFill
            size={30}
            className={`${styles.icon} ${styles['icon-trash']} ${activeIcon?.icon === 'trash' && activeIcon?.id === educationData._id ? styles['icon-active'] : ''}`}
            onClick={() => handleIconClick('trash', educationData._id)}
          />
        </div>
      </section>
    </main>
  );
}