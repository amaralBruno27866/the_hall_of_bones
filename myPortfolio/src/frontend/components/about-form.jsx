import React, { useState, useEffect } from 'react';
import styles from '../styles/about-form.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsFillPencilFill, BsFillTrashFill, BsCloudUploadFill, BsArrowRepeat } from "react-icons/bs";
import axios from '../../config/axiosConfig';

export function AboutForm() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [newCard, setNewCard] = useState({
    image: '',
    title: '',
    paragraph: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleIconClick = (icon, id) => {
    setActiveIcon({ icon, id });
    if (icon === 'pencil') {
      const item = aboutData.find(item => item._id === id);
      setNewCard({
        image: item.image,
        title: item.title,
        paragraph: item.paragraph
      });
      setEditMode(true);
      setEditId(id);
      setShowForm(true);
    } else if (icon === 'trash') {
      setDeleteId(id);
      setShowDeleteModal(true);
    }
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

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/about/cards', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data)) {
        setAboutData(response.data);
      } else {
        console.error('Response data is not an array:', response.data);
        setError('Unexpected response format');
      }
      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      if (editMode) {
        const response = await axios.put(`/about/cards/${editId}`, newCard, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAboutData(aboutData.map(item => (item._id === editId ? response.data : item)));
      } else {
        const response = await axios.post('/about/cards', newCard, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAboutData([...aboutData, response.data]);
      }
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      setNewCard({
        image: '',
        title: '',
        paragraph: ''
      });
    } catch (error) {
      console.error('There was an error saving the data!', error);
      setError('Error saving data');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setEditId(null);
    setNewCard({
      image: '',
      title: '',
      paragraph: ''
    });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/about/cards/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAboutData(aboutData.filter(item => item._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error('There was an error deleting the data!', error);
      setError('Error deleting data');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.aboutForm}>
      <header className={styles.header}>
        <BsArrowRepeat size={30} className={styles.refreshIcon} onClick={handleRefresh} />
        <h2>About Section Form</h2>
        <button onClick={() => setShowForm(true)}>Add a new content</button>
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
      {showForm && (
        <div className={styles.overlay}>
          <div className={styles.formContainer}>
            <h2>{editMode ? 'Edit Content' : 'Add New Content'}</h2>
            <form>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={newCard.image}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={newCard.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Paragraph</label>
                <textarea
                  className="form-control"
                  name="paragraph"
                  value={newCard.paragraph}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="button" className={`${styles.btn} ${styles['btn-danger']}`} onClick={handleSave}>Save</button>
                <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <header className={styles.modalHeader}>
              <h2>Delete About Card</h2>
            </header>
            <p>Are you sure that you want to delete this card?</p>
            <div className={styles.buttonGroup}>
              <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} onClick={handleDelete}>YES</button>
              <button type="button" className={`${styles.btn} ${styles['btn-danger']}`} onClick={handleCancelDelete}>NO</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}