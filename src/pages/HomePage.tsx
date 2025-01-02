import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wand2, Share2, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle } from '../lib/auth/supabase';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Structured data for Google Rich Results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bloggy",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered blog content generator that helps create SEO-optimized blog posts in minutes",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  return (
    <>
      <Helmet>
        <title>Bloggy - AI Blog Generator | Create SEO-Optimized Content in Minutes</title>
        <meta name="description" content="Transform your ideas into engaging, SEO-optimized blog posts with Bloggy's AI-powered content generator. Create professional content in minutes." />
        
        {/* OpenGraph tags */}
        <meta property="og:title" content="Bloggy - AI Blog Generator | Create SEO-Optimized Content in Minutes" />
        <meta property="og:description" content="Transform your ideas into engaging, SEO-optimized blog posts with Bloggy's AI-powered content generator. Create professional content in minutes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bloggy.live" />
        <meta property="og:image" content="https://bloggy.live/og-image.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bloggy - AI Blog Generator" />
        <meta name="twitter:description" content="Create SEO-optimized blog posts in minutes with AI assistance." />
        <meta name="twitter:image" content="https://bloggy.live/twitter-card.jpg" />
        
        {/* Keywords and other SEO tags */}
        <meta name="keywords" content="AI blog generator, content creation, SEO optimization, blog writing, artificial intelligence, content marketing, blogging tool" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Bloggy" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://bloggy.live" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                AI-Powered Blog Generation Made Simple
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Create engaging, SEO-optimized blog content in minutes. Let AI handle the writing while you focus on what matters most.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {!isLoading && (user ? (
                  <button
                    onClick={() => navigate('/projects/new')}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create new project
                    <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign In to Get Started
                    <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </button>
                ))}
                <button
                  onClick={() => navigate('/projects')}
                  className="text-sm font-semibold leading-6 text-white"
                >
                  View all projects <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">
                Faster blogging
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to create amazing blog content
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Our AI-powered platform helps you create, optimize, and manage your blog content with ease.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <Wand2 className="h-5 w-5 flex-none text-indigo-400" />
                    AI-Powered Writing
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      Generate high-quality, engaging blog content with advanced AI technology.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <Sparkles className="h-5 w-5 flex-none text-indigo-400" />
                    SEO Optimization
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      Automatically optimize your content for search engines with smart metadata generation.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <Zap className="h-5 w-5 flex-none text-indigo-400" />
                    Quick Editing
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      Easily edit and refine your content with our intuitive editor interface.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start creating amazing blog content today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join thousands of content creators who are already using our platform to generate engaging blog posts.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => navigate('/projects/new')}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </button>
              <button
                onClick={() => navigate('/about')}
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 