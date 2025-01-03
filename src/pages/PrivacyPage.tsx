import React from 'react';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none">
          <p>Last updated: March 21, 2024</p>

          <h2>Introduction</h2>
          <p>
            At Bloggy, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our website and services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Information you provide to us:</h3>
          <ul>
            <li>Account information (name, email, password)</li>
            <li>Blog content and metadata</li>
            <li>Payment information</li>
            <li>Communication preferences</li>
          </ul>

          <h3>Information automatically collected:</h3>
          <ul>
            <li>Device and browser information</li>
            <li>Usage data and analytics</li>
            <li>IP address and location data</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Improve and personalize user experience</li>
            <li>Process payments and prevent fraud</li>
            <li>Send administrative information</li>
            <li>Respond to customer service requests</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your
            personal information. However, no method of transmission over the Internet is 100%
            secure.
          </p>

          <h2>Third-Party Services</h2>
          <p>We may use third-party services for:</p>
          <ul>
            <li>Analytics (Google Analytics)</li>
            <li>Payment processing (Stripe)</li>
            <li>Authentication (Google Sign-In)</li>
            <li>Cloud infrastructure (Supabase)</li>
          </ul>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            For any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:contact@bloggy.live" className="text-indigo-400 hover:text-indigo-300">
              contact@bloggy.live
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
