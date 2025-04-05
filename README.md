# Insurify API Hub

A comprehensive API hub for insurance-related services with MongoDB integration.

## Project Structure

- `src/` - React frontend code
- `server/` - Express backend with MongoDB integration

## MongoDB Configuration

### Option 1: Use Local MongoDB
1. Install MongoDB locally: https://www.mongodb.com/try/download/community
2. Use the connection string: `mongodb://localhost:27017/insurance-db`

### Option 2: Create MongoDB Atlas Account
1. Create a free account at MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register
2. Create a new cluster
3. Create a database user with password
4. Add your IP address to network access
5. Get your connection string from Atlas:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
6. Update the `.env` file with your connection string

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Seed the database with sample data:

```bash
npm run seed
```

4. Start the server:

```bash
npm run dev
```

The server will run on http://localhost:5000.

### Frontend Setup

1. From the root directory, install frontend dependencies:

```bash
npm install
```

2. Start the frontend development server:

```bash
npm run dev
```

The frontend will run on http://localhost:5173.

## API Documentation

The API documentation is available within the application. The API requires an API key for authentication:

```
xpectrum_api_key_123@ai
```

## Available Endpoints

- `/terminsurance/api/v1/applications` - Manage insurance applications
- `/terminsurance/api/v1/quotes` - Manage insurance quotes
- `/terminsurance/api/v1/riders` - Access rider information
- `/terminsurance/api/v1/riders_applications` - Manage rider applications
- `/terminsurance/api/v1/riders_quote` - Manage rider quotes
- `/terminsurance/api/v1/policies` - Access policy information
- `/terminsurance/api/v1/term_life_insurance_plans` - Access term life insurance plan details
- `/terminsurance/api/v1/insurance_plans_to_riders_names` - Get available riders for insurance plans
