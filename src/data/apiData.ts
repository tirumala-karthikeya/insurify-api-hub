// API Endpoints data
export const apiEndpoints = {
  // Applications endpoints
  "get-application-by-id": {
    id: "get-application-by-id",
    category: "Applications",
    title: "Get Application by ID",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/applications/{application_id}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "application_id", type: "string", required: true, description: "Unique identifier for the application", example: "AP38211" }
    ],
    responseExample: {
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
        "{'rider_application_id': 'AP2571', 'rider_applicant_id': 'RH6196', 'rider_name': 'Disability Insurance Rider', 'rider_id': 'DI001', 'rider_quote_id': 'QU3128', 'premium': 158.4, 'frequency': 'monthly', 'application_date': '2025-01-21', 'application_time': '02:21:59.432586', 'status': 'approved', 'quote_details': [{'age': 55, 'occupation': 'others', 'income': 75000, 'benefit_percentage': 60, 'waiting_period': 12, 'health_condition': 'Good', 'geographical_location': 'rural', 'smoking_status': 'non-smoker', 'premium': 158.4, 'frequency': 'monthly'}]}"
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
  },
  "create-application": {
    id: "create-application",
    category: "Applications",
    title: "Create Application",
    method: "POST",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/applications/",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" },
      { name: "Content-Type", type: "string", required: true, description: "Content type", example: "application/json" },
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    bodyParams: [
      { name: "application_id", type: "string", required: true, description: "Unique identifier for the application" },
      { name: "applicant_id", type: "string", required: false, description: "Unique identifier for the applicant" },
      { name: "plan_name", type: "string", required: false, description: "Name of the insurance plan" },
      { name: "plan_id", type: "string", required: false, description: "Unique identifier for the plan" },
      { name: "quote_id", type: "string", required: false, description: "Unique identifier for the quote" },
      { name: "first_name", type: "string", required: false, description: "First name of the applicant" },
      { name: "last_name", type: "string", required: false, description: "Last name of the applicant" },
      { name: "email_id", type: "string", required: false, description: "Email ID of the applicant" },
      { name: "age", type: "integer", required: false, description: "Age of the applicant" },
      { name: "coverage_amount", type: "integer", required: false, description: "Coverage amount" },
      { name: "quoted_monthly_premium", type: "string", required: false, description: "Quoted monthly premium" },
      { name: "term_length", type: "integer", required: false, description: "Term length" },
      { name: "application_date", type: "string", required: false, description: "Date of application" },
      { name: "application_time", type: "string", required: false, description: "Time of application" },
      { name: "status", type: "string", required: false, description: "Status of the application" },
      { name: "riders", type: "string", required: false, description: "Riders for the insurance" },
      { name: "beneficiary", type: "string", required: false, description: "Beneficiary details" },
      { name: "approved_details", type: "string", required: false, description: "Approval details" },
      { name: "premium", type: "number", required: false, description: "Premium amount" },
      { name: "frequency", type: "string", required: false, description: "Premium payment frequency" },
      { name: "quote_details", type: "string", required: false, description: "Quote details" }
    ],
    responseExample: {
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
        "{'rider_application_id': 'AP2571', 'rider_applicant_id': 'RH6196', 'rider_name': 'Disability Insurance Rider', 'rider_id': 'DI001', 'rider_quote_id': 'QU3128', 'premium': 158.4, 'frequency': 'monthly', 'application_date': '2025-01-21', 'application_time': '02:21:59.432586', 'status': 'approved', 'quote_details': [{'age': 55, 'occupation': 'others', 'income': 75000, 'benefit_percentage': 60, 'waiting_period': 12, 'health_condition': 'Good', 'geographical_location': 'rural', 'smoking_status': 'non-smoker', 'premium': 158.4, 'frequency': 'monthly'}]}"
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
  },
  "update-application": {
    id: "update-application",
    category: "Applications",
    title: "Update Application",
    method: "PUT",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/applications/{application_id}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" },
      { name: "Content-Type", type: "string", required: true, description: "Content type", example: "application/json" },
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "application_id", type: "string", required: true, description: "Unique identifier for the application", example: "AP38211" }
    ],
    bodyParams: [
      { name: "application_id", type: "string", required: true, description: "Unique identifier for the application" },
      { name: "applicant_id", type: "string", required: false, description: "Unique identifier for the applicant" },
      { name: "plan_name", type: "string", required: false, description: "Name of the insurance plan" },
      { name: "plan_id", type: "string", required: false, description: "Unique identifier for the plan" },
      { name: "quote_id", type: "string", required: false, description: "Unique identifier for the quote" },
      { name: "first_name", type: "string", required: false, description: "First name of the applicant" },
      { name: "last_name", type: "string", required: false, description: "Last name of the applicant" },
      { name: "email_id", type: "string", required: false, description: "Email ID of the applicant" },
      { name: "age", type: "integer", required: false, description: "Age of the applicant" },
      { name: "coverage_amount", type: "integer", required: false, description: "Coverage amount" },
      { name: "quoted_monthly_premium", type: "string", required: false, description: "Quoted monthly premium" },
      { name: "term_length", type: "integer", required: false, description: "Term length" },
      { name: "application_date", type: "string", required: false, description: "Date of application" },
      { name: "application_time", type: "string", required: false, description: "Time of application" },
      { name: "status", type: "string", required: false, description: "Status of the application" },
      { name: "riders", type: "string", required: false, description: "Riders for the insurance" },
      { name: "beneficiary", type: "string", required: false, description: "Beneficiary details" },
      { name: "approved_details", type: "string", required: false, description: "Approval details" },
      { name: "premium", type: "number", required: false, description: "Premium amount" },
      { name: "frequency", type: "string", required: false, description: "Premium payment frequency" },
      { name: "quote_details", type: "string", required: false, description: "Quote details" }
    ],
    responseExample: {
      "application_id": "AP38211",
      "applicant_id": "PH5533",
      "plan_name": "Professional Shield",
      "plan_id": "TL003",
      "quote_id": "QU3616",
      "first_name": "Subhankar",
      "last_name": "Ghosh",
      "email_id": "iisubho1@gmail.com",
      "status": "approved"
    }
  },

  // Insurance Plans to Riders Names endpoints
  "get-insurance-plan-riders": {
    id: "get-insurance-plan-riders",
    category: "Insurance Plans",
    title: "Get Insurance Plan Riders",
    description: "Retrieve the list of riders available for a specific insurance plan",
    method: "GET",
    path: "/terminsurance/api/v1/insurance_plans_to_riders_names/{plan_id}",
    pathParams: [
      {
        name: "plan_id",
        description: "The ID of the insurance plan",
        example: "TL003"
      }
    ],
    queryParams: [
      {
        name: "api_key",
        description: "API Key for authentication",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    responseExample: {
      "plan_id": "TL003",
      "plan_name": "Elite Life Protector",
      "riders": [
        {
          "rider_id": "RID001",
          "rider_name": "Enhanced Accidental Coverage"
        },
        {
          "rider_id": "RID002",
          "rider_name": "Critical Illness Rider"
        },
        {
          "rider_id": "RID003",
          "rider_name": "Disability Income Rider"
        }
      ]
    }
  },

  // Policies endpoints
  "get-policy-by-id": {
    id: "get-policy-by-id",
    category: "Policies",
    title: "Get Policy by ID",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/policies/{policy_id}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "policy_id", type: "string", required: true, description: "Unique identifier for the policy", example: "POL12345" }
    ],
    responseExample: {
      "policy_id": "POL12345",
      "policy_holder_id": "PH5533",
      "application_id": "AP38211",
      "policy_status": "active",
      "last_premium_paid_date": "2025-01-01",
      "first_name": "Subhankar",
      "last_name": "Ghosh",
      "plan_details": {
        "plan_name": "Professional Shield",
        "plan_id": "TL003"
      },
      "policy_dates": {
        "start_date": "2025-01-01",
        "end_date": "2035-01-01"
      },
      "policy_creation": {
        "created_date": "2025-01-21",
        "created_time": "02:23:03"
      },
      "riders": [
        "Disability Insurance Rider",
        "Critical Illness Rider"
      ],
      "beneficiary": [
        {
          "DOB": "11-30-1995",
          "id_number": "12354",
          "last_name": "Sar",
          "first_name": "San",
          "relationship": "spouse"
        }
      ]
    }
  },

  // Quotes endpoints
  "get-quote-by-id": {
    id: "get-quote-by-id",
    category: "Quotes",
    title: "Get Quote by ID",
    description: "Retrieve a specific quote by its ID",
    method: "GET",
    path: "/terminsurance/api/v1/quotes/{quote_id}",
    pathParams: [
      {
        name: "quote_id",
        description: "The ID of the quote to retrieve",
        example: "QT123456"
      }
    ],
    queryParams: [
      {
        name: "api_key",
        description: "API Key for authentication",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "X-Request-ID",
        description: "Request ID for tracing",
        example: "req-123-456"
      }
    ],
    responseExample: {
      "quote_id": "QT123456",
      "customer_id": "CUST7890",
      "quote_date": "2025-02-10",
      "quote_time": "14:30:45",
      "expiry_date": "2025-03-10",
      "plan_id": "TL003",
      "plan_name": "Elite Life Protector",
      "coverage_amount": 500000,
      "term_length": 20,
      "premium": {
        "amount": 125.50,
        "frequency": "monthly"
      },
      "applicant_details": {
        "first_name": "John",
        "last_name": "Doe",
        "age": 35,
        "gender": "male",
        "health_condition": "excellent",
        "smoking_status": "non-smoker",
        "occupation": "engineer"
      },
      "status": "active",
      "selected_riders": [
        {
          "rider_id": "RID001",
          "rider_name": "Enhanced Accidental Coverage",
          "premium": 15.75
        }
      ]
    }
  },
  "create-quote": {
    id: "create-quote",
    category: "Quotes",
    title: "Create Quote",
    description: "Create a new insurance quote",
    method: "POST",
    path: "/terminsurance/api/v1/quotes/",
    queryParams: [
      {
        name: "api_key",
        description: "API Key for authentication",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    headerParams: [
      {
        name: "Content-Type",
        description: "Media type of the request body",
        required: true,
        example: "application/json"
      },
      {
        name: "X-Request-ID",
        description: "Request ID for tracing",
        example: "req-123-456"
      }
    ],
    bodyParams: [
      {
        name: "customer_id",
        description: "ID of the customer requesting the quote",
        type: "string",
        required: true
      },
      {
        name: "plan_id",
        description: "ID of the requested insurance plan",
        type: "string",
        required: true
      },
      {
        name: "coverage_amount",
        description: "Requested coverage amount",
        type: "number",
        required: true
      },
      {
        name: "term_length",
        description: "Requested term length in years",
        type: "number",
        required: true
      },
      {
        name: "applicant_details",
        description: "Details about the applicant",
        type: "object",
        required: true
      }
    ],
    responseExample: {
      "quote_id": "QT123456",
      "customer_id": "CUST7890",
      "quote_date": "2025-02-10",
      "quote_time": "14:30:45",
      "expiry_date": "2025-03-10",
      "status": "active",
      "premium": {
        "amount": 125.50,
        "frequency": "monthly"
      }
    }
  },
  "update-quote": {
    id: "update-quote",
    category: "Quotes",
    title: "Update Quote",
    description: "Update an existing insurance quote",
    method: "PUT",
    path: "/terminsurance/api/v1/quotes/{quote_id}",
    pathParams: [
      {
        name: "quote_id",
        description: "The ID of the quote to update",
        example: "QT123456"
      }
    ],
    queryParams: [
      {
        name: "api_key",
        description: "API Key for authentication",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    bodyParams: [
      {
        name: "coverage_amount",
        description: "Updated coverage amount",
        type: "number"
      },
      {
        name: "term_length",
        description: "Updated term length in years",
        type: "number"
      },
      {
        name: "selected_riders",
        description: "Updated list of selected riders",
        type: "array"
      }
    ],
    responseExample: {
      "quote_id": "QT123456",
      "updated_at": "2025-02-11T10:15:30",
      "status": "updated"
    }
  },
  "delete-quote": {
    id: "delete-quote",
    category: "Quotes",
    title: "Delete Quote",
    description: "Delete an existing insurance quote",
    method: "DELETE",
    path: "/terminsurance/api/v1/quotes/{quote_id}",
    pathParams: [
      {
        name: "quote_id",
        description: "The ID of the quote to delete",
        example: "QT123456"
      }
    ],
    queryParams: [
      {
        name: "api_key",
        description: "API Key for authentication",
        required: true,
        example: "xpectrum_api_key_123@ai"
      }
    ],
    responseExample: {
      "status": "deleted",
      "message": "Quote QT123456 has been successfully deleted"
    }
  },

  // Riders endpoints
  "get-rider-by-id": {
    id: "get-rider-by-id",
    category: "Riders",
    title: "Get Rider by ID",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders/{rider_id}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "rider_id", type: "string", required: true, description: "Unique identifier for the rider", example: "CI001" }
    ],
    responseExample: {
      "id": "CI001",
      "name": "Critical Illness Rider",
      "description": "Covers specified critical illnesses with a lump sum payment upon diagnosis.",
      "covered_conditions": [
        "Cancer",
        "Heart Attack",
        "Stroke",
        "Kidney Failure",
        "Major Organ Transplant"
      ],
      "required_inputs": [
        "Age",
        "Health Condition",
        "Smoking Status",
        "Additional Coverage Amount",
        "Geographical Location"
      ],
      "typical_payout_range": {
        "minimum": 100000,
        "maximum": 1000000
      },
      "disability_types": null,
      "typical_monthly_benefit_range": null,
      "covered_accidents": null,
      "typical_payout_multiplier": null,
      "coverage_conditions": [
        "30-day survival period after diagnosis",
        "90-day waiting period from policy start"
      ],
      "typical_coverage_duration": {
        "minimum_years": 5,
        "maximum_years": 20
      }
    }
  },

  // Riders Applications endpoints
  "get-rider-application-by-id": {
    id: "get-rider-application-by-id",
    category: "Rider Applications",
    title: "Get Rider Application by ID",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders_applications/{rider_application_id}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "rider_application_id", type: "string", required: true, description: "Unique identifier for the rider application", example: "AP38554" }
    ],
    responseExample: {
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
  },
  "create-rider-application": {
    id: "create-rider-application",
    category: "Rider Applications",
    title: "Create Rider Application",
    method: "POST",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders_applications/",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" },
      { name: "Content-Type", type: "string", required: true, description: "Content type", example: "application/json" },
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    bodyParams: [
      { name: "rider_application_id", type: "string", required: true, description: "Unique identifier for the rider application" },
      { name: "rider_applicant_id", type: "string", required: false, description: "Unique identifier for the rider applicant" },
      { name: "rider_name", type: "string", required: false, description: "Name of the rider" },
      { name: "rider_id", type: "string", required: false, description: "Unique identifier for the rider" },
      { name: "rider_quote_id", type: "string", required: false, description: "Unique identifier for the rider quote" },
      { name: "premium", type: "number", required: false, description: "Premium amount" },
      { name: "frequency", type: "string", required: false, description: "Premium payment frequency" },
      { name: "application_date", type: "string", required: false, description: "Date of application" },
      { name: "application_time", type: "string", required: false, description: "Time of application" },
      { name: "status", type: "string", required: false, description: "Status of the application" },
      { name: "quote_details", type: "string", required: false, description: "Quote details" }
    ],
    responseExample: {
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
  },
  "update-rider-application": {
    id: "update-rider-application",
    category: "Rider Applications",
    title: "Update Rider Application",
    method: "PUT",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders_applications/{rider_application_id}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" },
      { name: "Content-Type", type: "string", required: true, description: "Content type", example: "application/json" },
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "rider_application_id", type: "string", required: true, description: "Unique identifier for the rider application", example: "AP38554" }
    ],
    bodyParams: [
      { name: "rider_application_id", type: "string", required: true, description: "Unique identifier for the rider application" },
      { name: "rider_applicant_id", type: "string", required: false, description: "Unique identifier for the rider applicant" },
      { name: "rider_name", type: "string", required: false, description: "Name of the rider" },
      { name: "rider_id", type: "string", required: false, description: "Unique identifier for the rider" },
      { name: "rider_quote_id", type: "string", required: false, description: "Unique identifier for the rider quote" },
      { name: "premium", type: "number", required: false, description: "Premium amount" },
      { name: "frequency", type: "string", required: false, description: "Premium payment frequency" },
      { name: "application_date", type: "string", required: false, description: "Date of application" },
      { name: "application_time", type: "string", required: false, description: "Time of application" },
      { name: "status", type: "string", required: false, description: "Status of the application" },
      { name: "quote_details", type: "string", required: false, description: "Quote details" }
    ],
    responseExample: {
      "rider_application_id": "AP38554",
      "status": "approved"
    }
  },
  "delete-rider-application": {
    id: "delete-rider-application",
    category: "Rider Applications",
    title: "Delete Rider Application",
    method: "DELETE",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders_applications/{rider_application_id}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "rider_application_id", type: "string", required: true, description: "Unique identifier for the rider application", example: "AP38554" }
    ],
    responseExample: {
      "message": "Rider application deleted successfully",
      "rider_application_id": "AP38554"
    }
  },

  // Rider Quotes endpoints
  "get-rider-quote-by-id": {
    id: "get-rider-quote-by-id",
    category: "Rider Quotes",
    title: "Get Rider Quote by ID",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders_quote/{rider_name}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "rider_name", type: "string", required: true, description: "Name of the rider", example: "Critical Illness Rider" }
    ],
    responseExample: {
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
  },
  "get-all-rider-quotes": {
    id: "get-all-rider-quotes",
    category: "Rider Quotes",
    title: "Get All Rider Quotes",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders_quote",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    responseExample: {
      "rider_quotes": [
        {
          "rider_quote_id": "QU65355",
          "rider_id": "CI001",
          "rider_name": "Critical Illness Rider",
          "premium": "480.00"
        }
      ],
      "total": 28,
      "page": 1,
      "limit": 10
    }
  },
  "create-rider-quote": {
    id: "create-rider-quote",
    category: "Rider Quotes",
    title: "Create Rider Quote",
    method: "POST",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders_quote/",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" },
      { name: "Content-Type", type: "string", required: true, description: "Content type", example: "application/json" },
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    bodyParams: [
      { name: "rider_quote_id", type: "string", required: true, description: "Unique identifier for the rider quote" },
      { name: "rider_id", type: "string", required: false, description: "Unique identifier for the rider" },
      { name: "rider_name", type: "string", required: false, description: "Name of the rider" },
      { name: "details", type: "string", required: false, description: "Details of the rider quote" },
      { name: "premium", type: "number", required: false, description: "Premium amount" }
    ],
    responseExample: {
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
  },
  "update-rider-quote": {
    id: "update-rider-quote",
    category: "Rider Quotes",
    title: "Update Rider Quote",
    method: "PUT",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders_quote/{rider_quote_id}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" },
      { name: "Content-Type", type: "string", required: true, description: "Content type", example: "application/json" },
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "rider_quote_id", type: "string", required: true, description: "Unique identifier for the rider quote", example: "QU65355" }
    ],
    bodyParams: [
      { name: "rider_quote_id", type: "string", required: true, description: "Unique identifier for the rider quote" },
      { name: "rider_id", type: "string", required: false, description: "Unique identifier for the rider" },
      { name: "rider_name", type: "string", required: false, description: "Name of the rider" },
      { name: "details", type: "string", required: false, description: "Details of the rider quote" },
      { name: "premium", type: "number", required: false, description: "Premium amount" }
    ],
    responseExample: {
      "rider_quote_id": "QU65355",
      "rider_id": "CI001",
      "premium": "520.00"
    }
  },
  "delete-rider-quote": {
    id: "delete-rider-quote",
    category: "Rider Quotes",
    title: "Delete Rider Quote",
    method: "DELETE",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/riders_quote/{rider_quote_id}",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "rider_quote_id", type: "string", required: true, description: "Unique identifier for the rider quote", example: "QU65355" }
    ],
    responseExample: {
      "message": "Rider quote deleted successfully",
      "rider_quote_id": "QU65355"
    }
  },

  // Term Life Insurance Plans endpoints
  "get-term-life-insurance-plan-by-id": {
    id: "get-term-life-insurance-plan-by-id",
    category: "Term Life Insurance Plans",
    title: "Get Term Life Insurance Plan by ID",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/term_life_insurance_plans/{name}/",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    pathParams: [
      { name: "name", type: "string", required: true, description: "Name of the plan", example: "Professional Shield" }
    ],
    responseExample: {
      "id": "TL003",
      "name": "Professional Shield",
      "description": "A specialized term life insurance plan tailored for high-earning professionals in demanding careers with substantial coverage.",
      "term_length": ["10", "20"],
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
        "Higher coverage for high-risk professions",
        "International coverage options"
      ]
    }
  },
  "get-all-term-life-insurance-plans": {
    id: "get-all-term-life-insurance-plans",
    category: "Term Life Insurance Plans",
    title: "Get All Term Life Insurance Plans",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/term_life_insurance_plans",
    queryParams: [
      { name: "api_key", type: "string", required: true, description: "API Key for authentication", example: "xpectrum_api_key_123@ai" }
    ],
    headerParams: [
      { name: "X-SOURCE", type: "string", required: true, description: "Source identifier", example: "admin" },
      { name: "X-LANG", type: "string", required: true, description: "Language code", example: "en" },
      { name: "X-REQUEST-ID", type: "string", required: true, description: "Request identifier", example: "stacktics" },
      { name: "X-DEVICE-ID", type: "string", required: true, description: "Device identifier", example: "stacktics_device" }
    ],
    responseExample: {
      "plans": [
        {
          "id": "TL003",
          "name": "Professional Shield",
          "description": "A specialized term life insurance plan tailored for high-earning professionals in demanding careers with substantial coverage.",
          "minimum_coverage_amount": 500000,
          "maximum_coverage_amount": 5000000
        }
      ],
      "total": 15,
      "page": 1,
      "limit": 10
    }
  }
};

