/**
 * Next.js on Cloudflare Workers
 */

// Helper function to determine content type based on file extension
function getContentType(path) {
  const extension = path.split('.').pop().toLowerCase();
  const contentTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'txt': 'text/plain',
    'xml': 'application/xml',
    'pdf': 'application/pdf',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'eot': 'application/vnd.ms-fontobject',
    'otf': 'font/otf',
    'webp': 'image/webp'
  };
  
  return contentTypes[extension] || 'application/octet-stream';
}

// Create a simple HTML response function
function htmlResponse(content, status = 200) {
  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${status === 200 ? 'Directory App' : 'Error'}</title>
        <style>
          /* Base styles */
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
            line-height: 1.6; 
            padding: 2rem; 
            max-width: 1200px; 
            margin: 0 auto;
            color: #333;
            background-color: #f9fafb;
          }
          * { box-sizing: border-box; }
          h1, h2, h3 { color: #111; margin-top: 1.5rem; margin-bottom: 1rem; }
          h1 { font-size: 2.25rem; font-weight: 700; }
          h2 { font-size: 1.75rem; font-weight: 600; }
          h3 { font-size: 1.5rem; font-weight: 600; }
          p { margin-bottom: 1.5rem; }
          
          /* Links */
          a { color: #0070f3; text-decoration: none; transition: color 0.2s ease; }
          a:hover { text-decoration: underline; color: #0051a8; }
          
          /* Layout */
          .container { width: 100%; padding: 0 1rem; }
          .flex { display: flex; }
          .flex-col { flex-direction: column; }
          .items-center { align-items: center; }
          .justify-between { justify-content: space-between; }
          .gap-4 { gap: 1rem; }
          .mt-4 { margin-top: 1rem; }
          .mb-4 { margin-bottom: 1rem; }
          .p-4 { padding: 1rem; }
          
          /* Cards */
          .card {
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          }
          
          /* Forms */
          form { margin-bottom: 2rem; }
          label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
          input, textarea, select {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            font-size: 1rem;
          }
          input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #0070f3;
            box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
          }
          button {
            background-color: #0070f3;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }
          button:hover {
            background-color: #0051a8;
          }
          
          /* Grid */
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }
          
          /* Header & Navigation */
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            margin-bottom: 2rem;
            border-bottom: 1px solid #e5e7eb;
          }
          nav {
            display: flex;
            gap: 1.5rem;
          }
          
          /* Buttons */
          .button {
            display: inline-block;
            background-color: #0070f3;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease;
            text-align: center;
          }
          .button:hover {
            background-color: #0051a8;
            text-decoration: none;
          }
          
          /* Utilities */
          .text-center { text-align: center; }
          .font-bold { font-weight: 700; }
          .text-sm { font-size: 0.875rem; }
          .text-lg { font-size: 1.125rem; }
          .text-gray-600 { color: #4b5563; }
          .bg-gray-100 { background-color: #f3f4f6; }
          .rounded { border-radius: 0.375rem; }
          .shadow { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>`,
    { 
      status, 
      headers: { 'Content-Type': 'text/html' }
    }
  );
}

// Function to serve static assets
async function serveStaticAsset(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Check if this is a static asset request
    if (pathname.startsWith('/_next/') || pathname.startsWith('/static/')) {
      // Try to get the asset from KV
      const assetKey = pathname.startsWith('/') ? pathname.slice(1) : pathname;
      
      // Try to fetch from site assets
      try {
        if (env.ASSETS) {
          const asset = await env.ASSETS.fetch(new Request(url));
          if (asset && asset.ok) {
            // Determine content type based on file extension
            const contentType = getContentType(pathname);
            
            // Return the asset with appropriate content type
            return new Response(asset.body, {
              headers: { 
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable'
              }
            });
          }
        }
      } catch (error) {
        console.error('Error fetching asset:', error);
        // Continue execution, don't throw
      }
    }
    return null; // Not a static asset or not found
  } catch (error) {
    console.error('Error serving static asset:', error);
    return null;
  }
}

// Function to serve the Next.js app
async function serveNextJsApp(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // First try to serve static assets
  const staticAsset = await serveStaticAsset(request, env);
  if (staticAsset) {
    return staticAsset;
  }
  
  // For API routes, proxy to your Next.js API
  if (pathname.startsWith('/api/')) {
    // In a real implementation, you would proxy this to your Next.js API
    return new Response(JSON.stringify({
      message: 'API endpoint',
      path: pathname,
      timestamp: new Date().toISOString()
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // Serve the homepage
  if (pathname === '/' || pathname === '') {
    return htmlResponse(`
      <header>
        <div>
          <h1>AI-Powered Directory Platform</h1>
        </div>
        <nav>
          <a href="/directories">Browse Directories</a>
          <a href="/pricing">Pricing</a>
          <a href="/auth/signup">Sign Up</a>
          <a href="/auth/login">Login</a>
        </nav>
      </header>
      
      <div class="container">
        <div class="card">
          <h1>AI-Powered Directory Platform – Build Directories in Minutes</h1>
          <p class="text-lg">No coding or manual data entry required. Our intelligent AI Agents discover and organize listings from across the web and your own data sources, so you can focus on growing your community or business.</p>
          <div class="flex gap-4 mt-4">
            <a href="/directories" class="button">Browse Directories</a>
            <a href="/auth/signup" class="button">Sign Up</a>
          </div>
        </div>
        
        <div class="card mt-4">
          <h2>Welcome to Directory SaaS</h2>
          <p>Create, customize, and manage directories for your organization, community, or business with minimal setup. Our platform's AI Agents automate data collection and classification from across the web and your own spreadsheets—just review and publish.</p>
          
          <div style="margin: 2rem 0; text-align: center;">
            <img src="https://placehold.co/600x400?text=AI+Directory+Demo" alt="AI Directory Demo" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <p class="text-sm text-gray-600 mt-4">See how our AI automatically collects and organizes listings</p>
          </div>
        </div>
        
        <h2 class="text-center mt-4">Key Features</h2>
        <p class="text-center text-gray-600">Everything you need to build powerful directories</p>
        
        <div class="grid mt-4">
          <div class="card">
            <h3>Effortless Data Collection</h3>
            <p>Our AI Agents scour the web, social media, and your own proprietary data sources to find relevant listings and populate your directory automatically. Simply approve or refine as needed.</p>
          </div>
          
          <div class="card">
            <h3>Customizable Schemas & Design</h3>
            <p>Define custom fields, categories, and a fully branded look on your own domain name to suit any niche—from local business directories to activist networks.</p>
          </div>
          
          <div class="card">
            <h3>Powerful Search & Filter</h3>
            <p>Enable users to find exactly what they need, fast. Add location filters, categories, ratings, and more for a seamless search experience.</p>
          </div>
          
          <div class="card">
            <h3>User Management & Monetization</h3>
            <p>Control member roles and permissions, offer premium listings or paid memberships, and integrate with popular payment gateways.</p>
          </div>
          
          <div class="card">
            <h3>SEO-Friendly & Scalable</h3>
            <p>Built-in schema markup and optimized pages help your directories rank higher on search engines—whether you have 100 listings or 100,000. Full data export available anytime.</p>
          </div>
          
          <div class="card">
            <h3>AI-Powered Insights & Recommendations</h3>
            <p>Our intelligent AI Agents analyze your directory data to provide actionable insights, identify trends, and recommend optimizations to increase engagement and growth.</p>
          </div>
        </div>
        
        <div class="card mt-4">
          <h2 class="text-center">Why Choose Us?</h2>
          <div class="grid" style="grid-template-columns: repeat(3, 1fr);">
            <div class="p-4">
              <h3>Save Time & Reduce Costs</h3>
              <p>Skip the tedious data entry—let the AI handle the heavy lifting.</p>
            </div>
            <div class="p-4">
              <h3>Launch Faster</h3>
              <p>Get a fully functional, professional directory up and running in days, not weeks.</p>
            </div>
            <div class="p-4">
              <h3>Flexible & Future-Proof</h3>
              <p>Scale up effortlessly, add new fields or features without rebuilding from scratch.</p>
            </div>
          </div>
        </div>
        
        <div class="card mt-4 text-center">
          <h2>Ready to Get Started?</h2>
          <p>Join hundreds of organizations leveraging our AI Agents to create powerful directories for their communities, industries, and local businesses.</p>
          <div class="flex gap-4 mt-4" style="justify-content: center;">
            <a href="/auth/signup" class="button">Sign Up Now</a>
            <a href="/dashboard" class="button" style="background-color: #4CAF50;">Go to Dashboard</a>
          </div>
          <p class="text-sm text-gray-600 mt-4">Free trial available. No credit card required.</p>
        </div>
      </div>
    `);
  }
  
  // Handle auth routes
  if (pathname.startsWith('/auth/')) {
    if (pathname === '/auth/login') {
      return htmlResponse(`
        <header>
          <div>
            <h1>Directory SaaS Platform</h1>
          </div>
          <nav>
            <a href="/">Home</a>
            <a href="/directories">Browse Directories</a>
            <a href="/pricing">Pricing</a>
            <a href="/auth/signup">Sign Up</a>
          </nav>
        </header>
        
        <div class="container">
          <div class="card" style="max-width: 500px; margin: 0 auto;">
            <h1>Login</h1>
            <form>
              <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit">Login</button>
            </form>
            <p class="mt-4 text-center">Don't have an account? <a href="/auth/signup">Sign up</a></p>
          </div>
        </div>
      `);
    }
    
    if (pathname === '/auth/signup') {
      return htmlResponse(`
        <header>
          <div>
            <h1>Directory SaaS Platform</h1>
          </div>
          <nav>
            <a href="/">Home</a>
            <a href="/directories">Browse Directories</a>
            <a href="/pricing">Pricing</a>
            <a href="/auth/login">Login</a>
          </nav>
        </header>
        
        <div class="container">
          <div class="card" style="max-width: 500px; margin: 0 auto;">
            <h1>Sign Up</h1>
            <form>
              <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit">Sign Up</button>
            </form>
            <p class="mt-4 text-center">Already have an account? <a href="/auth/login">Login</a></p>
          </div>
        </div>
      `);
    }
  }
  
  // Handle dashboard
  if (pathname === '/dashboard') {
    return htmlResponse(`
      <header>
        <div>
          <h1>Directory SaaS Platform</h1>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/directories">Browse Directories</a>
          <a href="/pricing">Pricing</a>
          <a href="/auth/login">Logout</a>
        </nav>
      </header>
      
      <div class="container">
        <div class="card">
          <h1>Dashboard</h1>
          <p>Welcome to your dashboard. Here you can manage your directories.</p>
        </div>
        
        <div class="card mt-4">
          <h2>Your Directories</h2>
          <p>You don't have any directories yet.</p>
          <a href="/directories/create" class="button">Create your first directory</a>
        </div>
        
        <div class="grid mt-4">
          <div class="card">
            <h3>Quick Stats</h3>
            <p>Directories: 0</p>
            <p>Listings: 0</p>
            <p>Views: 0</p>
          </div>
          
          <div class="card">
            <h3>Recent Activity</h3>
            <p>No recent activity</p>
          </div>
        </div>
      </div>
    `);
  }
  
  // Handle pricing page
  if (pathname === '/pricing') {
    return htmlResponse(`
      <header>
        <div>
          <h1>Directory SaaS Platform</h1>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/directories">Browse Directories</a>
          <a href="/pricing">Pricing</a>
          <a href="/auth/login">Login</a>
        </nav>
      </header>
      
      <div class="container">
        <div class="card text-center">
          <h1>Simple, Transparent Pricing</h1>
          <p class="text-lg">Choose the plan that's right for your organization</p>
        </div>
        
        <div class="grid mt-4" style="grid-template-columns: repeat(4, 1fr); gap: 1rem;">
          <!-- Free Trial -->
          <div class="card">
            <div style="text-align: center; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
              <h2>Free</h2>
              <div style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0;">$0</div>
              <p>Forever free, limited features</p>
            </div>
            <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
              <li style="padding: 0.5rem 0;">✅ Basic AI Agent data collection</li>
              <li style="padding: 0.5rem 0;">✅ Up to 10 listings</li>
              <li style="padding: 0.5rem 0;">✅ 1 admin user</li>
              <li style="padding: 0.5rem 0;">✅ 10 contributor users</li>
              <li style="padding: 0.5rem 0;">✅ Standard templates</li>
              <li style="padding: 0.5rem 0;">✅ Community support</li>
              <li style="padding: 0.5rem 0;">✅ Directory SaaS branding</li>
              <li style="padding: 0.5rem 0;">✅ Basic data export (CSV)</li>
            </ul>
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/auth/signup" class="button">Get Started Free</a>
            </div>
          </div>
          
          <!-- Starter Plan -->
          <div class="card">
            <div style="text-align: center; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
              <h2>Starter</h2>
              <div style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0;">$49<span style="font-size: 1rem; font-weight: 400;">/month</span></div>
              <p>Perfect for small communities</p>
            </div>
            <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
              <li style="padding: 0.5rem 0;">✅ Enhanced AI Agent data collection</li>
              <li style="padding: 0.5rem 0;">✅ Up to 1,000 listings</li>
              <li style="padding: 0.5rem 0;">✅ 3 admin users</li>
              <li style="padding: 0.5rem 0;">✅ 30 contributor users</li>
              <li style="padding: 0.5rem 0;">✅ Standard design customization</li>
              <li style="padding: 0.5rem 0;">✅ Basic membership levels</li>
              <li style="padding: 0.5rem 0;">✅ Email support</li>
              <li style="padding: 0.5rem 0;">✅ Custom domain</li>
              <li style="padding: 0.5rem 0;">✅ Remove Directory SaaS branding</li>
              <li style="padding: 0.5rem 0;">✅ Full data export (CSV, JSON)</li>
            </ul>
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/auth/signup" class="button">Choose Starter</a>
            </div>
          </div>
          
          <!-- Growth Plan -->
          <div class="card" style="border: 2px solid #0070f3; transform: scale(1.02);">
            <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #0070f3; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 500;">MOST POPULAR</div>
            <div style="text-align: center; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
              <h2>Growth</h2>
              <div style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0;">$149<span style="font-size: 1rem; font-weight: 400;">/month</span></div>
              <p>For growing organizations</p>
            </div>
            <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
              <li style="padding: 0.5rem 0;">✅ Advanced AI Agent data collection</li>
              <li style="padding: 0.5rem 0;">✅ Up to 10,000 listings</li>
              <li style="padding: 0.5rem 0;">✅ 5 admin users</li>
              <li style="padding: 0.5rem 0;">✅ 50 contributor users</li>
              <li style="padding: 0.5rem 0;">✅ Advanced customization</li>
              <li style="padding: 0.5rem 0;">✅ Monetization features</li>
              <li style="padding: 0.5rem 0;">✅ Email marketing tools</li>
              <li style="padding: 0.5rem 0;">✅ Priority support</li>
              <li style="padding: 0.5rem 0;">✅ API access</li>
              <li style="padding: 0.5rem 0;">✅ Custom domain</li>
              <li style="padding: 0.5rem 0;">✅ Advanced analytics</li>
              <li style="padding: 0.5rem 0;">✅ Full data export with API</li>
            </ul>
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/auth/signup" class="button" style="background-color: #0070f3;">Choose Growth</a>
            </div>
          </div>
          
          <!-- Premium Plan -->
          <div class="card">
            <div style="text-align: center; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
              <h2>Premium</h2>
              <div style="font-size: 2.5rem; font-weight: 700; margin: 1rem 0;">$299<span style="font-size: 1rem; font-weight: 400;">/month</span></div>
              <p>For large organizations</p>
            </div>
            <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
              <li style="padding: 0.5rem 0;">✅ Enterprise-grade AI Agent collection</li>
              <li style="padding: 0.5rem 0;">✅ Unlimited listings</li>
              <li style="padding: 0.5rem 0;">✅ 10 admin users</li>
              <li style="padding: 0.5rem 0;">✅ 100 contributor users</li>
              <li style="padding: 0.5rem 0;">✅ White-labeling</li>
              <li style="padding: 0.5rem 0;">✅ Advanced analytics</li>
              <li style="padding: 0.5rem 0;">✅ Dedicated support</li>
              <li style="padding: 0.5rem 0;">✅ Unlimited membership tiers</li>
              <li style="padding: 0.5rem 0;">✅ Multiple custom domains</li>
              <li style="padding: 0.5rem 0;">✅ Priority AI training</li>
              <li style="padding: 0.5rem 0;">✅ Source code access available</li>
              <li style="padding: 0.5rem 0;">✅ SSO authentication</li>
              <li style="padding: 0.5rem 0;">✅ Advanced security features</li>
              <li style="padding: 0.5rem 0;">✅ SLA guarantees</li>
            </ul>
            <div style="text-align: center; margin-top: 2rem;">
              <a href="/auth/signup" class="button">Choose Premium</a>
            </div>
          </div>
        </div>
        
        <div class="card mt-4 text-center">
          <h2>Enterprise Solutions</h2>
          <p>Need a custom solution for your organization? Contact us for a tailored package including source code access for self-hosting.</p>
          <a href="/contact" class="button" style="background-color: #4CAF50;">Contact Sales</a>
        </div>
        
        <div class="card mt-4">
          <h2 class="text-center">Frequently Asked Questions</h2>
          <div style="max-width: 800px; margin: 0 auto;">
            <div style="margin-bottom: 1.5rem;">
              <h3>Can I switch plans later?</h3>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
              <h3>Is there a long-term contract?</h3>
              <p>No, all plans are month-to-month with no long-term commitment. We also offer annual plans with a 15% discount.</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
              <h3>How do the AI Agents collect data?</h3>
              <p>Our AI Agents scan public web sources, social media, and can even process your own spreadsheets to find and organize relevant listings for your directory. You can review and edit all suggestions before they go live.</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
              <h3>What's the difference between admin and contributor users?</h3>
              <p>Admin users have full access to manage the directory, including settings, design, and user permissions. Contributors can only add, edit, and manage listings.</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
              <h3>Can I upgrade my plan as my organization grows?</h3>
              <p>Absolutely! You can upgrade your plan at any time as your needs change, and your new features and AI Agent capabilities will be available immediately.</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
              <h3>Do you offer refunds?</h3>
              <p>We offer a 14-day money-back guarantee if you're not satisfied with our service.</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
              <h3>Can I train the AI Agents for my specific industry?</h3>
              <p>Yes! Our Growth and Premium plans include the ability to train our AI Agents on your specific industry terminology and data sources, making them even more effective at finding relevant listings.</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
              <h3>Who owns my directory data and can I export it?</h3>
              <p>You always maintain full ownership of your data. All plans include the ability to export your complete directory data at any time in standard formats (CSV, JSON). Enterprise plans include source code access for self-hosting.</p>
            </div>
          </div>
        </div>
      </div>
    `);
  }
  
  // Handle directories
  if (pathname === '/directories') {
    return htmlResponse(`
      <header>
        <div>
          <h1>Directory SaaS Platform</h1>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/pricing">Pricing</a>
          <a href="/auth/login">Login</a>
        </nav>
      </header>
      
      <div class="container">
        <div class="card">
          <h1>Directories</h1>
          <p>Browse all available directories.</p>
        </div>
        
        <div class="grid mt-4">
          <div class="card">
            <h2>Business Directory</h2>
            <p>A directory of businesses in your area.</p>
            <a href="/directories/business" class="button">View Directory</a>
          </div>
          
          <div class="card">
            <h2>Community Organizations</h2>
            <p>A directory of community organizations.</p>
            <a href="/directories/community" class="button">View Directory</a>
          </div>
          
          <div class="card">
            <h2>Tech Startups</h2>
            <p>A directory of innovative tech startups.</p>
            <a href="/directories/tech" class="button">View Directory</a>
          </div>
        </div>
      </div>
    `);
  }
  
  // For all other routes, return a 404 page
  return htmlResponse(`
    <header>
      <div>
        <h1>Directory SaaS Platform</h1>
      </div>
      <nav>
        <a href="/">Home</a>
        <a href="/directories">Browse Directories</a>
        <a href="/pricing">Pricing</a>
        <a href="/auth/login">Login</a>
      </nav>
    </header>
    
    <div class="container">
      <div class="card text-center">
        <h1>Page Not Found</h1>
        <p>The requested page "${pathname}" could not be found.</p>
        <a href="/" class="button">Return to Home</a>
      </div>
    </div>
  `, 404);
}

export default {
  async fetch(request, env, ctx) {
    try {
      console.log('Request URL:', request.url);
      
      // Safely log available env bindings
      try {
        if (env) {
          console.log('Available env bindings:', Object.keys(env));
        } else {
          console.log('Environment object is undefined');
        }
      } catch (err) {
        console.error('Error logging env:', err);
      }
      
      // Create a safe environment object if it's undefined
      const safeEnv = env || {};
      
      return await serveNextJsApp(request, safeEnv);
    } catch (e) {
      console.error('Unhandled error:', e);
      return new Response('Internal Server Error: ' + e.message, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};
