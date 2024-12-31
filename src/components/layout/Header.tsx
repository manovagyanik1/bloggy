import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

export function Header() {
  const location = useLocation();

  const menuItems = [
    { key: '/', label: 'Home' },
    { key: '/blog', label: 'Blog' },
    { key: '/about', label: 'About' },
  ];

  return (
    <AntHeader className="bg-white shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="Bloggy Logo"
            className="h-8 w-auto"
          />
          <span className="ml-2 text-xl font-bold text-gray-800">
            Bloggy
          </span>
        </Link>

        <Menu 
          mode="horizontal" 
          selectedKeys={[location.pathname]}
          className="border-0"
        >
          {menuItems.map(item => (
            <Menu.Item key={item.key}>
              <Link to={item.key}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </AntHeader>
  );
} 