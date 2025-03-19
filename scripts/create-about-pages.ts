import fs from 'fs';
import path from 'path';

// Define the about page content
const aboutPageContent = `
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AboutPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About | Directory Platform</title>
        <meta name="description" content="Learn more about our directory platform" />
      </Head>
      
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">About Our Platform</h1>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <p>
                Our directory platform helps communities create and manage specialized directories
                for various purposes. Whether you're building a resource directory, a business listing,
                or a community database, our platform provides the tools you need.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                We believe in empowering communities with tools to organize and share information
                effectively. Our platform is designed to be flexible, user-friendly, and accessible
                to organizations of all sizes.
              </p>
              
              <h2>Key Features</h2>
              <ul>
                <li>Custom directory creation with AI-assisted schema generation</li>
                <li>Flexible listing submission and management</li>
                <li>Role-based access control</li>
                <li>Search and filtering capabilities</li>
                <li>Responsive design for all devices</li>
              </ul>
              
              <h2>Get Started</h2>
              <p>
                <Link href="/directories" className="text-blue-600 hover:text-blue-800">
                  Browse our directories
                </Link> or <Link href="/auth/login" className="text-blue-600 hover:text-blue-800">
                  sign in
                </Link> to create your own.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
`;

// Define the contact page content
const contactPageContent = `
import Head from 'next/head';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // This is a placeholder for actual form submission logic
      // You would typically send this data to an API endpoint
      console.log('Form data submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Contact Us | Directory Platform</title>
        <meta name="description" content="Get in touch with our team" />
      </Head>
      
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-1 text-sm text-gray-500">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            {submitSuccess ? (
              <div className="rounded-md bg-green-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          {submitError}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
`;

// Define the terms page content
const termsPageContent = `
import Head from 'next/head';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms of Service | Directory Platform</title>
        <meta name="description" content="Terms of service for our directory platform" />
      </Head>
      
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            <p className="mt-1 text-sm text-gray-500">
              Last updated: ${new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using our directory platform, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
              
              <h2>2. Description of Service</h2>
              <p>
                Our platform provides tools for creating, managing, and browsing directories of information.
                We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
              </p>
              
              <h2>3. User Accounts</h2>
              <p>
                Some features of our platform require registration. You are responsible for maintaining
                the confidentiality of your account information and for all activities that occur under your account.
              </p>
              
              <h2>4. User Content</h2>
              <p>
                Users may submit content to our directories. You retain ownership of your content, but grant
                us a license to use, store, and display it in connection with our services.
              </p>
              
              <h2>5. Prohibited Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul>
                <li>Violate any laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with the proper functioning of the service</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
              
              <h2>6. Privacy</h2>
              <p>
                Our Privacy Policy governs the collection and use of information through our platform.
                By using our services, you consent to our data practices as described in our Privacy Policy.
              </p>
              
              <h2>7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your use of or inability to use our services.
              </p>
              
              <h2>8. Changes to Terms</h2>
              <p>
                We may update these Terms of Service from time to time. We will notify users of significant changes
                by posting a notice on our website or sending an email.
              </p>
              
              <h2>9. Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us through our Contact page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
`;

// Define the privacy policy page content
const privacyPageContent = `
import Head from 'next/head';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy | Directory Platform</title>
        <meta name="description" content="Privacy policy for our directory platform" />
      </Head>
      
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-1 text-sm text-gray-500">
              Last updated: ${new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us when you:
              </p>
              <ul>
                <li>Create an account</li>
                <li>Submit directory listings</li>
                <li>Contact us</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              
              <p>
                We also automatically collect certain information about your device and how you interact with our platform,
                including:
              </p>
              <ul>
                <li>Log information</li>
                <li>Device information</li>
                <li>Usage information</li>
                <li>Cookies and similar technologies</li>
              </ul>
              
              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              </ul>
              
              <h2>3. Sharing of Information</h2>
              <p>
                We may share your information with:
              </p>
              <ul>
                <li>Service providers who perform services on our behalf</li>
                <li>Other users, when you submit public directory listings</li>
                <li>In response to legal process or when required by law</li>
                <li>In connection with a merger, sale, or acquisition</li>
              </ul>
              
              <h2>4. Your Choices</h2>
              <p>
                You can access and update certain information through your account settings.
                You may also opt out of receiving promotional communications from us by following
                the instructions in those communications.
              </p>
              
              <h2>5. Data Security</h2>
              <p>
                We take reasonable measures to help protect your personal information from loss,
                theft, misuse, and unauthorized access.
              </p>
              
              <h2>6. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13, and we do not knowingly collect
                personal information from children under 13.
              </p>
              
              <h2>7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new policy on our website.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us through our Contact page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
`;

// Function to create directory if it doesn't exist
function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Function to write file if it doesn't exist or if force flag is true
function writeFileIfNotExists(filePath: string, content: string, force: boolean = false) {
  if (!fs.existsSync(filePath) || force) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
    return true;
  } else {
    console.log(`File already exists (skipping): ${filePath}`);
    return false;
  }
}

// Main function to create about pages
async function createAboutPages() {
  try {
    console.log('Creating about pages...');
    
    // Define the pages directory
    const pagesDir = path.join(process.cwd(), 'pages');
    
    // Create the about directory
    const aboutDir = path.join(pagesDir, 'about');
    ensureDirectoryExists(aboutDir);
    
    // Create the about pages
    const pages = [
      { name: 'index.tsx', content: aboutPageContent },
      { name: 'contact.tsx', content: contactPageContent },
      { name: 'terms.tsx', content: termsPageContent },
      { name: 'privacy.tsx', content: privacyPageContent }
    ];
    
    let createdCount = 0;
    
    for (const page of pages) {
      const filePath = path.join(aboutDir, page.name);
      if (writeFileIfNotExists(filePath, page.content)) {
        createdCount++;
      }
    }
    
    if (createdCount > 0) {
      console.log(`Successfully created ${createdCount} about pages.`);
    } else {
      console.log('All about pages already exist. Use --force to overwrite.');
    }
    
  } catch (error) {
    console.error('Error creating about pages:', error);
    process.exit(1);
  }
}

// Check if script is being run directly
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  
  createAboutPages()
    .then(() => {
      console.log('About pages creation completed.');
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}

export { createAboutPages };
