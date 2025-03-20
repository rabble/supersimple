/**
 * This file is no longer needed for the Pages deployment.
 * 
 * The site is now being deployed as a static export to Cloudflare Pages.
 * The static files are in the 'out' directory after running 'npm run build'.
 * 
 * Deployment URL: https://supersimple-directory.pages.dev
 * 
 * To deploy the site:
 * npm run build && wrangler pages deploy out --project-name=supersimple-directory
 */

export default {
  fetch(request, env, ctx) {
    return new Response('This worker is deprecated. The site is now deployed to Cloudflare Pages.', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};