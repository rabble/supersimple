import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/legacy/image';

export default function WildApricotComparison() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Feature comparison data
  const featureComparisonData = [
    {
      feature: "Association Management",
      wildApricot: "Comprehensive but complex suite of tools",
      superSimple: "Focused directory features with streamlined management",
      winner: "wildApricot"
    },
    {
      feature: "Directory Creation",
      wildApricot: "Limited customization with manual setup",
      superSimple: "AI-powered schema generation and autofill",
      winner: "supersimple"
    },
    {
      feature: "Setup Time",
      wildApricot: "Days to weeks with manual configuration",
      superSimple: "Minutes to hours with AI-guided setup",
      winner: "supersimple"
    },
    {
      feature: "Pricing & Value",
      wildApricot: "Tiered pricing based on contacts/members",
      superSimple: "Affordable plans with unlimited directory entries",
      winner: "supersimple"
    },
    {
      feature: "Ease of Use",
      wildApricot: "Steep learning curve with many options",
      superSimple: "Intuitive interface designed for simplicity",
      winner: "supersimple"
    },
    {
      feature: "Website Builder",
      wildApricot: "Built-in website builder with templates",
      superSimple: "Directory-focused with modern design by default",
      winner: "tie"
    },
    {
      feature: "Mobile Experience",
      wildApricot: "Separate app required for mobile access",
      superSimple: "Fully responsive on all devices by default",
      winner: "supersimple"
    },
    {
      feature: "AI Integration",
      wildApricot: "Minimal AI features",
      superSimple: "Core platform feature with advanced directory automation",
      winner: "supersimple"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "We switched from Wild Apricot because we needed a more focused directory solution. SuperSimple.Directory gave us exactly what we needed without the complexity of a full association management system.",
      author: "Robert P.",
      role: "Trade Association Director"
    },
    {
      quote: "The AI-powered data entry in SuperSimple.Directory saved our staff countless hours compared to the manual process in Wild Apricot. We were able to launch our directory in a single afternoon.",
      author: "Lisa M.",
      role: "Chamber of Commerce Manager"
    },
    {
      quote: "Wild Apricot's pricing structure was becoming prohibitive as our directory grew. With SuperSimple.Directory, we can have unlimited listings at a fraction of the cost.",
      author: "James K.",
      role: "Professional Network Organizer"
    }
  ];

  return (
    <>
      <Head>
        <title>Wild Apricot vs. SuperSimple.Directory – Features & Pricing Comparison</title>
        <meta 
          name="description" 
          content="Compare Wild Apricot and SuperSimple.Directory side by side. Discover how our AI-powered directory platform offers a more affordable, user-friendly alternative." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Wild Apricot vs. SuperSimple.Directory – Features & Pricing Comparison" />
        <meta property="og:description" content="Looking for a Wild Apricot alternative? See how SuperSimple.Directory offers an easier, more affordable directory solution with AI-powered features." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supersimple.directory/comparisons/wild-apricot" />
        <meta property="og:image" content="https://supersimple.directory/og-image-wild-apricot-comparison.jpg" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className="h-8 w-auto text-indigo-600 font-bold text-xl">
                  SuperSimple.Directory
                </div>
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8 md:items-center">
              <Link href="/features" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                How It Works
              </Link>
              <Link href="/use-cases" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Use Cases
              </Link>
              <div className="relative">
                <Link href="/comparisons/wild-apricot" className="border-indigo-500 text-indigo-600 inline-flex items-center px-3 py-2 text-sm font-medium border-b-2">
                  Comparisons
                </Link>
              </div>
              <Link href="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link href="/about/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/features"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/how-it-works"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/use-cases"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Use Cases
            </Link>
            <Link
              href="/comparisons/wild-apricot"
              className="block px-3 py-2 text-base font-medium text-indigo-600 border-l-4 border-indigo-500 bg-indigo-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Comparisons
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/about/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="block w-full px-5 py-3 text-center font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800">
                Competitor Comparison
              </span>
              <h1 className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Wild Apricot vs. SuperSimple.Directory
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                Looking for a more affordable, user-friendly directory solution? See how we compare to Wild Apricot for directory management.
              </p>
            </div>

            <div className="mt-10 sm:flex sm:justify-center">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
                <div className="relative bg-white rounded-lg shadow-lg p-6 overflow-hidden border border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Wild Apricot</h3>
                    <span className="inline-flex rounded-md px-2.5 py-0.5 text-sm font-medium bg-gray-100 text-gray-800">
                      Association Management
                    </span>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-gray-500">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Full association management system</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Built-in event and membership features</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-red-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Pricing scales with member count</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-red-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Complex setup and learning curve</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-red-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Limited AI integration capabilities</span>
                    </li>
                  </ul>
                </div>

                <div className="relative bg-white rounded-lg shadow-lg p-6 overflow-hidden border-2 border-indigo-500">
                  <div className="absolute top-0 right-0">
                    <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-bl-lg">
                      RECOMMENDED
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">SuperSimple.Directory</h3>
                    <span className="inline-flex rounded-md px-2.5 py-0.5 text-sm font-medium bg-indigo-100 text-indigo-800">
                      AI-Powered
                    </span>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-gray-500">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">AI-powered directory creation and management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Affordable plans with unlimited directory entries</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Intuitive interface for all technical levels</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">AI autofill for directory listings</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Setup in minutes rather than days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Which Platform Is Right For Your Organization?</h2>
              <p className="mt-4 text-lg text-gray-600">
                Both Wild Apricot and SuperSimple.Directory help you create online directories, but they have different approaches, strengths, and focus areas.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900">Wild Apricot</h3>
                <p className="mt-2 text-gray-600">
                  Wild Apricot is a comprehensive association management system that includes membership management, event registration, website building, and directory features. It's designed primarily for membership organizations and associations.
                </p>
                <p className="mt-4 text-gray-600">
                  While feature-rich, Wild Apricot comes with a steeper learning curve and pricing that scales with your member count. Setup typically requires days or weeks of configuration, and the platform can be overwhelming for users who primarily need directory functionality.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6 border-2 border-indigo-100">
                <h3 className="text-xl font-semibold text-indigo-900">SuperSimple.Directory</h3>
                <p className="mt-2 text-gray-600">
                  SuperSimple.Directory takes an AI-first approach to directory creation and management. Our platform is designed to be accessible to users of all technical abilities, with automation handling the complex aspects of directory setup and data management.
                </p>
                <p className="mt-4 text-gray-600">
                  With affordable pricing and a focus on ease of use, SuperSimple.Directory enables you to create professional directories in minutes rather than days, with AI-powered features like schema generation and automatic listing data population. Our platform specializes in creating beautiful, functional directories without the complexity of a full association management system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Feature Comparison</h2>
              <p className="mt-4 text-lg text-gray-600">
                See how SuperSimple.Directory and Wild Apricot compare across key features for directory management.
              </p>
            </div>

            <div className="mt-12 overflow-hidden shadow-lg rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wild Apricot
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                      SuperSimple.Directory
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Winner
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {featureComparisonData.map((feature, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {feature.feature}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {feature.wildApricot}
                      </td>
                      <td className="px-6 py-4 text-sm text-indigo-700 font-medium">
                        {feature.superSimple}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {feature.winner === "supersimple" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            SuperSimple.Directory
                          </span>
                        ) : feature.winner === "wildApricot" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Wild Apricot
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Tie
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* In-Depth Analysis */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">In-Depth Analysis</h2>
              <p className="mt-4 text-lg text-gray-600">
                Let's take a deeper look at the key strengths and limitations of each platform to help you make an informed decision.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Wild Apricot Analysis */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Wild Apricot</h3>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900">Pros</h4>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Comprehensive association management features beyond just directories</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Robust membership management and payment processing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Event management with registration and ticketing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Website builder with templates for full organization websites</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900">Cons</h4>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Pricing scales with contact count, becoming expensive as directories grow</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Complex interface requires significant training for administrators</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Directory features are less developed than membership features</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Minimal AI capabilities for data entry and management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Mobile experience requires a separate app download</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* SuperSimple.Directory Analysis */}
              <div>
                <h3 className="text-2xl font-bold text-indigo-600">SuperSimple.Directory</h3>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900">Pros</h4>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">AI-powered directory creation with automatic schema generation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Affordable pricing with unlimited directory entries</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Intuitive interface suitable for users of all technical abilities</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">AI autofill dramatically reduces manual data entry workload</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Fully responsive design works on all devices without an app</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900">Cons</h4>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">Fewer association management features than Wild Apricot</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-3">More focused on directory functionality than event management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-indigo-50 p-6 rounded-lg border border-indigo-100">
              <h3 className="text-xl font-bold text-indigo-900">The Verdict</h3>
              <p className="mt-4 text-gray-700">
                <strong>Wild Apricot</strong> may be suitable for organizations that need a comprehensive association management system with membership, event, and website features in addition to basic directory functionality.
              </p>
              <p className="mt-4 text-gray-700">
                <strong>SuperSimple.Directory</strong> is the clear winner for organizations focused on creating high-quality, easy-to-manage directories without the complexity and cost of a full association management system. With its AI-powered features, intuitive interface, and affordable pricing, it provides exceptional value for directory-focused projects.
              </p>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">What Users Are Saying</h2>
              <p className="mt-4 text-lg text-gray-600">
                Hear from users who've made the switch from Wild Apricot to SuperSimple.Directory.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-base font-medium text-gray-900">{testimonial.author}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="mt-2 text-gray-600 italic">"{testimonial.quote}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold">
              Create Your AI-Powered Directory in Minutes, Not Days
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Join SuperSimple.Directory and transform the way you create and manage directories. Launch your first directory today with unlimited entries.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/auth/signup"
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-lg"
              >
                Get Started Today
              </Link>
              <Link
                href="/features"
                className="ml-4 px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-indigo-500 md:py-4 md:text-lg md:px-10"
              >
                Explore Features
              </Link>
            </div>
            <p className="mt-4 text-sm text-indigo-200">No technical skills required. Free trial available.</p>
          </div>
        </section>

        {/* Other Comparisons */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Other Platform Comparisons</h2>
              <p className="mt-4 text-lg text-gray-600">
                See how SuperSimple.Directory stacks up against other directory platforms.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Link href="/comparisons/brilliant-directories" className="group">
                <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">Brilliant Directories vs SuperSimple.Directory</h3>
                    <p className="mt-2 text-sm text-gray-600">Compare features, pricing, and ease of use between these directory platforms.</p>
                    <div className="mt-4 flex items-center text-indigo-600">
                      <span className="text-sm font-medium">Read comparison</span>
                      <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/comparisons/edirectory" className="group">
                <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">eDirectory vs SuperSimple.Directory</h3>
                    <p className="mt-2 text-sm text-gray-600">See how our platform compares to eDirectory for directory management.</p>
                    <div className="mt-4 flex items-center text-indigo-600">
                      <span className="text-sm font-medium">Read comparison</span>
                      <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/comparisons/hivebrite" className="group">
                <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">Hivebrite vs SuperSimple.Directory</h3>
                    <p className="mt-2 text-sm text-gray-600">See how our platform compares to Hivebrite for community management.</p>
                    <div className="mt-4 flex items-center text-indigo-600">
                      <span className="text-sm font-medium">Read comparison</span>
                      <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                <li><Link href="/use-cases" className="text-gray-400 hover:text-white">Use Cases</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/comparisons/wild-apricot" className="text-gray-400 hover:text-white">Comparisons</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/about/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/about/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/about/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
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