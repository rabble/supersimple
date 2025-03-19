import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import MarketingNav from '../components/ui/MarketingNav';

export default function UseCases() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use cases content
  const useCases = [
    {
      id: "associations",
      title: "Associations & Membership Groups",
      subtitle: "Professional Organizations, Trade Groups, Clubs",
      description: "Simplify member directories for professional organizations, trade associations, and member-based communities. Create a comprehensive, searchable member database that's easy to maintain and update.",
      benefits: [
        "Build a private or public directory of members",
        "Let users search by profession, location, or industry expertise",
        "Offer a member login area for exclusive networking",
        "Automate the member listing process with AI"
      ],
      example: {
        title: "National Bar Association Directory",
        description: "A legal association created a comprehensive directory of 10,000+ certified lawyers, searchable by specialization, location, and languages spoken. The AI-assisted data entry saved weeks of manual work.",
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.479m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      )
    },
    {
      id: "business-directories",
      title: "Local Business Directories",
      subtitle: "City Guides, Industry Listings",
      description: "Create valuable resources for local communities by building comprehensive business directories. Help customers discover and connect with businesses in their area through an intuitive, searchable platform.",
      benefits: [
        "List businesses, shops, restaurants, or service providers",
        "Use interactive maps to help customers find businesses nearby",
        "Offer paid featured listings to monetize the directory",
        "Enable automated data gathering with AI"
      ],
      example: {
        title: "Regional Chamber of Commerce Directory",
        description: "A chamber of commerce built a directory of 500+ local businesses with interactive maps, verified information, and extended profiles for premium members, driving significant foot traffic to small businesses.",
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
        </svg>
      )
    },
    {
      id: "nonprofits",
      title: "Non-Profits & Activist Networks",
      subtitle: "Community & Volunteer Directories",
      description: "Connect volunteers, donors, and community members with causes they care about. Build a directory that makes it easy to find and engage with social impact organizations and initiatives.",
      benefits: [
        "Organize and list volunteer groups, social projects, and advocacy organizations",
        "Let people find and connect with causes they care about",
        "Manage chapters and regional organizations in a structured way",
        "Streamline volunteer recruitment and management"
      ],
      example: {
        title: "Climate Justice Network Directory",
        description: "An environmental coalition created a directory of 200+ climate activism groups organized by state, focus area, and volunteer opportunities. The directory became a central hub for coordinating nationwide initiatives.",
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      )
    },
    {
      id: "alumni",
      title: "Alumni Networks",
      subtitle: "Education, University Communities",
      description: "Keep your educational community connected long after graduation. Build an alumni directory that fosters ongoing relationships, mentorship opportunities, and professional networking.",
      benefits: [
        "Connect former students and faculty in a searchable alumni database",
        "Facilitate mentorship programs and career networking",
        "Organize reunions and events with integrated event tools",
        "Enable profile updates by alumni themselves"
      ],
      example: {
        title: "College Alumni Network",
        description: "A university created an alumni directory where 25,000+ graduates can find each other based on graduation year, major, industry, and location. The platform has facilitated hundreds of mentor relationships and career opportunities.",
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      )
    },
    {
      id: "events",
      title: "Event Directories",
      subtitle: "Conferences, Festivals, Trade Shows",
      description: "Showcase your event's speakers, exhibitors, sponsors, and sessions in one organized directory. Make it easy for attendees to discover and engage with all aspects of your conference or festival.",
      benefits: [
        "List events, speakers, exhibitors, or sponsors",
        "Allow users to browse by category, date, or location",
        "Offer ticketing and registration integration (Pro/Enterprise plans)",
        "Enable attendees to plan their event experience"
      ],
      example: {
        title: "Tech Conference Directory",
        description: "A tech conference organizer created a directory of 150+ speakers and 75 exhibitors with comprehensive profiles, presentation schedules, and booth locations. Attendees reported a significantly improved experience finding relevant sessions.",
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
      )
    },
    {
      id: "freelancers",
      title: "Freelancer & Job Boards",
      subtitle: "Professional Listings, Hiring Networks",
      description: "Connect talent with opportunities through a specialized directory of professionals, contractors, or job listings. Create a dynamic marketplace where skills and opportunities can easily find each other.",
      benefits: [
        "Showcase freelancers, consultants, and experts in different fields",
        "Provide job postings and work opportunities",
        "Enable filtering by skills, rates, and availability",
        "Facilitate direct connections between clients and talent"
      ],
      example: {
        title: "Remote Developer Directory",
        description: "A tech company built a directory of 300+ remote software developers organized by programming language, experience level, and availability. Both freelancers and hiring managers reported finding quality matches quickly.",
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
      )
    }
  ];

  // Case studies
  const caseStudies = [
    {
      title: "How a Chamber of Commerce Created a Thriving Business Directory",
      organization: "Downtown Business Alliance",
      challenge: "The Downtown Business Alliance needed a way to help local businesses gain visibility and connect with customers in their area. They tried using spreadsheets and a basic website listing, but information quickly became outdated and the experience was poor for users.",
      solution: "Using SuperSimple.Directory, they created a comprehensive business directory with custom fields for business hours, services offered, and COVID safety measures. The AI autofill feature helped populate accurate data for hundreds of businesses in just days instead of weeks.",
      results: [
        "300+ businesses listed in the first month",
        "47% increase in online traffic to member businesses",
        "Self-service listing submissions reduced administrative workload by 80%",
        "Interactive map feature helped tourists easily find local businesses"
      ],
      image: "/chamber-example.jpg"
    },
    {
      title: "How a Professional Association Revolutionized Member Networking",
      organization: "Health Practitioners Network",
      challenge: "A growing association of health practitioners needed to help their 5,000+ members connect with each other for referrals, mentoring, and professional development. Their existing PDF directory was difficult to search and always out of date.",
      solution: "They implemented SuperSimple.Directory with custom fields for specialties, certifications, and insurance accepted. Members could update their own information, and patients could search for practitioners using multiple criteria.",
      results: [
        "95% of members created and maintained their own profiles",
        "Search functionality led to 300+ new patient referrals per month",
        "Member renewal rates increased by 23% after directory implementation",
        "Administrative costs reduced by $15,000 annually"
      ],
      image: "/association-example.jpg"
    }
  ];

  return (
    <>
      <Head>
        <title>Use Cases – AI-Powered Directories for Associations, Businesses & Communities | SuperSimple.Directory</title>
        <meta name="description" content="SuperSimple.Directory makes it easy to create AI-powered directories for businesses, associations, nonprofits, alumni networks, and events. See how you can use it today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Use Cases – AI-Powered Directories for Associations, Businesses & Communities" />
        <meta property="og:description" content="See how organizations use SuperSimple.Directory to create powerful directories for their communities, businesses, and professional networks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supersimple.directory/use-cases" />
        <meta property="og:image" content="https://supersimple.directory/og-image-use-cases.jpg" />
      </Head>

      <MarketingNav currentPath={router.pathname} />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Powerful Directories for Any <span className="text-indigo-600">Community, Organization, or Business</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
              SuperSimple.Directory makes it effortless to create a directory tailored to your needs—whether for businesses, nonprofits, communities, or professional networks.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="#examples"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
              >
                See Examples
              </a>
            </div>
          </div>
        </section>

        {/* Quick nav for use cases */}
        <section className="bg-white py-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {useCases.map((useCase) => (
                <a
                  key={useCase.id}
                  href={`#${useCase.id}`}
                  className="px-4 py-2 text-sm md:text-base font-medium text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                >
                  {useCase.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Use Cases</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Directories for Every Need
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Discover how different organizations leverage SuperSimple.Directory to connect people and share valuable information.
              </p>
            </div>

            <div className="space-y-24">
              {useCases.map((useCase, index) => (
                <div key={useCase.id} id={useCase.id} className={`scroll-mt-24 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:flex md:items-center md:space-x-8 md:space-x-reverse`}>
                  {/* Icon/Image column */}
                  <div className="md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
                    <div className="bg-indigo-50 rounded-xl p-8 w-full max-w-sm flex items-center justify-center">
                      <div>
                        <div className="flex justify-center">
                          {useCase.icon}
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-center text-gray-900">{useCase.title}</h3>
                        <p className="mt-1 text-sm text-center text-indigo-600">{useCase.subtitle}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content column */}
                  <div className="md:w-2/3 md:pl-8">
                    <div>
                      <p className="text-lg text-gray-700 mb-6">
                        {useCase.description}
                      </p>
                      
                      {/* Benefits */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">How It Helps:</h4>
                        <ul className="space-y-2">
                          {useCase.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Example */}
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-World Example:</h4>
                        <p className="text-gray-800 font-medium">{useCase.example.title}</p>
                        <p className="text-gray-600 mt-1">{useCase.example.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="examples" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Success Stories</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Case Studies
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                See how organizations have transformed their communities with SuperSimple.Directory.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {caseStudies.map((caseStudy, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                  <div className="p-8">
                    <div className="h-40 bg-indigo-100 rounded-lg mb-6 flex items-center justify-center">
                      <div className="text-center p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-indigo-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                        </svg>
                        <h4 className="mt-3 text-lg font-medium text-indigo-800">{caseStudy.organization}</h4>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{caseStudy.title}</h3>
                    
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">The Challenge:</h4>
                      <p className="text-gray-600">{caseStudy.challenge}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">The Solution:</h4>
                      <p className="text-gray-600">{caseStudy.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">The Results:</h4>
                      <ul className="space-y-2">
                        {caseStudy.results.map((result, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry-specific benefits section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">By Industry</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Benefits for Your Specific Needs
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                No matter what industry you're in, SuperSimple.Directory provides unique benefits tailored to your requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">For Professional Associations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Field-specific credentials and specialization display</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Member-only content and contact protection</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Automated credential verification</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">For Community Organizations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Volunteer matching and hour tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Resource needs and availability tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Multiple location and chapter management</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">For Chambers of Commerce</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Business hours and holiday schedules</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Local tourism integration and nearby attractions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Membership tier and business category filtering</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">For Educational Institutions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Alumni career path visualization</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Class year and major filtering tools</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Mentorship and networking program integration</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">For Event Organizers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Session and schedule integration</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Speaker and exhibitor profiles with contact options</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Floorplan and booth location mapping</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">For Talent Networks</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Portfolio and work sample showcase</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Skills and expertise search capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Availability status and project capacity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Start Your Directory Today!
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              No matter your industry, SuperSimple.Directory makes it easy to create a powerful, AI-driven directory.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg md:px-8 md:py-4"
              >
                Get Started for Free
              </Link>
              <p className="mt-3 text-sm text-indigo-200">No credit card required</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Questions about how our platform can work for your specific use case? Find answers below.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Can I create multiple directories for different purposes?</h3>
                <p className="mt-2 text-gray-600">Yes! Your account can manage multiple directories, each with its own unique structure, design, and purpose. This is perfect for organizations that need both a member directory and a resources directory, for example.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Can I restrict access to my directory to members only?</h3>
                <p className="mt-2 text-gray-600">Absolutely. You have complete control over your directory's privacy settings. You can make it fully public, restrict it to members only, or even set different visibility levels for different sections or pieces of information.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Can I customize the fields in my directory?</h3>
                <p className="mt-2 text-gray-600">Yes, you can fully customize all fields in your directory. Our AI will suggest fields based on your directory type, but you have complete control to add, remove, or modify fields to match your exact needs.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">How accurate is the AI data autofill?</h3>
                <p className="mt-2 text-gray-600">Our AI autofill is highly accurate for most standard business and organizational information. It gathers data from multiple public sources to ensure reliability. However, you always have the opportunity to review and edit information before approving it.</p>
              </div>
            </div>
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
                <li><Link href="/use-cases" className="text-gray-400 hover:text-white">Use Cases</Link></li>
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