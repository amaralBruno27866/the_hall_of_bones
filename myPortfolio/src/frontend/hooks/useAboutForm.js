import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

// Custom hook to manage the About section form
export const useAboutForm = () => {
  // State to store about cards data
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages
  const [activeIcon, setActiveIcon] = useState(null); // State to manage the active icon for edit/delete
  const [showForm, setShowForm] = useState(false); // State to manage the visibility of the edit form
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to manage the visibility of the delete modal
  const [deleteId, setDeleteId] = useState(null); // State to store the ID of the card to be deleted
  const [newCard, setNewCard] = useState({ image: '', title: '', paragraph: '' }); // State to manage the new or edited card data
  const [editMode, setEditMode] = useState(false); // State to manage whether the form is in edit mode
  const [editId, setEditId] = useState(null); // State to store the ID of the card being edited

  // Function: handleIconClick
  // Objective: Handle clicks on edit or delete icons.
  // Functionality: Sets the active icon and either opens the edit form or delete modal based on the clicked icon.
  // Expected Result: The appropriate modal or form is displayed.
  const handleIconClick = (icon, id) => {
    setActiveIcon({ icon, id });
    if (icon === 'pencil') {
      const item = aboutData.find(item => item._id === id);
      setNewCard({ image: item.image, title: item.title, paragraph: item.paragraph });
      setEditMode(true);
      setEditId(id);
      setShowForm(true);
    } else if (icon === 'trash') {
      setDeleteId(id);
      setShowDeleteModal(true);
    }
  };

  // Function: handleInputChange
  // Objective: Update the state of the form fields as the user types.
  // Functionality: Updates the `newCard` state with the new value for the corresponding field.
  // Expected Result: The form fields reflect the user's input.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  // Function: handleSave
  // Objective: Save the new or edited card to the database.
  // Functionality: Sends a POST or PUT request to the API depending on whether the form is in edit mode.
  // Expected Result: The card is saved, and the UI is updated with the new data.
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const data = { ...newCard, session: 'about' };

    try {
      if (editMode) {
        const response = await axios.put(`/about/cards/${editId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAboutData(aboutData.map(item => (item._id === editId ? response.data : item)));
      } else {
        const response = await axios.post('/about/cards', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAboutData([...aboutData, response.data]);
      }
      handleCancel();
      handleRefresh();
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Error saving data');
    }
  };

  // Function: handleCancel
  // Objective: Close the form and reset its state.
  // Functionality: Resets the `newCard` state and hides the form.
  // Expected Result: The form is closed, and its fields are cleared.
  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setEditId(null);
    setNewCard({ image: '', title: '', paragraph: '' });
  };

  // Function: handleDelete
  // Objective: Delete a card from the database.
  // Functionality: Sends a DELETE request to the API and removes the card from the state.
  // Expected Result: The card is deleted, and the UI is updated.
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/about/cards/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAboutData(aboutData.filter(item => item._id !== deleteId));
      handleCancelDelete();
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Error deleting data');
    }
  };

  // Function: handleCancelDelete
  // Objective: Close the delete modal without deleting the card.
  // Functionality: Resets the `deleteId` state and hides the delete modal.
  // Expected Result: The delete modal is closed.
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Function: handleRefresh
  // Objective: Refresh the list of cards.
  // Functionality: Calls the `fetchData` function to reload the data from the API.
  // Expected Result: The latest data is displayed in the UI.
  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  // Function: fetchData
  // Objective: Fetch the list of about cards from the API.
  // Functionality: Sends a GET request to the API and updates the `aboutData` state.
  // Expected Result: The `aboutData` state contains the latest data from the API.
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/about/cards', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAboutData(response.data);
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