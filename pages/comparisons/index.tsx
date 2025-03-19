import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import MarketingNav from '../../components/ui/MarketingNav';

export default function ComparisonsIndex() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Comparison card data
  const comparisons = [
    {
      id: "brilliant-directories",
      title: "Brilliant Directories vs SuperSimple.Directory",
      description: "Compare features, pricing, and usability between these directory platforms. See why our AI-powered approach offers better value.",
      highlights: [
        "More affordable pricing structure",
        "AI-powered directory creation",
        "Significantly faster setup time",
        "No technical skills required"
      ]
    },
    {
      id: "edirectory",
      title: "eDirectory vs SuperSimple.Directory",
      description: "Discover how SuperSimple.Directory offers a more user-friendly alternative to eDirectory with AI-powered automation.",
      highlights: [
        "Intuitive user interface",
        "Automated schema generation",
        "Launch in minutes instead of days",
        "Built-in SEO optimization"
      ]
    },
    {
      id: "hivebrite",
      title: "Hivebrite vs SuperSimple.Directory",
      description: "See how our platform compares to Hivebrite for community and directory management with a focus on ease of use.",
      highlights: [
        "Streamlined directory creation",
        "Transparent pricing model",
        "AI-assisted data entry",
        "Simple management interface"
      ]
    },
    {
      id: "wild-apricot",
      title: "Wild Apricot vs SuperSimple.Directory",
      description: "Compare our directory platform with Wild Apricot's association management software for directory functionality.",
      highlights: [
        "Unlimited directory entries",
        "Directory-focused features",
        "No complex setup required",
        "AI-powered listing autofill"
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Directory Platform Comparisons | SuperSimple.Directory vs Competitors</title>
        <meta 
          name="description" 
          content="Compare SuperSimple.Directory with other directory platforms like Brilliant Directories, eDirectory, Hivebrite, and Wild Apricot." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Directory Platform Comparisons | SuperSimple.Directory vs Competitors" />
        <meta property="og:description" content="See how SuperSimple.Directory's AI-powered platform compares to other directory solutions. Find the best platform for your needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supersimple.directory/comparisons" />
        <meta property="og:image" content="https://supersimple.directory/og-image-comparisons.jpg" />
      </Head>

      <MarketingNav currentPath={router.pathname} />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Compare SuperSimple.Directory with Competitors
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                See how our AI-powered directory platform stacks up against other directory solutions.
              </p>
            </div>

            <div className="mt-10 max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-600">
                Looking for a better directory solution? We've created detailed comparisons to help you understand the key differences between SuperSimple.Directory and other platforms. See why our AI-powered approach offers a better experience at a more affordable price.
              </p>
            </div>
          </div>
        </section>

        {/* Comparisons Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {comparisons.map((comparison) => (
                <Link 
                  key={comparison.id} 
                  href={`/comparisons/${comparison.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-xl hover:border-indigo-200 h-full">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600">{comparison.title}</h2>
                      <p className="mt-3 text-gray-600">{comparison.description}</p>
                      
                      <div className="mt-5">
                        <h3 className="text-md font-medium text-gray-900">Why SuperSimple.Directory is better:</h3>
                        <ul className="mt-2 space-y-2">
                          {comparison.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-2 text-gray-600">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-6 flex items-center text-indigo-600">
                        <span className="text-sm font-medium">Read full comparison</span>
                        <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Key Differentiators */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">What Sets Us Apart</h2>
              <p className="mt-4 text-lg text-gray-600">
                Here's why organizations are choosing SuperSimple.Directory over other platforms:
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">AI-Powered Setup</h3>
                <p className="mt-2 text-gray-600">
                  Our AI generates directory schemas and autofills listing data, saving you countless hours of manual setup and data entry compared to other platforms.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Transparent Pricing</h3>
                <p className="mt-2 text-gray-600">
                  Our affordable subscription plans include unlimited directory entries, unlike competitors who charge based on member count or have complex licensing models.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Rapid Launch</h3>
                <p className="mt-2 text-gray-600">
                  While other platforms require days or weeks of setup, SuperSimple.Directory gets you up and running in minutes with AI-assisted configuration.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Better Security</h3>
                <p className="mt-2 text-gray-600">
                  Our platform includes modern security practices by default, with automatic updates and continuous improvement of security measures.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Modern Design</h3>
                <p className="mt-2 text-gray-600">
                  Responsive, mobile-first design is built in, unlike competitors that require separate mobile apps or complex responsive configuration.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Intuitive Interface</h3>
                <p className="mt-2 text-gray-600">
                  Designed for users of all technical abilities, our platform eliminates the steep learning curve found in competitor platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold">
              Ready to Try a Better Directory Platform?
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Join SuperSimple.Directory and see the difference. Launch your AI-powered directory in minutes, not days or weeks.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/auth/signup"
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/features"
                className="ml-4 px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-indigo-500 md:py-4 md:text-lg md:px-10"
              >
                Explore Features
              </Link>
            </div>
            <p className="mt-4 text-sm text-indigo-200">No credit card required. Free trial available on all plans.</p>
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
                <li><Link href="/comparisons" className="text-gray-400 hover:text-white">Comparisons</Link></li>
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