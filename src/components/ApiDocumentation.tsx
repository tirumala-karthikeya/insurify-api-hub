
import { useState } from "react";
import { Copy } from "lucide-react";

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
                          <span className="text-primary">required</span>
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
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Responses</h2>
          <button className="code-btn">
            Generate Code
          </button>
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
    </div>
  );
}
