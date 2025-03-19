import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import MarketingNav from '../../components/ui/MarketingNav';
import FooterComponent from '../../components/ui/FooterComponent';

// Sample blog data - In a real implementation, this would be fetched from an API or database
const blogPosts = [
  {
    id: 1,
    title: "How to Start a Business Directory in 2024",
    slug: "how-to-start-business-directory-2024",
    excerpt: "A comprehensive guide to launching a successful business directory in 2024, including key features, monetization strategies, and growth tactics.",
    category: "Getting Started",
    date: "March 15, 2024",
    author: "Sarah Johnson",
    authorRole: "Product Manager",
    image: "/images/blog/business-directory.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Best Practices for Managing a Member Directory",
    slug: "best-practices-member-directory-management",
    excerpt: "Learn proven strategies for maintaining an up-to-date, engaging member directory that provides real value to your organization and its members.",
    category: "Directory Management",
    date: "March 10, 2024",
    author: "Michael Chen",
    authorRole: "Community Lead",
    image: "/images/blog/member-directory.jpg",
    featured: true
  },
  {
    id: 3,
    title: "How to Monetize Your Online Directory",
    slug: "monetize-online-directory-guide",
    excerpt: "Explore different revenue models for your directory, from premium listings and sponsored features to subscription access and pay-per-lead.",
    category: "Monetization",
    date: "March 5, 2024",
    author: "Jessica Taylor",
    authorRole: "Marketing Specialist",
    image: "/images/blog/monetization.jpg",
    featured: true
  },
  {
    id: 4,
    title: "AI and the Future of Online Directories",
    slug: "ai-future-online-directories",
    excerpt: "Discover how artificial intelligence is transforming directory management, from automated data collection to personalized recommendations.",
    category: "AI & Innovation",
    date: "February 28, 2024",
    author: "David Rodriguez",
    authorRole: "Tech Strategist",
    image: "/images/blog/ai-directories.jpg",
    featured: true
  },
  {
    id: 5,
    title: "How a Local Business Chamber Built a Thriving Directory in Just One Day",
    slug: "local-chamber-directory-case-study",
    excerpt: "Case study: How the Downtown Business Alliance created a comprehensive business directory that became a valuable community resource.",
    category: "Case Studies",
    date: "February 25, 2024",
    author: "Robert Williams",
    authorRole: "Customer Success",
    image: "/images/blog/chamber-case-study.jpg",
    featured: false
  },
  {
    id: 6,
    title: "How an Activist Network Used AI to Create a Global Volunteer Directory",
    slug: "activist-network-volunteer-directory",
    excerpt: "Learn how ClimateAction Network connected thousands of volunteers worldwide with an AI-powered volunteer matching directory.",
    category: "Case Studies",
    date: "February 20, 2024",
    author: "Emma Garcia",
    authorRole: "Customer Success",
    image: "/images/blog/volunteer-directory.jpg",
    featured: false
  },
  {
    id: 7,
    title: "SEO Tips for Directory Websites: Boost Your Visibility",
    slug: "seo-tips-directory-websites",
    excerpt: "Practical SEO strategies specific to directory websites that will help your listings rank higher and attract more organic traffic.",
    category: "Marketing",
    date: "February 15, 2024",
    author: "Alex Thompson",
    authorRole: "SEO Specialist",
    image: "/images/blog/seo-directory.jpg",
    featured: false
  },
  {
    id: 8,
    title: "How a University Alumni Association Connected Thousands of Graduates",
    slug: "university-alumni-directory-case-study",
    excerpt: "Case study: How State University created an engaging alumni directory that strengthened their network and boosted donations.",
    category: "Case Studies",
    date: "February 10, 2024",
    author: "Nicole Adams",
    authorRole: "Customer Success",
    image: "/images/blog/alumni-directory.jpg",
    featured: false
  },
  {
    id: 9,
    title: "10 Essential Features Every Modern Directory Should Have",
    slug: "essential-features-modern-directory",
    excerpt: "From advanced search filters to mobile responsiveness, discover the must-have features that users expect from directories today.",
    category: "Directory Features",
    date: "February 5, 2024",
    author: "James Wilson",
    authorRole: "Product Designer",
    image: "/images/blog/essential-features.jpg",
    featured: false
  },
  {
    id: 10,
    title: "User-Generated Content: Pros and Cons for Directory Owners",
    slug: "user-generated-content-directories",
    excerpt: "Explore the benefits and challenges of allowing users to submit and manage listings in your directory, with strategies for success.",
    category: "Directory Management",
    date: "January 30, 2024",
    author: "Sophie Martin",
    authorRole: "Community Manager",
    image: "/images/blog/user-content.jpg",
    featured: false
  }
];

