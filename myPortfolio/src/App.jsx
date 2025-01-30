import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Navbar } from './frontend/components/navbar';
import { Home } from './frontend/components/home';
import { About } from './frontend/components/about';
import { Education } from './frontend/components/education';
import { WorkExperience } from './frontend/components/workExperience';
import { Projects } from './frontend/components/projects';
import { ContactForm } from './frontend/components/contactform';
import { Footer } from './frontend/components/footer';
import { Login } from './others/login/login.jsx'; // Adicione esta linha
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
        <Link to="/login"> <BsDoorClosedFill size={30}/> </Link>
      </div>
    </div>
  );
}