# Customer Management System

A full-stack web application for managing customer information with complete CRUD (Create, Read, Update, Delete) operations.

## Features

- **Customer Management**: Create, view, edit, and delete customer records
- **Search Functionality**: Search customers by name or email
- **Data Validation**: Client-side and server-side validation
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Immediate feedback for all operations
- **Error Handling**: Comprehensive error handling and user feedback

## Architecture

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: Amazon DynamoDB
- **Validation**: Joi validation library
- **API**: RESTful endpoints with JSON responses

### Frontend
- **Framework**: React with TypeScript
- **Styling**: CSS modules
- **HTTP Client**: Fetch API
- **State Management**: React hooks

### Infrastructure
- **IaC**: AWS CDK (Cloud Development Kit)
- **Database**: DynamoDB with auto-scaling enabled
- **Deployment**: Local development environment

## Prerequisites

- Node.js 18+ 
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed globally

## Setup Instructions

### 1. Clone and Navigate
```bash
cd ~/echo-architect-artifacts/customer-management-system-112520251931
```

### 2. Deploy Infrastructure
```bash
cd cdk-app
npm install
npm run build
npx cdk deploy --require-approval never
```

### 3. Setup Backend
```bash
cd ../backend
npm install
```

### 4. Setup Frontend
```bash
cd ../frontend
npm install
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Backend will run on http://localhost:3001

### Start Frontend Server
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | Get all customers |
| GET | `/api/customers?search=term` | Search customers |
| GET | `/api/customers/:id` | Get customer by ID |
| POST | `/api/customers` | Create new customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |
| GET | `/health` | Health check |

## Customer Data Model

```json
{
  "customerId": "uuid",
  "name": "string (2-100 chars)",
  "email": "string (valid email, unique)",
  "phone": "string (valid phone format)",
  "address": "string (10-500 chars)",
  "registrationDate": "ISO timestamp"
}
```

## Validation Rules

- **Name**: Required, 2-100 characters
- **Email**: Required, valid email format, must be unique
- **Phone**: Required, valid phone number format
- **Address**: Required, 10-500 characters

## Testing

### Backend API Testing
```bash
# Health check
curl http://localhost:3001/health

# Get all customers
curl http://localhost:3001/api/customers

# Create customer
curl -X POST http://localhost:3001/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, ST 12345"
  }'
```

### Frontend Testing
1. Open http://localhost:3000 in your browser
2. Test all CRUD operations through the UI
3. Verify search functionality
4. Test form validation
5. Test error handling

## Project Structure

```
customer-management-system-112520251931/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
├── cdk-app/
│   ├── lib/
│   ├── bin/
│   └── package.json
└── README.md
```

## AWS Resources Created

- **DynamoDB Table**: `customers-112520251931`
- **Global Secondary Index**: `email-index-112520251931`
- **Auto Scaling**: Read/Write capacity auto scaling enabled

## Cleanup

To remove all AWS resources:
```bash
cd cdk-app
npx cdk destroy
```

## Troubleshooting

### Backend Issues
- Ensure AWS credentials are configured
- Check DynamoDB table exists and is accessible
- Verify port 3001 is available

### Frontend Issues
- Ensure backend is running on port 3001
- Check browser console for errors
- Verify CORS configuration

### Database Issues
- Confirm CDK deployment was successful
- Check AWS console for DynamoDB table status
- Verify IAM permissions for DynamoDB access
