# Customer Information Management System - Architecture Diagrams

This directory contains AWS architecture diagrams generated for the Customer Information Management System based on the technical design specification.

## Generated Diagrams

### 1. Customer Management Architecture (`customer-management-architecture.png`)
**Overview**: High-level system architecture showing the main components and their relationships.

**Components**:
- **User**: End user interacting with the system
- **React Web App**: Frontend application running on local development server
- **Node.js API Server**: Backend Express.js server handling REST API requests
- **DynamoDB Customers Table**: Primary data store for customer information
- **Email Index (GSI)**: Global Secondary Index for email uniqueness validation
- **IAM Role**: Security role providing DynamoDB access permissions

**Key Connections**:
- User → React App (HTTP Requests)
- React App → API Server (REST API calls with JSON)
- API Server → DynamoDB (AWS SDK v3)
- API Server → IAM Role (Role assumption for permissions)

### 2. Customer Data Flow Architecture (`customer-data-flow.png`)
**Overview**: Detailed data flow showing React components, API endpoints, and database operations.

**Frontend Components**:
- CustomerList Component (displays customer table)
- CustomerForm Component (create/edit forms)
- CustomerDetails Component (view customer details)
- CustomerSearch Component (search functionality)

**Backend Processing**:
- REST API Endpoints (/api/customers)
- Input Validation Middleware
- Error Handler Middleware

**Database Operations**:
- Customers Table (Partition Key: customerId)
- Email GSI (for unique email validation)

**API Operations**:
- GET /customers (retrieve all customers)
- GET /customers/:id (retrieve specific customer)
- POST /customers (create new customer)
- PUT /customers/:id (update existing customer)
- DELETE /customers/:id (delete customer)

### 3. Customer Deployment Architecture (`customer-deployment-architecture.png`)
**Overview**: Local development environment setup and AWS cloud service integration.

**Development Environment**:
- Developer Machine
- React Dev Server (Port 3000)
- Node.js Server (Port 3001)

**AWS Cloud Services**:
- DynamoDB Service (on-demand billing)
- IAM Service (roles and policies)

**Infrastructure as Code**:
- AWS CDK Stack (TypeScript)

**Deployment Flow**:
- CDK Stack deploys DynamoDB table and IAM roles
- Local development servers connect to AWS services
- React app communicates with Node.js API
- API server uses AWS SDK v3 to interact with DynamoDB

## Architecture Highlights

### Database Design
- **Single Table Design**: Uses DynamoDB with customerId as partition key
- **Global Secondary Index**: Email-based GSI for uniqueness validation
- **On-demand Billing**: Cost-effective for development and variable workloads

### Security
- **IAM Role-based Access**: Minimal permissions for DynamoDB operations
- **Input Validation**: Both client-side and server-side validation
- **Error Handling**: Centralized error handling with appropriate HTTP status codes

### Development Setup
- **Local Development**: React dev server and Node.js server running locally
- **AWS Integration**: Direct connection to AWS DynamoDB service
- **Infrastructure as Code**: AWS CDK for reproducible infrastructure deployment

## File Locations
All diagrams are stored in:
`~/echo-architect-artifacts/customer-management-system-112520251931/generated-diagrams/`

## Technical Stack
- **Frontend**: React.js with functional components and hooks
- **Backend**: Node.js with Express.js framework
- **Database**: Amazon DynamoDB with AWS SDK v3
- **Infrastructure**: AWS CDK (TypeScript)
- **Development**: Local development servers with AWS cloud integration
