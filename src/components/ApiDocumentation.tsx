import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { apiEndpoints } from "../data/apiData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ApiDocumentationProps {
  endpoint: string;
  method: string;
  title: string;
  baseUrl: string;
  path: string;
  queryParams?: any[];
  headerParams?: any[];
  bodyParams?: any[];
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
  const [isResponseCollapsed, setIsResponseCollapsed] = useState(false);
  const [responseFormat, setResponseFormat] = useState('json');
  
  // Find the current endpoint in apiEndpoints to get the real example
  const currentEndpointKey = Object.keys(apiEndpoints).find(key => 
    apiEndpoints[key].title === endpoint && apiEndpoints[key].method === method
  );
  
  const currentEndpoint = currentEndpointKey ? apiEndpoints[currentEndpointKey] : null;
  
  // Get proper request body example
  const getRequestBodyExample = () => {
    if (currentEndpoint && (currentEndpoint.method === "POST" || currentEndpoint.method === "PUT")) {
      if (currentEndpoint.requestBodyExample) {
        return JSON.stringify(currentEndpoint.requestBodyExample, null, 2);
      }
      
      // For POST or PUT methods, create a formatted example from bodyParams
      if (currentEndpoint.bodyParams && currentEndpoint.bodyParams.length > 0) {
        const exampleBody: Record<string, any> = {};
        
        // Check endpoint to provide specific examples
        if (currentEndpoint.category === "Applications") {
          return JSON.stringify({
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
          }, null, 2);
        } else if (currentEndpoint.category === "Rider Applications") {
          return JSON.stringify({
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
          }, null, 2);
        } else if (currentEndpoint.category === "Rider Quotes") {
          return JSON.stringify({
            "rider_quote_id": "QU7719",
            "rider_id": "RID001",
            "rider_name": "Enhanced Accidental Coverage",
            "details": [
              "{'age': 40, 'health_condition': 'Good', 'smoking_status': 'non-smoker', 'occupation': 'construction', 'base_policy_premium': 200, 'premium': 27.0, 'waiting_period_in_months': 12, 'geographical_location': 'rural'}"
            ],
            "premium": "27.00"
          }, null, 2);
        } else {
          // For other endpoints or fallback, create from parameters
          currentEndpoint.bodyParams.forEach(param => {
            if (param.name === "application_id") exampleBody[param.name] = "AP312666";
            else if (param.name === "applicant_id") exampleBody[param.name] = "PH4006";
            else if (param.name === "first_name") exampleBody[param.name] = "s";
            else if (param.name === "last_name") exampleBody[param.name] = "g";
            else if (param.name === "email_id") exampleBody[param.name] = "iisubho1@gmail.com";
            else if (param.name === "age") exampleBody[param.name] = 40;
            else if (param.name === "coverage_amount") exampleBody[param.name] = 100000;
            else if (param.type === "string") exampleBody[param.name] = "example_value";
            else if (param.type === "integer" || param.type === "number") exampleBody[param.name] = 0;
            else exampleBody[param.name] = null;
          });
          return JSON.stringify(exampleBody, null, 2);
        }
      }
    }
    
    return "{}";
  };
  
  const [requestBody, setRequestBody] = useState(getRequestBodyExample());
  const [activeLanguage, setActiveLanguage] = useState("curl");
  const [isCopied, setIsCopied] = useState(false);
  const [queryParamsValues, setQueryParamsValues] = useState<Record<string, string>>({
    "api_key": "xpectrum_api_key_123@ai"
  });

  // Use the actual response example from the API data
  const responseData = currentEndpoint?.responseExample || (() => {
    // Generate appropriate response examples based on endpoint category
    if (currentEndpoint?.category === "Applications") {
      return {
        "application_id": "AP312666",
        "applicant_id": "PH4006",
        "first_name": "s",
        "last_name": "g",
        "email_id": "iisubho1@gmail.com",
        "status": "approved"
      };
    } else if (currentEndpoint?.category === "Plan Quote") {
      return {
        "quote_id": "QT2798",
        "plan_name": "Elite Life Protector",
        "premium": 1853.28,
        "frequency": "monthly"
      };
    } else if (currentEndpoint?.category === "Riders") {
      return {
        "id": "RID001",
        "name": "Enhanced Accidental Coverage"
      };
    } else {
      return {
        "message": "Operation successful",
        "status": "success",
        "timestamp": new Date().toISOString()
      };
    }
  })();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleQueryParamChange = (name: string, value: string) => {
    setQueryParamsValues(prev => ({ ...prev, [name]: value }));
  };

  const getSampleCode = (language: string) => {
    const apiUrl = `${baseUrl}${path}`;
    const apiKey = encodeURIComponent(queryParamsValues.api_key || "xpectrum_api_key_123@ai");
    
    switch (language) {
      case "curl":
        return `curl --location --request ${method} '${apiUrl}' \\
--header 'Content-Type: application/json' \\
--header 'x-api-key: ${apiKey}'${method === "POST" || method === "PUT" ? ` \\
--data-raw '${requestBody}'` : ""}`;

      case "js":
        return `const options = {
  method: "${method}",
  headers: {
    "x-api-key": "${apiKey}",
    "Content-Type": "application/json"
  }${method === "POST" || method === "PUT" ? `,
  body: JSON.stringify(${requestBody})` : ""}
};

fetch("${apiUrl}", options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;

      case "python":
        return `import requests

url = "${apiUrl}"
headers = {
  "x-api-key": "${apiKey}",
  "Content-Type": "application/json"
}
${method === "POST" || method === "PUT" ? `payload = ${requestBody}

response = requests.${method.toLowerCase()}(url, json=payload, headers=headers)` : `response = requests.${method.toLowerCase()}(url, headers=headers)`}
print(response.json())`;

      case "java":
        return `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiRequest {
  public static void main(String[] args) {
    HttpClient client = HttpClient.newHttpClient();
    
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("${apiUrl}"))
      .header("x-api-key", "${apiKey}")
      .header("Content-Type", "application/json")${method === "POST" || method === "PUT" ? `
      .${method.toLowerCase()}(HttpRequest.BodyPublishers.ofString('${requestBody}'))` : `
      .method("${method}", HttpRequest.BodyPublishers.noBody())`}
      .build();
    
    client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
      .thenApply(HttpResponse::body)
      .thenAccept(System.out::println)
      .join();
  }
}`;

      default:
        return `// Select a language to see code examples for: ${apiUrl}`;
    }
  };

  // Function to render example IDs for the selected endpoint
  const renderExampleIdsTable = () => {
    if (!currentEndpoint || !currentEndpoint.pathParams || currentEndpoint.pathParams.length === 0) {
      return null;
    }

    const pathParam = currentEndpoint.pathParams[0];
    
    if (!pathParam.examples || pathParam.examples.length === 0) {
      return null;
    }

    // Define mappings for rider quote IDs and term life plan IDs
    const idToNameMap: Record<string, string> = {
      // Rider quotes
      "QU7719": "Enhanced Accidental Coverage",
      "QU2225": "Comprehensive Critical Illness", 
      "QU2031": "Premium Waiver Protection",
      "QU1130": "Premium Waiver Protection",
      
      // Term life plans
      "TL001": "Lifetime Secure Plus",
      "TL002": "Secure Shield Term Plan",
      "TL003": "Elite Life Protector"
    };

    // Map in reverse direction: name to ID
    const nameToIdMap: Record<string, string> = {
      // Rider names
      "Enhanced Accidental Coverage": "RID001",
      "Comprehensive Critical Illness": "RID002",
      "Premium Waiver Protection": "RID003",
      
      // Term life plan names
      "Lifetime Secure Plus": "TL001",
      "Secure Shield Term Plan": "TL002",
      "Elite Life Protector": "TL003"
    };

    // Check if current endpoint is one of the two that should show both ID and name
    const showBothColumns = currentEndpoint.title === "Get Rider Quote by ID" || 
                            currentEndpoint.title === "Get Term Life Plan by Name" ||
                            currentEndpoint.title === "Get Rider by Name";

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Example IDs</h3>
        <Table className="border rounded-md overflow-hidden">
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead>ID</TableHead>
              {showBothColumns && <TableHead>Name</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pathParam.examples.map((example: string, index: number) => {
              let id = example;
              let name = example;
              
              // Handle both cases - when the example is an ID or a name
              if (pathParam.name === "rider_quote_id") {
                // For rider quotes, example is the ID
                id = example;
                name = idToNameMap[example] || example;
              } else if (pathParam.name === "name" || pathParam.name === "rider_name") {
                // For term life plans or rider names, example is the name
                id = nameToIdMap[example] || example;
                name = example;
              }
              
              return (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                  <TableCell>{id}</TableCell>
                  {showBothColumns && <TableCell>{name}</TableCell>}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="p-6 px-8 max-w-7xl mx-auto bg-background text-foreground">
      {/* API Header Section */}
      <div className="mb-8">
        <div className="flex flex-col mb-2">
          <span className="text-muted-foreground uppercase text-sm">{currentEndpoint?.category || 'API'}</span>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{title}</h1>
            <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">STABLE</span>
          </div>
        </div>
        
        {/* API URL Bar */}
        <div className="flex items-center gap-2 mt-6 mb-8">
          <div className="h-10 px-4 flex items-center justify-center rounded bg-green-600 text-white font-medium uppercase">
            {method}
          </div>
          <div className="flex-1 border rounded bg-background">
            <Input
              type="text"
              value={`${baseUrl}${path}`}
              className="h-10 bg-background border-0"
              readOnly
            />
          </div>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={onUseApi}
          >
            {isApiPanelOpen ? 'Close API' : 'Use API'}
          </Button>
        </div>
      </div>

      {/* Request Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Request</h2>
        
        {/* Example IDs Table */}
        {renderExampleIdsTable()}
        
        {/* Query Parameters */}
        {queryParams && queryParams.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Query Params</h3>
            <Table className="border rounded-md overflow-hidden">
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead className="w-1/4">Parameter</TableHead>
                  <TableHead className="w-1/4">Type</TableHead>
                  <TableHead className="w-1/4">Required</TableHead>
                  <TableHead className="w-1/4">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queryParams.map((param, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                    <TableCell className="text-blue-400">{param.name}</TableCell>
                    <TableCell>{param.type || 'string'}</TableCell>
                    <TableCell>
                      {param.required ? (
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded text-xs">required</span>
                      ) : (
                        <span className="text-muted-foreground">optional</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Input 
                        placeholder={`Example: ${param.description || param.example || ''}`}
                        value={queryParamsValues[param.name] || ''}
                        onChange={(e) => handleQueryParamChange(param.name, e.target.value)}
                        className="w-full bg-background"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Body Parameters for POST, PUT, PATCH methods */}
        {(method === "POST" || method === "PUT" || method === "PATCH") && bodyParams && bodyParams.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Body Parameters</h3>
            <div className="p-4 border rounded-md mb-4">
              <Textarea
                className="w-full min-h-[200px] p-4 font-mono text-sm bg-secondary/10"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* Request Samples */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Request samples</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'curl' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('curl')}
            >
              <span className="bg-gray-700 text-green-400 px-1">⌘</span>
              <span>Shell</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'js' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('js')}
            >
              <span className="bg-gray-700 text-yellow-400 px-1">JS</span>
              <span>JavaScript</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'python' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('python')}
            >
              <span className="bg-gray-700 text-blue-400 px-1">Py</span>
              <span>Python</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'java' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('java')}
            >
              <span className="bg-gray-700 text-orange-400 px-1">J</span>
              <span>Java</span>
            </button>
          </div>
          <div className="border rounded-md overflow-hidden">
            <div className="p-2 flex justify-between items-center bg-secondary">
              <span className="text-sm font-medium">
                {activeLanguage === 'curl' ? 'Shell' 
                : activeLanguage === 'js' ? 'JavaScript' 
                : activeLanguage === 'c#' ? 'C#' 
                : activeLanguage === 'objc' ? 'Objective-C' 
                : activeLanguage.charAt(0).toUpperCase() + activeLanguage.slice(1)}
              </span>
              <button
                className="text-xs flex items-center gap-1 py-1 px-2 hover:bg-background/50 rounded"
                onClick={() => copyToClipboard(getSampleCode(activeLanguage))}
              >
                {isCopied ? (
                  <>
                    <Check size={14} />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-[#1E1E28] text-gray-300 p-4 overflow-auto max-h-72">
              <pre className="text-sm font-mono">
                {getSampleCode(activeLanguage)}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Responses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Response</h2>
        <Tabs defaultValue="body" className="w-full">
          <TabsList>
            <TabsTrigger value="body">Response Body</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          <TabsContent value="body" className="border rounded-md overflow-hidden">
            <div className="bg-secondary p-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Response Body</h3>
              <div className="flex space-x-2">
                <Button 
                  variant={responseFormat === 'json' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setResponseFormat('json')}
                >
                  JSON
                </Button>
                <Button 
                  variant={responseFormat === 'text' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setResponseFormat('text')}
                >
                  Text
                </Button>
              </div>
            </div>
            <div className="p-4 max-h-[600px] overflow-auto bg-black">
              <pre className="text-green-400 whitespace-pre-wrap break-all">
                {responseFormat === 'json' 
                  ? JSON.stringify(responseData, null, 2) 
                  : typeof responseData === 'object' 
                    ? JSON.stringify(responseData) 
                    : String(responseData)
                }
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="examples" className="border rounded-md overflow-hidden">
            <div className="bg-secondary p-4">
              <h3 className="text-xl font-semibold">Example {method} Response</h3>
            </div>
            <div className="p-4 max-h-[600px] overflow-auto bg-black">
              <pre className="text-green-400 whitespace-pre-wrap break-all">
                {JSON.stringify(currentEndpoint?.responseExample || {}, null, 2)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}