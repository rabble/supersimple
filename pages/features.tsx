import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import MarketingNav from '../components/ui/MarketingNav';
import FooterComponent from '../components/ui/FooterComponent';

export default function Features() {
  const router = useRouter();
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const toggleFeature = (index: number) => {
    if (expandedFeature === index) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(index);
    }
  };

  // Feature deep-dive content
  const featureDetails = [
    {
      title: "AI-Powered Setup",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
      ),
      shortDescription: "Describe your directory, and the AI generates a complete structure automatically.",
      detailedDescription: "Simply tell our AI what kind of directory you want to create – whether it's for businesses, professionals, organizations, or events. The AI will generate the perfect directory structure with all relevant fields and categories. For example, a restaurant directory might include cuisine types, price ranges, and hours of operation, while a professional services directory would focus on qualifications, service areas, and specialties.",
      useCase: "A community manager for a neighborhood association wanted to create a local business directory. After describing the types of businesses (restaurants, retail, services), the AI generated a complete schema with all necessary fields in less than a minute, saving hours of manual setup."
    },
    {
      title: "Smart Data Autofill",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      shortDescription: "Enter a business name or URL, and AI fetches accurate details to fill out the listing.",
      detailedDescription: "Our AI can automatically gather information from various sources across the web to populate your directory listings. Just enter a business name, URL, or even just a phone number, and watch as the AI fills in addresses, business hours, descriptions, contact details, social media links, and more – all in seconds.",
      useCase: "A business association director needed to add 200+ member businesses to their directory. Instead of manually entering all the data, they used the Smart Data Autofill feature. By providing just the business names, they completed what would have been weeks of data entry in a single afternoon."
    },
    {
      title: "Custom Fields & Filters",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
      ),
      shortDescription: "Add unlimited custom fields and searchable filters tailored to your needs.",
      detailedDescription: "Every directory has unique needs. Our platform allows you to create custom fields of any type – text, numbers, multiple choice, tags, dates, and more. These fields can then be used as filters to make your directory more searchable and valuable to users. Custom fields can be required or optional, and can include validation rules to ensure data quality.",
      useCase: "An association of healthcare providers created a provider directory with custom fields for insurance accepted, specialties, languages spoken, and telehealth availability. Patients could then filter providers by these specific criteria, making it much easier to find the right doctor."
    },
    {
      title: "Admin Approval Workflow",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
      shortDescription: "Review and approve listings before they go live, ensuring quality and accuracy.",
      detailedDescription: "Maintain control over your directory with our approval workflow. When users submit new listings or updates, they're held in a pending state until an administrator reviews and approves them. You can also edit submissions before approval to ensure they meet your standards. This feature helps prevent spam and ensures the quality of your directory.",
      useCase: "A chamber of commerce allows businesses to submit their own listings to their directory, but they need to verify that submissions are legitimate local businesses and that the information is accurate. The approval workflow lets them review all submissions before they appear in the public directory."
    },
    {
      title: "Monetization & Premium Listings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      ),
      shortDescription: "Charge for featured listings, directory access, or premium visibility spots.",
      detailedDescription: "Turn your directory into a revenue source with our monetization features (coming soon). Offer premium or featured listings that appear at the top of search results or in prominent positions. Set up paid subscriptions for directory access or charge for listing submissions. Integrate with popular payment gateways for seamless transactions.",
      useCase: "A professional association created a directory of certified practitioners and offers three tiers of listings: basic (free), enhanced ($10/month with logo and extended description), and premium ($25/month with featured placement and integration with their booking system)."
    },
    {
      title: "SEO-Optimized & Google-Friendly",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      ),
      shortDescription: "Built-in SEO features help your directory rank higher in search results.",
      detailedDescription: "Every directory and listing page is optimized for search engines with proper semantic HTML, structured data (Schema.org), and automatically generated meta tags. This helps your directory and its listings rank higher in search results, driving more organic traffic to your site. We also generate sitemaps and implement other SEO best practices to maximize visibility.",
      useCase: "A local tourism board created a directory of attractions that now ranks at the top of Google search results for \"[City Name] attractions\" and other related terms, driving significant traffic to their directory and the listed businesses."
    },
    {
      title: "Interactive Map Integration",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      ),
      shortDescription: "Display listings on a dynamic map using Leaflet and OpenStreetMap.",
      detailedDescription: "Make your directory more engaging and useful with interactive maps. When location data is included in listings, they can be displayed on a dynamic map that users can pan and zoom. Users can click on map pins to see listing details or filter the map to show only certain categories or search results. This is especially valuable for directories of local businesses, events, or services.",
      useCase: "A city's economic development department created a map-based directory of available commercial properties, allowing potential investors to easily visualize locations and surrounding amenities."
    },
    {
      title: "Fully Customizable & Branded",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
      shortDescription: "Modify colors, layouts, and styles to match your brand's identity.",
      detailedDescription: "Make your directory an extension of your brand with our customization options. Choose from various layout templates, customize colors and typography to match your brand guidelines, add your logo, and even modify the user interface to create a unique, branded experience. You can also customize the URL structure and add your own domain name for a professional, consistent brand presence.",
      useCase: "A professional networking organization created a member directory that perfectly matches their brand's colors, typography, and design language, creating a seamless experience between their main website and the directory."
    }
  ];

  return (
    <>
      <Head>
        <title>Features | SuperSimple.Directory – AI-Powered Directory Builder</title>
        <meta name="description" content="Explore the powerful features of SuperSimple.Directory: AI-powered setup, data autofill, custom fields, approval workflows, and more. Build your custom directory today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Features | SuperSimple.Directory – AI-Powered Directory Builder" />
        <meta property="og:description" content="Explore the powerful features of SuperSimple.Directory: AI-powered setup, data autofill, custom fields, approval workflows, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supersimple.directory/features" />
        <meta property="og:image" content="https://supersimple.directory/og-image-features.jpg" />
      </Head>

      <MarketingNav currentPath={router.pathname} />

      <main className="pt-16">
        {/* Hero Section (Introduction to Features) */}
        <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Everything You Need to Build and Manage a <span className="text-indigo-600">Custom Directory</span> – Powered by AI
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
              SuperSimple.Directory combines AI automation, customization, and ease of use to help you create powerful directories for your community or business in minutes.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-8 md:py-4"
              >
                Start Your Directory for Free
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Powerful Features</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Build your dream directory with ease
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Our platform provides all the tools you need to create a professional, functional directory without any technical expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featureDetails.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.shortDescription}</p>
                  
                  {/* Expandable details section */}
                  <button 
                    onClick={() => toggleFeature(index)}
                    className="mt-4 text-indigo-600 hover:text-indigo-500 text-sm font-medium flex items-center focus:outline-none"
                  >
                    {expandedFeature === index ? "Show less" : "Learn more"}
                    <svg 
                      className={`ml-1 h-5 w-5 transform ${expandedFeature === index ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {expandedFeature === index && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-600 mb-4">{feature.detailedDescription}</p>
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-indigo-800 mb-2">Real-World Example:</h4>
                        <p className="text-indigo-700">{feature.useCase}</p>
                      </div>
                    </div>
                  )}
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
                How SuperSimple.Directory Compares
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                See how our AI-powered solution stacks up against traditional methods
              </p>
            </div>

            <div className="mt-12 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Traditional Directories
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50">
                      SuperSimple.Directory
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Setup Time</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Days to weeks</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 text-center font-medium bg-indigo-50">Minutes</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Data Entry</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Manual</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 text-center font-medium bg-indigo-50">AI-Automated</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Technical Skills Required</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">High</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 text-center font-medium bg-indigo-50">None</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Customization</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Limited or complex</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 text-center font-medium bg-indigo-50">Unlimited, user-friendly</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Maintenance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Time-consuming</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 text-center font-medium bg-indigo-50">Effortless</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Start Your AI-Powered Directory Today
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Join thousands of organizations building smart directories with ease.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg md:px-8 md:py-4"
              >
                Create Your Free Directory
              </Link>
              <p className="mt-3 text-sm text-indigo-200">No credit card required</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Got questions about our features? Find answers to common questions below.
              </p>
            </div>

            <div className="mt-8 space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">How does the AI-powered setup actually work?</h3>
                <p className="mt-2 text-gray-600">Our AI uses natural language processing to understand your description of the directory you want to create. It then generates a complete schema with all relevant fields, categories, and filters based on thousands of examples it's been trained on. You can then review and modify the generated schema to fit your specific needs.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Can I import my existing directory data?</h3>
                <p className="mt-2 text-gray-600">Yes! You can import existing data from CSV, Excel, or JSON files. Our system will map your data to the appropriate fields in your new directory. If you need help with the import process, our support team is ready to assist you.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Is my data secure and private?</h3>
                <p className="mt-2 text-gray-600">Absolutely. We take data security and privacy very seriously. All data is encrypted in transit and at rest, and we never share your directory data with third parties. You have complete control over who can access your directory through our comprehensive privacy settings.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Can I use my own domain name?</h3>
                <p className="mt-2 text-gray-600">Yes, you can use your own custom domain or subdomain for your directory. This allows you to maintain your brand identity and create a seamless experience for your users. Our setup process makes it easy to configure your domain settings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Additional Resources
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Explore these resources to learn more about our platform and how it compares to alternatives.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Platform Comparisons */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Platform Comparisons</h3>
                  <p className="mt-2 text-gray-600">See how SuperSimple.Directory compares to other directory platforms like Brilliant Directories, eDirectory, Hivebrite, and Wild Apricot.</p>
                  <div className="mt-6 space-y-2">
                    <Link href="/comparisons/brilliant-directories" className="block text-indigo-600 hover:text-indigo-500">
                      • Brilliant Directories vs SuperSimple.Directory
                    </Link>
                    <Link href="/comparisons/edirectory" className="block text-indigo-600 hover:text-indigo-500">
                      • eDirectory vs SuperSimple.Directory
                    </Link>
                    <Link href="/comparisons/hivebrite" className="block text-indigo-600 hover:text-indigo-500">
                      • Hivebrite vs SuperSimple.Directory
                    </Link>
                    <Link href="/comparisons/wild-apricot" className="block text-indigo-600 hover:text-indigo-500">
                      • Wild Apricot vs SuperSimple.Directory
                    </Link>
                  </div>
                  <Link
                    href="/comparisons"
                    className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-500"
                  >
                    View all comparisons
                    <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Blog Articles & Case Studies */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Blog Articles & Case Studies</h3>
                  <p className="mt-2 text-gray-600">Learn more about building effective directories, see real-world success stories, and get tips for maximizing your directory's impact.</p>
                  <div className="mt-6 space-y-2">
                    <Link href="/blog/how-to-start-business-directory-2024" className="block text-indigo-600 hover:text-indigo-500">
                      • How to Start a Business Directory in 2024
                    </Link>
                    <Link href="/blog/ai-future-online-directories" className="block text-indigo-600 hover:text-indigo-500">
                      • AI and the Future of Online Directories
                    </Link>
                    <Link href="/blog/local-chamber-directory-case-study" className="block text-indigo-600 hover:text-indigo-500">
                      • Case Study: Local Business Chamber Directory
                    </Link>
                    <Link href="/blog/category/case-studies" className="block text-indigo-600 hover:text-indigo-500">
                      • More Case Studies
                    </Link>
                  </div>
                  <Link
                    href="/blog"
                    className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-500"
                  >
                    View all articles
                    <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Create your first directory now and see the power of AI-assisted directory building for yourself.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
              >
                Sign Up Now
              </Link>
              <Link
                href="/how-it-works"
                className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:text-lg"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterComponent />
    </>
  );
}