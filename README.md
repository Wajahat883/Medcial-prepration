# AMC MCQ Exam Preparation Platform

A comprehensive full-stack application for medical students preparing for the Australian Medical Council (AMC) Multiple Choice Question (MCQ) examinations.

## Features

- **Interactive Question Bank**: Browse and practice with AMC-style MCQs
- **Timed Tests**: Simulate exam conditions with customizable test sessions
- **Performance Analytics**: Track progress with detailed statistics and charts
- **Bookmarking System**: Save difficult questions for later review
- **User Dashboard**: Personalized study progress and recommendations

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI
- Zustand (State Management)
- Recharts (Analytics)
- Lucide React (Icons)

### Backend
- Node.js
- Express
- TypeScript
- Mongoose (MongoDB)
- JWT Authentication
- bcryptjs

## Project Structure

```
medical-exam-prep/
├── client/          # Next.js Frontend
├── server/          # Express Backend
├── shared/          # Shared types/utils
└── docker-compose.yml
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medical-exam-prep
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
cd ../client
cp .env.example .env.local
# Edit .env.local with your API URL
```

4. Start development servers:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Environment Variables

#### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medical-exam-prep
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

#### Client (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Available Scripts

### Root
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm run install:all` - Install dependencies for all packages

### Client
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start Express with hot reload
- `npm run build` - Compile TypeScript
- `npm run start` - Start production server
- `npm test` - Run tests

## Docker

To run the entire stack with Docker Compose:

```bash
docker-compose up -d
```

This will start:
- MongoDB database
- Backend API server
- Frontend Next.js application

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
