
import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Copy, Rocket } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

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
  const [fullUrl, setFullUrl] = useState(`${baseUrl}${path}`);
  
  const [pathParams, setPathParams] = useState<ParamType[]>([
    { name: "store_id", value: "1", checked: true }
  ]);
  
  const [queryParams, setQueryParams] = useState<ParamType[]>([
    { name: "", value: "", checked: true }
  ]);
  
  const [headerParams, setHeaderParams] = useState<ParamType[]>([
    { name: "X-SOURCE", value: "admin", checked: true },
    { name: "X-LANG", value: "en", checked: true },
    { name: "Content-Type", value: "application/json", checked: true },
    { name: "X-REQUEST-ID", value: "stacktics", checked: true },
    { name: "X-DEVICE-ID", value: "stacktics_device", checked: true },
    { name: "x-api-key", value: "", checked: true },
    { name: "", value: "", checked: true }
  ]);

  useEffect(() => {
    setBaseUrlValue(baseUrl);
    setFullUrl(`${baseUrl}${path}`);
  }, [baseUrl, path]);

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
  
  const renderTabs = () => {
    const tabs = [
      { id: "params", label: `Params ${queryParams.filter(p => p.name).length > 0 ? queryParams.filter(p => p.name).length : ''}` },
      ...(showBody ? [{ id: "body", label: "Body" }] : []),
      { id: "headers", label: `Headers ${headerParams.filter(p => p.name).length > 0 ? headerParams.filter(p => p.name).length : ''}` },
      { id: "auth", label: "Auth" }
    ];

    return (
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            className={`px-4 py-2 text-sm ${activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  const renderBodyTypes = () => {
    const types = ["none", "form-data", "x-www-form-urlencoded", "json", "xml", "raw", "binary", "GraphQL", "msgpack"];
    
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
                  className="p-4 text-sm font-mono bg-background min-h-[300px] w-full border-0 focus-visible:ring-0"
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
      
      case "auth":
        return (
          <div className="py-4">
            <div className="p-6 rounded-md bg-accent/10">
              <h3 className="font-semibold mb-4">No Auth</h3>
              <p className="text-muted-foreground">No authentication required</p>
            </div>
          </div>
        );
      
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
                
          <div className="border rounded-md max-h-96 overflow-auto">
            <pre className="p-4 text-sm font-mono bg-background">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="border-l h-screen w-96 flex flex-col bg-background">
      <div className="border-b p-2 flex items-center justify-between bg-background">
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
            className="flex-1 h-8 bg-background border rounded-md px-3 py-1 text-sm"
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
            {renderTabContent()}
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
            <ScrollArea className="max-h-[300px]">
              {renderResponse()}
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
