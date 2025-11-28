# GitHub Repository Explorer

A modern Next.js application for searching GitHub users and exploring their public repositories.

## Features

- 🔍 **User Search** - Search GitHub users with real-time results
- 📂 **Repository Explorer** - View user repositories in expandable accordions
- 📄 **Pagination** - Load more repositories with infinite scroll
- 🎨 **Modern UI** - Clean design with SCSS styling
- 📱 **Responsive** - Works on desktop and mobile devices
- ⬆️ **Scroll to Top** - Quick navigation for long lists
- ⚡ **Fast** - Built with Next.js 16 and React 19

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Testing**: Vitest + React Testing Library
- **API**: GitHub REST API v3

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                            # Home page
│   ├── search/
│   │   ├── page.tsx                        # Search page (server component)
│   │   └── _components/
│   │       ├── SearchClientContainer.tsx
│   │       ├── searchBar/
│   │       ├── listView/
│   │       ├── userAccordion/
│   │       ├── userInfoCard/
│   │       └── userRepositories/
│   └── globals.scss
├── lib/
│   └── services/
│       ├── api-github-error.service.ts     # GitHub API error service
│       ├── api-github.service.ts           # Github API service
│       └── types.ts                        # TypeScript types
└── ui/
    └── button/                             # Reusable Button component
```

## Features in Detail

### Github User Search

- Search GitHub users by login
- Minimum 3 characters required
- Shows top 5 results containing the query (\*\*This could be updated to show result matching the search string)
- Auto search after 3 characters or Press Enter or click Search button

### List of Repository for a user

- Click any user to expand their repositories
- View repository name, description, stars, and forks
- Load more repositories (10 per page)

### Scroll to Top

- Appears after scrolling 300px
- Smooth scroll animation
- Fixed position button

## GitHub API

- Uses GitHub REST API v3
- Rate limit: 60 requests/hour (unauthenticated)

## Testing

The project includes unit test for important components:

- ✅ SearchBar component (6 tests)
- ✅ UserInfo component (4 tests)
- ✅ UserRepository component (5 tests)

Run tests with: `npm run test`

## Deployed on Vercel

This project is deployed [here](https://github-repository-explorer-drab.vercel.app/) using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
