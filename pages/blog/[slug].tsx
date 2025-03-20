import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
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
    featured: true,
    content: `
      <h2>Introduction: Why Business Directories Are Still Relevant in 2024</h2>
      <p>In an age of search engines and social media, you might wonder if business directories are still relevant. The answer is a resounding yes. Business directories continue to serve as powerful tools for local discovery, industry networking, and niche community building. They offer curated, organized information that even the best search engines can't always provide.</p>
      
      <p>In 2024, business directories have evolved beyond simple listings to become comprehensive platforms that connect businesses with customers, provide valuable data analytics, and create new revenue streams for directory owners. With the rise of AI, creating and managing these directories has become easier and more powerful than ever before.</p>
      
      <h2>Step 1: Define Your Directory's Purpose and Audience</h2>
      <p>Before diving into technical solutions, the most important step is to clearly define your directory's purpose and target audience. Ask yourself:</p>
      
      <ul>
        <li><strong>What type of businesses will your directory include?</strong> Will it be a general business directory for a geographic area, or a specialized directory for a specific industry?</li>
        <li><strong>Who will use your directory?</strong> Are you targeting consumers looking for services, businesses networking with each other, or both?</li>
        <li><strong>What value will your directory provide?</strong> Will it help users discover new businesses, compare options, or connect directly with service providers?</li>
      </ul>
      
      <p>For example, you might create a directory of sustainable businesses in your city, a nationwide directory of minority-owned startups, or a global directory of AI service providers. The more specific your focus, the easier it will be to attract both listings and users.</p>
      
      <h2>Step 2: Choose the Right Directory-Building Platform</h2>
      <p>Once you've defined your directory's purpose, you'll need to choose a platform to build it. In 2024, there are several options:</p>
      
      <h3>Option 1: AI-Powered Directory Platforms (Recommended)</h3>
      <p>Platforms like SuperSimple.Directory offer the fastest path to launch with the lowest technical barriers. These AI-powered solutions handle everything from directory structure to data collection, allowing you to create a fully-functional directory in minutes rather than weeks.</p>
      
      <p>Key advantages include:</p>
      <ul>
        <li>AI-generated directory structure based on your description</li>
        <li>Automated data collection for listings</li>
        <li>Built-in SEO optimization</li>
        <li>No coding required</li>
        <li>Scalable as your directory grows</li>
      </ul>
      
      <h3>Option 2: WordPress with Directory Plugins</h3>
      <p>If you're already familiar with WordPress, you can use directory plugins like Business Directory Plugin or Directories Pro. This approach offers good customization options but requires more setup time and technical knowledge.</p>
      
      <h3>Option 3: Custom-Built Directory</h3>
      <p>For maximum customization, you could build a directory from scratch using web frameworks like React, Node.js, or Ruby on Rails. This approach requires significant development resources but gives you complete control over features and user experience.</p>
      
      <h2>Step 3: Define Your Directory's Schema and Fields</h2>
      <p>Your directory schema determines what information you'll collect and display for each listing. In 2024, effective business directories go beyond basic contact information to include rich, detailed content.</p>
      
      <p>Consider including these fields in your schema:</p>
      <ul>
        <li><strong>Basic Information:</strong> Business name, address, phone, website, email</li>
        <li><strong>Rich Media:</strong> Logo, photos, videos, virtual tours</li>
        <li><strong>Social Proof:</strong> Reviews, ratings, testimonials</li>
        <li><strong>Classification:</strong> Categories, tags, service areas</li>
        <li><strong>Business Details:</strong> Hours, pricing, services/products, payment methods</li>
        <li><strong>Social Media:</strong> Links to all profiles</li>
        <li><strong>Unique Attributes:</strong> Certifications, awards, special features</li>
      </ul>
      
      <p>With AI-powered platforms like SuperSimple.Directory, you can simply describe your directory needs, and the AI will generate an appropriate schema with all relevant fields – no technical knowledge required.</p>
      
      <h2>Step 4: Add Listings and Content</h2>
      <p>To launch a successful directory, you'll need a critical mass of listings. Here are strategies for populating your directory:</p>
      
      <h3>Use AI to Gather Initial Data</h3>
      <p>Modern AI tools can help you build your initial database quickly. SuperSimple.Directory's autofill feature, for example, can gather business information from across the web when you provide just a business name or website.</p>
      
      <h3>Import Existing Databases</h3>
      <p>If you have access to existing business databases (such as local chamber of commerce listings), you can often import them via CSV files.</p>
      
      <h3>Incentivize Self-Submission</h3>
      <p>Create a simple submission form and offer incentives for businesses to list themselves, such as:</p>
      <ul>
        <li>Free initial listings</li>
        <li>Featured placement for early adopters</li>
        <li>Access to directory user statistics</li>
      </ul>
      
      <h2>Step 5: Implement Search and Discovery Features</h2>
      <p>The value of your directory comes from how easily users can find what they're looking for. Implement these search and discovery features:</p>
      
      <ul>
        <li><strong>Advanced Search Filters:</strong> Allow users to filter by category, location, ratings, and other attributes</li>
        <li><strong>Map Integration:</strong> Show business locations on an interactive map</li>
        <li><strong>Smart Recommendations:</strong> Suggest related businesses based on user behavior</li>
        <li><strong>Mobile Optimization:</strong> Ensure the directory works well on mobile devices</li>
      </ul>
      
      <h2>Step 6: Launch and Promote Your Directory</h2>
      <p>Once your directory is ready, it's time to launch and promote it:</p>
      
      <h3>SEO Optimization</h3>
      <p>Ensure each listing page and category page is optimized for search engines with:</p>
      <ul>
        <li>Descriptive titles and meta descriptions</li>
        <li>Structured data markup (Schema.org)</li>
        <li>Mobile-friendly design</li>
        <li>Fast loading times</li>
      </ul>
      
      <h3>Marketing Strategies</h3>
      <p>Promote your directory through:</p>
      <ul>
        <li>Local or industry-specific partnerships</li>
        <li>Content marketing (guides, blog posts about your directory's niche)</li>
        <li>Social media campaigns</li>
        <li>Email outreach to potential listers</li>
        <li>Local PR for geographically-focused directories</li>
      </ul>
      
      <h2>Step 7: Monetization Strategies</h2>
      <p>In 2024, there are multiple ways to generate revenue from your business directory:</p>
      
      <h3>Listing Fees</h3>
      <ul>
        <li><strong>Freemium Model:</strong> Basic listings free, premium features paid</li>
        <li><strong>Subscription Model:</strong> Monthly or annual fee for listings</li>
        <li><strong>One-time Listing Fee:</strong> Single payment for permanent listing</li>
      </ul>
      
      <h3>Enhanced Visibility Options</h3>
      <ul>
        <li><strong>Featured Listings:</strong> Prominent placement in search results</li>
        <li><strong>Category Sponsorships:</strong> Exclusive positioning within categories</li>
        <li><strong>Banner Advertising:</strong> Display ads throughout the directory</li>
      </ul>
      
      <h3>Value-Added Services</h3>
      <ul>
        <li><strong>Lead Generation:</strong> Charging for customer inquiries</li>
        <li><strong>Analytics Access:</strong> Providing business intelligence to listers</li>
        <li><strong>Verified Reviews:</strong> Managing a trusted review system</li>
      </ul>
      
      <h2>Conclusion: The Future of Business Directories</h2>
      <p>Business directories in 2024 are dynamic platforms that connect communities, provide valuable services, and generate revenue. With AI-powered tools making directory creation more accessible than ever, there's never been a better time to start your own directory.</p>
      
      <p>The key to success is focusing on your niche, providing genuine value to both businesses and users, and continuously improving your platform based on feedback and analytics.</p>
      
      <p>Ready to create your own business directory? Get started today with <a href="/auth/signup">SuperSimple.Directory's AI-powered platform</a> and launch your directory in minutes.</p>
    `,
    relatedPosts: [2, 3, 4]
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
    featured: true,
    content: `
      <p>This is a sample content for the "Best Practices for Managing a Member Directory" article. In a real implementation, this would be a full article.</p>
    `,
    relatedPosts: [1, 5, 8]
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
    featured: true,
    content: `
      <p>This is a sample content for the "How to Monetize Your Online Directory" article. In a real implementation, this would be a full article.</p>
    `,
    relatedPosts: [1, 4, 9]
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
    featured: true,
    content: `
      <p>This is a sample content for the "AI and the Future of Online Directories" article. In a real implementation, this would be a full article.</p>
    `,
    relatedPosts: [1, 3, 7]
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
    featured: false,
    content: `
      <p>This is a sample content for the "How a Local Business Chamber Built a Thriving Directory in Just One Day" article. In a real implementation, this would be a full article.</p>
    `,
    relatedPosts: [1, 2, 8]
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
    featured: false,
    content: `
      <p>This is a sample content for the "How an Activist Network Used AI to Create a Global Volunteer Directory" article. In a real implementation, this would be a full article.</p>
    `,
    relatedPosts: [4, 5, 8]
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
    featured: false,
    content: `
      <p>This is a sample content for the "SEO Tips for Directory Websites: Boost Your Visibility" article. In a real implementation, this would be a full article.</p>
    `,
    relatedPosts: [1, 3, 9]
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
    featured: false,
    content: `
      <p>This is a sample content for the "How a University Alumni Association Connected Thousands of Graduates" article. In a real implementation, this would be a full article.</p>
    `,
    relatedPosts: [2, 5, 6]
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
    featured: false,
    content: `
      <p>This is a sample content for the "10 Essential Features Every Modern Directory Should Have" article. In a real implementation, this would be a full article.</p>
    `,
    relatedPosts: [1, 3, 7]
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
    featured: false,
    content: `
      <p>This is a sample content for the "User-Generated Content: Pros and Cons for Directory Owners" article. In a real implementation, this would be a full article.</p>
    `,
    relatedPosts: [2, 7, 9]
  }
];

