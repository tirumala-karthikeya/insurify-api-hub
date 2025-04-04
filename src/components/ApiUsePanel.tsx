
import { useState } from "react";
import { X, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";

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

export default function ApiUsePanel({ endpoint, method, baseUrl, path, onClose }: ApiUsePanelProps) {
  const [activeTab, setActiveTab] = useState("params");
  const [response, setResponse] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseCollapsed, setIsResponseCollapsed] = useState(false);
  const [requestBody, setRequestBody] = useState<string>(`{
  "employee_id": "",
  "first_name": "",
  "last_name": "",
  "email": "",
  "phone_number": "",
  "hire_date": "",
  "job_title": "",
  "job_id": 0,
  "gov_id": "",
  "hiring_manager_id": "",
  "hr_manager_id": "",
  "marital_status": "",
  "state": "",
  "emergency_contact_name": ""
}`);
  const [baseUrlValue, setBaseUrlValue] = useState(baseUrl);
  const [apiKey, setApiKey] = useState("");
  const [source, setSource] = useState("");
  const [sync, setSync] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");
  
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
            "employee_id": "EMP003",
            "first_name": "John", 
            "last_name": "Smith",
            "email": "john.smith@example.com",
            "phone_number": "+1 123-456-7890",
            "hire_date": "2023-05-15",
            "job_title": "Software Developer",
            "job_id": 3,
            "gov_id": "829-01-2616",
            "hiring_manager_id": "EMP005",
            "hr_manager_id": "EMP010",
            "department": "Engineering",
            "status": "active"
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
  
  const handleSendRequest = () => {
    setIsLoading(true);
    
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
      setIsLoading(false);
    }, 800);
  };

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    }
  };
  
  return (
    <div className="border-l h-screen w-96 flex flex-col bg-background">
      <div className="border-b p-4 flex items-center justify-between bg-background">
        <div>
          <h3 className="font-medium text-lg">{method} {endpoint}</h3>
          <p className="text-xs text-muted-foreground">API</p>
        </div>
        <div className="flex items-center space-x-2">
          <select className="bg-background text-sm rounded-md p-1 border">
            <option>Development</option>
            <option>Production</option>
          </select>
          <button onClick={onClose} className="p-1 hover:bg-accent rounded-md">
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4 border-b bg-background">
        <div className="flex items-center space-x-2">
          <span className={`method-tab ${method.toLowerCase()}-tag`}>{method}</span>
          <Input
            type="text"
            value={`${baseUrlValue}${path}`}
            onChange={(e) => {
              const value = e.target.value;
              if (value.startsWith(baseUrlValue)) {
                // If the path is being edited
                const newPath = value.substring(baseUrlValue.length);
              } else {
                // The baseUrl is being edited
                setBaseUrlValue(value.split(path)[0] || value);
              }
            }}
            className="flex-1 bg-background border rounded-md px-3 py-1 text-sm"
          />
          <button 
            className={`py-1 px-3 rounded-md text-sm font-medium ${isLoading ? 'bg-primary/50' : 'bg-primary'} text-white`}
            onClick={handleSendRequest}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
        
        <div className="mt-4">
          <label className="text-sm font-medium">API Base URL:</label>
          <Input
            type="text"
            value={baseUrlValue}
            onChange={(e) => setBaseUrlValue(e.target.value)}
            className="w-full mt-1 bg-background border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1 overflow-auto">
        <div className="border-b bg-background">
          <div className="flex border-b">
            <button 
              className={`tab-button ${activeTab === 'params' ? 'active' : ''}`}
              onClick={() => setActiveTab('params')}
            >
              Params
            </button>
            <button 
              className={`tab-button ${activeTab === 'headers' ? 'active' : ''}`}
              onClick={() => setActiveTab('headers')}
            >
              Headers
            </button>
            {(method === "POST" || method === "PUT" || method === "PATCH") && (
              <button 
                className={`tab-button ${activeTab === 'body' ? 'active' : ''}`}
                onClick={() => setActiveTab('body')}
              >
                Body
              </button>
            )}
            <button 
              className={`tab-button ${activeTab === 'auth' ? 'active' : ''}`}
              onClick={() => setActiveTab('auth')}
            >
              Authorization
            </button>
          </div>
          
          <div className="p-4">
            {activeTab === 'params' && (
              <div className="space-y-4">
                <div>
                  <label className="flex justify-between">
                    <span className="text-sm font-medium">API Base URL:</span>
                    <button className="text-xs text-primary">Edit</button>
                  </label>
                  <div className="text-xs text-blue-400 mt-1">
                    {baseUrlValue}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Query Parameters</h4>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm text-blue-400">api_key</label>
                      <span className="required-badge">required</span>
                    </div>
                    <Input
                      type="text"
                      placeholder="Enter api_key (xpectrum_api_key_123@ai)"
                      className="param-field bg-background"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">string - Required query parameter</p>
                  </div>
                  
                  {method === "POST" && (
                    <>
                      <div>
                        <label className="text-sm text-blue-400 block mb-1">source</label>
                        <Input
                          type="text"
                          placeholder="Enter source (system)"
                          className="param-field bg-background"
                          value={source}
                          onChange={(e) => setSource(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">string - Optional query parameter</p>
                      </div>
                      
                      <div>
                        <label className="text-sm text-blue-400 block mb-1">sync</label>
                        <Input
                          type="text"
                          placeholder="Enter sync (true)"
                          className="param-field bg-background"
                          value={sync}
                          onChange={(e) => setSync(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">boolean - Optional query parameter</p>
                      </div>
                    </>
                  )}
                  
                  {method !== "POST" && (
                    <>
                      <div>
                        <label className="text-sm text-blue-400 block mb-1">status</label>
                        <Input
                          type="text"
                          placeholder="Enter status (active)"
                          className="param-field bg-background"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">string - Optional query parameter</p>
                      </div>
                      
                      <div>
                        <label className="text-sm text-blue-400 block mb-1">page</label>
                        <Input
                          type="text"
                          placeholder="Enter page (1)"
                          className="param-field bg-background"
                          value={page}
                          onChange={(e) => setPage(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">integer - Optional query parameter</p>
                      </div>
                      
                      <div>
                        <label className="text-sm text-blue-400 block mb-1">limit</label>
                        <Input
                          type="text"
                          placeholder="Enter limit (10)"
                          className="param-field bg-background"
                          value={limit}
                          onChange={(e) => setLimit(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">integer - Optional query parameter</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'headers' && (
              <div>
                <h4 className="text-lg font-medium mb-4">HTTP Headers</h4>
                <p className="text-sm text-muted-foreground mb-4">Headers are sent with every request to authenticate and provide additional context.</p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      defaultValue="Content-Type"
                      className="param-field flex-1 bg-background"
                    />
                    <Input
                      type="text"
                      defaultValue="application/json"
                      className="param-field flex-1 bg-background"
                    />
                    <button className="px-3 py-2 bg-red-500/20 text-red-400 rounded-md">
                      Remove
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      defaultValue="X-API-KEY"
                      className="param-field flex-1 bg-background"
                    />
                    <Input
                      type="text"
                      defaultValue="your_api_key"
                      className="param-field flex-1 bg-background"
                    />
                    <button className="px-3 py-2 bg-red-500/20 text-red-400 rounded-md">
                      Remove
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      defaultValue="Authorization"
                      className="param-field flex-1 bg-background"
                    />
                    <Input
                      type="text"
                      defaultValue="Bearer token"
                      className="param-field flex-1 bg-background"
                    />
                    <button className="px-3 py-2 bg-red-500/20 text-red-400 rounded-md">
                      Remove
                    </button>
                  </div>
                  
                  <button className="px-3 py-2 bg-secondary text-muted-foreground rounded-md text-sm">
                    Add Header
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'body' && (
              <div>
                <h4 className="text-lg font-medium mb-4">Request Body</h4>
                
                <div className="mb-4 flex space-x-2">
                  <button className="px-3 py-1 bg-secondary text-foreground rounded-l-md text-sm border-r">
                    Form
                  </button>
                  <button className="px-3 py-1 bg-background text-foreground rounded-r-md text-sm">
                    Raw
                  </button>
                </div>
                
                <div className="p-2 bg-accent/30 text-sm rounded-md mb-4">
                  <p>Tip: Fill in the values between quotes for the fields you want to include in your request. <span className="text-primary cursor-pointer">Generate Template</span></p>
                </div>
                
                <div className="border rounded-md">
                  <Textarea
                    className="p-4 text-sm font-mono bg-background min-h-[400px] w-full border-0 focus-visible:ring-0"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'auth' && (
              <div>
                <h4 className="text-lg font-medium mb-4">API Key Authentication</h4>
                
                <div className="mb-4">
                  <label className="text-sm font-medium block mb-1">API Key</label>
                  <Input
                    type="text"
                    placeholder="Enter your API key (required for all requests)"
                    className="param-field bg-background"
                  />
                </div>
                
                <div className="p-4 border-l-4 border-primary bg-accent/30 text-sm rounded-md mb-4">
                  <p>Required for all API calls. The API key authenticates your requests and determines your access level. Add the API key as a header with the name 'X-API-KEY'.</p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h5 className="text-primary mb-2">Current Environment: Development</h5>
                  <div className="mb-2">
                    <label className="text-sm block mb-1">Base URL:</label>
                    <div className="text-sm font-mono text-blue-400">{baseUrlValue}</div>
                  </div>
                  <button className="px-4 py-2 bg-primary/20 text-primary rounded-md text-sm">
                    Change Environment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {responseStatus && (
          <div className="p-4 bg-background">
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
                
                <div className="border rounded-md max-h-80 overflow-auto">
                  <pre className="p-4 text-sm font-mono bg-background">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
