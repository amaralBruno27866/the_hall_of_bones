import React, { useState, useEffect } from 'react';
import styles from './about-form.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsFillPencilFill, BsFillTrashFill, BsCloudUploadFill } from "react-icons/bs";

export function AboutForm() {
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
            <tr>
              <td>image string url</td>
              <td>My title</td>
              <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, ratione voluptas? Rem repellat repellendus nisi. Delectus animi ab reiciendis non repellendus, commodi odio tenetur architecto minima nostrum quod, dolores suscipit?</td>
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
          </tbody>
        </table>
      </div>
    </section>
  );
}