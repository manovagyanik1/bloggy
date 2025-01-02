import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signInWithGoogle, signOut } from '../../lib/auth/supabase';
import { Button, Drawer, Spin, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import bloggyLogo from '/bloggy-logo.svg';

export function Header() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if we're in a project context
  const projectMatch = location.pathname.match(/^\/projects\/([^\/]+)/);
  const currentProject = projectMatch ? projectMatch[1] : null;

  const getMenuItems = () => {
    if (currentProject) {
      return [
        { key: `/projects/${currentProject}/blogs`, label: 'Blogs' },
        { key: `/projects/${currentProject}/blogs/create`, label: 'Create Blog' },
        { key: `/projects/${currentProject}/settings`, label: 'Project Settings' },
      ];
    }
    return [
      { key: '/projects', label: 'Projects' },
      { key: '/projects/new', label: 'Create Project' },
    ];
  };

  const menuItems = getMenuItems();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderMenuItems = () => (
    <>
      {user && menuItems.map(item => (
        <Link
          key={item.key}
          to={item.key}
          className={`text-sm font-medium transition-colors ${
            location.pathname === item.key
              ? 'text-white'
              : 'text-gray-300 hover:text-white'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      ))}
      {user && (
        <Link 
          to="/profile"
          className="text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(false)}
        >
          Profile
        </Link>
      )}
    </>
  );

  const renderAuthButton = () => {
    if (isLoading) return <Spin size="small" />;
    
    if (user) {
      return (
        <div className="flex items-center gap-4">
          <span className="text-gray-300 hidden md:inline">
            {user.email}
          </span>
          <Button
            onClick={handleLogout}
            type="primary"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Sign Out
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={handleLogin}
        type="primary"
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        Sign In with Google
      </Button>
    );
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={bloggyLogo} alt="Bloggy Logo" className="w-8 h-8" />
            <span className="text-xl font-semibold">Bloggy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {renderMenuItems()}
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden md:block">
            {renderAuthButton()}
          </div>

          {/* Mobile Menu Button */}
          <Button
            icon={<MenuOutlined />}
            type="text"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <img src={bloggyLogo} alt="Bloggy Logo" className="w-6 h-6" />
            <span>Menu</span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="bg-gray-900"
        styles={{
          header: {
            background: '#111827',
            borderBottom: '1px solid #374151',
          },
          body: {
            background: '#111827',
            padding: 0,
          },
        }}
      >
        <div className="flex flex-col space-y-4 p-4">
          {user && (
            <div className="text-gray-300 pb-4 border-b border-gray-700">
              {user.email}
            </div>
          )}
          <div className="flex flex-col space-y-4">
            {renderMenuItems()}
          </div>
          <div className="pt-4 border-t border-gray-700">
            {renderAuthButton()}
          </div>
        </div>
      </Drawer>
    </header>
  );
} 