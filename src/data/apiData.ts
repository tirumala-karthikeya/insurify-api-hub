
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

const BASE_URL = "https://hrms-api.xpectrum-ai.com";

export const apiEndpoints: Record<string, ApiEndpoint> = {
  // Applications APIs
  "get-application-by-id": {
    id: "get-application-by-id",
    category: "Applications",
    title: "Get Application by ID",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/applications/{application_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        application_id: { type: "string", required: true },
        applicant_id: { type: "string", required: false },
        plan_name: { type: "string", required: false },
        plan_id: { type: "string", required: false },
        quote_id: { type: "string", required: false },
        first_name: { type: "string", required: false },
        last_name: { type: "string", required: false },
        email_id: { type: "string", required: false },
        age: { type: "integer", required: false },
        coverage_amount: { type: "integer", required: false },
        quoted_monthly_premium: { type: "array", required: false },
        term_length: { type: "integer", required: false },
        application_date: { type: "string", required: false },
        application_time: { type: "string", required: false },
        status: { type: "string", required: false },
        riders: { type: "array", required: false },
        beneficiary: { type: "object", required: false },
        approved_details: { type: "array", required: false },
        premium: { type: "number", required: false },
        frequency: { type: "string", required: false },
        quote_details: { type: "object", required: false }
      },
      example: {
        "application_id": "AP38211",
        "applicant_id": "PH5533",
        "plan_name": "Professional Shield",
        "plan_id": "TL003",
        "quote_id": "QU3616",
        "first_name": "Subhankar",
        "last_name": "Ghosh",
        "email_id": "iisubho1@gmail.com",
        "age": 55,
        "coverage_amount": 5000000,
        "quoted_monthly_premium": [
          "3960"
        ],
        "term_length": 10,
        "application_date": "2025-01-21",
        "application_time": "02:21:53.425121",
        "status": "approved",
        "riders": [
          "{'rider_application_id': 'AP2571', 'rider_applicant_id': 'RH6196', 'rider_name': 'Disability Insurance Rider', 'rider_id': 'DI001', 'rider_quote_id': 'QU3128', 'premium': 158.4, 'frequency': 'monthly', 'application_date': '2025-01-21', 'application_time': '02:21:59.432586', 'status': 'approved', 'quote_details': [{'age': 55, 'occupation': 'others', 'income': 75000, 'benefit_percentage': 60, 'waiting_period': 12, 'health_condition': 'Good', 'geographical_location': 'rural', 'smoking_status': 'non-smoker', 'premium': 158.4, 'frequency': 'monthly'}]}",
          "{'rider_application_id': 'AP8322', 'rider_applicant_id': 'RH2308', 'rider_name': 'Critical Illness Rider', 'rider_id': 'CI001', 'rider_quote_id': 'QU6535', 'premium': 480.0, 'frequency': 'monthly', 'application_date': '2025-01-21', 'application_time': '02:22:04.356209', 'status': 'approved', 'quote_details': [{'age': 55, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'additional_coverage': 100000, 'geographical_location': 'rural', 'premium': 480.0}]}",
          "{'rider_application_id': 'AP9145', 'rider_applicant_id': 'RH7793', 'rider_name': 'Disability Insurance Rider', 'rider_id': 'DI001', 'rider_quote_id': 'QU3128', 'premium': 158.4, 'frequency': 'monthly', 'application_date': '2025-01-28', 'application_time': '04:57:50.703349', 'status': 'under review', 'quote_details': [{'age': 55, 'occupation': 'others', 'income': 75000, 'benefit_percentage': 60, 'waiting_period': 12, 'health_condition': 'Good', 'geographical_location': 'rural', 'smoking_status': 'non-smoker', 'premium': 158.4, 'frequency': 'monthly'}]}"
        ],
        "beneficiary": {
          "DOB": "11-30-1995",
          "id_number": "12354",
          "last_name": "Sar",
          "first_name": "San",
          "relationship": "spouse"
        },
        "approved_details": [
          "{'approved_date': '2025-01-21', 'approved_time': '02:23:03', 'approved_by': 'Ramar John'}"
        ],
        "quote_details": null,
        "premium": null,
        "frequency": null
      }
    }
  },
  "create-application": {
    id: "create-application",
    category: "Applications",
    title: "Create Application",
    method: "POST",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/applications/",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    bodyParams: [
      {
        name: "application_id",
        type: "string",
        required: true,
        example: "AP38211"
      },
      {
        name: "applicant_id",
        type: "string",
        required: false,
        example: "PH5533"
      },
      {
        name: "plan_name",
        type: "string",
        required: false,
        example: "Professional Shield"
      },
      {
        name: "plan_id",
        type: "string",
        required: false,
        example: "TL003"
      },
      {
        name: "quote_id",
        type: "string",
        required: false,
        example: "QU3616"
      },
      {
        name: "first_name",
        type: "string",
        required: false,
        example: "Subhankar"
      },
      {
        name: "last_name",
        type: "string",
        required: false,
        example: "Ghosh"
      },
      {
        name: "email_id",
        type: "string",
        required: false,
        example: "iisubho1@gmail.com"
      },
      {
        name: "age",
        type: "integer",
        required: false,
        example: "55"
      },
      {
        name: "coverage_amount",
        type: "integer",
        required: false,
        example: "5000000"
      },
      {
        name: "quoted_monthly_premium",
        type: "array",
        required: false,
        example: '["3960"]'
      },
      {
        name: "term_length",
        type: "integer",
        required: false,
        example: "10"
      },
      {
        name: "application_date",
        type: "string",
        required: false,
        example: "2025-01-21"
      },
      {
        name: "application_time",
        type: "string",
        required: false,
        example: "02:21:53.425121"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "approved"
      },
      {
        name: "riders",
        type: "array",
        required: false,
        example: "[]"
      },
      {
        name: "beneficiary",
        type: "object",
        required: false,
        example: '{"DOB": "11-30-1995", "id_number": "12354", "last_name": "Sar", "first_name": "San", "relationship": "spouse"}'
      },
      {
        name: "approved_details",
        type: "array",
        required: false,
        example: "[]"
      },
      {
        name: "premium",
        type: "number",
        required: false,
        example: "null"
      },
      {
        name: "frequency",
        type: "string",
        required: false,
        example: "null"
      },
      {
        name: "quote_details",
        type: "object",
        required: false,
        example: "null"
      }
    ],
    responseExample: {
      schema: {
        application_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "application_id": "AP38211",
        "success": true,
        "message": "Application created successfully"
      }
    }
  },
  "update-application": {
    id: "update-application",
    category: "Applications",
    title: "Update Application",
    method: "PUT",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/applications/{application_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    bodyParams: [
      {
        name: "application_id",
        type: "string",
        required: true,
        example: "AP38211"
      },
      {
        name: "applicant_id",
        type: "string",
        required: false,
        example: "PH5533"
      },
      {
        name: "plan_name",
        type: "string",
        required: false,
        example: "Professional Shield"
      },
      {
        name: "plan_id",
        type: "string",
        required: false,
        example: "TL003"
      },
      {
        name: "quote_id",
        type: "string",
        required: false,
        example: "QU3616"
      },
      {
        name: "first_name",
        type: "string",
        required: false,
        example: "Subhankar"
      },
      {
        name: "last_name",
        type: "string",
        required: false,
        example: "Ghosh"
      },
      {
        name: "email_id",
        type: "string",
        required: false,
        example: "iisubho1@gmail.com"
      },
      {
        name: "age",
        type: "integer",
        required: false,
        example: "55"
      },
      {
        name: "coverage_amount",
        type: "integer",
        required: false,
        example: "5000000"
      },
      {
        name: "quoted_monthly_premium",
        type: "array",
        required: false,
        example: '["3960"]'
      },
      {
        name: "term_length",
        type: "integer",
        required: false,
        example: "10"
      },
      {
        name: "application_date",
        type: "string",
        required: false,
        example: "2025-01-21"
      },
      {
        name: "application_time",
        type: "string",
        required: false,
        example: "02:21:53.425121"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "approved"
      },
      {
        name: "riders",
        type: "array",
        required: false,
        example: "[]"
      },
      {
        name: "beneficiary",
        type: "object",
        required: false,
        example: '{"DOB": "11-30-1995", "id_number": "12354", "last_name": "Sar", "first_name": "San", "relationship": "spouse"}'
      },
      {
        name: "approved_details",
        type: "array",
        required: false,
        example: "[]"
      },
      {
        name: "premium",
        type: "number",
        required: false,
        example: "null"
      },
      {
        name: "frequency",
        type: "string",
        required: false,
        example: "null"
      },
      {
        name: "quote_details",
        type: "object",
        required: false,
        example: "null"
      }
    ],
    responseExample: {
      schema: {
        application_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "application_id": "AP38211",
        "success": true,
        "message": "Application updated successfully"
      }
    }
  },
  
  // Insurance Plans to Riders Names API
  "get-insurance-plans-to-riders-names": {
    id: "get-insurance-plans-to-riders-names",
    category: "Insurance Plans",
    title: "Get Insurance Plans to Riders Names",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/insurance_plans_to_riders_names/{insurance_plan_name}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        insurance_plan_name: { type: "string", required: true },
        available_riders: { type: "array", required: false }
      },
      example: {
        "insurance_plan_name": "Professional Shield",
        "available_riders": [
          "Disability Insurance Rider",
          "Critical Illness Rider"
        ]
      }
    }
  },
  
  // Policies API
  "get-policy-by-id": {
    id: "get-policy-by-id",
    category: "Policies",
    title: "Get Policy by ID",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/policies/{policy_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        policy_id: { type: "string", required: true },
        policy_holder_id: { type: "string", required: false },
        application_id: { type: "string", required: false },
        policy_status: { type: "string", required: false },
        last_premium_paid_date: { type: "string", required: false },
        first_name: { type: "string", required: false },
        last_name: { type: "string", required: false },
        plan_details: { type: "object", required: false },
        policy_dates: { type: "object", required: false },
        policy_creation: { type: "object", required: false },
        riders: { type: "array", required: false },
        beneficiary: { type: "array", required: false }
      },
      example: {
        "policy_id": "POL12345",
        "policy_holder_id": "PH5533",
        "application_id": "AP38211",
        "policy_status": "active",
        "last_premium_paid_date": "2025-01-21",
        "first_name": "Subhankar",
        "last_name": "Ghosh",
        "plan_details": {
          "plan_name": "Professional Shield",
          "plan_id": "TL003",
          "coverage_amount": 5000000,
          "term_length": 10,
          "premium": 3960,
          "frequency": "monthly"
        },
        "policy_dates": {
          "start_date": "2025-01-22",
          "end_date": "2035-01-21"
        },
        "policy_creation": {
          "created_by": "Ramar John",
          "created_date": "2025-01-22",
          "created_time": "10:30:45"
        },
        "riders": [
          "Disability Insurance Rider",
          "Critical Illness Rider"
        ],
        "beneficiary": [
          {
            "first_name": "San",
            "last_name": "Sar",
            "relationship": "spouse",
            "percentage": 100
          }
        ]
      }
    }
  },
  
  // Quotes APIs
  "get-quote-by-id": {
    id: "get-quote-by-id",
    category: "Quotes",
    title: "Get Quote by ID",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/quotes/{quote_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        quote_id: { type: "string", required: true },
        plan_name: { type: "string", required: false },
        plan_id: { type: "string", required: false },
        age: { type: "integer", required: false },
        health_condition: { type: "string", required: false },
        smoking_status: { type: "string", required: false },
        occupation: { type: "string", required: false },
        coverage_amount: { type: "integer", required: false },
        term_length: { type: "integer", required: false },
        monthly_premium: { type: "array", required: false },
        plan: { type: "object", required: false }
      },
      example: {
        "quote_id": "QU361665",
        "plan_name": "Professional Shield",
        "plan_id": "TL003",
        "age": 55,
        "health_condition": "Good",
        "smoking_status": "non-smoker",
        "occupation": "others",
        "coverage_amount": 5000000,
        "term_length": 10,
        "monthly_premium": [
          "3960"
        ],
        "plan": {
          "id": "TL003",
          "name": "Professional Shield",
          "features": {
            "policy_type": "Professional Term",
            "grace_period": 60,
            "tax_benefits": true,
            "payment_methods": [
              "Bank Transfer",
              "Online Payment",
              "Corporate Payroll Deduction"
            ],
            "digital_services": {
              "claim_intimation": true,
              "policy_management": true,
              "professional_risk_assessment": true
            },
            "nomination_process": [
              "Online",
              "Branch",
              "Corporate Liaison"
            ],
            "partial_withdrawal": false,
            "additional_benefits": [
              "Professional disability coverage",
              "Critical illness protection",
              "Global coverage"
            ],
            "loan_against_policy": true,
            "nominee_types_allowed": [
              "Spouse",
              "Children",
              "Business Partners"
            ],
            "nominee_change_allowed": true,
            "policy_premium_payment_frequency": [
              "Annual",
              "Semi-Annual",
              "Quarterly"
            ]
          },
          "age_range": {
            "maximum_entry_age": 55,
            "minimum_entry_age": 25,
            "maximum_maturity_age": 70
          },
          "description": "A specialized term life insurance plan tailored for high-earning professionals in demanding careers with substantial coverage.",
          "term_length": [
            10,
            20
          ],
          "convertibility": false,
          "available_riders": [
            "Disability Insurance Rider",
            "Critical Illness Rider"
          ],
          "target_professions": [
            "Doctors",
            "Lawyers",
            "Engineers",
            "Financial Professionals"
          ],
          "medical_exam_required": true,
          "maximum_coverage_amount": 5000000,
          "minimum_coverage_amount": 500000,
          "premium_calculation_factors": [
            "Professional credentials",
            "Income level",
            "Specialized occupation risks",
            "Health status"
          ]
        }
      }
    }
  },
  "create-quote": {
    id: "create-quote",
    category: "Quotes",
    title: "Create Quote",
    method: "POST",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/quotes/",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    bodyParams: [
      {
        name: "quote_id",
        type: "string",
        required: true,
        example: "QU361665"
      },
      {
        name: "plan_name",
        type: "string",
        required: false,
        example: "Professional Shield"
      },
      {
        name: "plan_id",
        type: "string",
        required: false,
        example: "TL003"
      },
      {
        name: "age",
        type: "integer",
        required: false,
        example: "55"
      },
      {
        name: "health_condition",
        type: "string",
        required: false,
        example: "Good"
      },
      {
        name: "smoking_status",
        type: "string",
        required: false,
        example: "non-smoker"
      },
      {
        name: "occupation",
        type: "string",
        required: false,
        example: "others"
      },
      {
        name: "coverage_amount",
        type: "integer",
        required: false,
        example: "5000000"
      },
      {
        name: "term_length",
        type: "integer",
        required: false,
        example: "10"
      },
      {
        name: "monthly_premium",
        type: "array",
        required: false,
        example: '["3960"]'
      },
      {
        name: "plan",
        type: "object",
        required: false,
        example: '{"id": "TL003", "name": "Professional Shield", "features": {...}}'
      }
    ],
    responseExample: {
      schema: {
        quote_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "quote_id": "QU361665",
        "success": true,
        "message": "Quote created successfully"
      }
    }
  },
  "update-quote": {
    id: "update-quote",
    category: "Quotes",
    title: "Update Quote",
    method: "PUT",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/quotes/{quote_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    bodyParams: [
      {
        name: "quote_id",
        type: "string",
        required: true,
        example: "QU361665"
      },
      {
        name: "plan_name",
        type: "string",
        required: false,
        example: "Professional Shield"
      },
      {
        name: "plan_id",
        type: "string",
        required: false,
        example: "TL003"
      },
      {
        name: "age",
        type: "integer",
        required: false,
        example: "55"
      },
      {
        name: "health_condition",
        type: "string",
        required: false,
        example: "Good"
      },
      {
        name: "smoking_status",
        type: "string",
        required: false,
        example: "non-smoker"
      },
      {
        name: "occupation",
        type: "string",
        required: false,
        example: "others"
      },
      {
        name: "coverage_amount",
        type: "integer",
        required: false,
        example: "5000000"
      },
      {
        name: "term_length",
        type: "integer",
        required: false,
        example: "10"
      },
      {
        name: "monthly_premium",
        type: "array",
        required: false,
        example: '["3960"]'
      },
      {
        name: "plan",
        type: "object",
        required: false,
        example: '{"id": "TL003", "name": "Professional Shield", "features": {...}}'
      }
    ],
    responseExample: {
      schema: {
        quote_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "quote_id": "QU361665",
        "success": true,
        "message": "Quote updated successfully"
      }
    }
  },
  "delete-quote": {
    id: "delete-quote",
    category: "Quotes",
    title: "Delete Quote",
    method: "DELETE",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/quotes/{quote_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        quote_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "quote_id": "QU361665",
        "success": true,
        "message": "Quote deleted successfully"
      }
    }
  },
  
  // Riders APIs
  "get-rider-by-id": {
    id: "get-rider-by-id",
    category: "Riders",
    title: "Get Rider by ID",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/riders/{rider_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        id: { type: "string", required: true },
        name: { type: "string", required: false },
        description: { type: "string", required: false },
        covered_conditions: { type: "array", required: false },
        required_inputs: { type: "array", required: false },
        typical_payout_range: { type: "object", required: false },
        disability_types: { type: "array", required: false },
        typical_monthly_benefit_range: { type: "object", required: false },
        covered_accidents: { type: "array", required: false },
        typical_payout_multiplier: { type: "object", required: false },
        coverage_conditions: { type: "array", required: false },
        typical_coverage_duration: { type: "object", required: false }
      },
      example: {
        "id": "CI001",
        "name": "Critical Illness Rider",
        "description": "Provides a lump sum payment upon diagnosis of a covered critical illness",
        "covered_conditions": [
          "Cancer",
          "Heart Attack",
          "Stroke",
          "Major Organ Transplant",
          "Kidney Failure"
        ],
        "required_inputs": [
          "age",
          "health_condition",
          "smoking_status",
          "additional_coverage",
          "geographical_location"
        ],
        "typical_payout_range": {
          "minimum": 25000,
          "maximum": 1000000
        },
        "coverage_conditions": [
          "Diagnosis must be confirmed by a specialist",
          "30-day survival period after diagnosis",
          "90-day waiting period from policy issue date"
        ]
      }
    }
  },
  
  // Riders Applications APIs
  "get-rider-application-by-id": {
    id: "get-rider-application-by-id",
    category: "Rider Applications",
    title: "Get Rider Application by ID",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/riders_applications/{rider_application_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        rider_application_id: { type: "string", required: true },
        rider_applicant_id: { type: "string", required: false },
        rider_name: { type: "string", required: false },
        rider_id: { type: "string", required: false },
        rider_quote_id: { type: "string", required: false },
        premium: { type: "number", required: false },
        frequency: { type: "string", required: false },
        application_date: { type: "string", required: false },
        application_time: { type: "string", required: false },
        status: { type: "string", required: false },
        quote_details: { type: "array", required: false }
      },
      example: {
        "rider_application_id": "AP38554",
        "rider_applicant_id": "RH9207",
        "rider_name": "Enhanced Accidental Coverage",
        "rider_id": "RID001",
        "rider_quote_id": "QU7719",
        "premium": "27.00",
        "frequency": "monthly",
        "application_date": "2025-02-12",
        "application_time": "01:21:47.242427",
        "status": "under review",
        "quote_details": [
          {
            "age": 40,
            "health_condition": "Good",
            "smoking_status": "non-smoker",
            "occupation": "construction",
            "base_policy_premium": 200,
            "premium": 27.0,
            "waiting_period_in_months": 12,
            "geographical_location": "rural"
          }
        ]
      }
    }
  },
  "create-rider-application": {
    id: "create-rider-application",
    category: "Rider Applications",
    title: "Create Rider Application",
    method: "POST",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/riders_applications/",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    bodyParams: [
      {
        name: "rider_application_id",
        type: "string",
        required: true,
        example: "AP38554"
      },
      {
        name: "rider_applicant_id",
        type: "string",
        required: false,
        example: "RH9207"
      },
      {
        name: "rider_name",
        type: "string",
        required: false,
        example: "Enhanced Accidental Coverage"
      },
      {
        name: "rider_id",
        type: "string",
        required: false,
        example: "RID001"
      },
      {
        name: "rider_quote_id",
        type: "string",
        required: false,
        example: "QU7719"
      },
      {
        name: "premium",
        type: "number",
        required: false,
        example: "27.00"
      },
      {
        name: "frequency",
        type: "string",
        required: false,
        example: "monthly"
      },
      {
        name: "application_date",
        type: "string",
        required: false,
        example: "2025-02-12"
      },
      {
        name: "application_time",
        type: "string",
        required: false,
        example: "01:21:47.242427"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "under review"
      },
      {
        name: "quote_details",
        type: "array",
        required: false,
        example: '[{"age": 40, "health_condition": "Good", "smoking_status": "non-smoker", "occupation": "construction", "base_policy_premium": 200, "premium": 27.0, "waiting_period_in_months": 12, "geographical_location": "rural"}]'
      }
    ],
    responseExample: {
      schema: {
        rider_application_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "rider_application_id": "AP38554",
        "success": true,
        "message": "Rider application created successfully"
      }
    }
  },
  "update-rider-application": {
    id: "update-rider-application",
    category: "Rider Applications",
    title: "Update Rider Application",
    method: "PUT",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/riders_applications/{rider_application_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    bodyParams: [
      {
        name: "rider_application_id",
        type: "string",
        required: true,
        example: "AP38554"
      },
      {
        name: "rider_applicant_id",
        type: "string",
        required: false,
        example: "RH9207"
      },
      {
        name: "rider_name",
        type: "string",
        required: false,
        example: "Enhanced Accidental Coverage"
      },
      {
        name: "rider_id",
        type: "string",
        required: false,
        example: "RID001"
      },
      {
        name: "rider_quote_id",
        type: "string",
        required: false,
        example: "QU7719"
      },
      {
        name: "premium",
        type: "number",
        required: false,
        example: "27.00"
      },
      {
        name: "frequency",
        type: "string",
        required: false,
        example: "monthly"
      },
      {
        name: "application_date",
        type: "string",
        required: false,
        example: "2025-02-12"
      },
      {
        name: "application_time",
        type: "string",
        required: false,
        example: "01:21:47.242427"
      },
      {
        name: "status",
        type: "string",
        required: false,
        example: "under review"
      },
      {
        name: "quote_details",
        type: "array",
        required: false,
        example: '[{"age": 40, "health_condition": "Good", "smoking_status": "non-smoker", "occupation": "construction", "base_policy_premium": 200, "premium": 27.0, "waiting_period_in_months": 12, "geographical_location": "rural"}]'
      }
    ],
    responseExample: {
      schema: {
        rider_application_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "rider_application_id": "AP38554",
        "success": true,
        "message": "Rider application updated successfully"
      }
    }
  },
  "delete-rider-application": {
    id: "delete-rider-application",
    category: "Rider Applications",
    title: "Delete Rider Application",
    method: "DELETE",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/riders_applications/{rider_application_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        rider_application_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "rider_application_id": "AP38554",
        "success": true,
        "message": "Rider application deleted successfully"
      }
    }
  },
  
  // Riders Quote APIs
  "get-rider-quote-by-id": {
    id: "get-rider-quote-by-id",
    category: "Rider Quotes",
    title: "Get Rider Quote by ID",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/riders_quote/{rider_quote_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        rider_quote_id: { type: "string", required: true },
        rider_id: { type: "string", required: false },
        rider_name: { type: "string", required: false },
        details: { type: "array", required: false },
        premium: { type: "string", required: false }
      },
      example: {
        "rider_quote_id": "QU65355",
        "rider_id": "CI001",
        "rider_name": "Critical Illness Rider",
        "details": [
          {
            "age": 55,
            "health_condition": "Good",
            "smoking_status": "non-smoker",
            "additional_coverage": 100000,
            "geographical_location": "rural",
            "premium": 480.0
          }
        ],
        "premium": "480.00"
      }
    }
  },
  "create-rider-quote": {
    id: "create-rider-quote",
    category: "Rider Quotes",
    title: "Create Rider Quote",
    method: "POST",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/riders_quote/",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    bodyParams: [
      {
        name: "rider_quote_id",
        type: "string",
        required: true,
        example: "QU65355"
      },
      {
        name: "rider_id",
        type: "string",
        required: false,
        example: "CI001"
      },
      {
        name: "rider_name",
        type: "string",
        required: false,
        example: "Critical Illness Rider"
      },
      {
        name: "details",
        type: "array",
        required: false,
        example: '[{"age": 55, "health_condition": "Good", "smoking_status": "non-smoker", "additional_coverage": 100000, "geographical_location": "rural", "premium": 480.0}]'
      },
      {
        name: "premium",
        type: "string",
        required: false,
        example: "480.00"
      }
    ],
    responseExample: {
      schema: {
        rider_quote_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "rider_quote_id": "QU65355",
        "success": true,
        "message": "Rider quote created successfully"
      }
    }
  },
  "update-rider-quote": {
    id: "update-rider-quote",
    category: "Rider Quotes",
    title: "Update Rider Quote",
    method: "PUT",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/riders_quote/{rider_quote_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    bodyParams: [
      {
        name: "rider_quote_id",
        type: "string",
        required: true,
        example: "QU65355"
      },
      {
        name: "rider_id",
        type: "string",
        required: false,
        example: "CI001"
      },
      {
        name: "rider_name",
        type: "string",
        required: false,
        example: "Critical Illness Rider"
      },
      {
        name: "details",
        type: "array",
        required: false,
        example: '[{"age": 55, "health_condition": "Good", "smoking_status": "non-smoker", "additional_coverage": 100000, "geographical_location": "rural", "premium": 480.0}]'
      },
      {
        name: "premium",
        type: "string",
        required: false,
        example: "480.00"
      }
    ],
    responseExample: {
      schema: {
        rider_quote_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "rider_quote_id": "QU65355",
        "success": true,
        "message": "Rider quote updated successfully"
      }
    }
  },
  "delete-rider-quote": {
    id: "delete-rider-quote",
    category: "Rider Quotes",
    title: "Delete Rider Quote",
    method: "DELETE",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/riders_quote/{rider_quote_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        rider_quote_id: { type: "string", required: true },
        success: { type: "boolean", required: true },
        message: { type: "string", required: true }
      },
      example: {
        "rider_quote_id": "QU65355",
        "success": true,
        "message": "Rider quote deleted successfully"
      }
    }
  },
  
  // Term Life Insurance Plans API
  "get-term-life-insurance-plan-by-id": {
    id: "get-term-life-insurance-plan-by-id",
    category: "Term Life Insurance Plans",
    title: "Get Term Life Insurance Plan by ID",
    method: "GET",
    baseUrl: BASE_URL,
    path: "/terminsurance/api/v1/term_life_insurance_plans/{plan_id}",
    queryParams: [
      {
        name: "api_key",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-API-KEY",
        type: "string",
        required: true,
        example: "xpectrum_api_key_123@ai"
      },
      {
        name: "Content-Type",
        type: "string",
        required: true,
        example: "application/json"
      }
    ],
    responseExample: {
      schema: {
        id: { type: "string", required: true },
        name: { type: "string", required: false },
        description: { type: "string", required: false },
        term_length: { type: "array", required: false },
        minimum_coverage_amount: { type: "integer", required: false },
        maximum_coverage_amount: { type: "integer", required: false },
        age_range: { type: "object", required: false },
        premium_calculation_factors: { type: "array", required: false },
        features: { type: "object", required: false },
        available_riders: { type: "array", required: false },
        medical_exam_required: { type: "integer", required: false },
        convertibility: { type: "integer", required: false },
        target_professions: { type: "array", required: false },
        simplified_underwriting: { type: "integer", required: false },
        special_considerations: { type: "array", required: false }
      },
      example: {
        "id": "TL003",
        "name": "Professional Shield",
        "description": "A specialized term life insurance plan tailored for high-earning professionals in demanding careers with substantial coverage.",
        "term_length": [
          "10",
          "20"
        ],
        "minimum_coverage_amount": 500000,
        "maximum_coverage_amount": 5000000,
        "age_range": {
          "maximum_entry_age": 55,
          "minimum_entry_age": 25,
          "maximum_maturity_age": 70
        },
        "premium_calculation_factors": [
          "Professional credentials",
          "Income level",
          "Specialized occupation risks",
          "Health status"
        ],
        "features": {
          "policy_type": "Professional Term",
          "grace_period": 60,
          "tax_benefits": true,
          "payment_methods": [
            "Bank Transfer",
            "Online Payment",
            "Corporate Payroll Deduction"
          ],
          "digital_services": {
            "claim_intimation": true,
            "policy_management": true,
            "professional_risk_assessment": true
          },
          "nomination_process": [
            "Online",
            "Branch",
            "Corporate Liaison"
          ],
          "partial_withdrawal": false,
          "additional_benefits": [
            "Professional disability coverage",
            "Critical illness protection",
            "Global coverage"
          ],
          "loan_against_policy": true,
          "nominee_types_allowed": [
            "Spouse",
            "Children",
            "Business Partners"
          ],
          "nominee_change_allowed": true,
          "policy_premium_payment_frequency": [
            "Annual",
            "Semi-Annual",
            "Quarterly"
          ]
        },
        "available_riders": [
          "Disability Insurance Rider",
          "Critical Illness Rider"
        ],
        "medical_exam_required": 1,
        "convertibility": 0,
        "target_professions": [
          "Doctors",
          "Lawyers",
          "Engineers",
          "Financial Professionals"
        ],
        "simplified_underwriting": 0,
        "special_considerations": [
          "High risk profession assessment",
          "International coverage options",
          "Income protection features"
        ]
      }
    }
  }
};
