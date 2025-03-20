import './frontend/styles/custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App.jsx';
import { Login } from './frontend/components/landingPage/login.jsx';
import { Dashboard } from './frontend/components/landingPage/dashboard.jsx';
import '../src/global.css';

// Create the root element and render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Define the main route to render the App component */}
        <Route path="/" element={<App />} />
        {/* Define the login route to render the Login component */}
        <Route path="/login" element={<Login />} />
        {/* Define the dashboard route to render the Dashboard component */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </StrictMode>,
);