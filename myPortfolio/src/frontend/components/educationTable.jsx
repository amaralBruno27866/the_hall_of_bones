import React from 'react';
import { BsFillPencilFill, BsFillTrashFill, BsCloudUploadFill } from "react-icons/bs";
import styles from '../styles/form.module.css';

export function EducationTable({ educationData = [], handleIconClick, activeIcon }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Institution</th>
            <th>Image</th>
            <th>URL</th>
            <th>Field</th>
            <th>Degree</th>
            <th>Period</th>
            <th>Address</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(educationData) && educationData.map((item) => (
            <tr key={item._id}>
              <td>{item.institution}</td>
              <td><img src={item.image} alt={item.institution} className={styles.image} /></td>
              <td><a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></td>
              <td>{item.field}</td>
              <td>{item.degree}</td>
              <td>{`From ${item.period.start_month}/${item.period.start_year} to ${item.period.end_month}/${item.period.end_year}`}</td>
              <td>{`${item.address.number} ${item.address.street}, ${item.address.city}, ${item.address.state}, ${item.address.zip}, ${item.address.country}`}</td>
              <td>
                <div className={styles.dropdown}>
                  <button className={styles.dropbtn}>Skills</button>
                  <div className={styles.dropdownContent}>
                    {item.skill.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </td>
              <td>
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