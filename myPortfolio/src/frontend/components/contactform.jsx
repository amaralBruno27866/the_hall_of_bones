import React, { useState } from 'react';
import axiosInstance from '../../config/axiosConfig.js';
import styles from '../../styles/contactform.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import form from '../../assets/images/form.gif';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 3 || value.length > 50) return 'Name must be between 3 and 50 characters';
        break;
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        break;
      case 'phone':
        if (!value) return 'Phone is required';
        if (!/^\d{10,15}$/.test(value)) return 'Phone must be between 10 and 15 digits';
        break;
      case 'subject':
        if (!value) return 'Subject is required';
        if (value.length < 3 || value.length > 100) return 'Subject must be between 3 and 100 characters';
        break;
      case 'message':
        if (!value) return 'Message is required';
        if (value.length > 2000) return 'Message must be less than 2000 characters';
        break;
      default:
        return null;
    }
  };

  const validate = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });
    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axiosInstance.post('/contacts', formData);
        if (response.status === 201) {
          setSubmitSuccess(true);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        }
      } catch (error) {
        console.error('Error submitting the form', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className={styles.contactform}>
      <header>
        <h1>Contact Me</h1>
      </header>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              type="text"
              className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
              id="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              className={`form-control ${errors.message ? 'is-invalid' : ''}`}
              id="message"
              rows="5"
              maxLength="2000"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            <div className="form-text">Maximum 2000 characters</div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          {submitSuccess && <div className="alert alert-success mt-3">Form submitted successfully!</div>}
        </form>
        <img src={form} alt="" className={styles.img} />
      </div>
      <hr />
    </section>
  );
}