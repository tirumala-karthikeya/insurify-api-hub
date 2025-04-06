import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Copy, Rocket, GripVertical } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { apiEndpoints } from "../data/apiData";
import { toast } from "sonner";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface ApiUsePanelProps {
  endpoint: string;
  method: string;
  baseUrl: string;
  path: string;
  onClose: () => void;
}

type ResponseStatus = null | {
  code: number;
  text: string;
  time: string;
  size: string;
};

type ParamType = {
  name: string;
  value: string;
  checked: boolean;
};

export default function ApiUsePanel({ endpoint, method, baseUrl, path, onClose }: ApiUsePanelProps) {
  const [activeTab, setActiveTab] = useState("params");
  const [response, setResponse] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseCollapsed, setIsResponseCollapsed] = useState(false);
  const [bodyType, setBodyType] = useState("json");
  const [showExamples, setShowExamples] = useState(false);
  
  // Find the current endpoint data
  const currentEndpointKey = Object.keys(apiEndpoints).find(key => 
    apiEndpoints[key].title === endpoint && apiEndpoints[key].method === method
  );
  const currentEndpoint = currentEndpointKey ? apiEndpoints[currentEndpointKey] : null;
  
  // Default request body based on selected endpoint example
  const getDefaultRequestBody = () => {
    if (!currentEndpoint || !currentEndpoint.responseExample) return "{}";
    
    if (endpoint.includes("applications") && method === "POST") {
      return JSON.stringify({
        "application_id": "AP123456",
        "applicant_id": "PH4006",
        "first_name": "John",
        "last_name": "Doe",
        "email_id": "john.doe@example.com",
        "application_date": new Date().toISOString().split('T')[0],
        "application_time": new Date().toTimeString().split(' ')[0],
        "status": "pending",
        "quote_details": {
          "age": 40,
          "plan_id": "TL003",
          "premium": 1853.28,
          "quote_id": "QT2798",
          "frequency": "monthly",
          "plan_name": "Elite Life Protector",
          "apply_date": new Date().toISOString().split('T')[0],
          "apply_time": new Date().toTimeString().split(' ')[0],
          "term_length": 20,
          "occupation": "engineer",
          "smoking_status": "non-smoker",
          "coverage_amount": 100000,
          "health_condition": "good",
          "tax_benefits": true,
          "convertibility": true,
          "medical_exam_required": true,
          "nominee_types_allowed": [
            "Spouse", "Children", "Parents", "Siblings"
          ]
        },
        "beneficiary": {
          "DOB": "1990-12-12",
          "id_number": "1289",
          "last_name": "Doe",
          "first_name": "Jane",
          "relationship": "spouse"
        }
      }, null, 2);
    } else if (endpoint.includes("riders_applications") && method === "POST") {
      return JSON.stringify({
        "rider_application_id": "AP" + Math.floor(10000 + Math.random() * 90000),
        "rider_applicant_id": "RH" + Math.floor(1000 + Math.random() * 9000),
        "rider_name": "Enhanced Accidental Coverage",
        "rider_id": "RID001",
        "rider_quote_id": "QU7719",
        "premium": "27.00",
        "frequency": "monthly",
        "application_date": new Date().toISOString().split('T')[0],
        "application_time": new Date().toTimeString().split(' ')[0],
        "status": "pending",
        "quote_details": [
          "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'engineer', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'urban'}"
        ]
      }, null, 2);
    } else if (endpoint.includes("riders_quote") && method === "POST") {
      return JSON.stringify({
        "rider_quote_id": "QU" + Math.floor(1000 + Math.random() * 9000),
        "rider_id": "RID001",
        "rider_name": "Enhanced Accidental Coverage",
        "details": [
          "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'engineer', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'urban'}"
        ],
        "premium": "27.00"
      }, null, 2);
    } else if (currentEndpoint.bodyParams && currentEndpoint.bodyParams.length > 0) {
      const exampleBody: Record<string, any> = {};
      currentEndpoint.bodyParams.forEach(param => {
        if (param.required) {
          if (param.type === "string") exampleBody[param.name] = "";
          else if (param.type === "integer" || param.type === "number") exampleBody[param.name] = 0;
          else exampleBody[param.name] = null;
        }
      });
      return JSON.stringify(exampleBody, null, 2);
    }
    
    return "{}";
  };

  const [requestBody, setRequestBody] = useState<string>(getDefaultRequestBody());

  const [baseUrlValue, setBaseUrlValue] = useState(baseUrl);
  const [fullUrl, setFullUrl] = useState(`${baseUrl}${path}`);
  
  // Initialize path parameters from the currentEndpoint
  const initPathParams = () => {
    if (currentEndpoint && currentEndpoint.pathParams) {
      return currentEndpoint.pathParams.map(param => ({
        name: param.name,
        value: param.example || "",
        checked: true
      }));
    }
    
    // Default path params based on endpoint
    if (path.includes("{application_id}")) {
      return [{ name: "application_id", value: "AP312666", checked: true }];
    } else if (path.includes("{policy_id}")) {
      return [{ name: "policy_id", value: "POL123456", checked: true }];
    } else if (path.includes("{rider_id}")) {
      return [{ name: "rider_id", value: "RID001", checked: true }];
    } else if (path.includes("{rider_application_id}")) {
      return [{ name: "rider_application_id", value: "AP50410", checked: true }];
    } else if (path.includes("{rider_quote_id}")) {
      return [{ name: "rider_quote_id", value: "QU7719", checked: true }];
    } else if (path.includes("{rider_name}")) {
      return [{ name: "rider_name", value: "Enhanced Accidental Coverage", checked: true }];
    } else if (path.includes("{quote_id}")) {
      return [{ name: "quote_id", value: "QT2798", checked: true }];
    } else if (path.includes("{name}")) {
      return [{ name: "name", value: "Elite Life Protector", checked: true }];
    }
    
    return [{ name: "", value: "", checked: true }];
  };
  
  // Initialize query parameters from the currentEndpoint
  const initQueryParams = () => {
    if (currentEndpoint && currentEndpoint.queryParams) {
      return currentEndpoint.queryParams.map(param => ({
        name: param.name,
        value: param.example || "",
        checked: true
      }));
    }
    
    // Always include the API key query parameter for our insurance API
    return [
      { name: "api_key", value: "xpectrum_api_key_123@ai", checked: true },
      { name: "", value: "", checked: true }
    ];
  };
  
  // Initialize header parameters from the currentEndpoint
  const initHeaderParams = () => {
    if (currentEndpoint && currentEndpoint.headerParams) {
      // Filter to only keep api_key and Content-Type
      const filteredHeaders = currentEndpoint.headerParams
        .filter(param => param.name === "api_key" || param.name === "Content-Type")
        .map(param => ({
          name: param.name,
          value: param.example || (param.name === "api_key" ? "xpectrum_api_key_123@ai" : ""),
          checked: true
        }));
      
      // Ensure we always have at least one empty header for adding new ones
      if (filteredHeaders.length === 0) {
        filteredHeaders.push({ name: "", value: "", checked: true });
      } else {
        // Always add an empty header at the end for adding new ones
        filteredHeaders.push({ name: "", value: "", checked: true });
      }
      
      return filteredHeaders;
    }
    
    // Default headers for insurance API
    return [
      { name: "api_key", value: "xpectrum_api_key_123@ai", checked: true },
      { name: "Content-Type", value: "application/json", checked: true },
      { name: "", value: "", checked: true }
    ];
  };
  
  const [pathParams, setPathParams] = useState<ParamType[]>(initPathParams());
  const [queryParams, setQueryParams] = useState<ParamType[]>(initQueryParams());
  const [headerParams, setHeaderParams] = useState<ParamType[]>(initHeaderParams());

  useEffect(() => {
    // Update base URL to use the insurance API base URL
    setPathParams(initPathParams());
    setQueryParams(initQueryParams());
    setHeaderParams(initHeaderParams());
    setRequestBody(getDefaultRequestBody());
    // Use the insurance API base URL by default
    const insuranceBaseUrl = "https://hrms-api.xpectrum-ai.com/terminsurance/api/v1";
    setBaseUrlValue(baseUrl || insuranceBaseUrl);
    setFullUrl(`${baseUrl || insuranceBaseUrl}${path}`);
  }, [endpoint, method, baseUrl, path]);

  useEffect(() => {
    // When parameters change, update the full URL
    let updatedPath = path;
    pathParams.forEach(param => {
      if (param.checked && param.name && param.value) {
        updatedPath = updatedPath.replace(`{${param.name}}`, param.value);
      }
    });
    
    let queryString = "";
    const activeQueryParams = queryParams.filter(param => param.checked && param.name && param.value);
    if (activeQueryParams.length > 0) {
      queryString = "?" + activeQueryParams.map(param => `${param.name}=${encodeURIComponent(param.value)}`).join("&");
    }
    
    setFullUrl(`${baseUrlValue}${updatedPath}${queryString}`);
  }, [pathParams, queryParams, baseUrlValue, path]);

  const bodyEnabledMethods = ["POST", "PUT", "PATCH"];
  const showBody = bodyEnabledMethods.includes(method);

  const handleAddParam = (type: 'path' | 'query' | 'header') => {
    if (type === 'path') {
      setPathParams([...pathParams, { name: "", value: "", checked: true }]);
    } else if (type === 'query') {
      setQueryParams([...queryParams, { name: "", value: "", checked: true }]);
    } else if (type === 'header') {
      setHeaderParams([...headerParams, { name: "", value: "", checked: true }]);
    }
  };

  const handleParamChange = (index: number, field: 'name' | 'value' | 'checked', value: string | boolean, type: 'path' | 'query' | 'header') => {
    if (type === 'path') {
      const updatedParams = [...pathParams];
      if (field === 'checked') {
        updatedParams[index].checked = value as boolean;
      } else {
        updatedParams[index][field] = value as string;
      }
      setPathParams(updatedParams);
    } else if (type === 'query') {
      const updatedParams = [...queryParams];
      if (field === 'checked') {
        updatedParams[index].checked = value as boolean;
      } else {
        updatedParams[index][field] = value as string;
      }
      setQueryParams(updatedParams);
    } else if (type === 'header') {
      const updatedParams = [...headerParams];
      if (field === 'checked') {
        updatedParams[index].checked = value as boolean;
      } else {
        updatedParams[index][field] = value as string;
      }
      setHeaderParams(updatedParams);
    }
  };

  const handleRemoveParam = (index: number, type: 'path' | 'query' | 'header') => {
    if (type === 'path') {
      const updatedParams = [...pathParams];
      updatedParams.splice(index, 1);
      setPathParams(updatedParams);
    } else if (type === 'query') {
      const updatedParams = [...queryParams];
      updatedParams.splice(index, 1);
      setQueryParams(updatedParams);
    } else if (type === 'header') {
      const updatedParams = [...headerParams];
      updatedParams.splice(index, 1);
      setHeaderParams(updatedParams);
    }
  };
  
  const handleSendRequest = async () => {
    setIsLoading(true);
    
    try {
      // Prepare headers
      const headers: Record<string, string> = {};
      headerParams.forEach(header => {
        if (header.checked && header.name && header.value) {
          headers[header.name] = header.value;
        }
      });

      // Make sure the URL includes api_key parameter for the insurance API
      let apiUrl = fullUrl;
      if (!apiUrl.includes("api_key=") && method !== "POST" && method !== "PUT") {
        apiUrl += apiUrl.includes("?") ? "&api_key=xpectrum_api_key_123@ai" : "?api_key=xpectrum_api_key_123@ai";
      }
      
      // Create request options
      const requestOptions: RequestInit = {
        method: method,
        headers: headers,
      };

      // Add body for POST, PUT, PATCH methods
      if (bodyEnabledMethods.includes(method) && requestBody) {
        requestOptions.body = requestBody;
      }

      // Start timer for response time calculation
      const startTime = Date.now();
      
      // Make actual API call
      console.log(`Making ${method} request to: ${apiUrl}`);
      const response = await fetch(apiUrl, requestOptions);
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Get response data
      const responseData = await response.json();
      const responseSize = new TextEncoder().encode(JSON.stringify(responseData)).length;
      
      // Set response and status
      setResponse(responseData);
      setResponseStatus({
        code: response.status,
        text: response.statusText || (response.status === 200 ? "OK" : "Error"),
        time: `${responseTime} ms`,
        size: `${(responseSize / 1024).toFixed(2)} KB`
      });
      
      console.log("API Response:", responseData);
      
    } catch (error) {
      console.error("API request error:", error);
      toast.error("API request failed. See console for details.");
      setResponse({ error: "Request failed. Check console for details." });
      setResponseStatus({
        code: 500,
        text: "Error",
        time: "N/A",
        size: "N/A"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      toast.success("Response copied to clipboard");
    }
  };
  
  const renderTabs = () => {
    return (
      <div className="flex border-b px-4">
        <button
          onClick={() => setActiveTab('params')}
          className={`py-2 px-4 text-sm ${activeTab === 'params' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
        >
          {activeTab === 'params' ? `Params ${pathParams.filter(p => p.checked && p.name).length + queryParams.filter(p => p.checked && p.name).length}` : 'Params'}
        </button>
        {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
          <button
            onClick={() => setActiveTab('body')}
            className={`py-2 px-4 text-sm ${activeTab === 'body' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          >
            Body
          </button>
        )}
        <button
          onClick={() => setActiveTab('headers')}
          className={`py-2 px-4 text-sm ${activeTab === 'headers' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
        >
          {activeTab === 'headers' ? `Headers ${headerParams.filter(p => p.checked && p.name).length}` : 'Headers'}
        </button>
        {(currentEndpoint && currentEndpoint.description) && (
          <button
            onClick={() => setActiveTab('documentation')}
            className={`py-2 px-4 text-sm ${activeTab === 'documentation' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
          >
            Documentation
          </button>
        )}
        <button
          onClick={() => setActiveTab('examples')}
          className={`py-2 px-4 text-sm ${activeTab === 'examples' ? 'border-b-2 border-primary text-primary font-medium' : 'text-muted-foreground'}`}
        >
          Examples
        </button>
      </div>
    );
  };

  const renderBodyTypes = () => {
    const types = ["json"];
    
    return (
      <div className="flex flex-wrap mb-4">
        {types.map(type => (
          <button
            key={type}
            className={`px-3 py-1 text-sm rounded-md mr-2 mb-2 ${bodyType === type ? 'bg-primary text-white' : 'bg-secondary text-foreground'}`}
            onClick={() => setBodyType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    );
  };

  const renderApiExamples = () => {
    // Helper function to render common headers table
    const renderHeadersTable = () => (
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">Headers</h4>
        <div className="border rounded-lg overflow-hidden mb-4">
          <table className="w-full">
            <thead>
              <tr className="bg-accent/30">
                <th className="text-left px-3 py-2 text-sm font-medium">Name</th>
                <th className="text-left px-3 py-2 text-sm font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-3 py-2 text-sm">api_key</td>
                <td className="px-3 py-2 text-sm">xpectrum_api_key_123@ai</td>
              </tr>
              <tr className="border-t">
                <td className="px-3 py-2 text-sm">Content-Type</td>
                <td className="px-3 py-2 text-sm">application/json</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

    // Detect endpoint type based on path and method
    const endpointType = path.split("/").filter(p => p).pop()?.replace(/\{.*\}/, "") || "";
    
    // Applications endpoints
    if (path.includes("/applications")) {
      if (method === "GET") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Example GET Response</h3>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "application_id": "AP312666",
  "applicant_id": "PH4006",
  "first_name": "John",
  "last_name": "Doe",
  "email_id": "john.doe@example.com",
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
      "Spouse", "Children", "Parents", "Siblings", "Business Partner"
    ]
  },
  "beneficiary": {
    "DOB": "1990-12-12",
    "id_number": "1289",
    "last_name": "Smith",
    "first_name": "Jane",
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
}`}
              </pre>
            </div>
          </div>
        );
      } else if (method === "POST" || method === "PUT") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Request Example</h3>
            {renderHeadersTable()}
            <h4 className="text-md font-medium mb-2">Body</h4>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "application_id": "AP312666",
  "applicant_id": "PH4006",
  "first_name": "John",
  "last_name": "Doe",
  "email_id": "john.doe@example.com",
  "application_date": "2025-02-10",
  "application_time": "01:38:03",
  "status": "pending",
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
      "Spouse", "Children", "Parents", "Siblings", "Business Partner"
    ]
  },
  "beneficiary": {
    "DOB": "1990-12-12",
    "id_number": "1289",
    "last_name": "Smith",
    "first_name": "Jane",
    "relationship": "spouse"
  }
}`}
              </pre>
            </div>
          </div>
        );
      }
    }
    
    // Riders applications endpoints
    else if (path.includes("/riders_applications")) {
      if (method === "GET") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Example GET Response</h3>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "rider_application_id": "AP3000",
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
    "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
  ]
}`}
              </pre>
            </div>
          </div>
        );
      } else if (method === "POST" || method === "PUT") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Request Example</h3>
            {renderHeadersTable()}
            <h4 className="text-md font-medium mb-2">Body</h4>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "rider_application_id": "AP3000",
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
    "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
  ]
}`}
              </pre>
            </div>
          </div>
        );
      } else if (method === "DELETE") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Delete Example</h3>
            <p className="mb-4">This endpoint deletes a rider application by ID.</p>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`// No body required for DELETE
// Response will be 204 No Content on success`}
              </pre>
            </div>
          </div>
        );
      }
    }
    
    // Riders quote endpoints
    else if (path.includes("/riders_quote")) {
      if (method === "GET") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Example GET Response</h3>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "rider_quote_id": "QU7719",
  "rider_id": "RID001",
  "rider_name": "Enhanced Accidental Coverage",
  "details": [
    "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
  ],
  "premium": "27.00"
}`}
              </pre>
            </div>
          </div>
        );
      } else if (method === "POST" || method === "PUT") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Request Example</h3>
            {renderHeadersTable()}
            <h4 className="text-md font-medium mb-2">Body</h4>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "rider_quote_id": "QU7719",
  "rider_id": "RID001",
  "rider_name": "Enhanced Accidental Coverage",
  "details": [
    "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
  ],
  "premium": "27.00"
}`}
              </pre>
            </div>
          </div>
        );
      } else if (method === "DELETE") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Delete Example</h3>
            <p className="mb-4">This endpoint deletes a rider quote by ID.</p>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`// No body required for DELETE
// Response will be 204 No Content on success`}
              </pre>
            </div>
          </div>
        );
      }
    }
    
    // Policies endpoints
    else if (path.includes("/policies")) {
      if (method === "GET") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Example GET Response</h3>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "policy_id": "POL123456",
  "policy_holder_id": "PH4006",
  "application_id": "AP312666",
  "policy_status": "active",
  "next_payment_date": "2025-03-10",
  "first_name": "John",
  "last_name": "Doe",
  "plan_details": {
    "plan_id": "TL003",
    "plan_name": "Elite Life Protector",
    "term_length": 20,
    "coverage_amount": 100000
  },
  "policy_dates": {
    "issue_date": "2025-02-15",
    "effective_date": "2025-02-20",
    "expiry_date": "2045-02-20"
  }
}`}
              </pre>
            </div>
          </div>
        );
      }
    }
    
    // Riders endpoints
    else if (path.includes("/riders")) {
      if (method === "GET") {
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Example GET Response</h3>
            <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
              <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "id": "RID001",
  "name": "Enhanced Accidental Coverage",
  "description": [
    "Provides additional coverage in case of accidental death",
    "Covers disabilities caused by accidents",
    "Includes hospital expenses for accident-related injuries"
  ],
  "covered_areas": {
    "accidental_death": true,
    "disability": true,
    "hospital_expenses": true
  },
  "required_inputs": [
    "age",
    "health_condition",
    "smoking_status",
    "occupation"
  ],
  "typical_payout_multiplier": {
    "min": 1.5,
    "max": 3.0
  }
}`}
              </pre>
            </div>
          </div>
        );
      }
    }
    
    // Default fallback - should not happen with our improved detection
    else {
      return (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Example for {path}</h3>
          <p className="mb-4">This {method} endpoint interacts with {path}.</p>
          
          {(method === "POST" || method === "PUT") && (
            <>
              {renderHeadersTable()}
              <h4 className="text-md font-medium mb-2">Example Request Body</h4>
              <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
                <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "example_id": "ID12345",
  "name": "Example Name",
  "date": "${new Date().toISOString().split('T')[0]}",
  "time": "${new Date().toTimeString().split(' ')[0]}",
  "status": "pending",
  "details": {
    "field1": "value1",
    "field2": "value2",
    "numeric_field": 123,
    "boolean_field": true
  }
}`}
                </pre>
              </div>
            </>
          )}
          
          <h4 className="text-md font-medium mt-4 mb-2">Example Response</h4>
          <div className="bg-secondary/30 p-4 rounded-md overflow-hidden">
            <pre className="text-xs overflow-x-auto whitespace-pre" style={{ maxWidth: "100%" }}>
{`{
  "example_id": "ID12345",
  "name": "Example Name",
  "date": "${new Date().toISOString().split('T')[0]}",
  "time": "${new Date().toTimeString().split(' ')[0]}",
  "status": "success",
  "details": {
    "field1": "value1",
    "field2": "value2",
    "numeric_field": 123,
    "boolean_field": true
  },
  "response_code": 200,
  "message": "Operation completed successfully"
}`}
            </pre>
          </div>
        </div>
      );
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "params":
        return (
          <div className="py-4 space-y-6">
            {/* Path Parameters */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Path Params</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-accent/30">
                      <th className="w-10 px-3 py-2"></th>
                      <th className="text-left px-3 py-2 text-sm font-medium">Name</th>
                      <th className="text-left px-3 py-2 text-sm font-medium">Value</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pathParams.map((param, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-3 py-2">
                          <input 
                            type="checkbox" 
                            checked={param.checked}
                            onChange={(e) => handleParamChange(index, 'checked', e.target.checked, 'path')}
                            className="rounded"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Input
                            value={param.name}
                            onChange={(e) => handleParamChange(index, 'name', e.target.value, 'path')}
                            placeholder="Name"
                            className="border-0 shadow-none h-8 px-2 bg-transparent"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Input
                            value={param.value}
                            onChange={(e) => handleParamChange(index, 'value', e.target.value, 'path')}
                            placeholder="Value"
                            className="border-0 shadow-none h-8 px-2 bg-transparent"
                          />
                        </td>
                        <td className="px-2 py-2">
                          {pathParams.length > 1 && (
                            <button 
                              onClick={() => handleRemoveParam(index, 'path')}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {pathParams[pathParams.length - 1].name && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddParam('path')}
                  className="text-sm"
                >
                  Add Path Param
                </Button>
              )}
            </div>

            {/* Query Parameters */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Query Params</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-accent/30">
                      <th className="w-10 px-3 py-2"></th>
                      <th className="text-left px-3 py-2 text-sm font-medium">Name</th>
                      <th className="text-left px-3 py-2 text-sm font-medium">Value</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryParams.map((param, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-3 py-2">
                          <input 
                            type="checkbox" 
                            checked={param.checked}
                            onChange={(e) => handleParamChange(index, 'checked', e.target.checked, 'query')}
                            className="rounded"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Input
                            value={param.name}
                            onChange={(e) => handleParamChange(index, 'name', e.target.value, 'query')}
                            placeholder="Name"
                            className="border-0 shadow-none h-8 px-2 bg-transparent"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <Input
                            value={param.value}
                            onChange={(e) => handleParamChange(index, 'value', e.target.value, 'query')}
                            placeholder="Value"
                            className="border-0 shadow-none h-8 px-2 bg-transparent"
                          />
                        </td>
                        <td className="px-2 py-2">
                          {queryParams.length > 1 && (
                            <button 
                              onClick={() => handleRemoveParam(index, 'query')}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {queryParams[queryParams.length - 1].name && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddParam('query')}
                  className="text-sm"
                >
                  Add Query Param
                </Button>
              )}
            </div>
          </div>
        );
      
      case "body":
        return (
          <div className="py-4 space-y-4">
            {renderBodyTypes()}
            
            {bodyType === "none" ? (
              <div className="p-4 border rounded-md bg-accent/10 text-center text-muted-foreground">
                This request has no 'body' construction
              </div>
            ) : bodyType === "json" ? (
              <div className="border rounded-md">
                <Textarea
                  className="p-4 text-sm font-mono bg-background min-h-[300px] w-full border-0 focus-visible:ring-0 overflow-x-auto whitespace-pre"
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                />
              </div>
            ) : (
              <div className="p-4 border rounded-md bg-accent/10 text-center text-muted-foreground">
                {bodyType} body editor not implemented in this demo
              </div>
            )}
          </div>
        );
      
      case "headers":
        return (
          <div className="py-4 space-y-4">
            <h3 className="text-lg font-semibold">Headers</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-accent/30">
                    <th className="w-10 px-3 py-2"></th>
                    <th className="text-left px-3 py-2 text-sm font-medium">Name</th>
                    <th className="text-left px-3 py-2 text-sm font-medium">Value</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {headerParams.map((param, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-3 py-2">
                        <input 
                          type="checkbox" 
                          checked={param.checked}
                          onChange={(e) => handleParamChange(index, 'checked', e.target.checked, 'header')}
                          className="rounded"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <Input
                          value={param.name}
                          onChange={(e) => handleParamChange(index, 'name', e.target.value, 'header')}
                          placeholder="Name"
                          className="border-0 shadow-none h-8 px-2 bg-transparent"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <Input
                          value={param.value}
                          onChange={(e) => handleParamChange(index, 'value', e.target.value, 'header')}
                          placeholder="Value"
                          className="border-0 shadow-none h-8 px-2 bg-transparent"
                        />
                      </td>
                      <td className="px-2 py-2">
                        {headerParams.length > 1 && (
                          <button 
                            onClick={() => handleRemoveParam(index, 'header')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {headerParams[headerParams.length - 1].name && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddParam('header')}
                className="text-sm"
              >
                Add Header
              </Button>
            )}
          </div>
        );
      
      case "examples":
        return renderApiExamples();
      
      default:
        return null;
    }
  };
  
  const renderResponse = () => {
    if (!responseStatus) {
      return (
        <div className="p-8 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="p-4 bg-accent/20 rounded-full">
            <Rocket size={32} className="text-muted-foreground opacity-70" />
          </div>
          <p className="text-muted-foreground">Click Send to get a response</p>
        </div>
      );
    }
    
    return (
      <div className="py-4 px-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className={`px-2 py-1 rounded-md text-xs font-medium 
          ${responseStatus.code >= 200 && responseStatus.code < 300 
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
            : 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'}`}>
            <span className={`mr-1 h-2 w-2 rounded-full ${responseStatus.code >= 200 && responseStatus.code < 300 ? 'bg-emerald-500' : 'bg-red-500'} inline-block`}></span>
            <span>{responseStatus.code} {responseStatus.text}</span>
          </div>
          <span className="text-xs text-muted-foreground">{responseStatus.time}</span>
          <span className="text-xs text-muted-foreground">{responseStatus.size}</span>
        </div>
            
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h5 className="font-medium">Response Body</h5>
              <span className="px-2 py-0.5 bg-emerald-600/20 text-emerald-500 rounded-md text-xs">JSON</span>
            </div>
            <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground" onClick={copyToClipboard}>
              <Copy size={14} />
              <span>Copy</span>
            </button>
          </div>
                
          <div className="border rounded-md overflow-hidden">
            <div className="flex items-center justify-center px-2 py-1 bg-secondary border-b cursor-ns-resize" id="response-resize-handle">
              <div className="text-xs text-muted-foreground">
                <span className="mr-2">Drag handle to resize ↕</span>
                <GripVertical className="inline h-3 w-3" />
              </div>
            </div>
            <div className="overflow-auto bg-background" id="response-content" style={{ height: "300px", maxHeight: "80vh", overflowX: "auto" }}>
              <pre className="p-4 text-sm font-mono whitespace-pre">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Add resizing functionality for response panel
    const resizeHandle = document.getElementById("response-resize-handle");
    const contentArea = document.getElementById("response-content");
    
    if (resizeHandle && contentArea) {
      let startY: number;
      let startHeight: number;
      
      const onMouseDown = (e: MouseEvent) => {
        startY = e.clientY;
        startHeight = parseInt(getComputedStyle(contentArea).height, 10);
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        
        // Change cursor style
        document.body.style.cursor = 'ns-resize';
      };
      
      const onMouseMove = (e: MouseEvent) => {
        const newHeight = startHeight - (e.clientY - startY);
        if (newHeight > 100) { // Minimum height
          contentArea.style.height = `${newHeight}px`;
        }
      };
      
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        
        // Reset cursor style
        document.body.style.cursor = '';
      };
      
      resizeHandle.addEventListener('mousedown', onMouseDown);
      
      // Cleanup
      return () => {
        resizeHandle.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [responseStatus]);
  
  return (
    <div className="border-l h-screen w-[500px] flex flex-col bg-background">
      <div className="border-b p-2 px-4 flex items-center justify-between bg-background">
        <div className="flex items-center space-x-2 px-2">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${
            method === 'GET' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' :
            method === 'POST' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400' :
            method === 'PUT' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400' :
            method === 'DELETE' ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400' :
            'bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400'
          }`}>{method}</span>
          <Input
            type="text"
            value={fullUrl}
            onChange={(e) => setFullUrl(e.target.value)}
            className="flex-1 h-8 bg-background border rounded-md px-3 py-1 text-sm min-w-[350px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="secondary"
            className="bg-primary text-white hover:bg-primary/90"
            onClick={handleSendRequest}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
          <button onClick={onClose} className="p-1 hover:bg-accent rounded-md">
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {renderTabs()}
          <ScrollArea className="flex-1 h-full">
            <div className="px-4">
              {renderTabContent()}
            </div>
          </ScrollArea>
        </div>
        
        <div className="border-t">
          <div 
            className="flex justify-between items-center p-3 cursor-pointer hover:bg-accent/10"
            onClick={() => setIsResponseCollapsed(!isResponseCollapsed)}
          >
            <h3 className="font-medium">Response</h3>
            <button className="text-muted-foreground hover:text-foreground">
              {isResponseCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>
          
          {!isResponseCollapsed && (
            <div className="max-h-[700px] overflow-auto px-4">
              {renderResponse()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
