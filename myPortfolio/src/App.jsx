import React from 'react';

import { Navbar } from './frontend/components/navbar';
import { Home } from './frontend/components/home';

export function App() {
  return (
    <div className="container">
      <Navbar />
      <Home />
    </div>
  );
}