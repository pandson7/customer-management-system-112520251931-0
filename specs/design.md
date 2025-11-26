# Technical Design Document

## System Overview

The Customer Information Management System is a full-stack web application built with React frontend and Node.js backend, using DynamoDB for data persistence. The system follows a RESTful API architecture with clear separation between presentation, business logic, and data layers.

## Architecture Components

### Frontend Layer
- **Technology**: React.js with functional components and hooks
- **Hosting**: Local development server
- **Styling**: CSS modules for component-specific styling
- **State Management**: React useState and useEffect hooks
- **HTTP Client**: Fetch API for backend communication

### Backend Layer
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful endpoints following standard HTTP methods
- **Validation**: Input validation middleware for data integrity
- **Error Handling**: Centralized error handling with appropriate HTTP status codes

### Data Layer
- **Database**: Amazon DynamoDB
- **Table Design**: Single table with customer ID as partition key
- **SDK**: AWS SDK for JavaScript v3 for DynamoDB operations

## System Architecture Diagram

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐    AWS SDK    ┌─────────────────┐
│   React Web     │ ──────────────► │   Node.js API   │ ────────────► │   DynamoDB      │
│   Frontend      │                 │   Server        │               │   Table         │
│                 │ ◄────────────── │                 │ ◄──────────── │                 │
└─────────────────┘    JSON         └─────────────────┘    Data       └─────────────────┘
```

## Database Schema

### Customer Table
- **Table Name**: `customers`
- **Partition Key**: `customerId` (String) - UUID format
- **Attributes**:
  - `customerId`: Unique identifier (UUID)
  - `name`: Customer full name (String)
  - `email`: Customer email address (String)
  - `phone`: Customer phone number (String)
  - `address`: Customer physical address (String)
  - `registrationDate`: ISO timestamp of record creation (String)

### DynamoDB Configuration
- **Billing Mode**: On-demand (pay-per-request)
- **Global Secondary Index**: `email-index` on email attribute for duplicate checking
- **Encryption**: Server-side encryption enabled

## API Endpoints

### Customer Management Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/customers` | Retrieve all customers | None | Array of customer objects |
| GET | `/api/customers/:id` | Retrieve specific customer | None | Customer object |
| POST | `/api/customers` | Create new customer | Customer data | Created customer object |
| PUT | `/api/customers/:id` | Update existing customer | Updated customer data | Updated customer object |
| DELETE | `/api/customers/:id` | Delete customer | None | Success confirmation |

### Request/Response Examples

#### Create Customer Request
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0123",
  "address": "123 Main St, City, State 12345"
}
```

#### Customer Response
```json
{
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0123",
  "address": "123 Main St, City, State 12345",
  "registrationDate": "2025-11-25T19:32:45.403Z"
}
```

## Frontend Component Structure

```
src/
├── components/
│   ├── CustomerList.js       # Display customers table
│   ├── CustomerForm.js       # Create/edit customer form
│   ├── CustomerDetails.js    # View customer details
│   └── CustomerSearch.js     # Search functionality
├── services/
│   └── customerService.js    # API communication layer
├── utils/
│   └── validation.js         # Client-side validation
└── App.js                    # Main application component
```

## Data Flow Sequence

### Create Customer Flow
```
User → CustomerForm → Validation → API POST /customers → DynamoDB PutItem → Success Response → UI Update
```

### Read Customer Flow
```
User → CustomerList → API GET /customers → DynamoDB Scan → Customer Data → UI Render
```

### Update Customer Flow
```
User → CustomerDetails → CustomerForm → API PUT /customers/:id → DynamoDB UpdateItem → Success Response → UI Update
```

### Delete Customer Flow
```
User → CustomerDetails → Confirmation → API DELETE /customers/:id → DynamoDB DeleteItem → Success Response → UI Redirect
```

## Validation Rules

### Client-Side Validation
- **Name**: Required, minimum 2 characters, maximum 100 characters
- **Email**: Required, valid email format, maximum 255 characters
- **Phone**: Required, valid phone format (E.164 or US format)
- **Address**: Required, minimum 10 characters, maximum 500 characters

### Server-Side Validation
- All client-side validations enforced
- Email uniqueness check via DynamoDB GSI query
- Input sanitization to prevent injection attacks
- Request rate limiting to prevent abuse

## Error Handling Strategy

### HTTP Status Codes
- `200`: Successful operation
- `201`: Resource created successfully
- `400`: Bad request (validation errors)
- `404`: Resource not found
- `409`: Conflict (duplicate email)
- `500`: Internal server error

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Email address is already in use"
    }
  }
}
```

## Security Considerations

- Input validation and sanitization on all endpoints
- CORS configuration for frontend-backend communication
- Environment variables for sensitive configuration
- AWS IAM roles with minimal required permissions for DynamoDB access

## Deployment Architecture

### Infrastructure as Code
- **Tool**: AWS CDK (Cloud Development Kit)
- **Language**: TypeScript
- **Resources**: DynamoDB table, IAM roles, local development configuration

### Local Development
- Frontend: React development server (port 3000)
- Backend: Node.js Express server (port 3001)
- Database: DynamoDB Local or AWS DynamoDB service

## Performance Considerations

- DynamoDB on-demand billing for cost optimization
- Client-side pagination for large customer lists
- Debounced search functionality to reduce API calls
- Efficient DynamoDB query patterns using partition keys
