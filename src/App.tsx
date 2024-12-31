import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { BlogList } from './components/BlogList';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;