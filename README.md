# SuperSimple.Directory

A platform for creating and hosting custom directories of organizations. SuperSimple.Directory allows communities and associations to easily build and manage their own directories.

## Overview

SuperSimple.Directory integrates:
- Next.js for the frontend
- Supabase (Postgres) for database and authentication
- OpenAI (LLM) for automated schema generation and data autofilling
- Tailwind CSS for styling
- Jest/React Testing Library and Cypress for testing

## Key Features

1. **Flexible Schema**: Admins can define custom fields for each directory via a wizard that leverages an LLM.
2. **LLM-Assisted Data Entry**: Contributors can provide minimal info (URL or org name), and the system auto-fills listing data.
3. **Admin Approval Workflow**: Listings remain in "pending" status until an admin approves.
4. **Public Directory Views**: Visitors can browse directories, view approved listings, and see listing details.
5. **Authentication & Roles**: Users can sign up, log in, and have roles (admin, contributor, viewer).

## Local Development

### Prerequisites
- Node.js (version 16+ recommended)
- npm or yarn
- Supabase account (or local self-hosted Supabase)
- Optional: OpenAI API Key (for real LLM calls; you can mock it otherwise)

### Setup

1. Clone and Install
```bash
git clone https://github.com/YourOrg/supersimple.directory.git
cd supersimple.directory
npm install
```

2. Environment Variables
   - Duplicate `.env.local.example` to `.env.local`
   - Fill in values:
```
NEXT_PUBLIC_SUPABASE_URL=<YourSupabaseURL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YourSupabaseAnonKey>

# If using real LLM calls:
OPENAI_API_KEY=<YourOpenAIKey>
```

3. Running Locally
```bash
npm run dev
```
   - Open http://localhost:3000 to see the application

4. Testing
```bash
npm run test       # Unit tests (Jest)
npm run cypress    # E2E tests (Cypress)
```

## License

All rights reserved. © SuperSimple.Directory