import React from "react";
import styles from './card-education.module.css';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export function CardEducation({ educationData, handleIconClick, activeIcon }) {
  if (!educationData) {
    return null;
  }

  return (
    <main>
      <figure>
        <img src="https://via.placeholder.com/150" alt="Institution picture" />
      </figure>
      <article>
        <div>
          <h1>Institution</h1>
          <p>Field</p>
          <p>Degree</p>
          <p>Start date</p>
          <p>End date</p>
          <p>Address</p>
        </div>
        <hr />
        <div>
          <h4>Skills</h4>
          <p>skill</p>
          <p>skill</p>
          <p>skill</p>
          <p>skill</p>
          <p>skill</p>
        </div>
      </article>
      <button>
        Link to website
      </button>
      <section className={styles.footer}>
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
      </section>
    </main>
  )
}