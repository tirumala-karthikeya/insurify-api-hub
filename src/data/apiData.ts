
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
      { name: "application_id", type: "string", required: true, description: "Unique identifier for the application", example: "AP312666" }
    ],
    responseExample: {
      "application_id": "AP312666",
      "applicant_id": "PH4006",
      "first_name": "s",
      "last_name": "g",
      "email_id": "iisubho1@gmail.com",
      "application_date": "2025-02-10",
      "application_time": "01:38:03",
      "status": "approved",
      "quote_details": {
        "age": 40,
        "plan_id": "TL003",
        "premium": 1853.28,
        "quote_id": "QT2798",
        "frequency": "monthly",
        "plan_name": "Elite Life Protector",
        "apply_date": "2025-02-10",
        "apply_time": "01:20:30",
        "occupation": "firefighters",
        "term_length": 20,
        "tax_benefits": true,
        "convertibility": true,
        "smoking_status": "smoker",
        "coverage_amount": 100000,
        "health_condition": "good",
        "medical_exam_required": true,
        "nominee_types_allowed": [
          "Spouse",
          "Children",
          "Parents",
          "Siblings",
          "Business Partner"
        ]
      },
      "beneficiary": {
        "DOB": "1990-12-12",
        "id_number": "1289",
        "last_name": "g",
        "first_name": "s",
        "relationship": "spouse"
      },
      "approved_details": {
        "approved_by": "Ramar John",
        "approved_date": "2025-02-12",
        "approved_time": "01:35:02"
      },
      "riders": [
        "{'rider_application_id': 'AP5041', 'rider_applicant_id': 'RH8521', 'rider_name': 'Enhanced Accidental Coverage', 'rider_id': 'RID001', 'rider_quote_id': 'QU7719', 'premium': 27.0, 'frequency': 'monthly', 'application_date': '2025-02-12', 'application_time': '01:22:20.209534', 'status': 'under review', 'quote_details': [{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}]}",
        "{'rider_application_id': 'AP3732', 'rider_applicant_id': 'RH3672', 'rider_name': 'Enhanced Accidental Coverage', 'rider_id': 'RID001', 'rider_quote_id': 'QU7719', 'premium': 27.0, 'frequency': 'monthly', 'application_date': '2025-02-12', 'application_time': '01:22:38.521714', 'status': 'under review', 'quote_details': [{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}]}"
      ]
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
      { name: "first_name", type: "string", required: false, description: "First name of the applicant" },
      { name: "last_name", type: "string", required: false, description: "Last name of the applicant" },
      { name: "email_id", type: "string", required: false, description: "Email ID of the applicant" },
      { name: "application_date", type: "string", required: false, description: "Date of application" },
      { name: "application_time", type: "string", required: false, description: "Time of application" },
      { name: "status", type: "string", required: false, description: "Status of the application" },
      { name: "quote_details", type: "object", required: false, description: "Quote details" },
      { name: "beneficiary", type: "object", required: false, description: "Beneficiary details" },
      { name: "approved_details", type: "object", required: false, description: "Approval details" },
      { name: "riders", type: "array", required: false, description: "Riders for the insurance" }
    ],
    requestBodyExample: {
      "application_id": "AP312666",
      "applicant_id": "PH4006",
      "first_name": "s",
      "last_name": "g",
      "email_id": "iisubho1@gmail.com",
      "application_date": "2025-02-10",
      "application_time": "01:38:03",
      "status": "approved",
      "quote_details": {
        "age": 40,
        "plan_id": "TL003",
        "premium": 1853.28,
        "quote_id": "QT2798",
        "frequency": "monthly",
        "plan_name": "Elite Life Protector",
        "apply_date": "2025-02-10",
        "apply_time": "01:20:30",
        "occupation": "firefighters",
        "term_length": 20,
        "tax_benefits": true,
        "convertibility": true,
        "smoking_status": "smoker",
        "coverage_amount": 100000,
        "health_condition": "good",
        "medical_exam_required": true,
        "nominee_types_allowed": [
          "Spouse",
          "Children",
          "Parents",
          "Siblings",
          "Business Partner"
        ]
      },
      "beneficiary": {
        "DOB": "1990-12-12",
        "id_number": "1289",
        "last_name": "g",
        "first_name": "s",
        "relationship": "spouse"
      },
      "approved_details": {
        "approved_by": "Ramar John",
        "approved_date": "2025-02-12",
        "approved_time": "01:35:02"
      },
      "riders": [
        "{'rider_application_id': 'AP5041', 'rider_applicant_id': 'RH8521', 'rider_name': 'Enhanced Accidental Coverage', 'rider_id': 'RID001', 'rider_quote_id': 'QU7719', 'premium': 27.0, 'frequency': 'monthly', 'application_date': '2025-02-12', 'application_time': '01:22:20.209534', 'status': 'under review', 'quote_details': [{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}]}"
      ]
    },
    responseExample: {
      "application_id": "AP312666",
      "applicant_id": "PH4006",
      "first_name": "s",
      "last_name": "g",
      "email_id": "iisubho1@gmail.com",
      "application_date": "2025-02-10",
      "application_time": "01:38:03",
      "status": "approved"
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
      { name: "application_id", type: "string", required: true, description: "Unique identifier for the application", example: "AP312666" }
    ],
    bodyParams: [
      { name: "application_id", type: "string", required: true, description: "Unique identifier for the application" },
      { name: "applicant_id", type: "string", required: false, description: "Unique identifier for the applicant" },
      { name: "first_name", type: "string", required: false, description: "First name of the applicant" },
      { name: "last_name", type: "string", required: false, description: "Last name of the applicant" },
      { name: "email_id", type: "string", required: false, description: "Email ID of the applicant" },
      { name: "application_date", type: "string", required: false, description: "Date of application" },
      { name: "application_time", type: "string", required: false, description: "Time of application" },
      { name: "status", type: "string", required: false, description: "Status of the application" },
      { name: "quote_details", type: "object", required: false, description: "Quote details" },
      { name: "beneficiary", type: "object", required: false, description: "Beneficiary details" },
      { name: "approved_details", type: "object", required: false, description: "Approval details" },
      { name: "riders", type: "array", required: false, description: "Riders for the insurance" }
    ],
    requestBodyExample: {
      "application_id": "AP312666",
      "status": "approved",
      "approved_details": {
        "approved_by": "Ramar John",
        "approved_date": "2025-02-12",
        "approved_time": "01:35:02"
      }
    },
    responseExample: {
      "application_id": "AP312666",
      "status": "approved"
    }
  },

  // Plan Quote endpoints
  "get-plan-quote-by-id": {
    id: "get-plan-quote-by-id",
    category: "Plan Quote",
    title: "Get Plan Quote by ID",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/plan_quote/{quote_id}",
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
      { name: "quote_id", type: "string", required: true, description: "Unique identifier for the quote", example: "QT2798" }
    ],
    responseExample: {
      "quote_id": "QT2798",
      "apply_date": "2025-02-10",
      "apply_time": "01:20:30",
      "plan_id": "TL003",
      "plan_name": "Elite Life Protector",
      "term_length": 20,
      "coverage_amount": 100000,
      "premium": 1853.28,
      "medical_exam_required": 1,
      "convertibility": 1,
      "tax_benefits": 1,
      "nominee_types_allowed": [
        "Spouse",
        "Children",
        "Parents",
        "Siblings",
        "Business Partner"
      ],
      "frequency": "monthly",
      "age": 40,
      "health_condition": "good",
      "occupation": "firefighters",
      "smoking_status": "smoker"
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
      "next_payment_date": "2025-05-01",
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
      { name: "rider_id", type: "string", required: true, description: "Unique identifier for the rider", example: "RID001" }
    ],
    responseExample: {
      "id": "RID001",
      "name": "Enhanced Accidental Coverage",
      "description": [
        "Provides additional coverage for accidental death or injury",
        "Offers protection beyond the base policy for specific accidents",
        "Includes coverage for severe injuries leading to disability"
      ],
      "covered_areas": {
        "accident_types": [
          "Vehicular accidents",
          "Work-related accidents",
          "Sporting accidents",
          "Home accidents"
        ],
        "injury_coverage": [
          "Dismemberment",
          "Paralysis",
          "Severe burns",
          "Traumatic brain injury"
        ]
      },
      "required_inputs": [
        "Age",
        "Occupation",
        "Health condition",
        "Geographical location",
        "Smoking status"
      ],
      "typical_payout_multiplier": {
        "minimum": 1.5,
        "maximum": 3.0,
        "standard": 2.0
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
      { name: "rider_application_id", type: "string", required: true, description: "Unique identifier for the rider application", example: "AP50410" }
    ],
    responseExample: {
      "rider_application_id": "AP50410",
      "rider_applicant_id": "RH8521",
      "rider_name": "Enhanced Accidental Coverage",
      "rider_id": "RID001",
      "rider_quote_id": "QU7719",
      "premium": "27.00",
      "frequency": "monthly",
      "application_date": "2025-02-12",
      "application_time": "01:22:20.209534",
      "status": "under review",
      "quote_details": [
        "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
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
      { name: "quote_details", type: "array", required: false, description: "Quote details" }
    ],
    requestBodyExample: {
      "rider_application_id": "AP50410",
      "rider_applicant_id": "RH8521",
      "rider_name": "Enhanced Accidental Coverage",
      "rider_id": "RID001",
      "rider_quote_id": "QU7719",
      "premium": "27.00",
      "frequency": "monthly",
      "application_date": "2025-02-12",
      "application_time": "01:22:20.209534",
      "status": "under review",
      "quote_details": [
        "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
      ]
    },
    responseExample: {
      "rider_application_id": "AP50410",
      "rider_applicant_id": "RH8521",
      "rider_name": "Enhanced Accidental Coverage",
      "rider_id": "RID001",
      "rider_quote_id": "QU7719",
      "premium": "27.00",
      "frequency": "monthly",
      "application_date": "2025-02-12",
      "application_time": "01:22:20.209534",
      "status": "under review",
      "quote_details": [
        "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
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
      { name: "rider_application_id", type: "string", required: true, description: "Unique identifier for the rider application", example: "AP50410" }
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
      { name: "quote_details", type: "array", required: false, description: "Quote details" }
    ],
    requestBodyExample: {
      "rider_application_id": "AP50410",
      "status": "approved"
    },
    responseExample: {
      "rider_application_id": "AP50410",
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
      { name: "rider_application_id", type: "string", required: true, description: "Unique identifier for the rider application", example: "AP50410" }
    ],
    responseExample: {
      "message": "Rider application deleted successfully",
      "rider_application_id": "AP50410"
    }
  },

  // Rider Quotes endpoints
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
    responseExample: [
      {
        "rider_quote_id": "QU7719",
        "rider_id": "RID001",
        "rider_name": "Enhanced Accidental Coverage",
        "details": [
          "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
        ],
        "premium": "27.00"
      },
      {
        "rider_quote_id": "QU65355",
        "rider_id": "CI001",
        "rider_name": "Critical Illness Rider",
        "details": [
          "{'age': 55, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'additional_coverage': 100000, 'geographical_location': 'rural', 'premium': 480.0}"
        ],
        "premium": "480.00"
      }
    ]
  },
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
      { name: "rider_name", type: "string", required: true, description: "Unique name for the rider", example: "Enhanced Accidental Coverage" }
    ],
    responseExample: {
      "rider_quote_id": "QU7719",
      "rider_id": "RID001",
      "rider_name": "Enhanced Accidental Coverage",
      "details": [
        "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
      ],
      "premium": "27.00"
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
      { name: "details", type: "array", required: false, description: "Details of the rider quote" },
      { name: "premium", type: "number", required: false, description: "Premium amount" }
    ],
    requestBodyExample: {
      "rider_quote_id": "QU7719",
      "rider_id": "RID001",
      "rider_name": "Enhanced Accidental Coverage",
      "details": [
        "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
      ],
      "premium": "27.00"
    },
    responseExample: {
      "rider_quote_id": "QU7719",
      "rider_id": "RID001",
      "rider_name": "Enhanced Accidental Coverage",
      "details": [
        "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
      ],
      "premium": "27.00"
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
      { name: "rider_quote_id", type: "string", required: true, description: "Unique identifier for the rider quote", example: "QU7719" }
    ],
    bodyParams: [
      { name: "rider_quote_id", type: "string", required: true, description: "Unique identifier for the rider quote" },
      { name: "rider_id", type: "string", required: false, description: "Unique identifier for the rider" },
      { name: "rider_name", type: "string", required: false, description: "Name of the rider" },
      { name: "details", type: "array", required: false, description: "Details of the rider quote" },
      { name: "premium", type: "number", required: false, description: "Premium amount" }
    ],
    requestBodyExample: {
      "rider_quote_id": "QU7719",
      "premium": "30.00"
    },
    responseExample: {
      "rider_quote_id": "QU7719",
      "premium": "30.00"
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
      { name: "rider_quote_id", type: "string", required: true, description: "Unique identifier for the rider quote", example: "QU7719" }
    ],
    responseExample: {
      "message": "Rider quote deleted successfully",
      "rider_quote_id": "QU7719"
    }
  },

  // Term Life Insurance Plans endpoints
  "get-all-term-life-plans": {
    id: "get-all-term-life-plans",
    category: "Term Life Plans",
    title: "Get All Term Life Plans",
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
    responseExample: [
      {
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
        "medical_exam_required": 1,
        "convertibility": 0,
        "available_riders": [
          "Disability Insurance Rider",
          "Critical Illness Rider"
        ]
      },
      {
        "id": "TL004",
        "name": "Elite Life Protector",
        "description": "Premium life insurance coverage for high-net-worth individuals with extensive benefits and customization options.",
        "term_length": ["10", "15", "20", "30"],
        "minimum_coverage_amount": 1000000,
        "maximum_coverage_amount": 10000000,
        "age_range": {
          "maximum_entry_age": 60,
          "minimum_entry_age": 21,
          "maximum_maturity_age": 75
        },
        "premium_calculation_factors": [
          "Net worth",
          "Health status",
          "Family history",
          "Lifestyle factors"
        ],
        "features": {
          "policy_type": "Premium Term",
          "grace_period": 90,
          "tax_benefits": true,
          "payment_methods": [
            "Premium Electronic Fund Transfer",
            "Wealth Management Integration",
            "Annual Lump Sum"
          ]
        },
        "medical_exam_required": 1,
        "convertibility": 1,
        "available_riders": [
          "International Coverage Rider",
          "Enhanced Critical Illness Rider",
          "Estate Planning Rider"
        ]
      }
    ]
  },
  "get-term-life-plan-by-name": {
    id: "get-term-life-plan-by-name",
    category: "Term Life Plans",
    title: "Get Term Life Plan by Name",
    method: "GET",
    baseUrl: "https://hrms-api.xpectrum-ai.com",
    path: "/terminsurance/api/v1/term_life_insurance_plans/{name}",
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
      { name: "name", type: "string", required: true, description: "Name of the term life plan", example: "Professional Shield" }
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
      "medical_exam_required": 1,
      "convertibility": 0,
      "available_riders": [
        "Disability Insurance Rider",
        "Critical Illness Rider"
      ]
    }
  }
};
