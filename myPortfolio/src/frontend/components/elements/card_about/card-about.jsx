import React from 'react';
import styles from './card-about.module.css';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export function CardAbout({ aboutData, handleIconClick, activeIcon }) {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={aboutData.image} alt={aboutData.title} />
        </div>
        <h3 className={styles.title}>{aboutData.title}</h3>
        <p className={styles.text}>{aboutData.paragraph}</p>
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
  );
}