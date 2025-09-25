# OrderUP - Mentor Guidelines

## 🎯 Project Overview

OrderUP is a comprehensive food delivery platform designed to teach modern full-stack development practices. This project serves as a learning vehicle for understanding real-world application architecture, best practices, and industry standards.

## 🏗️ Architecture Philosophy

### Backend-First Approach
- **Why**: Solid backend foundation enables scalable frontend development
- **Focus**: API design, database modeling, authentication, and business logic
- **Technologies**: Node.js, TypeScript, Express.js, Prisma, PostgreSQL

### Learning Objectives
1. **Database Design**: Understanding relationships, constraints, and optimization
2. **API Development**: RESTful design, validation, error handling
3. **Authentication**: JWT implementation, security best practices
4. **Testing**: Unit tests, integration tests, test-driven development
5. **Documentation**: API documentation, code comments, README maintenance

## 📚 Teaching Methodology

### Progressive Complexity
1. **Phase 1**: Core user management and authentication
2. **Phase 2**: Restaurant and menu management
3. **Phase 3**: Order processing and payment integration
4. **Phase 4**: Real-time features and optimization
5. **Phase 5**: Frontend integration and deployment

### Code Quality Standards
- **TypeScript**: Strict typing, interfaces, and type safety
- **Error Handling**: Comprehensive error catching and user-friendly messages
- **Validation**: Input validation using Zod schemas
- **Security**: Authentication, authorization, and data protection
- **Testing**: High test coverage with meaningful test cases

## 🛠️ Development Guidelines

### Code Organization
```
src/
├── config/          # Configuration files
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/          # Database models (Prisma)
├── routes/          # API route definitions
├── services/        # Business logic
├── utils/           # Utility functions
└── types/           # TypeScript type definitions
```

### Naming Conventions
- **Files**: camelCase for services, kebab-case for routes
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase with descriptive names
- **Classes**: PascalCase

### Database Design Principles
- **Normalization**: Proper table relationships and data integrity
- **Indexing**: Strategic indexes for performance
- **Constraints**: Foreign keys, unique constraints, check constraints
- **Migrations**: Version-controlled database changes

## 🔐 Security Best Practices

### Authentication & Authorization
- JWT tokens with refresh token rotation
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation and sanitization

### Data Protection
- SQL injection prevention with Prisma
- XSS protection with proper escaping
- CSRF protection
- Rate limiting and request throttling

## 🧪 Testing Strategy

### Test Types
- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full workflow testing
- **Performance Tests**: Load and stress testing

### Test Coverage Goals
- **Minimum**: 80% code coverage
- **Target**: 90% code coverage
- **Critical Paths**: 100% coverage for authentication and payment flows

## 📖 Documentation Standards

### Code Documentation
- JSDoc comments for all public functions
- Inline comments for complex logic
- README updates for new features
- API documentation with examples

### API Documentation
- OpenAPI/Swagger specification
- Request/response examples
- Error code documentation
- Authentication requirements

## 🚀 Deployment Considerations

### Environment Management
- Development, staging, and production environments
- Environment-specific configuration
- Secret management and security
- Database migration strategies

### Performance Optimization
- Database query optimization
- Caching strategies
- CDN integration
- Monitoring and logging

## 🤝 Mentoring Approach

### Code Reviews
- Focus on learning opportunities
- Explain the "why" behind suggestions
- Encourage best practices
- Balance perfectionism with progress

### Problem-Solving
- Guide students to solutions rather than giving answers
- Encourage research and documentation reading
- Promote debugging skills
- Support iterative improvement

### Real-World Context
- Explain industry practices
- Share relevant experiences
- Discuss scalability considerations
- Address security implications

## 📈 Progress Tracking

### Milestone-Based Learning
1. **Authentication System**: User registration, login, JWT tokens
2. **User Management**: Profile management, password changes
3. **Restaurant System**: CRUD operations, menu management
4. **Order Processing**: Order creation, status tracking
5. **Payment Integration**: Stripe integration, payment processing
6. **Advanced Features**: Real-time updates, notifications

### Assessment Criteria
- **Code Quality**: Clean, readable, maintainable code
- **Functionality**: Features work as expected
- **Security**: Proper authentication and data protection
- **Testing**: Adequate test coverage
- **Documentation**: Clear documentation and comments

## 🎓 Learning Outcomes

By the end of this project, students should understand:

### Technical Skills
- Full-stack application development
- Database design and optimization
- API development and documentation
- Authentication and security
- Testing methodologies
- Deployment and DevOps

### Soft Skills
- Problem-solving and debugging
- Code review and collaboration
- Documentation and communication
- Project planning and organization
- Industry best practices

## 🔄 Continuous Improvement

### Feedback Loop
- Regular code reviews and discussions
- Student feedback on learning experience
- Mentor reflection on teaching effectiveness
- Curriculum updates based on industry changes

### Resource Updates
- Keep dependencies current
- Update documentation regularly
- Incorporate new best practices
- Share relevant industry articles and resources

---

**Remember**: The goal is not just to build a food delivery app, but to learn modern development practices that will serve students throughout their careers. Focus on understanding the "why" behind each decision and building a solid foundation for future learning.
