import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import styles from '../../styles/about.module.css';
import loading from '../../../assets/images/loading.gif';

export function About() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/about/cards');
        setAboutData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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