// All unique categories for filtering
const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

export default function BlogIndex() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <>
      <Head>
        <title>Blog – SuperSimple.Directory | Directory Tips, AI Insights & Success Stories</title>
        <meta name="description" content="Learn how to create, manage, and monetize AI-powered directories. Explore expert insights, best practices, and case studies with SuperSimple.Directory." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Blog – SuperSimple.Directory | Directory Tips, AI Insights & Success Stories" />
        <meta property="og:description" content="Learn how to create, manage, and monetize AI-powered directories. Explore expert insights, best practices, and case studies with SuperSimple.Directory." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://supersimple.directory/blog" />
        <meta property="og:image" content="https://supersimple.directory/og-image-blog.jpg" />
        
        {/* Schema Markup for Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "SuperSimple.Directory Knowledge Center",
            "description": "Learn how to create, manage, and monetize AI-powered directories. Explore expert insights, best practices, and case studies.",
            "url": "https://supersimple.directory/blog",
            "publisher": {
              "@type": "Organization",
              "name": "SuperSimple.Directory",
              "logo": {
                "@type": "ImageObject",
                "url": "https://supersimple.directory/logo.png"
              }
            }
          })}
        </script>
      </Head>

      {/* Navigation Bar */}
      <MarketingNav currentPath={router.pathname} />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Your Guide to Building, Managing, and Monetizing Directories
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
              Stay ahead with expert insights, AI-powered directory tips, and real-world success stories.
            </p>
            <div className="mt-10">
              <a
                href="#latest-articles"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-8 md:py-4"
              >
                Read the Latest Articles
              </a>
            </div>
          </div>
        </section>

        {/* Featured Articles Carousel */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Featured Content</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Essential reading for directory builders and managers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <div 
                      className="w-full h-48 bg-indigo-100 flex items-center justify-center"
                      style={{
                        backgroundImage: `url(${post.image.replace('.jpg', '.svg')})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <span className="sr-only">{post.title}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">{post.date}</div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center"
                      >
                        Read More
                        <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Feed with Search and Filters */}
        <section id="latest-articles" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Latest Articles</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Browse our collection of guides, tutorials, and case studies
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <div className="md:w-2/3">
                  <label htmlFor="search" className="sr-only">Search articles</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search articles..."
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:w-1/3">
                  <label htmlFor="category" className="sr-only">Filter by category</label>
                  <select
                    id="category"
                    name="category"
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'All' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      {/* Use a more reliable approach to images */}
                      <div 
                        className="w-full h-48 bg-indigo-100 flex items-center justify-center"
                        style={{
                          backgroundImage: `url(${post.image.replace('.jpg', '.svg')})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <span className="sr-only">{post.title}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">{post.date}</div>
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center"
                        >
                          Read More
                          <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No articles found</h3>
                <p className="mt-2 text-gray-500">Try changing your search or filter criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">Real-World Success Stories</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                See how organizations are using SuperSimple.Directory to solve real problems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.filter(post => post.category === "Case Studies").slice(0, 3).map((post) => (
                <div key={post.id} className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <div 
                      className="w-full h-48 bg-indigo-100 flex items-center justify-center"
                      style={{
                        backgroundImage: `url(${post.image.replace('.jpg', '.svg')})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <span className="sr-only">{post.title}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-2">
                      Case Study
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="block w-full text-center px-4 py-2 border border-indigo-600 rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Read Case Study
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Turn Knowledge into Action!
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Start your own AI-powered directory today with SuperSimple.Directory.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg md:px-10"
              >
                Create Your Directory Now
              </Link>
              <p className="mt-3 text-sm text-indigo-200">No credit card required for free plan</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterComponent />
    </>
  );
}