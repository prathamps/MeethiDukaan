# Meethi Dukaan - Sweet Shop Management System

Demo Link: https://meethi-dukaan.vercel.app/login

A full-stack web application for managing an Indian sweet shop with user authentication, inventory management, and e-commerce functionality.

## Project Overview

This is a TDD-based Sweet Shop Management System built as part of a technical assessment. The application demonstrates modern full-stack development practices, clean code principles, and effective AI collaboration.

<img width="3226" height="1380" alt="image" src="https://github.com/user-attachments/assets/936bf71c-418e-4dc2-b25e-bbbab0ea68eb" />

## Features

Users can register and login securely with JWT authentication, browse the sweet catalog, search and filter by name/category/price, and purchase sweets with real-time inventory updates. The interface is fully responsive across mobile, tablet, and desktop.

Admins get additional capabilities to manage the entire inventory - adding new sweets, editing existing ones, deleting items, and restocking quantities through a dedicated admin panel.

## Tech Stack

**Backend:** Node.js/TypeScript with Express.js, PostgreSQL (raw SQL with `pg`), JWT + bcrypt for auth, Jest + Supertest for testing, express-validator

**Frontend:** React 18/TypeScript, Vite, React Router v6, Tailwind CSS, Axios

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Running Tests

```bash
# Backend tests
cd backend
npm test
npm run test:coverage
```
## Test Credentials

For testing the deployed application, use these credentials:

**Admin User:**

- Email: `admin@test.com`
- Password: `admin123`
- Access: Full admin panel with inventory management

**Regular User:**

- Email: `userone@test.com`
- Password: `userone123`
- Access: Browse and purchase sweets
  
## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)

- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `POST /api/sweets` - Create sweet (Admin)
- `PUT /api/sweets/:id` - Update sweet (Admin)
- `DELETE /api/sweets/:id` - Delete sweet (Admin)

### Inventory (Protected)

- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin)

## Testing Approach

I followed strict TDD for the backend with the Red-Green-Refactor pattern. Wrote 54 unit and integration tests covering business logic, authentication, and inventory management. Test coverage is above 70% across all metrics.

<img width="1483" height="841" alt="image" src="https://github.com/user-attachments/assets/e681db57-4ffd-4816-931f-a60609639db4" />


## Design System

The theme is inspired by traditional Indian sweet shops - maroon (#8B1538) and gold (#D4AF37) accents on a cream (#FFF5ED) background. Using Playfair Display for headings and Inter for body text to blend traditional aesthetics with modern UX.

<img width="2298" height="1328" alt="image" src="https://github.com/user-attachments/assets/c6d5985f-dae6-41ac-97e5-98a8b7acfbe3" />

<img width="2215" height="1335" alt="image" src="https://github.com/user-attachments/assets/072e073d-0c30-43b6-9932-00c35dca9dd3" />

<img width="1906" height="1347" alt="image" src="https://github.com/user-attachments/assets/af752b65-a019-49e1-b033-9eb47dfb1946" />

<img width="1719" height="1328" alt="image" src="https://github.com/user-attachments/assets/bb620578-a296-4751-bfcf-731b7e40021a" />

<img width="1734" height="1331" alt="image" src="https://github.com/user-attachments/assets/b994e0e4-b472-4089-b586-72b2596e91a7" />

<img width="1707" height="1340" alt="image" src="https://github.com/user-attachments/assets/283018da-f06f-4b0a-a4f7-b7a599330bc9" />



## My AI Usage

### Tools I Used

I relied on three main AI tools throughout this project:

- **Claude Sonnet 4** - For architecture decisions and code generation
- **GPT-5** - When I needed alternative approaches or got stuck

### What AI Did vs What I Did

**Backend (60% AI, 40% Me)**

AI helped me with the repetitive stuff - generating service layer boilerplate, controller structures, and test templates. It also suggested PostgreSQL query patterns and TypeScript type definitions.

I handled the important parts myself: designing the database schema, implementing the actual business logic, configuring JWT and bcrypt properly, and making sure the API endpoints worked correctly.

**Frontend (75% AI, 25% Me)**

AI was really helpful here. It generated most of the component structure, set up the API client with axios, configured Tailwind, and created the routing logic. Form validation patterns and state management setup also came from AI suggestions.

What I did manually: chose the color scheme and overall design direction, refined the UI/UX, tested responsiveness across devices, and optimized performance.

### How I Actually Used It

I'd start by asking AI to generate the basic structure - like "create an auth service with login and register methods." Then I'd review the code, understand what it did, and modify it to fit my specific needs. For tests, AI gave me the template but I had to adjust them to match the actual business requirements.

When debugging, I'd paste error messages and ask for suggestions. Sometimes the AI solution worked, sometimes I had to figure it out myself.

### What I Learned

AI is great for speeding up the boring parts - boilerplate, configuration, repetitive CRUD operations. It probably saved me 3-4x the time on those tasks.

But here's the thing: you can't just blindly trust AI output. I had to carefully review everything, especially security-related code. The business logic needed human judgment. And honestly, understanding the generated code was crucial - otherwise I'd be lost when something broke.

The sweet spot was using AI for structure and speed, while I focused on the architecture, security, and making sure everything actually worked together properly.

## Project Structure

```
meethi-dukaan/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Auth & validation
│   │   ├── routes/           # API routes
│   │   ├── database/         # DB connection & migrations
│   │   ├── types/            # TypeScript types
│   │   └── __tests__/        # Test suites
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Route pages
│   │   ├── context/          # React Context
│   │   └── services/         # API client
│   └── package.json
└── README.md
```

## Security

Passwords are hashed with bcrypt (10 rounds). JWT tokens handle authentication. All sensitive routes are protected with middleware. Admin-only actions use role-based access control. SQL injection is prevented through parameterized queries, and all endpoints have input validation.

## Test Results

- **Backend**: 54 tests passing, 70%+ coverage

## Deployment

**Backend**: Deployed on Render
**Frontend**: Deployed on Vercel

## Author

Built with TDD practices and transparent AI collaboration for a technical assessment.

---

This project demonstrates clean code principles, test-driven development, and honest AI usage as required by the assessment guidelines.
