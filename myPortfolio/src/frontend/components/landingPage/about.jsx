import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import styles from '../../styles/about.module.css';
import loading from '../../../assets/images/loading.gif';

// About component to display information about the site or user
export function About() {
  // State to store the about data
  const [aboutData, setAboutData] = useState([]);
  // State to manage the loading state
  const [loading, setLoading] = useState(true);
  // State to manage any errors
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the about data from the API
        const response = await axios.get('/about/cards');
        // Set the about data to the state
        setAboutData(response.data);
        // Set loading to false after data is fetched
        setLoading(false);
      } catch (error) {
        // Log any errors to the console
        console.error('There was an error fetching the data!', error);
        // Set the error state
        setError('Error fetching data');
        // Set loading to false if there is an error
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  // Display a loading message while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display an error message if there is an error
  if (error) {
    return <p>{error}</p>;
  }

  // Render the about section with the fetched data
  return (
    <section className={styles.about}>
      <hr />
      <header>
        <h1>About</h1>
      </header>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {aboutData.map((item) => (
            <div className="col" key={item._id}>
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.paragraph}</p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}