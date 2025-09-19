# Rivy Minimal Store Front

A full-stack e-commerce application simulating a solar equipment storefront with modern web technologies and containerized deployment.

##  Project Overview

Rivy Minimal Store is a comprehensive e-commerce platform built to showcase modern web development practices. The application simulates a solar equipment storefront with the following capabilities:

- **Product Discovery**: Browse products with advanced filtering by category, subcategory, brand, and price range
- **Product Details**: View comprehensive product information with images, descriptions, and real-time stock status
- **Shopping Cart**: Persistent cart management with localStorage integration
- **Checkout Process**: Multi-step checkout flow with customer information, shipping details, and payment selection
- **Order Management**: Complete order history and status tracking
- **Responsive Design**: Mobile-first approach with accessible, modern UI components

The application follows industry best practices with proper separation of concerns, type safety, comprehensive testing, and production-ready deployment configurations.

##  Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js, Express, TypeScript, PostgreSQL, Sequelize ORM, Zod Validation, Docker, Jest, Supertest, Swagger/OpenAPI |
| **Frontend** | React 18, Vite, TypeScript, TanStack Query, React Router v6, Axios, Tailwind CSS, shadcn/ui, Lucide Icons |
| **Database** | PostgreSQL with Sequelize migrations and seeders |
| **Deployment** | Backend: Render, Frontend: Vercel |
| **Development** | Docker Compose, ESLint, Prettier, TypeScript strict mode |

##  Features

### Frontend Capabilities

- **Product Catalog**: Paginated product listings with search and multi-filter support
- **Product Details**: Comprehensive product views with image galleries and stock information
- **Shopping Cart**: Add, update, remove items with persistent localStorage state
- **Multi-Step Checkout**: Customer information, shipping address, and payment method selection
- **Order History**: Complete order tracking with status updates and item details
- **Responsive UI**: Mobile-first design with accessible forms and intuitive navigation
- **State Management**: TanStack Query for efficient data fetching, caching, and synchronization

### Backend Architecture

- **RESTful API**: Well-structured endpoints following REST principles
- **Database Operations**: Full CRUD operations with optimized queries
- **Data Validation**: Zod-based request/response validation with TypeScript integration
- **API Documentation**: Interactive Swagger UI with comprehensive endpoint documentation
- **Testing Suite**: Unit and integration tests with >90% coverage
- **Security**: Rate limiting, CORS configuration, input sanitization
- **Data Seeding**: Pre-populated solar equipment catalog with realistic product data

##  Project Structure

```
rivy-minimal-store-front/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Helper functions
│   │   └── config/         # Configuration files
│   ├── tests/              # Test suites
│   ├── migrations/         # Database migrations
│   ├── seeders/           # Data seeders
│   ├── Dockerfile
│   └── docker-compose.yml
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── api/           # API client and hooks
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── dist/              # Production build
└── README.md              # Project documentation
```

##  Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm/yarn/pnpm** package manager
- **Docker & Docker Compose** (for containerized development)
- **PostgreSQL** (if running without Docker)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rivy-minimal-store-front.git
   cd rivy-minimal-store-front
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Configure your .env file (see Backend Configuration below)
   npm install
   npm run migrate:run
   npm run seed:run
   npm run dev
   ```
   Backend will be available at: `http://localhost:5000`

3. **Frontend Setup**
   ```bash
   cd frontend
   cp .env.example .env
   # Configure VITE_API_URL=http://localhost:5000/api/v1/
   npm install
   npm run dev
   ```
   Frontend will be available at: `http://localhost:5173`

### Backend Configuration

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173

# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=rivy_store
DATABASE_USER=your_postgres_user
DATABASE_PASSWORD=your_postgres_password

# Optional: JWT Secret (for future authentication)
JWT_SECRET=your-secret-key-here
```

### Frontend Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api/v1/
VITE_APP_NAME=Rivy Store
```

### Docker Development Setup

For a complete containerized development environment:

```bash
cd backend
docker-compose up --build
```

This will start:

- PostgreSQL database on port 5432
- Backend API server on port 5000
- Automatic database migration and seeding

## 📚 API Documentation

- **Local Development**: [http://localhost:5000/](http://localhost:5000/)
- **Production**: [Your deployed backend URL]/api-docs

### Key API Endpoints

```
GET    /api/v1/products              # Get paginated products with filters
GET    /api/v1/products/:id          # Get single product details
GET    /api/v1/categories            # Get all categories with subcategories
GET    /api/v1/brands                # Get all brands
POST   /api/v1/checkout              # Process checkout (simulated payment)
GET    /api/v1/orders                # Get user orders
GET    /api/v1/orders/:id            # Get specific order details
```

## 🧪 Testing

Run the comprehensive test suite:

```bash
cd backend
npm test                    
npm run test:watch         
npm run test:coverage      #
```

**Test Coverage Includes:**

- Unit tests for all controllers and utilities
- Integration tests for critical user flows (checkout, cart operations)
- Database model validation tests
- API endpoint response validation

## 🚢 Deployment

### Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Configure environment variables in Render dashboard
3. Deploy with automatic builds on git push

### Frontend Deployment (Vercel)

1. Connect repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Set environment variables in Vercel dashboard

## 🔄 Development Workflow

### Available Scripts

**Backend:**
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run test suite
npm run migrate:run  # Run database migrations
npm run seed:run     # Seed database with sample data
```

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## ⚖️ Trade-offs & Future Improvements

### Current Trade-offs

**Payment Processing**: Checkout process is simulated; no real payment gateway integration
**Authentication**: No user authentication system implemented (suitable for MVP)
**Frontend Testing**: Limited automated testing (focus was on backend reliability)
**Image Optimization**: Basic image handling without CDN or optimization
**Real-time Features**: No WebSocket implementation for real-time stock updates

### Planned Improvements

**Authentication & Security**

- JWT-based authentication system
- Role-based access control (admin/customer)
- OAuth integration (Google, GitHub)

**Enhanced Testing**

- Frontend unit and integration tests with React Testing Library
- End-to-end testing with Playwright or Cypress
- Performance testing and monitoring

**Performance Optimizations**

- Redis caching layer for frequently accessed data
- Database query optimization and indexing
- CDN integration for static assets
- Image optimization and lazy loading

**Advanced Features**

- Real-time inventory updates via WebSockets
- Advanced search with Elasticsearch
- Recommendation engine
- Analytics dashboard for business insights
- Inventory management system

## 🔗 Live Demo

- **Frontend**: [https://rivy-minimal-store-front.vercel.app/](https://rivy-minimal-store-front.vercel.app/)
- **Backend API**: [https://rivy-minimal-store-front.onrender.com/](https://rivy-minimal-store-front.onrender.com/)
- **API Documentation**: [https://rivy-minimal-store-front.onrender.com/](https://rivy-minimal-store-front.onrender.com/)
- **Technical Audit Documentation**: [Technical Audit Documentation](https://docs.google.com/document/d/1KM9VACjAzDDi6082Ci-oYzCpa-1DB-rvAHa5s32KAXc/edit?tab=t.0)


