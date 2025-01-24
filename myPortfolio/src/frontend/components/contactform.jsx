import React from 'react';
import styles from '../../styles/contactform.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import image from '../../assets/images/programmer.png';

export function ContactForm() {
  return (
    <section className={styles.contactform}>
      <header >
        <h1>Contact Me</h1>
      </header>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your Name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Your Email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="tel" className="form-control" id="phone" placeholder="Your Phone Number" required />
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input type="text" className="form-control" id="subject" placeholder="Subject" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="5" maxLength="2000" placeholder="Your Message" required></textarea>
            <div className="form-text">Maximum 2000 characters</div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>      
        <img src={image} alt="" />
      </div>
      <hr />
    </section>
  );
}