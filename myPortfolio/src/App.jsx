import React from 'react';
import { Navbar } from './frontend/components/navbar';
import { Home } from './frontend/components/home';
import { About } from './frontend/components/about';
import { Education } from './frontend/components/education';

export function App() {
  return (
    <div className="container">
      <Navbar />
      <Home />
      <About />
      <Education />
    </div>
  );
}