// Function to get a post by slug
const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};

// Function to get related posts by IDs
const getRelatedPostsByIds = (ids: number[]) => {
  return blogPosts.filter(post => ids.includes(post.id));
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    // Must be false for static export
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const post = getPostBySlug(slug);
    
    if (!post) {
      return {
        notFound: true
      };
    }

    const relatedPosts = getRelatedPostsByIds(post.relatedPosts);

    return {
      props: {
        post,
        relatedPosts
      }
      // Remove revalidate property for static export
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    
    // Return a default post if there's an error
    return { 
      notFound: true
    };
  }
};

interface BlogPostProps {
  post: (typeof blogPosts)[0];
  relatedPosts: typeof blogPosts;
}

export default function BlogPost({ post, relatedPosts }: BlogPostProps) {
  const router = useRouter();

  // More robust error handling with a better fallback UI
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Post Not Found</h1>
          <p className="text-gray-700 mb-4">The blog post you're looking for could not be found.</p>
          <Link href="/blog" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | SuperSimple.Directory Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={`${post.title} | SuperSimple.Directory Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://supersimple.directory/blog/${post.slug}`} />
        <meta property="og:image" content={`https://supersimple.directory${post.image}`} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:section" content={post.category} />
        
        {/* Schema Markup for Blog Post */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": `https://supersimple.directory${post.image}`,
            "datePublished": new Date(post.date).toISOString(),
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "SuperSimple.Directory",
              "logo": {
                "@type": "ImageObject",
                "url": "https://supersimple.directory/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://supersimple.directory/blog/${post.slug}`
            }
          })}
        </script>
      </Head>

      {/* Navigation Bar */}
      <MarketingNav currentPath={router.pathname} />

      <main className="pt-16">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/blog" className="ml-2 text-gray-500 hover:text-gray-700">Blog</Link>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-700 font-medium">{post.title}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Link href={`/blog/category/${post.category.toLowerCase().replace(/ /g, '-')}`}>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                  {post.category}
                </span>
              </Link>
              <span className="text-gray-500">{post.date}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold text-lg">
                  {post.author.split(' ').map(name => name[0]).join('')}
                </div>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">{post.author}</p>
                <p className="text-gray-500 text-sm">{post.authorRole}</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div 
            className="mb-10 rounded-lg overflow-hidden bg-gray-100 h-96"
            style={{
              backgroundImage: `url(${post.image.replace('.jpg', '.svg')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <span className="sr-only">{post.title}</span>
          </div>

          {/* Article Content */}
          <div className="prose prose-indigo prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://supersimple.directory/blog/${post.slug}`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-400 text-white hover:bg-blue-500"
              >
                <span className="sr-only">Share on Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://supersimple.directory/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-700 text-white hover:bg-blue-800"
              >
                <span className="sr-only">Share on LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a 
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`I thought you might find this article interesting: ${post.title} - https://supersimple.directory/blog/${post.slug}`)}`} 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
              >
                <span className="sr-only">Share via Email</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-8 bg-indigo-50 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold text-xl">
                  {post.author.split(' ').map(name => name[0]).join('')}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">About {post.author}</h3>
                <p className="text-gray-600">{post.authorRole} at SuperSimple.Directory</p>
                <p className="mt-2 text-gray-600">
                  {post.author} specializes in directory technologies and helps organizations build effective online directories. With years of experience in the industry, they provide valuable insights and best practices.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <div 
                      className="w-full h-48 bg-indigo-100 flex items-center justify-center"
                      style={{
                        backgroundImage: `url(${relatedPost.image.replace('.jpg', '.svg')})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <span className="sr-only">{relatedPost.title}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-2">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <Link 
                      href={`/blog/${relatedPost.slug}`}
                      className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center"
                    >
                      Read Article
                      <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
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
              Ready to Build Your Own Directory?
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Apply what you've learned and create your own AI-powered directory in minutes.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg md:px-10"
              >
                Start Your Free Directory
              </Link>
              <p className="mt-3 text-sm text-indigo-200">No credit card required</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterComponent />
    </>
  );
}