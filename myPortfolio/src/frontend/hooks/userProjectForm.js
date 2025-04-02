import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

// Custom hook to manage the Project section form
export const useProjectForm = () => {
  // State to store project cards data
  const [projectData, setProjectData] = useState([]);
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
    description: '',
    category: '',
    technologies: [],
    github: ''
  });
  // State to manage whether the form is in edit mode
  const [editMode, setEditMode] = useState(false);
  // State to store the ID of the card being edited
  const [editId, setEditId] = useState(null);

  /**
   * Objective: Handle icon clicks for edit or delete actions.
   * Functionality: Sets the active icon and manages the state for edit or delete actions.
   * Expected Result: Opens the edit form or delete modal based on the clicked icon.
   */
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

  /**
   * Objective: Handle input changes in the form.
   * Functionality: Updates the state with the new input values.
   * Expected Result: Reflects the updated input values in the form state.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  /**
   * Objective: Handle technology changes in the form.
   * Functionality: Updates the state with the new list of technologies.
   * Expected Result: Reflects the updated technologies in the form state.
   */
  const handleTechnologiesChange = (technologies) => {
    setNewCard({ ...newCard, technologies });
  };

  /**
   * Objective: Save the form data (new or edited card).
   * Functionality: Sends a POST or PUT request to save the data and updates the state.
   * Expected Result: Adds a new card or updates an existing card in the project data.
   */
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
        setProjectData(projectData.map(item => (item._id === editId ? response.data : item)));
      } else {
        const response = await axios.post('/projects', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjectData([...projectData, response.data]);
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

  /**
   * Objective: Cancel the form action.
   * Functionality: Resets the form state and hides the form.
   * Expected Result: Closes the form and clears the form state.
   */
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

  /**
   * Objective: Delete a card.
   * Functionality: Sends a DELETE request to remove the card and updates the state.
   * Expected Result: Removes the card from the project data.
   */
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

  /**
   * Objective: Cancel the delete action.
   * Functionality: Resets the delete state and hides the delete modal.
   * Expected Result: Closes the delete modal and clears the delete state.
   */
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  /**
   * Objective: Refresh the data.
   * Functionality: Sets the loading state and fetches the data again.
   * Expected Result: Updates the project data with the latest data from the API.
   */
  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  /**
   * Objective: Fetch data from the API.
   * Functionality: Sends a GET request to retrieve project data and updates the state.
   * Expected Result: Populates the project data state with the fetched data.
   */
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

  // Fetch data when the component mounts
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