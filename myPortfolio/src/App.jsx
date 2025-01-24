import React from 'react';
import { Navbar } from './frontend/components/navbar';
import { Home } from './frontend/components/home';
import { About } from './frontend/components/about';
import { Education } from './frontend/components/education';
import { WorkExperience } from './frontend/components/workExperience';
import { Projects } from './frontend/components/projects';

export function App() {
  return (
    <div className="container">
      <Navbar />
      <Home />
      <About />
      <Education />
      <WorkExperience />
      <Projects />
    </div>
  );
}