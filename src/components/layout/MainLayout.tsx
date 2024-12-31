import React from 'react';
import { Layout } from 'antd';
import { Header } from './Header';
import { Footer } from './Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="flex-grow bg-gray-50">
        {children}
      </Content>
      <Footer />
    </Layout>
  );
} 