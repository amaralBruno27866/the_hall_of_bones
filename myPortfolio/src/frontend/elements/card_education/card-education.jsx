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
          <p>Field<br />{educationData.field}</p>
          <p>Degree<br />{educationData.degree}</p>
          <p>Period<br />Start: {educationData.period.start_month} / {educationData.period.start_year} <br /> End: {educationData.period.end_month} / {educationData.period.end_year}</p>
          <p>Address<br />{educationData.address.street}, {educationData.address.city}, {educationData.address.state}, {educationData.address.country}</p>
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
      <button
        className={styles.link}
        onClick={() => window.open(educationData.url, '_blank', 'noopener noreferrer')}
      >
        Link to website
      </button>
    </main>
  );
}