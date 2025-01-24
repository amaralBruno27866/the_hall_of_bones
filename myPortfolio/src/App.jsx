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
      <div class="copyright">
        Copyright &copy; 2025 Bruno Alencar Amaral. All Rights Reserved.
        <a href="#"> <BsDoorClosedFill size={30}/> </a>
      </div>
    </div>
  );
}