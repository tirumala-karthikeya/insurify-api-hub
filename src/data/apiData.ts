
export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  example: string;
}

export interface ApiEndpoint {
  id: string;
  category: string;
  title: string;
  method: string;
  baseUrl: string;
  path: string;
  queryParams: Parameter[];
  headerParams: Parameter[];
  bodyParams?: Parameter[];
  responseExample: {
    schema: Record<string, { type: string; required: boolean }>;
    example: any;
  };
}

const BASE_URL = "https://insurance-api.example.com";

export const apiEndpoints: Record<string, ApiEndpoint> = {
  "get-all-policies": {
    id: "get-all-policies",
    category: "Policy Management",
    title: "Get All Policies",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/api/v1/policies",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "active"
      },
      {
        name: "page",
        type: "integer",
        required: false,
        example: "1"
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        example: "10"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    responseExample: {
      schema: {
        policy_id: { type: "string", required: true },
        first_name: { type: "string", required: false },
        last_name: { type: "string", required: false },
        email: { type: "string", required: false },
        phone_number: { type: "string", required: false },
        start_date: { type: "string", required: false },
        policy_type: { type: "string", required: false },
        status: { type: "string", required: false }
      },
      example: {
        "total": 100,
        "page": 1,
        "limit": 10,
        "policies": [
          {
            "policy_id": "POL12345",
            "first_name": "John",
            "last_name": "Smith",
            "email": "john.smith@example.com",
            "phone_number": "+1 123-456-7890",
            "start_date": "2023-01-15",
            "end_date": "2024-01-14",
            "policy_type": "Auto Insurance",
            "premium_amount": 1200,
            "coverage_amount": 50000,
            "status": "active"
          }
        ]
      }
    }
  },
  "get-policy-by-id": {
    id: "get-policy-by-id",
    category: "Policy Management",
    title: "Get Policy by ID",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/api/v1/policies/{policy_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    responseExample: {
      schema: {
        policy_id: { type: "string", required: true },
        first_name: { type: "string", required: false },
        last_name: { type: "string", required: false },
        email: { type: "string", required: false },
        phone_number: { type: "string", required: false },
        start_date: { type: "string", required: false },
        policy_type: { type: "string", required: false },
        status: { type: "string", required: false }
      },
      example: {
        "policy_id": "POL12345",
        "first_name": "John",
        "last_name": "Smith",
        "email": "john.smith@example.com",
        "phone_number": "+1 123-456-7890",
        "start_date": "2023-01-15",
        "end_date": "2024-01-14",
        "policy_type": "Auto Insurance",
        "premium_amount": 1200,
        "coverage_amount": 50000,
        "status": "active",
        "beneficiaries": [
          {
            "name": "Jane Smith",
            "relationship": "Spouse",
            "percentage": 100
          }
        ]
      }
    }
  },
  "create-policy": {
    id: "create-policy",
    category: "Policy Management",
    title: "Create Policy",
    method: "POST",
    baseUrl: BASE_URL,
    path: "/api/v1/policies",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    bodyParams: [
      {
        name: "first_name",
        type: "string",
        required: true,
        example: "John"
      },
      {
        name: "last_name",
        type: "string",
        required: true,
        example: "Smith"
      },
      {
        name: "email",
        type: "string",
        required: true,
        example: "john.smith@example.com"
      },
      {
        name: "phone_number",
        type: "string",
        required: false,
        example: "+1 123-456-7890"
      },
      {
        name: "start_date",
        type: "string",
        required: true,
        example: "2023-01-15"
      },
      {
        name: "end_date",
        type: "string",
        required: true,
        example: "2024-01-14"
      },
      {
        name: "policy_type",
        type: "string",
        required: true,
        example: "Auto Insurance"
      },
      {
        name: "premium_amount",
        type: "number",
        required: true,
        example: "1200"
      },
      {
        name: "coverage_amount",
        type: "number",
        required: true,
        example: "50000"
      }
    ],
    responseExample: {
      schema: {
        policy_id: { type: "string", required: true },
        first_name: { type: "string", required: true },
        last_name: { type: "string", required: true },
        email: { type: "string", required: true },
        created_at: { type: "string", required: true },
        status: { type: "string", required: true }
      },
      example: {
        "policy_id": "POL12345",
        "first_name": "John",
        "last_name": "Smith",
        "email": "john.smith@example.com",
        "phone_number": "+1 123-456-7890",
        "start_date": "2023-01-15",
        "end_date": "2024-01-14",
        "policy_type": "Auto Insurance",
        "premium_amount": 1200,
        "coverage_amount": 50000,
        "created_at": "2023-01-10T14:30:45Z",
        "status": "active"
      }
    }
  },
  "update-policy": {
    id: "update-policy",
    category: "Policy Management",
    title: "Update Policy",
    method: "PUT",
    baseUrl: BASE_URL,
    path: "/api/v1/policies/{policy_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    bodyParams: [
      {
        name: "email",
        type: "string",
        required: false,
        example: "john.updated@example.com"
      },
      {
        name: "phone_number",
        type: "string",
        required: false,
        example: "+1 123-456-7890"
      },
      {
        name: "end_date",
        type: "string",
        required: false,
        example: "2025-01-14"
      },
      {
        name: "premium_amount",
        type: "number",
        required: false,
        example: "1300"
      },
      {
        name: "coverage_amount",
        type: "number",
        required: false,
        example: "55000"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "active"
      }
    ],
    responseExample: {
      schema: {
        policy_id: { type: "string", required: true },
        email: { type: "string", required: false },
        phone_number: { type: "string", required: false },
        updated_at: { type: "string", required: true },
        status: { type: "string", required: false }
      },
      example: {
        "policy_id": "POL12345",
        "email": "john.updated@example.com",
        "phone_number": "+1 123-456-7890",
        "end_date": "2025-01-14",
        "premium_amount": 1300,
        "coverage_amount": 55000,
        "updated_at": "2023-02-15T09:30:45Z",
        "status": "active"
      }
    }
  },
  "delete-policy": {
    id: "delete-policy",
    category: "Policy Management",
    title: "Delete Policy",
    method: "DELETE",
    baseUrl: BASE_URL,
    path: "/api/v1/policies/{policy_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    responseExample: {
      schema: {
        success: { type: "boolean", required: true },
        message: { type: "string", required: true },
        deleted_at: { type: "string", required: true }
      },
      example: {
        "success": true,
        "message": "Policy POL12345 has been successfully deleted",
        "deleted_at": "2023-03-20T11:45:30Z"
      }
    }
  },
  "get-claims-information": {
    id: "get-claims-information",
    category: "Claims Management",
    title: "Get Claims Information",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/api/v1/claims",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      },
      {
        name: "policy_id",
        type: "string",
        required: false,
        example: "POL12345"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "pending"
      },
      {
        name: "page",
        type: "integer",
        required: false,
        example: "1"
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        example: "10"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    responseExample: {
      schema: {
        claim_id: { type: "string", required: true },
        policy_id: { type: "string", required: true },
        date_filed: { type: "string", required: true },
        amount: { type: "number", required: true },
        status: { type: "string", required: true },
        description: { type: "string", required: false }
      },
      example: {
        "total": 25,
        "page": 1,
        "limit": 10,
        "claims": [
          {
            "claim_id": "CLM7890",
            "policy_id": "POL12345",
            "date_filed": "2023-05-20",
            "amount": 2500,
            "status": "pending",
            "description": "Vehicle damage from accident",
            "documents": [
              {
                "id": "DOC001",
                "name": "Police Report",
                "url": "https://example.com/documents/police_report.pdf"
              },
              {
                "id": "DOC002",
                "name": "Damage Photos",
                "url": "https://example.com/documents/damage_photos.zip"
              }
            ]
          }
        ]
      }
    }
  },
  "update-claims-information": {
    id: "update-claims-information",
    category: "Claims Management",
    title: "Update Claims Information",
    method: "PUT",
    baseUrl: BASE_URL,
    path: "/api/v1/claims/{claim_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    bodyParams: [
      {
        name: "amount",
        type: "number",
        required: false,
        example: "3000"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "approved"
      },
      {
        name: "description",
        type: "string",
        required: false,
        example: "Updated damage assessment"
      }
    ],
    responseExample: {
      schema: {
        claim_id: { type: "string", required: true },
        policy_id: { type: "string", required: true },
        amount: { type: "number", required: false },
        status: { type: "string", required: false },
        updated_at: { type: "string", required: true }
      },
      example: {
        "claim_id": "CLM7890",
        "policy_id": "POL12345",
        "amount": 3000,
        "status": "approved",
        "description": "Updated damage assessment",
        "updated_at": "2023-05-25T10:15:30Z"
      }
    }
  },
  "create-claims-information": {
    id: "create-claims-information",
    category: "Claims Management",
    title: "Create Claims Information",
    method: "POST",
    baseUrl: BASE_URL,
    path: "/api/v1/claims",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    bodyParams: [
      {
        name: "policy_id",
        type: "string",
        required: true,
        example: "POL12345"
      },
      {
        name: "date_filed",
        type: "string",
        required: true,
        example: "2023-05-20"
      },
      {
        name: "amount",
        type: "number",
        required: true,
        example: "2500"
      },
      {
        name: "description",
        type: "string",
        required: true,
        example: "Vehicle damage from accident"
      },
      {
        name: "documents",
        type: "array",
        required: false,
        example: "[{id: 'DOC001', name: 'Police Report'}]"
      }
    ],
    responseExample: {
      schema: {
        claim_id: { type: "string", required: true },
        policy_id: { type: "string", required: true },
        date_filed: { type: "string", required: true },
        amount: { type: "number", required: true },
        status: { type: "string", required: true },
        created_at: { type: "string", required: true }
      },
      example: {
        "claim_id": "CLM7890",
        "policy_id": "POL12345",
        "date_filed": "2023-05-20",
        "amount": 2500,
        "status": "pending",
        "description": "Vehicle damage from accident",
        "documents": [
          {
            "id": "DOC001",
            "name": "Police Report"
          }
        ],
        "created_at": "2023-05-20T09:30:15Z"
      }
    }
  },
  "get-premium-data": {
    id: "get-premium-data",
    category: "Premium Management",
    title: "Get Premium Data",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/api/v1/premiums",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      },
      {
        name: "policy_id",
        type: "string",
        required: false,
        example: "POL12345"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "paid"
      },
      {
        name: "page",
        type: "integer",
        required: false,
        example: "1"
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        example: "10"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    responseExample: {
      schema: {
        premium_id: { type: "string", required: true },
        policy_id: { type: "string", required: true },
        amount: { type: "number", required: true },
        due_date: { type: "string", required: true },
        status: { type: "string", required: true }
      },
      example: {
        "total": 36,
        "page": 1,
        "limit": 10,
        "premiums": [
          {
            "premium_id": "PRM456",
            "policy_id": "POL12345",
            "amount": 100,
            "due_date": "2023-06-15",
            "payment_date": "2023-06-10",
            "payment_method": "credit_card",
            "status": "paid"
          }
        ]
      }
    }
  },
  "update-premium-data": {
    id: "update-premium-data",
    category: "Premium Management",
    title: "Update Premium Data",
    method: "PUT",
    baseUrl: BASE_URL,
    path: "/api/v1/premiums/{premium_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    bodyParams: [
      {
        name: "amount",
        type: "number",
        required: false,
        example: "110"
      },
      {
        name: "due_date",
        type: "string",
        required: false,
        example: "2023-07-15"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "paid"
      },
      {
        name: "payment_date",
        type: "string",
        required: false,
        example: "2023-07-10"
      },
      {
        name: "payment_method",
        type: "string",
        required: false,
        example: "bank_transfer"
      }
    ],
    responseExample: {
      schema: {
        premium_id: { type: "string", required: true },
        policy_id: { type: "string", required: true },
        amount: { type: "number", required: false },
        due_date: { type: "string", required: false },
        status: { type: "string", required: false },
        updated_at: { type: "string", required: true }
      },
      example: {
        "premium_id": "PRM456",
        "policy_id": "POL12345",
        "amount": 110,
        "due_date": "2023-07-15",
        "payment_date": "2023-07-10",
        "payment_method": "bank_transfer",
        "status": "paid",
        "updated_at": "2023-06-30T14:20:45Z"
      }
    }
  },
  "create-premium-data": {
    id: "create-premium-data",
    category: "Premium Management",
    title: "Create Premium Data",
    method: "POST",
    baseUrl: BASE_URL,
    path: "/api/v1/premiums",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    bodyParams: [
      {
        name: "policy_id",
        type: "string",
        required: true,
        example: "POL12345"
      },
      {
        name: "amount",
        type: "number",
        required: true,
        example: "100"
      },
      {
        name: "due_date",
        type: "string",
        required: true,
        example: "2023-06-15"
      },
      {
        name: "payment_method",
        type: "string",
        required: false,
        example: "credit_card"
      }
    ],
    responseExample: {
      schema: {
        premium_id: { type: "string", required: true },
        policy_id: { type: "string", required: true },
        amount: { type: "number", required: true },
        due_date: { type: "string", required: true },
        status: { type: "string", required: true },
        created_at: { type: "string", required: true }
      },
      example: {
        "premium_id": "PRM456",
        "policy_id": "POL12345",
        "amount": 100,
        "due_date": "2023-06-15",
        "payment_method": "credit_card",
        "status": "unpaid",
        "created_at": "2023-05-15T11:30:20Z"
      }
    }
  },
  "get-coverage-data": {
    id: "get-coverage-data",
    category: "Coverage Management",
    title: "Get Coverage Data",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/api/v1/coverages",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "spectrum_api_key_123@ai"
      },
      {
        name: "policy_id",
        type: "string",
        required: false,
        example: "POL12345"
      },
      {
        name: "type",
        type: "string",
        required: false,
        example: "liability"
      },
      {
        name: "page",
        type: "integer",
        required: false,
        example: "1"
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        example: "10"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "your_api_key"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      },
      {
        name: "Authorization",
        type: "string",
        required: true,
        example: "Bearer token"
      }
    ],
    responseExample: {
      schema: {
        coverage_id: { type: "string", required: true },
        policy_id: { type: "string", required: true },
        type: { type: "string", required: true },
        limit: { type: "number", required: true },
        deductible: { type: "number", required: true }
      },
      example: {
        "total": 15,
        "page": 1,
        "limit": 10,
        "coverages": [
          {
            "coverage_id": "COV789",
            "policy_id": "POL12345",
            "type": "liability",
            "limit": 100000,
            "deductible": 500,
            "description": "Bodily injury and property damage liability",
            "is_active": true
          }
        ]
      }
    }
  }
};
