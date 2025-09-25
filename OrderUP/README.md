# OrderUP - Food Delivery Platform

A full-stack food delivery application built with modern technologies and industry best practices.

## 🚀 Project Overview

OrderUP is a comprehensive food delivery platform that connects customers with local restaurants. The application features real-time order tracking, secure payment processing, and a robust admin system.

## 🏗️ Architecture

### Backend (Node.js + TypeScript)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Validation**: Zod schema validation
- **Testing**: Jest + Supertest
- **Documentation**: OpenAPI/Swagger
- **Logging**: Winston
- **Rate Limiting**: Express-rate-limit

### Frontend (Coming Soon)
- **Framework**: React with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## 📁 Project Structure

```
OrderUP/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── config/          # Configuration files
│   ├── tests/               # Test files
│   ├── prisma/              # Database schema and migrations
│   └── docs/                # API documentation
├── frontend/                # Frontend application (future)
├── docs/                    # Project documentation
└── scripts/                 # Development scripts
```

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Git

### Backend Setup

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   ```

4. **Database setup**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### API Documentation
Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## 📊 Database Schema

### Core Entities
- **Users**: Customer accounts and authentication
- **Restaurants**: Restaurant information and settings
- **Menus**: Restaurant menu items and categories
- **Orders**: Order processing and tracking
- **Payments**: Payment processing and history
- **Reviews**: Customer reviews and ratings

## 🔐 Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting and request throttling
- CORS configuration
- Helmet.js security headers
- SQL injection prevention with Prisma

## 🚀 Deployment

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/orderup

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret

# API Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Server
PORT=3000
NODE_ENV=development
```

## 📈 Performance Optimization

- Database query optimization
- Caching strategies (Redis)
- Image compression and CDN
- API response compression
- Database connection pooling
- Rate limiting and throttling

## 🤝 Contributing

1. Follow the established code style and conventions
2. Write tests for new features
3. Update documentation as needed
4. Use conventional commit messages
5. Create feature branches for new development

## 📝 License

This project is for educational purposes and learning real-world development practices.

---

**Built with ❤️ for learning modern full-stack development**
