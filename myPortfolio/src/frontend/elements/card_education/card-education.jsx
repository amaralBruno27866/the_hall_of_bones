// Importing React library for creating components
import React from "react";
// Importing CSS module for styling
import styles from './card-education.module.css';
// Importing icons for edit and delete actions
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

// CardEducation component to display an education card with edit and delete actions
export function CardEducation({ educationData, handleIconClick, activeIcon }) {
  // If no educationData is provided, return null to render nothing
  if (!educationData) {
    return null;
  }

  return (
    // Main container for the education card
    <main className={styles.education}>
      <article className={styles.container}>
        {/* Title section displaying the institution name */}
        <h1 className={styles.title}>{educationData.institution}</h1>
        {/* Text section displaying field, degree, period, and address */}
        <div className={styles.text}>
          <p>Field<br />{educationData.field}</p>
          <p>Degree<br />{educationData.degree}</p>
          <p>Period<br />Start: {educationData.period.start_month} / {educationData.period.start_year} <br /> End: {educationData.period.end_month} / {educationData.period.end_year}</p>
          <p>Address<br />{educationData.address.street}, {educationData.address.city}, {educationData.address.state}, {educationData.address.country}</p>
        </div>
        {/* Skills section displaying a list of skills */}
        <div className={styles.skills}>
          <h4>Skills</h4>
          {educationData.skills.map((skill, index) => (
            // Rendering each skill as a paragraph
            <p key={index}>{skill}</p>
          ))}
        </div>
      </article>
      {/* Button to open the institution's website in a new tab */}
      <button
        className={styles.link}
        onClick={() => window.open(educationData.url, '_blank', 'noopener noreferrer')}
      >
        Link to website
      </button>
    </main>
  );
}