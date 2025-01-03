import React from 'react';
import { Typography } from 'antd';
import { BookOpen, Shield, FileText, AlertCircle } from 'lucide-react';

const { Title, Paragraph } = Typography;

export function TermsPage() {
  const sections = [
    {
      icon: <Shield className="h-8 w-8 text-indigo-400" />,
      title: 'Usage Guidelines',
      content:
        'When using our blog generation service, you agree to respect intellectual property rights, not generate harmful or malicious content, and take full responsibility for the content you generate and publish.',
    },
    {
      icon: <FileText className="h-8 w-8 text-indigo-400" />,
      title: 'Content Policy',
      content:
        "You retain all rights to your generated blog content. However, you must ensure your content doesn't violate any laws or third-party rights. We reserve the right to terminate accounts that violate these terms.",
    },
    {
      icon: <AlertCircle className="h-8 w-8 text-indigo-400" />,
      title: 'AI Generation Disclaimer',
      content:
        'Our AI-generated content is provided "as is" without warranties. While we strive for quality, you are responsible for reviewing and editing the generated content before publication.',
    },
    {
      icon: <BookOpen className="h-8 w-8 text-indigo-400" />,
      title: 'Legal Compliance',
      content:
        'You agree to comply with all applicable laws and regulations when using our service. Any disputes will be resolved under applicable laws.',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Title level={1}>Terms of Service</Title>
            <Paragraph className="text-xl text-gray-600">
              Please read these terms carefully before using Bloggy.
            </Paragraph>
          </div>

          <div className="grid gap-8 mb-16">
            {sections.map((section, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {section.icon}
                  <Title level={2} className="ml-4 !mb-0">
                    {section.title}
                  </Title>
                </div>
                <Paragraph className="text-gray-600 text-lg">{section.content}</Paragraph>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            <div>
              <Title level={2}>Account Terms</Title>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>You must provide accurate information when creating an account</li>
                <li>You're responsible for maintaining account security</li>
                <li>Accounts cannot be shared between multiple users</li>
                <li>We reserve the right to suspend accounts for violations</li>
              </ul>
            </div>

            <div>
              <Title level={2}>Service Modifications</Title>
              <Paragraph className="text-gray-600">
                We reserve the right to modify or discontinue any part of our service with or
                without notice. We shall not be liable to you or any third party for any
                modification, suspension, or discontinuance of the service.
              </Paragraph>
            </div>

            <div>
              <Title level={2}>Contact</Title>
              <Paragraph className="text-gray-600">
                Questions about these Terms should be sent to{' '}
                <a href="mailto:legal@bloggy.ai" className="text-indigo-600 hover:text-indigo-500">
                  legal@bloggy.ai
                </a>
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
