import React, { useState, useEffect } from 'react';
import styles from './about-form.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsFillPencilFill, BsFillTrashFill, BsCloudUploadFill } from "react-icons/bs";
import axios from 'axios';

export function AboutForm() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  const handleDocumentClick = (event) => {
    if (!event.target.closest(`.${styles.icon}`)) {
      setActiveIcon(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    // Fetch the data from the backend
    axios.get('/api/about/cards')
      .then(response => {
        if (Array.isArray(response.data)) {
          setAboutData(response.data);
        } else {
          console.error('Response data is not an array:', response.data);
          setError('Unexpected response format');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.aboutForm}>
      <header className={styles.header}>
        <h2>About Section Form</h2>
        <button>Add a new content</button>
      </header>
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
                    className={`${styles.icon} ${styles['icon-pencil']} ${activeIcon === 'pencil' ? styles['icon-active'] : ''}`}
                    onClick={() => handleIconClick('pencil')}
                  />
                  <BsFillTrashFill
                    size={30}
                    className={`${styles.icon} ${styles['icon-trash']} ${activeIcon === 'trash' ? styles['icon-active'] : ''}`}
                    onClick={() => handleIconClick('trash')}
                  />
                  <BsCloudUploadFill
                    size={30}
                    className={`${styles.icon} ${styles['icon-upload']} ${activeIcon === 'upload' ? styles['icon-active'] : ''}`}
                    onClick={() => handleIconClick('upload')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}