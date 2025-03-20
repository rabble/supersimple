# SuperSimple.Directory Development Guide

## Commands
- Build: `npm run build`
- Dev server: `npm run dev`
- Production: `npm run start`
- Lint: `npm run lint`
- Test all: `npm test`
- Test single file: `npx jest path/to/file.test.ts`
- E2E Tests: `npm run cypress` (interactive) or `npm run e2e` (headless)
- Database setup: `npm run setup-db-simple`
- Deploy to Cloudflare Pages: `npm run deploy`
- Deploy to Cloudflare Pages Production: `npm run deploy:prod`

## Coding Style Guidelines
- **TypeScript**: Use types for props, state, and function returns
- **Formatting**: Indent 2 spaces, no semicolons required
- **Components**: Function components with React hooks
- **State Management**: React Context API (see `AuthContext`)
- **Imports**: Group React, Next.js, third-party, then local imports
- **Error Handling**: Use try/catch with API calls, error states in UI
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Testing**: Jest and React Testing Library with mocks for hooks/APIs
- **Styling**: Tailwind CSS with utility classes

## Cloudflare Pages Deployment Guide

### Setting up a Next.js project for Cloudflare Pages

1. **Configure Next.js for static export**:
   ```js
   // next.config.js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     swcMinify: true,
     output: 'export', // Set to 'export' for static site generation
     images: {
       unoptimized: true, // Required for static export
     },
     // Define static routes (add your important routes here)
     exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
       return {
         '/': { page: '/' },
         '/features': { page: '/features' },
         '/pricing': { page: '/pricing' },
         // Add more routes as needed
       };
     },
   };
   
   module.exports = nextConfig;
   ```

2. **Create Wrangler configuration**:
   ```toml
   # wrangler.toml
   name = "your-project-name"
   compatibility_date = "2023-06-21"
   
   # Specify the output directory for static files
   pages_build_output_dir = "out"
   
   # Environment variables
   [vars]
   NEXT_PUBLIC_API_URL = "https://your-api.example.com"
   # Add other environment variables as needed
   
   # Don't use the observability section for Pages deployments
   # [observability] is only for Workers
   ```

3. **Add deployment scripts to package.json**:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "next lint",
     "deploy": "npm run build && wrangler pages deploy out --project-name=your-project-name",
     "deploy:prod": "npm run build && wrangler pages deploy out --project-name=your-project-name --branch=main --commit-dirty=true"
   }
   ```

4. **Handle dynamic routes**:
   - For dynamic routes like `/blog/[slug]`, use `getStaticPaths` with `fallback: false`
   - Remove any `revalidate` from `getStaticProps` (ISR not supported)
   - Use client-side data fetching for truly dynamic content

5. **API routes alternatives**:
   - API routes don't work in static exports
   - Use external APIs or Cloudflare Functions
   - Consider Cloudflare Workers for backend functionality

### Deployment Steps

1. **Install Wrangler CLI**:
   ```bash
   npm install -g wrangler
   # or
   npm install --save-dev wrangler
   ```

2. **Authenticate with Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Deploy to Cloudflare Pages**:
   ```bash
   wrangler pages deploy out --project-name=your-project-name
   ```

5. **For production deployment**:
   ```bash
   wrangler pages deploy out --project-name=your-project-name --branch=main
   ```

### Troubleshooting

- **Issue**: Deployment fails with "Workers observability is only available for Workers projects"
  **Solution**: Remove the `[observability]` section from wrangler.toml

- **Issue**: Missing pages in deployment
  **Solution**: Add them to the `exportPathMap` in next.config.js

- **Issue**: Images not loading
  **Solution**: Set `images.unoptimized = true` in next.config.js

- **Issue**: API routes not working
  **Solution**: API routes aren't available in static exports. Use client-side API calls to external services instead.