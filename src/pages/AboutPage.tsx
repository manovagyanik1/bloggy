import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Title level={1}>About Clipy</Title>
      <div className="max-w-3xl">
        <Paragraph>
          Clipy is a cloud-powered screen recording platform that simplifies professional screen recording, 
          cloud storage, and instant sharing.
        </Paragraph>
        <Paragraph>
          Our mission is to make screen recording and sharing as seamless as possible, helping professionals 
          communicate more effectively through visual content.
        </Paragraph>
        <Title level={2} className="mt-8">Our Features</Title>
        <ul className="list-disc pl-6 space-y-4">
          <li>Professional screen recording with advanced capture options</li>
          <li>Secure cloud storage for all your recordings</li>
          <li>Instant sharing capabilities with customizable privacy settings</li>
          <li>Team collaboration tools</li>
        </ul>
      </div>
    </div>
  );
} 