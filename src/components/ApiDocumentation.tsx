
import { useState } from "react";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface ApiDocumentationProps {
  endpoint: string;
  method: string;
  title: string;
  baseUrl: string;
  path: string;
  queryParams?: { name: string; type: string; required: boolean; description: string }[];
  headerParams?: { name: string; type: string; required: boolean; description: string }[];
  bodyParams?: { name: string; type: string; required: boolean; description: string }[];
  responseExample?: Record<string, any>;
  onUseApi: () => void;
  isApiPanelOpen?: boolean;
}

export default function ApiDocumentation({
  endpoint,
  method,
  title,
  baseUrl,
  path,
  queryParams = [],
  headerParams = [],
  bodyParams = [],
  responseExample = {},
  onUseApi,
  isApiPanelOpen = false
}: ApiDocumentationProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [responseTab, setResponseTab] = useState("schema");
  const [isResponseCollapsed, setIsResponseCollapsed] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [requestBody, setRequestBody] = useState(`{
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

  const responseData = {
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSendRequest = () => {
    setShowResponse(true);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className={`method-tab ${method.toLowerCase()}-tag`}>{method}</span>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            <span className="text-blue-400">{baseUrl}</span>
            <span>{path}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="status-stable">STABLE</span>
          <Button
            variant="outline"
            className={`use-api-btn ${isApiPanelOpen ? 'bg-secondary hover:bg-secondary/90' : ''}`}
            onClick={onUseApi}
          >
            {isApiPanelOpen ? 'Close API' : 'Use API'}
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="p-3 border rounded-md flex items-center space-x-2">
          <span className={`method-tab ${method.toLowerCase()}-tag`}>{method}</span>
          <Input
            type="text"
            value={`${baseUrl}${path}`}
            className="flex-1 bg-background"
            readOnly
          />
          <Button 
            className="bg-primary hover:bg-primary/90 text-white" 
            onClick={handleSendRequest}
          >
            Send
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex space-x-1 border-b">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'parameters' ? 'active' : ''}`}
            onClick={() => setActiveTab('parameters')}
          >
            Parameters
          </button>
          {(method === "POST" || method === "PUT" || method === "PATCH") && (
            <button
              className={`tab-button ${activeTab === 'body' ? 'active' : ''}`}
              onClick={() => setActiveTab('body')}
            >
              Request Body
            </button>
          )}
          <button
            className={`tab-button ${activeTab === 'responses' ? 'active' : ''}`}
            onClick={() => setActiveTab('responses')}
          >
            Responses
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground mb-4">
                This endpoint allows you to {method === 'GET' ? 'retrieve' : method === 'POST' ? 'create' : method === 'PUT' ? 'update' : 'delete'} {endpoint.toLowerCase().includes('policies') ? 'insurance policies' : endpoint.toLowerCase().includes('claims') ? 'insurance claims' : endpoint.toLowerCase().includes('coverage') ? 'coverage details' : endpoint.toLowerCase().includes('premium') ? 'premium information' : 'user data'}.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Base URL</h3>
                  <p className="text-blue-400 font-mono">{baseUrl}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Endpoint</h3>
                  <p className="font-mono">{path}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'parameters' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Parameters</h2>
              
              {queryParams.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Query Parameters</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary text-left">
                        <tr>
                          <th className="p-3">Name</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Required</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queryParams.map((param, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                            <td className="p-3 text-blue-400">{param.name}</td>
                            <td className="p-3 text-muted-foreground">{param.type}</td>
                            <td className="p-3">
                              {param.required ? (
                                <span className="required-badge">required</span>
                              ) : (
                                <span className="text-muted-foreground">optional</span>
                              )}
                            </td>
                            <td className="p-3">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {headerParams.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Header Parameters</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary text-left">
                        <tr>
                          <th className="p-3">Name</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Required</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {headerParams.map((param, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                            <td className="p-3 text-blue-400">{param.name}</td>
                            <td className="p-3 text-muted-foreground">{param.type}</td>
                            <td className="p-3">
                              {param.required ? (
                                <span className="required-badge">required</span>
                              ) : (
                                <span className="text-muted-foreground">optional</span>
                              )}
                            </td>
                            <td className="p-3">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'body' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Request Body</h2>
              
              <div className="mb-4">
                <div className="flex mb-2">
                  <button className="px-3 py-1 bg-secondary text-foreground rounded-l-md text-sm border-r">
                    Form
                  </button>
                  <button className="px-3 py-1 bg-background text-foreground rounded-r-md text-sm">
                    Raw
                  </button>
                </div>
                
                <div className="p-2 bg-accent/30 text-sm rounded-md mb-4">
                  <p>Tip: Fill in the values between quotes for the fields you want to include in your request. <span className="text-primary">Generate Template</span></p>
                </div>
                
                <div className="border rounded-md">
                  <Textarea
                    className="p-4 text-sm font-mono bg-background min-h-[300px] w-full border-0 focus-visible:ring-0"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                  />
                </div>
              </div>
              
              {bodyParams.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Body Parameters</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary text-left">
                        <tr>
                          <th className="p-3">Name</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Required</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bodyParams.map((param, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                            <td className="p-3 text-blue-400">{param.name}</td>
                            <td className="p-3 text-muted-foreground">{param.type}</td>
                            <td className="p-3">
                              {param.required ? (
                                <span className="required-badge">required</span>
                              ) : (
                                <span className="text-muted-foreground">optional</span>
                              )}
                            </td>
                            <td className="p-3">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'responses' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Responses</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Response Codes</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary text-left">
                      <tr>
                        <th className="p-3">Status</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3">
                          <span className="success-badge">200 OK</span>
                        </td>
                        <td className="p-3">The request was successful.</td>
                      </tr>
                      <tr className="bg-secondary/30">
                        <td className="p-3">
                          <span className="error-badge">400 Bad Request</span>
                        </td>
                        <td className="p-3">The request was invalid or cannot be served.</td>
                      </tr>
                      <tr>
                        <td className="p-3">
                          <span className="error-badge">401 Unauthorized</span>
                        </td>
                        <td className="p-3">Authentication failed or user doesn't have permissions.</td>
                      </tr>
                      <tr className="bg-secondary/30">
                        <td className="p-3">
                          <span className="error-badge">404 Not Found</span>
                        </td>
                        <td className="p-3">The requested resource could not be found.</td>
                      </tr>
                      <tr>
                        <td className="p-3">
                          <span className="error-badge">500 Server Error</span>
                        </td>
                        <td className="p-3">An error occurred on the server.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <div className="flex border-b mb-4">
                  <button 
                    className={`tab-button ${responseTab === 'schema' ? 'active' : ''}`}
                    onClick={() => setResponseTab('schema')}
                  >
                    Schema
                  </button>
                  <button 
                    className={`tab-button ${responseTab === 'example' ? 'active' : ''}`}
                    onClick={() => setResponseTab('example')}
                  >
                    Example
                  </button>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-secondary p-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="success-badge">200 OK</span>
                      <span className="text-xs text-muted-foreground">Success Response</span>
                    </div>
                    <button className="code-btn flex items-center space-x-1" onClick={() => copyToClipboard(JSON.stringify(responseExample, null, 2))}>
                      <Copy size={14} />
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="p-4 code-container bg-background">
                    <pre className="text-sm">
                      {responseTab === 'schema' ? (
                        JSON.stringify(
                          {
                            "type": "object",
                            "properties": {
                              "employees": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "employee_id": { "type": "string" },
                                    "first_name": { "type": "string" },
                                    "last_name": { "type": "string" },
                                    "email": { "type": "string" },
                                    "phone_number": { "type": "string" },
                                    "hire_date": { "type": "string" },
                                    "job_title": { "type": "string" },
                                    "job_id": { "type": "integer" }
                                  },
                                  "required": ["employee_id"]
                                }
                              },
                              "total": { "type": "integer" },
                              "page": { "type": "integer" },
                              "limit": { "type": "integer" }
                            }
                          },
                          null,
                          2
                        )
                      ) : (
                        JSON.stringify(responseExample, null, 2)
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showResponse && (
        <div className="responses-container mb-8">
          <div className="responses-header" onClick={() => setIsResponseCollapsed(!isResponseCollapsed)}>
            <h3 className="text-lg font-medium">Responses</h3>
            <button>
              {isResponseCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>
          </div>
          
          {!isResponseCollapsed && (
            <>
              <div className="response-item">
                <div className="response-status">
                  <div className="response-code-success">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block mr-1"></span>
                    <span>200 Success</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">154 ms</span>
                  <span className="text-xs text-muted-foreground ml-2">26.45 KB</span>
                </div>
              </div>
              
              <div className="response-tabs border-t">
                <button className="response-tab active">application/json</button>
              </div>
              
              <div className="response-tables border-t p-4">
                <div className="response-table">
                  <div className="response-table-header">
                    <h4 className="font-medium">Example</h4>
                  </div>
                  <div className="response-table-content">
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="request-samples">
        <h2 className="text-xl font-semibold mb-4">Request samples</h2>
        <div className="sample-tabs">
          <div className="sample-tab">
            <span className="sample-icon text-green-400">⌘</span>
            <span>Shell</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-yellow-400">JS</span>
            <span>JavaScript</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-orange-400">☕</span>
            <span>Java</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-orange-400">🔶</span>
            <span>Swift</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-blue-400">GO</span>
            <span>Go</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-blue-400">PHP</span>
            <span>PHP</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-blue-400">🐍</span>
            <span>Python</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-blue-400">HTTP</span>
            <span>HTTP</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-blue-400">C</span>
            <span>C</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-green-400">C#</span>
            <span>C#</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-gray-400">C</span>
            <span>Objective-C</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-red-400">💎</span>
            <span>Ruby</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-yellow-400">ML</span>
            <span>OCaml</span>
          </div>
          <div className="sample-tab">
            <span className="sample-icon text-blue-400">🎯</span>
            <span>Dart</span>
          </div>
        </div>
      </div>
    </div>
  );
}
