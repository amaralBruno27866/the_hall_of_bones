import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

export const useAboutForm = () => {
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
    if (!event.target.closest('.icon')) {
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

  return {
    aboutData,
    loading,
    error,
    activeIcon,
    showForm,
    showDeleteModal,
    newCard,
    editMode,
    handleIconClick,
    handleInputChange,
    handleSave,
    handleCancel,
    handleDelete,
    handleCancelDelete,
    handleRefresh,
    setShowForm,
  };
};