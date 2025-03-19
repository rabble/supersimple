import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MarketingNav from '../components/ui/MarketingNav';

export default function Pricing() {
  const router = useRouter();
  // Use useEffect to ensure client-side only for hydration safety
  const [mounted, setMounted] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);
  const [faqs, setFaqs] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFaq = (index: number) => {
    if (faqs.includes(index)) {
      setFaqs(faqs.filter(i => i !== index));
    } else {
      setFaqs([...faqs, index]);
    }
  };

  const plans = [
    {
      name: "Free",
      description: "For personal use or testing",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: "1 directory", included: true },
        { text: "Up to 10 listings", included: true },
        { text: "Basic AI-Assisted Setup", included: true },
        { text: "Public directory page", included: true },
        { text: "Custom branding", included: false },
        { text: "Monetization features", included: false },
      ],
      bestFor: "Individuals, testing, small communities",
      ctaText: "Get Started Free",
      ctaLink: "/auth/signup",
      highlight: false
    },
    {
      name: "Pro",
      description: "For growing communities & businesses",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        { text: "Unlimited directories", included: true },
        { text: "Unlimited listings", included: true },
        { text: "AI-Assisted Setup + Auto-Fill", included: true },
        { text: "Custom branding & white-labeling", included: true },
        { text: "Custom fields & filtering", included: true },
        { text: "SEO tools for better search rankings", included: true },
        { text: "Interactive map integration", included: true },
        { text: "Admin approval workflow", included: true },
        { text: "Basic monetization (paid listings, featured spots)", included: true },
      ],
      bestFor: "Small businesses, non-profits, local directories",
      ctaText: "Start Pro Trial",
      ctaLink: "/auth/signup?plan=pro",
      highlight: true
    },
    {
      name: "Enterprise",
      description: "For organizations & large networks",
      monthlyPrice: 199,
      annualPrice: 159,
      features: [
        { text: "Everything in Pro, plus...", included: true },
        { text: "Premium Support & Setup Assistance", included: true },
        { text: "Advanced monetization (subscriptions, pay-per-access)", included: true },
        { text: "SSO (Single Sign-On) & advanced user permissions", included: true },
        { text: "API Access & Custom Integrations", included: true },
        { text: "Data export & analytics dashboards", included: true },
      ],
      bestFor: "Large associations, networks, paid membership directories",
      ctaText: "Contact Sales",
      ctaLink: "/contact",
      highlight: false
    }
  ];

  const faqItems = [
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will take effect on your next billing cycle."
    },
    {
      question: "Do I need a credit card to start?",
      answer: "No, the Free plan requires no payment details. You only need to provide payment information when you decide to upgrade to a paid plan."
    },
    {
      question: "Can I customize my directory?",
      answer: "Yes, the Pro and Enterprise plans allow full customization including custom branding, white-labeling, and custom domain names. The Free plan has limited customization options."
    },
    {
      question: "Do you offer refunds?",
      answer: "We don't offer refunds, but you can cancel your subscription at any time before the next billing cycle to avoid future charges. Your plan will remain active until the end of the current billing period."
    },
    {
      question: "Is there a limit to how many listings I can create?",
      answer: "The Free plan is limited to 10 listings. Pro and Enterprise plans have unlimited listings, allowing you to build directories of any size."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and PayPal for payment processing."
    }
  ];

  // Feature comparison grid data
  const comparisonFeatures = [
    { category: "Directories & Listings", features: [
      { name: "Number of directories", free: "1", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Listings per directory", free: "10", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Custom fields", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
    ]},
    { category: "AI Features", features: [
      { name: "AI-assisted setup", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
      { name: "Auto-fill listings from URL", free: "✖", pro: "✓", enterprise: "✓" },
      { name: "AI-generated recommendations", free: "✖", pro: "✓", enterprise: "✓" },
    ]},
    { category: "Design & Customization", features: [
      { name: "Custom branding", free: "✖", pro: "✓", enterprise: "✓" },
      { name: "White labeling", free: "✖", pro: "✓", enterprise: "✓" },
      { name: "Custom domain", free: "✖", pro: "✓", enterprise: "✓" },
      { name: "Design templates", free: "Limited", pro: "All templates", enterprise: "All templates + Custom" },
    ]},
    { category: "Search & Discovery", features: [
      { name: "Advanced search", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
      { name: "Map integration", free: "✖", pro: "✓", enterprise: "✓" },
      { name: "SEO optimization", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
    ]},
    { category: "Monetization", features: [
      { name: "Featured listings", free: "✖", pro: "✓", enterprise: "✓" },
      { name: "Paid listings", free: "✖", pro: "✓", enterprise: "✓" },
      { name: "Subscription access", free: "✖", pro: "✖", enterprise: "✓" },
      { name: "Payment processing", free: "✖", pro: "✓", enterprise: "✓" },
    ]},
    { category: "Support & Administration", features: [
      { name: "Email support", free: "Limited", pro: "Standard", enterprise: "Priority" },
      { name: "Setup assistance", free: "✖", pro: "✖", enterprise: "✓" },
      { name: "Admin controls", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
      { name: "User roles", free: "2", pro: "5", enterprise: "Unlimited" },
    ]},
    { category: "Integrations & Data", features: [
      { name: "API access", free: "✖", pro: "Limited", enterprise: "Full access" },
      { name: "Export options", free: "CSV", pro: "CSV, JSON", enterprise: "CSV, JSON, API" },
      { name: "Analytics", free: "Basic", pro: "Standard", enterprise: "Advanced" },
      { name: "Third-party integrations", free: "✖", pro: "Limited", enterprise: "Full" },
    ]},
  ];

  return (
    <>
      <Head>
        <title>SuperSimple.Directory Pricing – Build AI-Powered Directories</title>
        <meta name="description" content="Compare our Free, Pro, and Enterprise plans. Choose the right AI-powered directory solution for your community or business." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="SuperSimple.Directory Pricing – Build AI-Powered Directories" />
        <meta property="og:description" content="Compare our Free, Pro, and Enterprise plans. Choose the right AI-powered directory solution for your community or business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supersimple.directory/pricing" />
        <meta property="og:image" content="https://supersimple.directory/og-image-pricing.jpg" />
      </Head>

      <MarketingNav currentPath={router.pathname} />

      <main className="pt-16">
        {/* Hero Section (Introduction to Pricing) */}
        <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Simple, Transparent Pricing. <span className="text-indigo-600">No Hidden Fees.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Pick a plan that fits your needs. Start with a free directory, upgrade anytime for more features.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
              >
                Get Started for Free
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Toggle (Monthly/Annual) */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="relative flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setIsMonthly(true)}
                  className={`${
                    !mounted || isMonthly ? 'bg-white shadow-sm' : 'bg-transparent'
                  } relative py-2 px-6 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setIsMonthly(false)}
                  className={`${
                    mounted && !isMonthly ? 'bg-white shadow-sm' : 'bg-transparent'
                  } relative py-2 px-6 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none`}
                >
                  Annual Billing
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`rounded-lg ${plan.highlight ? 'ring-2 ring-indigo-600 shadow-xl' : 'border border-gray-200 shadow-sm'} bg-white p-8`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`${plan.highlight ? 'relative' : ''}`}>
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                    <p className="mt-4">
                      <span className="text-4xl font-extrabold text-gray-900">
                        ${mounted ? (isMonthly ? plan.monthlyPrice : plan.annualPrice) : plan.monthlyPrice}
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /month
                      </span>
                    </p>
                    {mounted && !isMonthly && plan.monthlyPrice > 0 && (
                      <p className="mt-1 text-sm text-gray-500">
                        Billed annually (${plan.annualPrice * 12}/year)
                      </p>
                    )}

                    <div className="mt-6">
                      <Link
                        href={plan.ctaLink}
                        className={`block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${
                          plan.highlight ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      >
                        {plan.ctaText}
                      </Link>
                    </div>

                    <div className="mt-8 space-y-4">
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">What's included:</h4>
                      <ul className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <div className="flex-shrink-0">
                              {feature.included ? (
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <p className="ml-3 text-sm text-gray-700">{feature.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-gray-100 pt-6">
                      <h4 className="text-sm font-semibold text-gray-900">Best for:</h4>
                      <p className="mt-2 text-sm text-gray-500">{plan.bestFor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Feature Comparison Table */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Compare All Features
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                See exactly what's included with each plan
              </p>
            </div>

            <div className="mt-12 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Free
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-indigo-600 uppercase tracking-wider bg-indigo-50">
                      Pro
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisonFeatures.map((categoryGroup, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr className="bg-gray-50">
                        <th
                          colSpan={4}
                          scope="colgroup"
                          className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                        >
                          {categoryGroup.category}
                        </th>
                      </tr>
                      {categoryGroup.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-3 text-sm text-gray-900">
                            {feature.name}
                          </td>
                          <td className="px-6 py-3 text-center text-sm">
                            {feature.free === "✓" ? (
                              <span className="text-green-500">✓</span>
                            ) : feature.free === "✖" ? (
                              <span className="text-gray-300">✖</span>
                            ) : (
                              <span className="text-gray-700">{feature.free}</span>
                            )}
                          </td>
                          <td className="px-6 py-3 text-center text-sm font-medium bg-indigo-50">
                            {feature.pro === "✓" ? (
                              <span className="text-green-600">✓</span>
                            ) : feature.pro === "✖" ? (
                              <span className="text-gray-400">✖</span>
                            ) : (
                              <span className="text-indigo-700">{feature.pro}</span>
                            )}
                          </td>
                          <td className="px-6 py-3 text-center text-sm">
                            {feature.enterprise === "✓" ? (
                              <span className="text-green-500">✓</span>
                            ) : feature.enterprise === "✖" ? (
                              <span className="text-gray-300">✖</span>
                            ) : (
                              <span className="text-gray-700">{feature.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Start Your AI-Powered Directory Today!
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Create a directory in minutes. Upgrade anytime.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg md:px-8 md:py-4"
              >
                Get Started for Free
              </Link>
              <p className="mt-3 text-sm text-indigo-200">No credit card required for free plan</p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Get answers to common questions about our pricing and plans.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-gray-900 focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <svg 
                      className={`h-5 w-5 text-gray-500 transform ${mounted && faqs.includes(index) ? 'rotate-180' : ''} transition-transform duration-200`}
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {mounted && faqs.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of organizations using SuperSimple.Directory to create powerful, AI-assisted directories.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
              >
                Sign Up Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:text-lg"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Same as other pages for consistency */}
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
                <li><Link href="/comparisons" className="text-gray-400 hover:text-white">Comparisons</Link></li>
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