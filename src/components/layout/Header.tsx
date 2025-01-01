import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signInWithGoogle, signOut } from '../../lib/auth/supabase';
import { Spin } from 'antd';

export function Header() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const menuItems = [
    { key: '/blog', label: 'Blog' },
    { key: '/create', label: 'Create' },
    { key: '/about', label: 'About' },
  ];

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
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-400">
              Bloggy
            </Link>
            {user && (
              <div className="ml-10 space-x-8">
                {menuItems.map(item => (
                  <Link
                    key={item.key}
                    to={item.key}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === item.key
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="ml-10 space-x-4">
            {isLoading ? (
              <Spin size="small" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-300">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 