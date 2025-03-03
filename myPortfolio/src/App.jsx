import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Navbar } from './frontend/components/landingPage/navbar.jsx';
import { Home } from './frontend/components/landingPage/home';
import { About } from './frontend/components/landingPage/about';
import { Education } from './frontend/components/landingPage/education';
import { WorkExperience } from './frontend/components/landingPage/workExperience';
import { Projects } from './frontend/components/landingPage/projects';
import { ContactForm } from './frontend/components/landingPage/contactform';
import { Footer } from './frontend/components/landingPage/footer';
import { Login } from './frontend/components/landingPage/login.jsx';
import { BsDoorClosedFill } from "react-icons/bs";
import styles from './app.module.css';

export function App() {
  return (
    <div className="container">
      <Navbar />
      <Home />
      <About />
      <Education />
      <WorkExperience />
      <Projects />
      <ContactForm />
      <Footer />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className={styles.copyright}>
        Copyright &copy; 2025 Bruno Alencar Amaral. All Rights Reserved.
        <Link to="/login"> <BsDoorClosedFill size={20}/> </Link>
      </div>
    </div>
  );
}