# Morning Fitness App

A modern fitness tracking application built with Next.js, TypeScript, and NextAuth.js for authentication.

## Features

- 🔐 Authentication with NextAuth.js (Google, Apple, Email/Password)
- 💪 Fitness tracking and progress monitoring
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI components with shadcn/ui
- 🔒 Secure user sessions and middleware protection

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/semmuca/morning-fitness-app.git
cd morning-fitness-app
```

### 2. Install dependencies

Using npm:
```bash
npm install
```

Or using pnpm:
```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add the following environment variables to `.env.local`:

```env
# NextAuth.js
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple OAuth (optional)
APPLE_ID=your-apple-id
APPLE_SECRET=your-apple-secret
```

**Important**
- Generate a secure `NEXTAUTH_SECRET` using: `openssl rand -base64 32`
- OAuth credentials are optional but required if you want to enable Google/Apple sign-in

### 4. Start the development server

```bash
npm run dev
```

Or with pnpm:
```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Create your first account

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. You'll be redirected to the sign-in page
3. Click "Sign up" to create a new account
4. Use email/password or OAuth providers (if configured)

## Project Structure

```
morning-fitness-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
├── auth.ts               # NextAuth configuration
├── middleware.ts         # Next.js middleware
└── next.config.mjs       # Next.js configuration
```

## Authentication

This app uses NextAuth.js for authentication with support for:

- **Email/Password**: Local authentication with bcrypt password hashing
- **Google OAuth**: Sign in with Google account
- **Apple OAuth**: Sign in with Apple ID

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js
- **State Management**: React hooks

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).