import React from 'react';
import { Navbar } from './frontend/components/navbar';
import { Home } from './frontend/components/home';
import { About } from './frontend/components/about';
import { Education } from './frontend/components/education';
import { WorkExperience } from './frontend/components/workExperience';
import { Projects } from './frontend/components/projects';
import { ContactForm } from './frontend/components/contactform';
import { Footer } from './frontend/components/footer';
import { BsDoorClosedFill } from "react-icons/bs";
import styles from './app.module.css';

export function App() {
  return (
    <div className="container">
      <Navbar className={styles.navbar}/>
      <Home className={styles.home}/>
      <About className={styles.about}/>
      <Education className={styles.education}/>
      <WorkExperience className={styles.work}/>
      <Projects className={styles.projects}/>
      <ContactForm className={styles.contat}/>
      <Footer className={styles.footer}/>
      <div className={styles.copyright}>
        Copyright &copy; 2025 Bruno Alencar Amaral. All Rights Reserved.
        <a href="#"> <BsDoorClosedFill size={30}/> </a>
      </div>
    </div>
  );
}