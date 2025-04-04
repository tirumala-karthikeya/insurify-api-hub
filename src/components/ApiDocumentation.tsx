
import { useState } from "react";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "./ui/input";

interface ParameterProps {
  name: string;
  type: string;
  required: boolean;
  example: string;
}

interface ApiDocumentationProps {
  endpoint: string;
  method: string;
  title: string;
  baseUrl: string;
  path: string;
  queryParams?: ParameterProps[];
  headerParams?: ParameterProps[];
  responseExample: any;
  bodyParams?: ParameterProps[];
  onUseApi: () => void;
}

export default function ApiDocumentation({
  endpoint,
  method,
  title,
  baseUrl,
  path,
  queryParams = [],
  headerParams = [],
  responseExample,
  bodyParams = [],
  onUseApi
}: ApiDocumentationProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [response, setResponse] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState<{code: number; text: string; time: string; size: string} | null>(null);
  const [isResponseCollapsed, setIsResponseCollapsed] = useState(false);
  
  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };
  
  const getSampleCode = (language: string) => {
    const url = `${baseUrl}${path}`;
    
    switch (language) {
      case "curl":
        return `curl --location --request ${method} '${url}' \\
--header 'X-SOURCE: admin' \\
--header 'X-LANG: en' \\
--header 'X-REQUEST-ID: insurify' \\
--header 'X-DEVICE-ID: insurify_device' \\
--header 'x-api-key: your_api_key' \\
--header 'Content-Type: application/json'`;
      case "js":
        return `const options = {
  method: '${method}',
  headers: {
    'X-API-KEY': 'your_api_key',
    'Content-Type': 'application/json'
  }
};

fetch('${url}', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`;
      default:
        return `// Code sample for ${language} not available`;
    }
  };
  
  const handleSendRequest = () => {
    // Simulate API call
    setTimeout(() => {
      const responseData = getResponseData();
      const statusCode = Math.random() > 0.9 ? 400 : 200;
      
      setResponse(responseData);
      setResponseStatus({
        code: statusCode,
        text: statusCode === 200 ? "OK" : "Bad Request",
        time: `${Math.floor(Math.random() * 3000) + 100} ms`,
        size: `${Math.floor(Math.random() * 100) + 10}.${Math.floor(Math.random() * 90) + 10} KB`
      });
    }, 800);
  };
  
  const getResponseData = () => {
    if (endpoint.toLowerCase().includes("policy")) {
      return {
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
            "status": "active",
            "created_at": "2023-01-10T14:30:45Z"
          }
        ],
        "total": 100,
        "page": 1,
        "limit": 10
      };
    } else if (endpoint.toLowerCase().includes("claims")) {
      return {
        "claims": [
          {
            "claim_id": "CLM98765",
            "policy_id": "POL12345",
            "incident_date": "2023-05-20",
            "filing_date": "2023-05-22",
            "claim_type": "Collision",
            "claim_amount": 3500,
            "status": "pending",
            "description": "Vehicle damage from rear-end collision"
          }
        ],
        "total": 45,
        "page": 1,
        "limit": 10
      };
    } else if (endpoint.toLowerCase().includes("premium")) {
      return {
        "premium_records": [
          {
            "premium_id": "PRM56789",
            "policy_id": "POL12345",
            "amount": 1200,
            "frequency": "annual",
            "next_due_date": "2024-01-15",
            "payment_method": "credit_card",
            "is_autopay": true
          }
        ],
        "total": 32,
        "page": 1,
        "limit": 10
      };
    } else if (endpoint.toLowerCase().includes("coverage")) {
      return {
        "coverage_details": [
          {
            "coverage_id": "COV34567",
            "policy_id": "POL12345",
            "coverage_type": "Comprehensive",
            "coverage_limit": 50000,
            "deductible": 500,
            "is_active": true,
            "coverage_start": "2023-01-15",
            "coverage_end": "2024-01-14"
          }
        ],
        "total": 28,
        "page": 1,
        "limit": 10
      };
    } else if (endpoint.toLowerCase().includes("employee")) {
      return {
        "employees": [
          {
            "employee_id": "EM3278",
            "first_name": "Mark", 
            "last_name": "Figueroa",
            "email": "jeffreydoyle@example.net",
            "phone_number": "001-581-896-0013x3890",
            "hire_date": "2021-02-19",
            "job_title": "Theme park manager",
            "job_id": 284,
            "gov_id": "829-01-2616",
            "hiring_manager_id": "E001",
            "hr_manager_id": "E009",
            "marital_status": "single",
            "state": "California",
            "emergency_contact_name": "Gina Moore",
            "emergency_contact_phone": "001-851-316-1559x40781"
          }
        ],
        "total": 87,
        "page": 1,
        "limit": 10
      };
    } else {
      return {
        "message": "Operation successful",
        "status": "success",
        "timestamp": new Date().toISOString()
      };
    }
  };
  
  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    }
  };
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="uppercase text-sm text-muted-foreground mb-2">INSURANCE</div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <span className="status-stable">STABLE</span>
        </div>
      </div>
      
      <div className="mb-8 flex items-center space-x-4">
        <div className={`method-tab ${method.toLowerCase()}-tag`}>{method}</div>
        <div className="flex-1 font-mono text-sm bg-secondary p-2 rounded-md">
          {baseUrl}{path}
        </div>
        <button 
          className="use-api-btn"
          onClick={onUseApi}
        >
          Use API
        </button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Request</h2>
        
        {queryParams.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-4">Query Params</h3>
            <div className="bg-secondary/50 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4">Parameter</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Required</th>
                    <th className="text-left p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {queryParams.map((param, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 text-blue-400">{param.name}</td>
                      <td className="p-4">{param.type}</td>
                      <td className="p-4">
                        {param.required ? (
                          <span className="required-badge">required</span>
                        ) : (
                          <span>optional</span>
                        )}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        Example: {param.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {headerParams.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-4">Header Params</h3>
            <div className="bg-secondary/50 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4">Parameter</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Required</th>
                    <th className="text-left p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {headerParams.map((param, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 text-blue-400">{param.name}</td>
                      <td className="p-4">{param.type}</td>
                      <td className="p-4">
                        {param.required ? (
                          <span className="required-badge">required</span>
                        ) : (
                          <span>optional</span>
                        )}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {param.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {(method === "POST" || method === "PUT" || method === "PATCH") && bodyParams.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-4">Request Body</h3>
            <div className="bg-secondary/50 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4">Parameter</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Required</th>
                    <th className="text-left p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {bodyParams.map((param, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 text-blue-400">{param.name}</td>
                      <td className="p-4">{param.type}</td>
                      <td className="p-4">
                        {param.required ? (
                          <span className="required-badge">required</span>
                        ) : (
                          <span>optional</span>
                        )}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {param.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Request samples</h2>
        
        <div className="mb-4">
          <div className="flex border-b">
            <button
              className={`tab-button ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`tab-button ${activeTab === "js" ? "active" : ""}`}
              onClick={() => setActiveTab("js")}
            >
              JS
            </button>
            <button
              className={`tab-button ${activeTab === "python" ? "active" : ""}`}
              onClick={() => setActiveTab("python")}
            >
              Python
            </button>
            <button
              className={`tab-button ${activeTab === "curl" ? "active" : ""}`}
              onClick={() => setActiveTab("curl")}
            >
              cURL
            </button>
          </div>
        </div>
        
        <div className="relative">
          <pre className="bg-secondary rounded-md p-4 overflow-auto text-sm font-mono">
            {getSampleCode(activeTab === "all" ? "curl" : activeTab)}
          </pre>
          <button className="absolute top-2 right-2 p-2 bg-muted rounded-md opacity-70 hover:opacity-100 transition-opacity">
            <Copy size={14} />
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Responses</h2>
          <div className="flex items-center space-x-3">
            <button 
              className="bg-primary text-white px-4 py-2 rounded-md text-sm"
              onClick={handleSendRequest}
            >
              Send
            </button>
            <button className="code-btn">
              Generate Code
            </button>
          </div>
        </div>
        
        <div className="mb-4 bg-secondary rounded-t-md overflow-hidden">
          <div className="p-3 flex items-center space-x-2">
            <span className="success-badge">
              <span className="mr-1 h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>200</span>
            </span>
            <span>Success</span>
          </div>
        </div>
        
        <div className="mb-10">
          <div className="mb-4 p-4 bg-secondary">
            <span>application/json</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-2 p-4 bg-secondary">
                <span>application/json</span>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(responseExample.schema || {}).map(([key, value]: [string, any], index) => (
                    <tr key={index} className={index > 0 ? "border-t border-border" : ""}>
                      <td className="p-4 text-blue-400">{key}</td>
                      <td className="p-4">{value.type}</td>
                      <td className="p-4">
                        {value.required ? (
                          <span className="required-badge">required</span>
                        ) : (
                          <span className="text-muted-foreground">optional</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div>
              <div className="mb-2 p-4 bg-secondary">
                <span>Example</span>
              </div>
              <div className="bg-secondary/50 p-4 rounded-md">
                <pre className="text-sm font-mono overflow-auto" style={{ maxHeight: "400px" }}>
                  {formatJson(responseExample.example)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {responseStatus && (
        <div className="bg-background border border-border rounded-md overflow-hidden shadow-sm">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2 cursor-pointer" 
                onClick={() => setIsResponseCollapsed(!isResponseCollapsed)}>
              <h4 className="text-lg font-medium">Response</h4>
              <button className="text-muted-foreground hover:text-foreground">
                {isResponseCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </button>
            </div>
            
            <div className="flex items-center space-x-2 mt-1">
              <div className={`${responseStatus.code >= 200 && responseStatus.code < 300 ? 'success-badge' : 'error-badge'}`}>
                <span className={`mr-1 h-2 w-2 rounded-full ${responseStatus.code >= 200 && responseStatus.code < 300 ? 'bg-emerald-500' : 'bg-red-500'} inline-block`}></span>
                <span>{responseStatus.code} {responseStatus.text}</span>
              </div>
              <span className="text-xs text-muted-foreground">{responseStatus.time}</span>
              <span className="text-xs text-muted-foreground">{responseStatus.size}</span>
            </div>
            
            {!isResponseCollapsed && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium">Response Body</h5>
                    <span className="px-2 py-0.5 bg-emerald-600/20 text-emerald-500 rounded-md text-xs">API Data</span>
                  </div>
                  <button className="copy-button flex items-center space-x-1" onClick={copyToClipboard}>
                    <Copy size={14} />
                    <span>Copy</span>
                  </button>
                </div>
                
                <div className="border border-border rounded-md">
                  <pre className="p-4 text-sm font-mono overflow-auto" style={{ maxHeight: "400px" }}>
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
