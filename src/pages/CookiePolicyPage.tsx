import React from 'react';

export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Cookie Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p>Last updated: March 21, 2024</p>
          
          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences and 
            how you use our site.
          </p>

          <h2>How we use cookies</h2>
          <p>We use cookies for:</p>
          <ul>
            <li>Authentication and security</li>
            <li>Remembering your preferences</li>
            <li>Analytics and performance monitoring</li>
            <li>Providing our core blog generation functionality</li>
          </ul>

          <h2>Types of cookies we use</h2>
          <h3>Essential cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core 
            functionality such as security, network management, and accessibility. You may disable 
            these by changing your browser settings, but this may affect how the website functions.
          </p>

          <h3>Analytics cookies</h3>
          <p>
            We use analytics cookies to understand how visitors interact with our website, helping 
            us improve our services. All information these cookies collect is aggregated and 
            therefore anonymous.
          </p>

          <h2>Managing cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. 
            However, if you limit the ability of websites to set cookies, you may impact your 
            overall user experience.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at{' '}
            <a href="mailto:contact@bloggy.live" className="text-indigo-400 hover:text-indigo-300">
              contact@bloggy.live
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 