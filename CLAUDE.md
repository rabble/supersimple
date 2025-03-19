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