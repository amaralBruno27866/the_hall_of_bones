import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

export const useEducationForm = () => {
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
      end_year: '',
    },
    address: {
      number: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    skills: [],
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
          end_year: item.period.end_year,
        },
        address: {
          number: item.address.number,
          street: item.address.street,
          city: item.address.city,
          state: item.address.state,
          zip: item.address.zip,
          country: item.address.country,
        },
        skills: item.skills,
      });
      setEditMode(true);
      setEditId(id);
      setShowForm(true);
    } else if (icon === 'trash') {
      setDeleteId(id);
      setShowDeleteModal(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');
    if (child) {
      setNewCard({ ...newCard, [parent]: { ...newCard[parent], [child]: value } });
    } else {
      setNewCard({ ...newCard, [name]: value });
    }
  };

  const handleSkillChange = (skills) => {
    setNewCard({ ...newCard, skills });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const data = {
      institution: newCard.institution,
      image: newCard.image,
      url: newCard.url,
      field: newCard.field,
      degree: newCard.degree,
      period: {
        start_month: newCard.period.start_month,
        start_year: newCard.period.start_year,
        end_month: newCard.period.end_month,
        end_year: newCard.period.end_year,
      },
      address: {
        number: newCard.address.number,
        street: newCard.address.street,
        city: newCard.address.city,
        state: newCard.address.state,
        zip: newCard.address.zip,
        country: newCard.address.country,
      },
      skills: newCard.skills,
    };

    try {
      if (editMode) {
        const response = await axios.put(`/educations/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEducationData(educationData.map(item => (item._id === editId ? response.data : item)));
      } else {
        const response = await axios.post('/educations', data, {
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
          end_year: '',
        },
        address: {
          number: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          country: '',
        },
        skills: [],
      });
      handleRefresh();
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
        end_year: '',
      },
      address: {
        number: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      },
      skills: [],
    });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/educations/${deleteId}`, {
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

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/educations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data)) {
        setEducationData(response.data);
      } else {
        setEducationData([]);
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

  return {
    educationData,
    loading,
    error,
    activeIcon,
    showForm,
    showDeleteModal,
    newCard,
    editMode,
    handleIconClick,
    handleInputChange,
    handleSkillChange,
    handleSave,
    handleCancel,
    handleDelete,
    handleCancelDelete,
    handleRefresh,
    setShowForm,
  };
};