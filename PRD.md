# SuperSimple.Directory Product Requirements Document (PRD)

## 1. Purpose & Goals
- **Purpose**: Provide a flexible, easy-to-use platform for creating and hosting organizational directories.
- **Goal**: Allow non-technical admins to define their own schema, gather listing data automatically via LLM, and present it publicly or privately.

## 2. Target Users & Roles
1. **Platform Owner (Superadmin)**
   - Manages the overall platform, monitors multiple directories, configures high-level settings (LLM keys, billing, etc.)
2. **Directory Admin**
   - Creates a directory, configures its fields via the wizard
   - Approves or rejects listings
3. **Contributor**
   - Submits new listings or edits
   - Optionally uses the LLM autofill feature for quick data entry
4. **Viewer**
   - Browses or searches the directory
   - Views approved listings
   - May or may not need a login depending on directory visibility

## 3. Functional Requirements
- **FR1: LLM-Assisted Schema Creation**
  - Admin wizard that asks questions and generates a proposed schema
- **FR2: Listing Submission with Autofill**
  - Contributors submit minimal info; LLM fetches or generates the rest
- **FR3: Workflow & Approval**
  - Listings stay in "pending" until an admin approves
- **FR4: Public/Private Views**
  - Directories can be public or restricted
  - Approved listings displayed in public pages; "pending" or "rejected" hidden

## 4. System Architecture
1. **Frontend**
   - Next.js for SSR and routing
   - Consumes data from Supabase via client or SSR calls
2. **Backend**
   - Supabase for database and authentication
   - Supabase row-level security to isolate data per directory if needed
3. **LLM Module**
   - OpenAI (or alternative) for schema generation and autofill
   - Node-based integration with error handling and fallback mocks
4. **Deployment**
   - Typically on Vercel for the Next.js app
   - Database on Supabase's managed Postgres
   - DNS via Cloudflare or any provider for custom domains

## 5. Data Structures
- **directories**
  - id, owner_user_id, name, schema_json, created_at
- **listings**
  - id, directory_id, data_json, status, created_by, created_at, updated_at
- **(Optional) users or user_metadata in Supabase Auth**
  - role: "admin" | "contributor" | "viewer"

## 6. Constraints & Assumptions
- **LLM**: Prompt costs and response times vary; must handle errors gracefully
- **Scalability**: Supabase can handle moderate loads; for very large directories, indexing and caching strategies may be needed
- **Privacy**: Data is mostly public. If private directories are needed, RLS ensures restricted access

## 7. Testing & Quality Assurance
- **Unit Tests**: Jest for React components, mocking LLM calls
- **Integration Tests**: Testing the wizard flow, listing submission, and approval
- **End-to-End Tests**: Cypress or Playwright to simulate real user journeys

## 8. Risks & Mitigations
- **LLM Inaccuracies**: The AI might provide incomplete or incorrect data. Mitigation: manual user review and "re-try" option.
- **API Downtime**: If LLM or Supabase is unavailable, degrade gracefully with offline or fallback modes.
- **Unauthorized Access**: Use Supabase's row-level security and role checks to prevent cross-directory data leaks.

## 9. Timeline & Milestones
1. **MVP (Core)**
   - Setup project & auth, LLM wizard, listing submission, admin approval, basic directory views
2. **Phase 2**
   - Map integration, advanced search, theming
3. **Phase 3**
   - Stripe payments, advanced analytics, multi-language support

## 10. Future Considerations
- **Machine Translation**: Could integrate LLM-based translation for listings
- **Automated Theming**: LLM to generate CSS from textual descriptions
- **SSO Integration**: (Okta, Slack, etc.) for enterprise or large communities