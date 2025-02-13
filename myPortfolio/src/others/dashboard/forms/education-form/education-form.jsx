import React, { useState, useEffect } from 'react';
import styles from './education-form.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BsFillPencilFill, BsFillTrashFill, BsCloudUploadFill, BsArrowRepeat } from "react-icons/bs";
import axios from '../../../../config/axiosConfig';
import { set } from 'mongoose';

export function EducationForm() {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [newCard, setNewCard] = useState({
    institution: '',
    image: '',
    url: '',
    field: '',
    degree: '',
    period: {
      start_month: '',
      start_year: '',
      end_month: '',
      end_year: ''
    },
    address: {
      number: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    skills: []
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleIconClick = (icon, id) => {
    setActiveIcon({ icon, id });
    if (icon === 'pencil') {
      const item = educationData.find(item => item._id === id);
      setNewCard({
        institution: item.institution,
        image: item.image,
        url: item.url,
        field: item.field,
        degree: item.degree,
        period: {
          start_month: item.period.start_month,
          start_year: item.period.start_year,
          end_month: item.period.end_month,
          end_year: item.period.end_year
        },
        address: {
          number: item.address.number,
          street: item.address.street,
          city: item.address.city,
          state: item.address.state,
          zip: item.address.zip,
          country: item.address.country
        },
        skills: item.skills
      });
      setEditMode(true);
      setEditId(id);
      setShowForm(true);
    } else if (icon === 'trash') {
      setDeleteId(id);
      setShowDeleteModal(true);
    }
  }

  const handleDocumentClick = (event) => {
    if (!event.target.closest(`.${styles.icon}`)) {
      setActiveIcon(null);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/education', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data)) {
        setEducationData(response.data);
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
        const response = await axios.put (`/education/${editId}`, newCard, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEducationData(educationData.map(item => item._id === editId ? response.data : item));
      } else {
        const response = await axios.post('/education', newCard, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEducationData([...educationData, response.data]);
      }
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      setNewCard({
        institution: '',
        image: '',
        url: '',
        field: '',
        degree: '',
        period: {
          start_month: '',
          start_year: '',
          end_month: '',
          end_year: ''
        },
        address: {
          number: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          country: ''
        },
        skills: []
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
      institution: '',
      image: '',
      url: '',
      field: '',
      degree: '',
      period: {
        start_month: '',
        start_year: '',
        end_month: '',
        end_year: ''
      },
      address: {
        number: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      skills: []
    });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/education/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEducationData(educationData.filter(item => item._id !== deleteId));
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return(
    <section>
      <header>
        <h2>Educations Section Form</h2>
      </header>
    </section>
  )
}