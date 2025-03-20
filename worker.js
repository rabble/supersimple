export default {
  async fetch(request, env, ctx) {
    // Get URL and pathname
    const url = new URL(request.url);

    // Serve the static HTML page
    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SuperSimple.Directory - Create Custom Directories In Minutes</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 20px;
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    nav a {
      margin-left: 20px;
      color: #4F46E5;
      text-decoration: none;
      font-weight: 500;
    }
    nav a:hover {
      text-decoration: underline;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #4F46E5;
    }
    h2 {
      font-size: 1.8rem;
      margin-top: 2rem;
      color: #374151;
    }
    .hero {
      background: linear-gradient(to right, #F9FAFB, #F3F4F6);
      padding: 60px 20px;
      border-radius: 10px;
      margin-bottom: 60px;
      text-align: center;
    }
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.25rem;
      color: #6B7280;
      max-width: 700px;
      margin: 0 auto 30px;
    }
    .button {
      display: inline-block;
      background-color: #4F46E5;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 500;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #4338CA;
    }
    .button.secondary {
      background-color: white;
      color: #4F46E5;
      border: 1px solid #4F46E5;
      margin-left: 12px;
    }
    .button.secondary:hover {
      background-color: #F9FAFB;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }
    .feature {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .feature h3 {
      color: #4F46E5;
      margin-top: 0;
    }
    footer {
      border-top: 1px solid #eaeaea;
      padding-top: 30px;
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
    }
    footer nav {
      display: flex;
      gap: 20px;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #4F46E5;
      text-decoration: none;
    }
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.2rem;
      }
      .features {
        grid-template-columns: 1fr;
      }
      .header-nav {
        display: none;
      }
    }
  </style>
</head>
<body>
  <header>
    <a href="/" class="logo">SuperSimple.Directory</a>
    <nav class="header-nav">
      <a href="/features">Features</a>
      <a href="/pricing">Pricing</a>
      <a href="/blog">Blog</a>
      <a href="/login">Log in</a>
    </nav>
  </header>
  
  <section class="hero">
    <h1>Create Custom Directories In Minutes</h1>
    <p>Build beautiful, AI-powered directories for businesses, members, resources, or anything else – without needing to code.</p>
    <div>
      <a href="https://supersimple.directory/" class="button">Get Started Now</a>
      <a href="https://protestnet.notion.site/How-it-Works-7abd39fdee9e4f068ea1fe43fab60b88" class="button secondary">How It Works</a>
    </div>
  </section>
  
  <section>
    <h2>Why Choose SuperSimple.Directory?</h2>
    <div class="features">
      <div class="feature">
        <h3>AI-Powered Creation</h3>
        <p>Let our AI handle the heavy lifting. Generate your directory schema, layouts, and even auto-fill listings from web pages.</p>
      </div>
      <div class="feature">
        <h3>Beautiful Design</h3>
        <p>Professional-looking directories that work on all devices, with customizable themes to match your brand.</p>
      </div>
      <div class="feature">
        <h3>User Submissions</h3>
        <p>Allow visitors to submit their own listings while you maintain control with moderation tools.</p>
      </div>
      <div class="feature">
        <h3>Powerful Search</h3>
        <p>Help users find exactly what they're looking for with advanced filters and sorting options.</p>
      </div>
      <div class="feature">
        <h3>Monetization Ready</h3>
        <p>Multiple ways to generate revenue, from premium listings to sponsored features and subscription access.</p>
      </div>
      <div class="feature">
        <h3>SEO Optimized</h3>
        <p>Built to rank well in search engines, with clean URLs, metadata control, and fast loading times.</p>
      </div>
    </div>
  </section>
  
  <section>
    <h2>Ready to create your directory?</h2>
    <p>Get started with SuperSimple.Directory today and launch your custom directory in minutes, not weeks.</p>
    <p>
      <a href="https://protestnet.notion.site/Getting-started-with-SuperSimple-Directory-d02d4cb842ec4ea7a4d9462e3bf3ff8e" class="button">Create Your Directory Now</a>
    </p>
  </section>
  
  <footer>
    <div>
      <p>&copy; 2024 SuperSimple.Directory. All rights reserved.</p>
    </div>
    <nav>
      <a href="https://protestnet.notion.site/About-SuperSimple-Directory-11ba33f4f21d42a78ed4ff49cb63c10a">About</a>
      <a href="mailto:contact@supersimple.directory">Contact</a>
      <a href="https://protestnet.notion.site/SuperSimple-Directory-Privacy-Policy-ca05a9d2b5f7462892ebc1ee95f50e6c">Privacy</a>
      <a href="https://protestnet.notion.site/SuperSimple-Directory-Terms-of-Service-d4d452ebb0884cc18b5c159aae84cf08">Terms</a>
    </nav>
  </footer>
</body>
</html>`, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "public, max-age=3600"
      }
    });
  }
};