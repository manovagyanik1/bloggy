import React from 'react';
import { Link } from 'react-router-dom';
import bloggyLogo from '/assets/bloggy-logo.svg';

export function Footer() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={bloggyLogo} alt="Bloggy Logo" className="w-6 h-6" />
              <h3 className="text-white font-bold">Bloggy</h3>
            </div>
            <p className="text-sm text-gray-400">Free AI-powered blog generator for everyone</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={handleClick} className="text-gray-400 hover:text-gray-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  onClick={handleClick}
                  className="text-gray-400 hover:text-gray-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={handleClick}
                  className="text-gray-400 hover:text-gray-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  onClick={handleClick}
                  className="text-gray-400 hover:text-gray-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  onClick={handleClick}
                  className="text-gray-400 hover:text-gray-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  onClick={handleClick}
                  className="text-gray-400 hover:text-gray-300"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Bloggy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
