# SuperSimple.Directory

A platform for creating and managing custom directories with dynamic schemas.

## Features

- Create custom directories with flexible schemas
- Submit listings to directories
- Browse directories and their listings
- User authentication and role management
- Admin dashboard for directory management

## Navigation Guide

Users can navigate through the platform as follows:

1. **Home Page** - The landing page with an overview of the platform
   - Access from: `/`

2. **Directories List** - Browse all available directories
   - Access from: `/directories`
   - Navigate here from the Home page

3. **Directory Detail Page** - View details about a specific directory
   - Access from: `/directories/[directoryId]`
   - Navigate here by clicking on a directory in the Directories List

4. **Listings Page** - Browse all listings in a specific directory
   - Access from: `/directories/[directoryId]/listings`
   - Navigate here by clicking "Browse Listings" on a Directory Detail page

5. **Listing Detail Page** - View details about a specific listing
   - Access from: `/directories/[directoryId]/listings/[listingId]`
   - Navigate here by clicking on a listing in the Listings Page

6. **Submit Listing Page** - Submit a new listing to a directory
   - Access from: `/directories/[directoryId]/submit`
   - Navigate here by clicking "Submit a Listing" on a Directory Detail page

## Admin Features

- Create and manage directories
- Manage users and their roles
- View and moderate listings

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## End-to-End Testing

This project uses Cypress for end-to-end testing of the main user flows.

### Running E2E Tests Locally

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. In a separate terminal, run the Cypress tests:
   ```bash
   # Open Cypress UI
   npm run cypress
   
   # Or run tests headlessly
   npm run e2e
   ```

### Test Coverage

The E2E tests cover the following user journeys:

1. **Admin Directory Creation**
   - Admin logs in and creates a new directory using the wizard
   - Tests LLM schema generation

2. **Contributor Listing Submission**
   - Contributor logs in and submits a new listing
   - Tests LLM autofill functionality

3. **Admin Approval**
   - Admin approves pending listings

4. **Edge Cases**
   - Invalid data submission
   - Authorization checks
   - LLM fallback behavior

### CI Integration

The E2E tests run automatically on GitHub Actions for all pushes to main and pull requests.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase (Authentication & Database)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
