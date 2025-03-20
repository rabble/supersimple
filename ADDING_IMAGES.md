# Adding Images to SuperSimple.Directory

This guide explains how to add high-quality images to SuperSimple.Directory using Unsplash.

## Unsplash Images for Marketing Pages

We've set up placeholder image references in the marketing pages. To use the actual images:

1. Download the following images from Unsplash:

   - **Business Directory Image**:  
     URL: [https://images.unsplash.com/photo-1573164574572-cb89e39749b4](https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=1200&auto=format&fit=crop)  
     Save to: `public/images/unsplash/business-directory.jpg`

   - **AI Directories Image**:  
     URL: [https://images.unsplash.com/photo-1620712943543-bcc4688e7485](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop)  
     Save to: `public/images/unsplash/ai-directories.jpg`

   - **Directory Showcase Image**:  
     URL: [https://images.unsplash.com/photo-1664575196412-ed801e8333a1](https://images.unsplash.com/photo-1664575196412-ed801e8333a1?q=80&w=1200&auto=format&fit=crop)  
     Save to: `public/images/unsplash/directory-showcase.jpg`

   - **Team Collaboration Image**:  
     URL: [https://images.unsplash.com/photo-1552664730-d307ca884978](https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop)  
     Save to: `public/images/unsplash/team-collaboration.jpg`

2. After downloading the images, rebuild and redeploy the site:
   ```bash
   npm run build
   npm run deploy
   ```

## Adding More Unsplash Images

To add additional Unsplash images to the site:

1. Find appropriate images on [Unsplash](https://unsplash.com/) that match your content
2. Download the images to your local machine
3. Add them to the appropriate directory in `public/images/unsplash/`
4. Use them in your components like this:

```jsx
<div 
  className="relative bg-cover bg-center"
  style={{
    backgroundImage: 'url(/images/unsplash/your-image.jpg)',
  }}
>
  {/* Optional overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div className="text-white text-center">
      <h3 className="text-2xl font-bold">Your Heading</h3>
    </div>
  </div>
</div>
```

Or for image tags:

```jsx
<Image
  src="/images/unsplash/your-image.jpg"
  alt="Description of image"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

## Best Practices for Image Usage

1. **Optimize file sizes** - Compress images to reduce load times
2. **Use responsive images** - Make sure images look good on all devices
3. **Consider accessibility** - Always use alt text for screen readers
4. **Credit photographers** - While not required by Unsplash license, it's a good practice to credit photographers in your site's footer or on a credits page

## Recommended Image Dimensions

- Hero images: 1600 × 900px (16:9 ratio)
- Blog post thumbnails: 800 × 450px (16:9 ratio)
- Team member photos: 400 × 400px (1:1 ratio)
- Feature illustrations: 600 × 600px (1:1 ratio)

## Legal Note

Unsplash provides images under a [license](https://unsplash.com/license) that allows for commercial and non-commercial use without attribution, though attribution is appreciated. All images should be used appropriately and ethically.