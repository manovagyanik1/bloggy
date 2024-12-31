import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Title level={1}>About Bloggy</Title>
      <div className="max-w-3xl">
        <Paragraph>
          Bloggy is a free AI-powered blog generator that helps you create engaging, 
          SEO-optimized content in minutes. Whether you're a content creator, marketer, 
          or business owner, Bloggy streamlines your content creation process.
        </Paragraph>
        <Paragraph>
          Our mission is to democratize content creation by making professional blog writing 
          accessible to everyone through the power of artificial intelligence.
        </Paragraph>
        <Title level={2} className="mt-8">Our Features</Title>
        <ul className="list-disc pl-6 space-y-4">
          <li>AI-powered blog generation with customizable themes</li>
          <li>SEO optimization tools and metadata management</li>
          <li>Rich text editor with collaborative features</li>
          <li>Multiple AI providers support (OpenAI/Claude)</li>
          <li>Free to use for everyone</li>
        </ul>
      </div>
    </div>
  );
} 