import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;

export function Footer() {
  return (
    <AntFooter className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Bloggy</h3>
            <p className="text-sm">
              Free AI-powered blog generator for everyone
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Bloggy. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </AntFooter>
  );
} 