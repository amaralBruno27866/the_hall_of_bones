import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

// Custom hook to manage the About section form
export const useAboutForm = () => {
  // State to store about cards data
  const [aboutData, setAboutData] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage error messages
  const [error, setError] = useState(null);
  // State to manage the active icon for edit/delete
  const [activeIcon, setActiveIcon] = useState(null);
  // State to manage the visibility of the edit form
  const [showForm, setShowForm] = useState(false);
  // State to manage the visibility of the delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // State to store the ID of the card to be deleted
  const [deleteId, setDeleteId] = useState(null);
  // State to manage the new or edited card data
  const [newCard, setNewCard] = useState({
    image: '',
    title: '',
    paragraph: ''
  });
  // State to manage whether the form is in edit mode
  const [editMode, setEditMode] = useState(false);
  // State to store the ID of the card being edited
  const [editId, setEditId] = useState(null);

  // Function to handle icon clicks (edit/delete)
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

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  // Function to handle saving the form data
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const data = {
      image: newCard.image,
      title: newCard.title,
      paragraph: newCard.paragraph,
      session: 'about'
    };

    try {
      if (editMode) {
        const response = await axios.put(`/about/cards/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAboutData(aboutData.map(item => (item._id === editId ? response.data : item))); // Atualizar o estado com o novo dado
      } else {
        const response = await axios.post('/about/cards', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAboutData([...aboutData, response.data]);
        handleRefresh();
      }
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      setNewCard({
        image: '',
        title: '',
        paragraph: ''
      });
      handleRefresh();
    } catch (error) {
      console.error('There was an error saving the data!', error);
      setError('Error saving data');
    }
  };

  // Function to handle canceling the form
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

  // Function to handle deleting a card
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

  // Function to handle canceling the delete action
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Function to handle refreshing the data
  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  // Function to fetch data from the API
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

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

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