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
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { ContactPage } from './pages/ContactPage';
import { AuthCallback } from './pages/AuthCallback';
import { ProfilePage } from './pages/ProfilePage';
import { CreateProjectPage } from './pages/CreateProjectPage';
import { ProjectsPage } from './pages/ProjectsPage';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
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
                  <Route path="/cookies" element={<CookiePolicyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Project Routes */}
                  <Route 
                    path="/projects" 
                    element={
                      <ProtectedRoute>
                        <ProjectsPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/projects/new" 
                    element={
                      <ProtectedRoute>
                        <CreateProjectPage />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Blog Routes - Now nested under projects with 'blogs' plural */}
                  <Route 
                    path="/projects/:projectSlug/blogs" 
                    element={
                      <ProtectedRoute>
                        <BlogList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/projects/:projectSlug/blogs/create" 
                    element={
                      <ProtectedRoute>
                        <CreateBlogPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/projects/:projectSlug/blogs/:id" 
                    element={
                      <ProtectedRoute>
                        <BlogViewPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/projects/:projectSlug/blogs/:id/edit" 
                    element={
                      <ProtectedRoute>
                        <UpdateBlogPage />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Project Settings Route */}
                  <Route 
                    path="/projects/:projectSlug/settings" 
                    element={
                      <ProtectedRoute>
                        <CreateProjectPage mode="edit" />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </MainLayout>
              <Toaster />
            </Router>
          </AuthProvider>
        </HelmetProvider>
      </main>
    </div>
  );
};

export default App;