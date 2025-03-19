import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import MarketingNav from '../components/ui/MarketingNav';

export default function HowItWorks() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Steps content
  const steps = [
    {
      number: 1,
      title: "Describe Your Directory",
      subtitle: "AI-Powered Setup",
      description: "Simply tell our AI assistant what kind of directory you want to create. The AI will ask you a few simple questions about your directory's purpose, what kind of entities will be listed, and which information you want to collect.",
      benefit: "In just a few minutes, our AI generates a complete directory structure with all relevant fields and categories - no technical knowledge required!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
      )
    },
    {
      number: 2,
      title: "Customize & Refine",
      subtitle: "Perfect Your Directory Structure",
      description: "Review and edit your AI-generated schema with our intuitive editor. Add custom fields, adjust categories, and fine-tune the directory structure to match your exact requirements.",
      benefit: "Make your directory truly yours by customizing fields, validation rules, and organization. Your changes are saved in real-time with instant previews of how listings will appear.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      )
    },
    {
      number: 3,
      title: "Add Listings with AI Autofill",
      subtitle: "Effortless Data Entry",
      description: "Start populating your directory with minimal effort. Simply enter a name or URL, and our AI assistant will automatically fetch and fill in all relevant details based on your directory's structure.",
      benefit: "What would take hours of manual data entry now takes seconds. Our AI can gather accurate information from across the web, and you can always review and edit before approval.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
    {
      number: 4,
      title: "Approve & Publish",
      subtitle: "Quality Control Made Simple",
      description: "Review submitted listings before they go live. Use our dedicated admin dashboard to approve, edit, or reject submissions with just a few clicks.",
      benefit: "Maintain complete control over your directory's content quality. Approved listings are instantly published, while pending and rejected listings remain private until they meet your standards.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      )
    },
    {
      number: 5,
      title: "Share & Grow",
      subtitle: "Expand Your Reach",
      description: "Launch your directory to the world with multiple sharing options. Your directory is automatically optimized for search engines, helping users find your content organically.",
      benefit: "Watch your directory grow as users discover and engage with your listings. Track performance with built-in analytics and leverage insights to continually improve your directory.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
      )
    }
  ];

  // FAQ content
  const faqs = [
    {
      question: "How long does it take to set up a directory?",
      answer: "Most users launch their directory in under 30 minutes. The AI-powered setup and autofill features dramatically reduce the time needed to create a professional directory. The actual time depends on how much customization you want to do and how many initial listings you add."
    },
    {
      question: "Can I change my directory settings after it's created?",
      answer: "Absolutely! Your directory is fully customizable at any time. You can edit the schema, add or remove fields, change display options, and update any settings even after your directory is live and has listings."
    },
    {
      question: "How accurate is the AI autofill feature?",
      answer: "Our AI autofill is highly accurate for most common entities (businesses, organizations, etc.). It gathers information from multiple sources across the web to ensure reliability. However, we always give you the opportunity to review and edit AI-generated content before approval to ensure 100% accuracy."
    },
    {
      question: "Can contributors submit their own listings?",
      answer: "Yes! You can allow users to submit listings to your directory through a customizable submission form. All submissions can be set to require admin approval before they appear publicly, giving you complete control over content quality."
    },
    {
      question: "Can I monetize my directory?",
      answer: "Yes, our platform supports multiple monetization options such as featured listings, premium tiers, and paid submissions. These features are available on our Pro and Enterprise plans. Many of our users successfully generate revenue from their directories."
    },
    {
      question: "What technical skills do I need to create a directory?",
      answer: "None! SuperSimple.Directory is designed to be user-friendly for everyone, regardless of technical background. Our AI handles the complex tasks, and the interface is intuitive enough for anyone to use. No coding or database knowledge required."
    }
  ];

  return (
    <>
      <Head>
        <title>How It Works | SuperSimple.Directory – AI-Powered Directory Builder</title>
        <meta name="description" content="Learn how easy it is to create your own custom directory with SuperSimple.Directory. Our AI-powered platform makes it effortless to set up, manage, and grow your directory in minutes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="How It Works | SuperSimple.Directory – AI-Powered Directory Builder" />
        <meta property="og:description" content="See how easy it is to build your directory with our AI-powered platform. Create, customize, and launch your directory in minutes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supersimple.directory/how-it-works" />
        <meta property="og:image" content="https://supersimple.directory/og-image-how-it-works.jpg" />
      </Head>

      <MarketingNav currentPath={router.pathname} />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="text-center md:text-left md:w-1/2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                  <span className="block">See How Easy It Is to</span>
                  <span className="block text-indigo-600">Build Your Directory</span>
                </h1>
                <p className="mt-5 text-xl sm:text-2xl text-gray-600 max-w-3xl">
                  AI-powered automation makes creating a directory effortless. Follow these simple steps to launch yours in minutes.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <Link
                    href="/auth/signup"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start for Free
                  </Link>
                  <a
                    href="#step-by-step"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md text-base font-medium text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    See the Process
                  </a>
                </div>
              </div>
              <div className="mt-10 md:mt-0 md:w-1/2">
                <div className="relative mx-auto bg-white rounded-xl shadow-lg p-3 border border-gray-200 max-w-md">
                  <div className="rounded bg-indigo-50 p-4 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-indigo-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                      </svg>
                      <h3 className="mt-4 text-xl font-semibold text-gray-800">Interactive Demo</h3>
                      <p className="mt-2 text-gray-600">Watch the short demo to see how easy it is to create your directory</p>
                      <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Play Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Overview</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                From Idea to Live Directory in Minutes
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                SuperSimple.Directory automates the technical work of creating a directory, so you can focus on the content.
              </p>
            </div>

            <div className="mt-16 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-lg font-medium text-gray-900">
                  The Process at a Glance
                </span>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">1. Describe</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Tell our AI what kind of directory you want
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">2. Customize</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Fine-tune your directory structure
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 0 1 0 1.953l-7.108 4.062A1.125 1.125 0 0 1 3 16.81V8.688ZM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 0 1 0 1.953l-7.108 4.062a1.125 1.125 0 0 1-1.683-.977V8.688Z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">3. Launch</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Publish and share your directory
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section id="step-by-step" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Detailed Process</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Building Your Directory Step by Step
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Follow these five simple steps to create, customize, and share your directory with the world.
              </p>
            </div>

            <div className="mt-16">
              {steps.map((step, index) => (
                <div key={index} className={`relative ${index !== steps.length - 1 ? 'pb-12' : ''}`}>
                  {/* Connector line between steps */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-12 top-20 bottom-0 w-0.5 bg-gray-200" aria-hidden="true"></div>
                  )}
                  
                  <div className="relative flex items-start space-x-4 md:space-x-8">
                    {/* Step number circle */}
                    <div className="relative">
                      <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full ring-8 ring-white">
                        <span className="text-xl font-bold text-indigo-600">{step.number}</span>
                      </div>
                    </div>
                    
                    {/* Step content */}
                    <div className="min-w-0 flex-1 py-0">
                      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                        <div className="md:flex md:items-center">
                          <div className="flex-shrink-0 hidden md:block mr-6">
                            {step.icon}
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">{step.title}</h3>
                            <p className="text-sm font-medium text-indigo-600">{step.subtitle}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:ml-18">
                          <p className="text-gray-600">{step.description}</p>
                          
                          <div className="mt-4 bg-indigo-50 p-4 rounded-lg">
                            <h4 className="font-medium text-indigo-800">Benefits:</h4>
                            <p className="mt-1 text-indigo-700">{step.benefit}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">
                What Our Users Say
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Don't just take our word for it. See what people have accomplished with SuperSimple.Directory.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <span className="text-indigo-800 font-semibold text-lg">JD</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Jane D.</h3>
                    <p className="text-gray-600 text-sm">Community Manager</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "I launched our member directory in under an hour! The AI setup wizard asked me simple questions and created the perfect directory structure for our organization. Members love how easy it is to find what they need."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <span className="text-indigo-800 font-semibold text-lg">MK</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Mike K.</h3>
                    <p className="text-gray-600 text-sm">Small Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The AI autofill feature is like magic! I created a business directory and just entered company names - the AI found addresses, phone numbers, websites, and even descriptions. What would have taken days of data entry was done in minutes."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <span className="text-indigo-800 font-semibold text-lg">TL</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Tara L.</h3>
                    <p className="text-gray-600 text-sm">Association Director</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "We needed a membership directory with very specific custom fields. The platform made it easy to customize everything, and the approval workflow keeps our data accurate. Our directory has become an essential resource for our members."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Have questions about how our platform works? Find answers to common questions below.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Ready to Build Your Directory?
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Join thousands of organizations using AI-powered directories to connect their communities.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/signup"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Try It Free Now
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-white rounded-md text-base font-medium text-white bg-transparent hover:bg-indigo-500 md:py-4 md:text-lg md:px-10"
              >
                See Pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-indigo-200">No credit card required to get started</p>
          </div>
        </section>
      </main>

      {/* Footer - Same as homepage for consistency */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SuperSimple.Directory</h3>
              <p className="text-gray-400">
                AI-powered directory creation and management made simple.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/how-it-works" className="text-gray-400 hover:text-white">How It Works</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {new Date().getFullYear()} SuperSimple.Directory. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}