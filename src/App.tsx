import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/layout/MainLayout';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Page imports
import { HomePage } from './pages/HomePage';
import { BlogList } from './components/BlogList';
import { BlogViewPage } from './pages/BlogViewPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CreateBlogPage } from './pages/CreateBlogPage';
import { UpdateBlogPage } from './pages/UpdateBlogPage';

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <MainLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/create" 
                element={
                  <ProtectedRoute>
                    <CreateBlogPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit/:id" 
                element={
                  <ProtectedRoute>
                    <UpdateBlogPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/blog" 
                element={
                  <ProtectedRoute>
                    <BlogList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/blog/:id" 
                element={
                  <ProtectedRoute>
                    <BlogViewPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </MainLayout>
          <Toaster 
            position="bottom-center"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;