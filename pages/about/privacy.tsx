
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function PrivacyPolicyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <Head>
        <title>Privacy Policy | SuperSimple.Directory – AI-Powered Directories</title>
        <meta name="description" content="Learn about how SuperSimple.Directory collects, uses, and protects your personal information. Our privacy policy explains your rights and our practices." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Privacy Policy | SuperSimple.Directory" />
        <meta property="og:description" content="Learn about how SuperSimple.Directory collects, uses, and protects your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supersimple.directory/about/privacy" />
        <meta property="og:image" content="https://supersimple.directory/og-image-privacy.jpg" />
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
              <Link href="/comparisons" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Comparisons
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Blog
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                About
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
              href="/comparisons"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Comparisons
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
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
      
      <main className="pt-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="mt-1 text-sm text-gray-500">
                Last updated: March 20, 2025
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700">
                  At SuperSimple.Directory, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered directory platform. Please read this policy carefully.
                </p>

                <h2>1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us when you:
                </p>
                <ul>
                  <li>Create an account or register for our services</li>
                  <li>Create, manage, or submit directory listings</li>
                  <li>Make purchases or sign up for subscription plans</li>
                  <li>Communicate with us via contact forms, email, or chat</li>
                  <li>Participate in surveys, contests, or promotional activities</li>
                  <li>Request customer support or technical assistance</li>
                </ul>
                
                <p>
                  <strong>Personal Information</strong> may include:
                </p>
                <ul>
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Account credentials and preferences</li>
                  <li>Billing and payment information</li>
                  <li>Directory content and data you upload</li>
                  <li>Communications and correspondence with us</li>
                </ul>
                
                <p>
                  <strong>Automatically Collected Information:</strong> We also collect certain information automatically when you use our platform, including:
                </p>
                <ul>
                  <li>Log information (IP address, browser type, referring/exit pages, operating system, date/time stamps)</li>
                  <li>Device information (hardware model, unique device identifiers)</li>
                  <li>Usage data (features used, actions taken, interaction patterns)</li>
                  <li>Information collected through cookies, web beacons, and similar technologies</li>
                  <li>Location information (general location based on IP address)</li>
                </ul>
                
                <h2>2. How We Use AI Technology</h2>
                <p>
                  SuperSimple.Directory uses artificial intelligence technology to provide and improve our services. This includes:
                </p>
                <ul>
                  <li>Generating directory schemas based on your descriptions</li>
                  <li>Auto-filling directory listings from URLs or minimal information</li>
                  <li>Providing recommendations and insights for directory optimization</li>
                  <li>Improving our AI models using anonymized user inputs and feedback</li>
                </ul>
                
                <p>
                  When using our AI features, your inputs may be processed by our AI systems to provide the requested services. We may retain and use anonymized versions of these inputs to improve our AI capabilities, but we do not use your personal information or directory data to train AI models for unrelated purposes or share it with third-party AI training systems without your consent.
                </p>
                
                <h2>3. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide, maintain, and improve our directory platform and services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Personalize your experience and deliver content relevant to your interests</li>
                  <li>Send transactional messages, service updates, and support communications</li>
                  <li>Send marketing communications (with opt-out options)</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Develop new products, services, and features</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, investigate, and prevent security incidents and fraudulent transactions</li>
                  <li>Comply with legal obligations and enforce our terms of service</li>
                </ul>
                
                <h2>4. Sharing of Information</h2>
                <p>
                  We may share your information with:
                </p>
                <ul>
                  <li><strong>Service Providers:</strong> Third-party vendors and service providers who perform services on our behalf (hosting, payment processing, email delivery, analytics, customer service)</li>
                  <li><strong>Directory Users:</strong> Information you choose to make public in your directory listings</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, reorganization, or sale of all or a portion of our business</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or governmental requests</li>
                  <li><strong>Protection of Rights:</strong> To enforce our Terms of Service, protect the security of our platform, or defend against legal claims</li>
                </ul>
                
                <p>
                  We do not sell, rent, or otherwise disclose your personal information to third parties for their marketing purposes without your consent.
                </p>
                
                <h2>5. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to provide the services you have requested, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need to use your information, we will take reasonable steps to remove it from our systems and records or anonymize it so it no longer identifies you.
                </p>
                
                <h2>6. Your Rights and Choices</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul>
                  <li><strong>Access and Update:</strong> You can access and update certain account information through your account settings</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to certain exceptions)</li>
                  <li><strong>Marketing Communications:</strong> Opt out of receiving promotional emails by following the unsubscribe instructions in those messages</li>
                  <li><strong>Cookies:</strong> Manage cookie preferences through your browser settings</li>
                </ul>
                
                <p>
                  To exercise these rights, please contact us using the information in the "Contact Us" section.
                </p>
                
                <h2>7. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information from loss, theft, unauthorized access, disclosure, alteration, and destruction. These measures include encryption of sensitive data, access controls, regular security assessments, and employee training. However, no method of electronic storage or transmission is 100% secure, so we cannot guarantee absolute security.
                </p>
                
                <h2>8. International Data Transfers</h2>
                <p>
                  We are based in New Zealand, and we process and store information on servers located in various countries, including the United States and European Union. If you are located outside these regions, your information may be transferred to, stored, and processed in a jurisdiction that may not provide the same level of data protection as your jurisdiction. By using our services, you consent to the transfer of your information to these countries.
                </p>
                
                <h2>9. Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under 16 years of age, and we do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can take appropriate steps to remove this information.
                </p>
                
                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new policy on our website with a revised "Last updated" date. Your continued use of our services after any changes signifies your acceptance of the updated Privacy Policy.
                </p>
                
                <h2>11. Contact Us</h2>
                <p>
                  If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <p>
                  <strong>Email:</strong> privacy@supersimple.directory<br />
                  <strong>Address:</strong> Rabble Labs Limited, PO Box 12345, Wellington, New Zealand
                </p>
                <p>
                  We will respond to your request within a reasonable timeframe and in accordance with applicable data protection laws.
                </p>
              </div>
            </div>
          </div>
        </div>
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
                <li><Link href="/comparisons" className="text-gray-400 hover:text-white">Comparisons</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/about/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/about/privacy" className="text-gray-400 hover:text-white border-l-2 border-indigo-500 pl-2">Privacy Policy</Link></li>
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
