import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Title level={1}>Privacy Policy</Title>
      <div className="max-w-3xl">
        <Paragraph>Last updated: March 2024</Paragraph>
        <Title level={2} className="mt-8">1. Information We Collect</Title>
        <Paragraph>
          We collect information that you provide directly to us, including when you:
        </Paragraph>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create an account</li>
          <li>Upload screen recordings</li>
          <li>Share content</li>
          <li>Contact our support team</li>
        </ul>

        <Title level={2} className="mt-8">2. How We Use Your Information</Title>
        <Paragraph>
          We use the information we collect to provide, maintain, and improve our services.
        </Paragraph>

        {/* Add more sections as needed */}
      </div>
    </div>
  );
} 