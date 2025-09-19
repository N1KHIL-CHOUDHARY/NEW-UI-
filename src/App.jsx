import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DocumentsPage from './pages/DoucmentsPage';
import Profile from './pages/profile';

const App = () => {
  return (
    <Routes>

      <Route element={<PageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="documents" element={<DocumentsPage/>} />
        <Route path="profile" element={<Profile/>} />
      </Route>

      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      

    </Routes>
  );
};

export default App;