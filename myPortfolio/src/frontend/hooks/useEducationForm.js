import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

/**
 * Custom hook to manage the Education section form.
 * Provides state and functions to handle education data, form visibility, and API interactions.
 */
export const useEducationForm = () => {
  const [educationData, setEducationData] = useState([]); // State to store education cards data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages
  const [activeIcon, setActiveIcon] = useState(null); // State to manage the active icon for edit/delete
  const [showForm, setShowForm] = useState(false); // State to manage the visibility of the edit form
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to manage the visibility of the delete modal
  const [deleteId, setDeleteId] = useState(null); // State to store the ID of the card to be deleted
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
  }); // State to manage the new or edited card data
  const [editMode, setEditMode] = useState(false); // State to manage whether the form is in edit mode
  const [editId, setEditId] = useState(null); // State to store the ID of the card being edited

  /**
   * Objective: Handle clicks on edit or delete icons.
   * Functionality: Sets the active icon and either opens the edit form or delete modal based on the clicked icon.
   * Expected Result: The appropriate modal or form is displayed.
   */
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
        period: item.period,
        address: item.address,
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

  /**
   * Objective: Update the state of the form fields as the user types.
   * Functionality: Updates the `newCard` state with the new value for the corresponding field.
   * Expected Result: The form fields reflect the user's input.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');
    if (child) {
      setNewCard({ ...newCard, [parent]: { ...newCard[parent], [child]: value } });
    } else {
      setNewCard({ ...newCard, [name]: value });
    }
  };

  /**
   * Objective: Update the skills array in the form.
   * Functionality: Updates the `skills` field in the `newCard` state.
   * Expected Result: The skills array reflects the user's changes.
   */
  const handleSkillChange = (skills) => {
    setNewCard({ ...newCard, skills });
  };

  /**
   * Objective: Save the new or edited card to the database.
   * Functionality: Sends a POST or PUT request to the API depending on whether the form is in edit mode.
   * Expected Result: The card is saved, and the UI is updated with the new data.
   */
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      if (editMode) {
        const response = await axios.put(`/educations/${editId}`, newCard, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEducationData(educationData.map(item => (item._id === editId ? response.data : item)));
      } else {
        const response = await axios.post('/educations', newCard, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEducationData([...educationData, response.data]);
      }
      handleCancel();
      handleRefresh();
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Error saving data');
    }
  };

  /**
   * Objective: Close the form and reset its state.
   * Functionality: Resets the `newCard` state and hides the form.
   * Expected Result: The form is closed, and its fields are cleared.
   */
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

  /**
   * Objective: Delete a card from the database.
   * Functionality: Sends a DELETE request to the API and removes the card from the state.
   * Expected Result: The card is deleted, and the UI is updated.
   */
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/educations/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEducationData(educationData.filter(item => item._id !== deleteId));
      handleCancelDelete();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Error deleting data');
    }
  };

  /**
   * Objective: Close the delete modal without deleting the card.
   * Functionality: Resets the `deleteId` state and hides the delete modal.
   * Expected Result: The delete modal is closed.
   */
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  /**
   * Objective: Refresh the list of cards.
   * Functionality: Calls the `fetchData` function to reload the data from the API.
   * Expected Result: The latest data is displayed in the UI.
   */
  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  /**
   * Objective: Fetch the list of education cards from the API.
   * Functionality: Sends a GET request to the API and updates the `educationData` state.
   * Expected Result: The `educationData` state contains the latest data from the API.
   */
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/educations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEducationData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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