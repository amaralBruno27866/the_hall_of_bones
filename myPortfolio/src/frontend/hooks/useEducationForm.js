import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

// Custom hook to manage the Education section form
export const useEducationForm = () => {
  // State to store education cards data
  const [educationData, setEducationData] = useState([]);
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
  // State to manage whether the form is in edit mode
  const [editMode, setEditMode] = useState(false);
  // State to store the ID of the card being edited
  const [editId, setEditId] = useState(null);

  // Function to handle icon clicks (edit/delete)
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

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');
    if (child) {
      setNewCard({ ...newCard, [parent]: { ...newCard[parent], [child]: value } });
    } else {
      setNewCard({ ...newCard, [name]: value });
    }
  };

  // Function to handle skill changes in the form
  const handleSkillChange = (skills) => {
    setNewCard({ ...newCard, skills });
  };

  // Function to handle saving the form data
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

  // Function to handle canceling the form
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

  // Function to handle deleting a card
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

  // Fetch data when the component mounts
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