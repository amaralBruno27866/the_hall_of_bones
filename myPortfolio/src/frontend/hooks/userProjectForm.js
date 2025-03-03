import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

export const useProjectForm = () => {
  const [projectData, setProjectData] = useState([]); // Inicializando como um array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [newCard, setNewCard] = useState({
    image: '',
    title: '',
    description: '',
    category: '',
    technologies: [],
    github: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleIconClick = (icon, id) => {
    setActiveIcon({ icon, id });
    if (icon === 'pencil') {
      const item = projectData.find(item => item._id === id);
      setNewCard({
        image: item.image,
        title: item.title,
        description: item.description,
        category: item.category,
        technologies: item.technologies,
        github: item.github
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
    setNewCard({ ...newCard, [name]: value });
  };

  const handleTechnologiesChange = (technologies) => {
    setNewCard({ ...newCard, technologies });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const data = {
      image: newCard.image,
      title: newCard.title,
      description: newCard.description,
      category: newCard.category,
      technologies: newCard.technologies,
      github: newCard.github
    };

    try {
      if (editMode) {
        const response = await axios.put(`/projects/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        const response = await axios.post('/projects', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      setNewCard({
        image: '',
        title: '',
        description: '',
        category: '',
        technologies: [],
        github: ''
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
      image: '',
      title: '',
      description: '',
      category: '',
      technologies: [],
      github: ''
    });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/projects/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjectData(projectData.filter(item => item._id !== deleteId));
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
      const response = await axios.get('/projects', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (Array.isArray(response.data)) {
        setProjectData(response.data);
      } else {
        setProjectData([]);
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
    projectData,
    loading,
    error,
    activeIcon,
    showForm,
    showDeleteModal,
    newCard,
    editMode,
    handleIconClick,
    handleInputChange,
    handleTechnologiesChange,
    handleSave,
    handleCancel,
    handleDelete,
    handleCancelDelete,
    handleRefresh,
    setShowForm,
  };
};