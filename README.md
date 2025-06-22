# Denariq Web

A border-first personal finance platform for freelancers, expats and remote workers who juggle multiple currencies, banks and irregular pay-days.

## Features

- **Never-Break Sync** – Multi-provider account aggregation with auto-reconnect
- **True Multi-Currency & FX optimization** – Live exchange rates and unified net-worth
- **AI Income Smoothing** – Smart budgeting for variable earners
- **Transparent Bill Negotiation** – OAuth-only bill optimization

## Tech Stack

- **Framework:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS v4
- **Font:** Inter (Google Fonts)
- **Dark Mode:** Class-based dark mode support

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd denariq-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Brand Colors

- **Primary:** `#2563EB` (Blue)
- **Accent:** `#22C55E` (Green)
- **Slate:** Full slate color palette for UI elements

## Dark Mode

The application supports dark mode using Tailwind's class strategy. Toggle dark mode by adding/removing the `dark` class from the `<html>` element.

## Development

The project uses:
- TypeScript for type safety
- Tailwind CSS v4 for styling with brand colors
- Inter font for typography
- ESLint for code quality
- PostCSS for CSS processing

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind configuration
│   ├── layout.tsx       # Root layout with Inter font
│   └── page.tsx         # Home page
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to check code quality
5. Submit a pull request

## License

Private - Denariq Team Only

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The pipeline includes:

### Automated Testing
- **Unit Tests**: Jest with React Testing Library
- **E2E Tests**: Playwright for end-to-end testing
- **Storybook Tests**: Component testing with accessibility checks
- **Visual Regression**: Chromatic for visual snapshot testing

### CI Workflow
The CI pipeline runs on every pull request and includes:
1. Linting with ESLint
2. Unit tests with Jest
3. Storybook build and component testing
4. Playwright e2e tests
5. Visual regression testing with Chromatic

### Setup Requirements
To enable visual regression testing, you need to:
1. Create a Chromatic account at https://www.chromatic.com/
2. Add your project token as `CHROMATIC_PROJECT_TOKEN` in GitHub Secrets
3. Copy `.env.example` to `.env.local` and add your token for local testing

### Running Tests Locally
```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run Storybook tests
npm run test-storybook

# Run visual regression tests
npm run chromatic
```
