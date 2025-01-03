import { MailIcon } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-300">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MailIcon className="h-6 w-6 text-indigo-400 mr-3" />
                <a href="mailto:contact@bloggy.live" className="text-gray-300 hover:text-white">
                  contact@bloggy.live
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Support Hours</h2>
            <div className="text-gray-300">
              <p>Monday - Friday</p>
              <p>9:00 AM - 5:00 PM EST</p>
              <p className="mt-4">
                We aim to respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">How do I get started?</h3>
              <p className="mt-2 text-gray-300">
                Sign up for an account, and you'll be able to start generating blog posts right
                away.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">
                What payment methods do you accept?
              </h3>
              <p className="mt-2 text-gray-300">We accept all major credit cards and PayPal.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Can I try before I buy?</h3>
              <p className="mt-2 text-gray-300">
                Yes! We offer a free trial that lets you generate up to 3 blog posts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
