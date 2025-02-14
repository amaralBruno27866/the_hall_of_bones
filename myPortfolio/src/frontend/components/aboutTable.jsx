import React from 'react';
import { BsFillPencilFill, BsFillTrashFill, BsCloudUploadFill } from "react-icons/bs";
import styles from '../styles/about-form.module.css';

export function AboutTable({ aboutData, handleIconClick, activeIcon }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Paragraph</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {aboutData.map((item) => (
            <tr key={item._id}>
              <td><img src={item.image} alt={item.title} className={styles.image} /></td>
              <td>{item.title}</td>
              <td>{item.paragraph}</td>
              <td className={styles.actions}>
                <BsFillPencilFill
                  size={30}
                  className={`${styles.icon} ${styles['icon-pencil']} ${activeIcon?.icon === 'pencil' && activeIcon?.id === item._id ? styles['icon-active'] : ''}`}
                  onClick={() => handleIconClick('pencil', item._id)}
                />
                <BsFillTrashFill
                  size={30}
                  className={`${styles.icon} ${styles['icon-trash']} ${activeIcon?.icon === 'trash' && activeIcon?.id === item._id ? styles['icon-active'] : ''}`}
                  onClick={() => handleIconClick('trash', item._id)}
                />
                <BsCloudUploadFill
                  size={30}
                  className={`${styles.icon} ${styles['icon-upload']} ${activeIcon?.icon === 'upload' && activeIcon?.id === item._id ? styles['icon-active'] : ''}`}
                  onClick={() => handleIconClick('upload', item._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}