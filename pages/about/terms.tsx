
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function TermsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <Head>
        <title>Terms of Service | SuperSimple.Directory – AI-Powered Directories</title>
        <meta name="description" content="Review SuperSimple.Directory's Terms of Service. This agreement outlines your rights and responsibilities when using our AI-powered directory platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Terms of Service | SuperSimple.Directory" />
        <meta property="og:description" content="Review the Terms of Service agreement for using SuperSimple.Directory's AI-powered directory platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supersimple.directory/about/terms" />
        <meta property="og:image" content="https://supersimple.directory/og-image-terms.jpg" />
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
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="mt-1 text-sm text-gray-500">
                Last updated: March 20, 2025
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700">
                  Welcome to SuperSimple.Directory. These Terms of Service ("Terms") govern your access to and use of SuperSimple.Directory's website, services, and applications (collectively, the "Services"). Please read these Terms carefully, as they constitute a binding legal agreement between you and Rabble Labs Limited, the company that operates SuperSimple.Directory.
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you are using our Services on behalf of an organization, you are agreeing to these Terms on behalf of that organization, and you represent that you have the authority to do so. If you do not agree to these Terms, do not access or use our Services.
                </p>
                
                <h2>2. Description of Services</h2>
                <p>
                  SuperSimple.Directory provides an AI-powered platform for creating, managing, and publishing online directories. Our Services include:
                </p>
                <ul>
                  <li>Directory creation and customization tools</li>
                  <li>AI-assisted setup and data autofill capabilities</li>
                  <li>Listing management and organization features</li>
                  <li>User submission and approval workflows</li>
                  <li>Search and discovery functionality</li>
                  <li>Directory analytics and insights</li>
                  <li>Optional monetization features (for paid plans)</li>
                </ul>
                
                <p>
                  We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time, with or without notice. We may also impose limits on certain features or restrict access to parts or all of the Services without liability.
                </p>
                
                <h2>3. Account Registration and Security</h2>
                <p>
                  To access certain features of our Services, you must create an account. When registering for an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                
                <p>
                  You agree to:
                </p>
                <ul>
                  <li>Create a strong password and keep it secure</li>
                  <li>Update your information when necessary to maintain its accuracy</li>
                  <li>Notify us immediately of any unauthorized access to your account</li>
                  <li>Take responsibility for all activities on your account</li>
                  <li>Not share your account with others or create multiple accounts</li>
                </ul>
                
                <p>
                  We reserve the right to terminate or suspend your account if we determine, in our sole discretion, that you have violated these Terms.
                </p>
                
                <h2>4. Subscription Plans and Payment</h2>
                <p>
                  SuperSimple.Directory offers Free, Pro, and Enterprise subscription plans with different features and usage limits. By selecting a paid subscription plan, you agree to pay all applicable fees as described on our pricing page.
                </p>
                
                <p>
                  <strong>Free Plan:</strong> Our Free plan includes basic features with the following limitations:
                </p>
                <ul>
                  <li>One directory per account</li>
                  <li>Maximum of 10 listings</li>
                  <li>Limited access to AI-powered features</li>
                  <li>SuperSimple.Directory branding included</li>
                </ul>
                
                <p>
                  <strong>Paid Subscriptions:</strong> For paid plans (Pro and Enterprise), the following terms apply:
                </p>
                <ul>
                  <li>Subscription fees are charged in advance on a monthly or annual basis</li>
                  <li>Payments are non-refundable except as required by law</li>
                  <li>You authorize us to store your payment information for recurring billing</li>
                  <li>Prices may change with 30 days' notice before the next billing cycle</li>
                  <li>You may upgrade or downgrade your plan at any time, with changes taking effect on your next billing date</li>
                  <li>Downgrading may result in loss of access to certain features or data</li>
                </ul>
                
                <h2>5. User Content and Licenses</h2>
                <p>
                  "User Content" includes any text, data, information, images, or other material that you upload, create, or submit to our Services, including directory listings, descriptions, categories, and customization settings.
                </p>
                
                <p>
                  <strong>Ownership:</strong> You retain ownership of your User Content. However, by submitting User Content to our Services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, transmit, display, and distribute your User Content for the purpose of providing and improving our Services.
                </p>
                
                <p>
                  <strong>Public Directories:</strong> When you publish a directory, the content becomes publicly available unless you use privacy settings to restrict access. You are solely responsible for ensuring you have the necessary rights to publish any content.
                </p>
                
                <p>
                  <strong>AI-Generated Content:</strong> Our Services may generate content using AI based on your instructions or inputs. You are responsible for reviewing and editing any AI-generated content before publication. While you own the final directories and listings you create, we retain rights to the underlying AI technologies and improvements derived from anonymized usage patterns.
                </p>
                
                <h2>6. User Conduct and Prohibited Activities</h2>
                <p>
                  You agree not to use our Services to:
                </p>
                <ul>
                  <li>Violate any applicable law, regulation, or third-party rights</li>
                  <li>Create directories or listings that are fraudulent, false, misleading, or deceptive</li>
                  <li>Upload, publish, or share content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
                  <li>Distribute malware, spam, or engage in phishing activities</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Interfere with or disrupt the integrity or performance of our Services</li>
                  <li>Scrape, mine, or extract data from our Services without our express permission</li>
                  <li>Use our Services to store or transmit sensitive personal information like health data, government IDs, or financial account information without appropriate security measures and legal compliance</li>
                  <li>Create directories that promote illegal activities, discrimination, or harm</li>
                  <li>Resell, duplicate, or white-label our Services without authorization</li>
                </ul>
                
                <p>
                  We reserve the right to remove any content, suspend, or terminate your account if we determine, in our sole discretion, that you have violated these prohibitions.
                </p>
                
                <h2>7. Intellectual Property</h2>
                <p>
                  <strong>Our IP:</strong> The SuperSimple.Directory platform, including its software, features, graphics, design, and content created by us, is protected by copyright, trademark, patent, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services or included software without our permission.
                </p>
                
                <p>
                  <strong>Feedback:</strong> If you provide us with feedback or suggestions about our Services, you grant us the right to use this feedback without restriction or compensation.
                </p>
                
                <p>
                  <strong>DMCA Compliance:</strong> If you believe content on our Services infringes your copyright, please contact us with a notice containing:
                </p>
                <ul>
                  <li>Identification of the copyrighted work you claim is infringed</li>
                  <li>Identification of the material you claim is infringing and its location</li>
                  <li>Your contact information</li>
                  <li>A statement that you have a good faith belief that the use is not authorized</li>
                  <li>A statement, under penalty of perjury, that the information in your notice is accurate</li>
                </ul>
                
                <h2>8. Privacy and Data Security</h2>
                <p>
                  Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Services, you agree to our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                
                <p>
                  You are responsible for ensuring that your collection and use of data in directories complies with applicable privacy laws and regulations. This includes obtaining necessary consents for collecting and publishing information about individuals and providing appropriate privacy notices.
                </p>
                
                <h2>9. Third-Party Services and Content</h2>
                <p>
                  Our Services may include links to third-party websites, services, or content that are not owned or controlled by SuperSimple.Directory. We do not endorse or assume responsibility for any third-party content, services, or practices.
                </p>
                
                <p>
                  We may also offer integrations with third-party services. Your use of these integrations may be subject to the third party's terms and privacy policies. It is your responsibility to review and comply with these separate terms.
                </p>
                
                <h2>10. Disclaimer of Warranties</h2>
                <p>
                  YOUR USE OF OUR SERVICES IS AT YOUR SOLE RISK. THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                
                <p>
                  We do not warrant that:
                </p>
                <ul>
                  <li>The Services will meet your specific requirements</li>
                  <li>The Services will be uninterrupted, timely, secure, or error-free</li>
                  <li>The results from using the Services will be accurate or reliable</li>
                  <li>Any errors in the Services will be corrected</li>
                  <li>The AI-generated content will be free from errors, biases, or inaccuracies</li>
                </ul>
                
                <h2>11. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SUPERSIMPLE.DIRECTORY AND ITS OFFICERS, EMPLOYEES, AGENTS, AFFILIATES, AND PARTNERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                </p>
                <ul>
                  <li>Your access to or use of or inability to access or use the Services</li>
                  <li>Any conduct or content of any third party on the Services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  <li>Any errors or inaccuracies in content created through our AI features</li>
                </ul>
                
                <p>
                  IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU TO US FOR THE SERVICES DURING THE PAST 12 MONTHS.
                </p>
                
                <h2>12. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless SuperSimple.Directory and its officers, directors, employees, agents, and affiliates from and against any claims, disputes, demands, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with:
                </p>
                <ul>
                  <li>Your access to or use of our Services</li>
                  <li>Your User Content</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any third-party right, including without limitation any intellectual property right, privacy right, or publicity right</li>
                  <li>Any claim that your User Content caused damage to a third party</li>
                </ul>
                
                <h2>13. Termination</h2>
                <p>
                  We may terminate or suspend your account and access to our Services immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms.
                </p>
                
                <p>
                  You may terminate your account at any time by contacting us. Upon termination, your right to use the Services will immediately cease, and we may delete or archive your account information and User Content.
                </p>
                
                <p>
                  All provisions of the Terms which by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
                
                <h2>14. Changes to Terms</h2>
                <p>
                  We may revise these Terms from time to time. The most current version will always be posted on our website with the "Last Updated" date. If a revision, in our discretion, is material, we will notify you (for example, by email to the email address associated with your account).
                </p>
                
                <p>
                  By continuing to access or use our Services after revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new terms, you must stop using the Services.
                </p>
                
                <h2>15. Governing Law and Dispute Resolution</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of New Zealand, without regard to its conflict of law provisions.
                </p>
                
                <p>
                  Any dispute arising from or relating to these Terms or your use of the Services shall first be attempted to be resolved through informal negotiation. If the dispute cannot be resolved through negotiation, it shall be resolved through arbitration in accordance with the rules of the New Zealand Arbitration Association.
                </p>
                
                <h2>16. General Terms</h2>
                <p>
                  <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and SuperSimple.Directory regarding our Services.
                </p>
                
                <p>
                  <strong>Waiver and Severability:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in effect.
                </p>
                
                <p>
                  <strong>Assignment:</strong> You may not assign or transfer these Terms or your rights under these Terms without our prior written consent. We may assign or transfer these Terms without your consent to an affiliate or in connection with a merger, acquisition, corporate reorganization, or sale of all or substantially all of our assets.
                </p>
                
                <h2>17. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p>
                  <strong>Email:</strong> legal@supersimple.directory<br />
                  <strong>Address:</strong> Rabble Labs Limited, PO Box 12345, Wellington, New Zealand
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
                <li><Link href="/about/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/about/terms" className="text-gray-400 hover:text-white border-l-2 border-indigo-500 pl-2">Terms of Service</Link></li>
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
