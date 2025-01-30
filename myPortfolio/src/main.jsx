import './styles/custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App.jsx';
import { Login } from './others/login/login.jsx';
import { Dashboard } from './others/dashboard/dashboard.jsx';
import '../src/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
);