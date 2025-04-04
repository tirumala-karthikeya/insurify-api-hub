
import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  value?: string;
}

interface ApiDocumentationProps {
  endpoint: string;
  method: string;
  title: string;
  baseUrl: string;
  path: string;
  queryParams?: Parameter[];
  headerParams?: Parameter[];
  bodyParams?: Parameter[];
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
  const [activeLanguage, setActiveLanguage] = useState("curl");
  const [isCopied, setIsCopied] = useState(false);
  const [queryParamsValues, setQueryParamsValues] = useState<Record<string, string>>({});
  const [headerParamsValues, setHeaderParamsValues] = useState<Record<string, string>>({});
  const [bodyParamsValues, setBodyParamsValues] = useState<Record<string, string>>({});

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
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendRequest = () => {
    setShowResponse(true);
  };

  const handleQueryParamChange = (name: string, value: string) => {
    setQueryParamsValues(prev => ({ ...prev, [name]: value }));
  };

  const handleHeaderParamChange = (name: string, value: string) => {
    setHeaderParamsValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBodyParamChange = (name: string, value: string) => {
    setBodyParamsValues(prev => ({ ...prev, [name]: value }));
  };

  const getSampleCode = (language: string) => {
    const apiUrl = `${baseUrl}${path}`;
    const apiKey = queryParamsValues.api_key || "xpectrum_api_key_123@ai";

    switch (language) {
      case "curl":
        return `curl --location --request ${method} '${apiUrl}' \\
--header 'X-API-KEY: ${apiKey}' \\
--header 'Content-Type: application/json'${method === "POST" || method === "PUT" ? ` \\
--data-raw '${requestBody}'` : ""}`;

      case "js":
        return `const options = {
  method: "${method}",
  headers: {
    "X-API-KEY": "${apiKey}",
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
  "X-API-KEY": "${apiKey}",
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
      .header("X-API-KEY", "${apiKey}")
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

      case "swift":
        return `import Foundation

let url = URL(string: "${apiUrl}")!
var request = URLRequest(url: url)
request.httpMethod = "${method}"
request.addValue("${apiKey}", forHTTPHeaderField: "X-API-KEY")
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
${method === "POST" || method === "PUT" ? `
let json = """
${requestBody}
"""
request.httpBody = json.data(using: .utf8)
` : ""}
let task = URLSession.shared.dataTask(with: request) { data, response, error in
  if let data = data {
    let responseJSON = try? JSONSerialization.jsonObject(with: data)
    print(responseJSON ?? "No data")
  }
}
task.resume()`;

      case "go":
        return `package main

import (
  "fmt"
  "net/http"
  "io/ioutil"${method === "POST" || method === "PUT" ? `
  "strings"` : ""}
)

func main() {
  ${method === "POST" || method === "PUT" ? `jsonStr := \`${requestBody}\`
  payload := strings.NewReader(jsonStr)
  req, _ := http.NewRequest("${method}", "${apiUrl}", payload)` : `req, _ := http.NewRequest("${method}", "${apiUrl}", nil)`}
  
  req.Header.Add("X-API-KEY", "${apiKey}")
  req.Header.Add("Content-Type", "application/json")
  
  res, _ := http.DefaultClient.Do(req)
  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)
  
  fmt.Println(string(body))
}`;

      case "php":
        return `<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "${apiUrl}",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "${method}",
  CURLOPT_HTTPHEADER => [
    "X-API-KEY: ${apiKey}",
    "Content-Type: application/json"
  ]${method === "POST" || method === "PUT" ? `,
  CURLOPT_POSTFIELDS => '${requestBody}'` : ""}
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;
?>`;

      case "c#":
        return `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
  static async Task Main()
  {
    using (var client = new HttpClient())
    {
      client.DefaultRequestHeaders.Add("X-API-KEY", "${apiKey}");
      
      ${method === "POST" || method === "PUT" ? `var content = new StringContent(
        @"${requestBody}",
        Encoding.UTF8,
        "application/json"
      );
      
      var response = await client.${method === "POST" ? "PostAsync" : "PutAsync"}("${apiUrl}", content);` : `var request = new HttpRequestMessage(
        new HttpMethod("${method}"),
        "${apiUrl}"
      );
      
      var response = await client.SendAsync(request);`}
      
      var responseContent = await response.Content.ReadAsStringAsync();
      Console.WriteLine(responseContent);
    }
  }
}`;

      case "objc":
        return `#import <Foundation/Foundation.h>

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"${apiUrl}"]];
[request setHTTPMethod:@"${method}"];

[request setValue:@"${apiKey}" forHTTPHeaderField:@"X-API-KEY"];
[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
${method === "POST" || method === "PUT" ? `
NSString *jsonBody = @"${requestBody.replace(/"/g, '\\"')}";
[request setHTTPBody:[jsonBody dataUsingEncoding:NSUTF8StringEncoding]];
` : ""}
NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                        completionHandler:
                                      ^(NSData *data, NSURLResponse *response, NSError *error) {
  if (data) {
    NSError *parseError = nil;
    id responseObject = [NSJSONSerialization JSONObjectWithData:data options:0 error:&parseError];
    NSLog(@"%@", responseObject);
  }
}];
[task resume];`;

      case "ruby":
        return `require 'uri'
require 'net/http'
require 'json'

uri = URI('${apiUrl}')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::${method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()}.new(uri.path)
request['X-API-KEY'] = '${apiKey}'
request['Content-Type'] = 'application/json'
${method === "POST" || method === "PUT" ? `request.body = '${requestBody}'` : ""}

response = http.request(request)
puts response.read_body`;

      case "c":
        return `#include <stdio.h>
#include <curl/curl.h>

int main(void)
{
  CURL *curl;
  CURLcode res;
  
  curl = curl_easy_init();
  if(curl) {
    curl_easy_setopt(curl, CURLOPT_URL, "${apiUrl}");
    curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "${method}");
    
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "X-API-KEY: ${apiKey}");
    headers = curl_slist_append(headers, "Content-Type: application/json");
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    
    ${method === "POST" || method === "PUT" ? `curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "${requestBody.replace(/"/g, '\\"')}");` : ""}
    
    res = curl_easy_perform(curl);
    if(res != CURLE_OK) {
      fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));
    }
    
    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);
  }
  
  return 0;
}`;

      case "http":
        return `${method} ${apiUrl} HTTP/1.1
X-API-KEY: ${apiKey}
Content-Type: application/json
${method === "POST" || method === "PUT" ? `

${requestBody}` : ""}`;

      default:
        return "Select a language to see code examples";
    }
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
              
              <div className="mb-4">
                <label className="text-sm font-medium">API Base URL:</label>
                <Input
                  type="text"
                  value={baseUrl}
                  className="w-full mt-1 bg-background border rounded-md px-3 py-2 text-sm"
                  readOnly
                />
              </div>
              
              {queryParams.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Query Parameters</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary text-left">
                        <tr>
                          <th className="p-3">Parameter</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Required</th>
                          <th className="p-3 w-2/5">Value</th>
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
                            <td className="p-3">
                              <Input 
                                placeholder={`Example: ${param.description}`}
                                value={queryParamsValues[param.name] || ''}
                                onChange={(e) => handleQueryParamChange(param.name, e.target.value)}
                                className="w-full bg-background"
                              />
                            </td>
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
                          <th className="p-3">Parameter</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Required</th>
                          <th className="p-3 w-2/5">Value</th>
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
                            <td className="p-3">
                              <Input 
                                placeholder={`Example: ${param.description}`}
                                value={headerParamsValues[param.name] || ''}
                                onChange={(e) => handleHeaderParamChange(param.name, e.target.value)}
                                className="w-full bg-background"
                              />
                            </td>
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
                  <p>Tip: Fill in the values between quotes for the fields you want to include in your request. <span className="text-primary cursor-pointer">Generate Template</span></p>
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
                          <th className="p-3">Parameter</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Required</th>
                          <th className="p-3 w-2/5">Value</th>
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
                            <td className="p-3">
                              <Input 
                                placeholder={`Example: ${param.description}`}
                                value={bodyParamsValues[param.name] || ''}
                                onChange={(e) => handleBodyParamChange(param.name, e.target.value)}
                                className="w-full bg-background"
                              />
                            </td>
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
        <div className="responses-container mb-8" id="response-section">
          <div className="responses-header cursor-pointer" onClick={() => setIsResponseCollapsed(!isResponseCollapsed)}>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="response-table">
                    <div className="response-table-header">
                      <h4 className="font-medium">application/json</h4>
                    </div>
                    <div className="response-table-content h-96 overflow-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-secondary/30 text-left">
                          <tr>
                            <th className="p-3">Field</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Required</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-3 text-blue-400">employee_id</td>
                            <td className="p-3">string</td>
                            <td className="p-3"><span className="required-badge">required</span></td>
                          </tr>
                          <tr className="bg-secondary/30">
                            <td className="p-3 text-blue-400">first_name</td>
                            <td className="p-3">string</td>
                            <td className="p-3"><span className="text-muted-foreground">optional</span></td>
                          </tr>
                          <tr>
                            <td className="p-3 text-blue-400">last_name</td>
                            <td className="p-3">string</td>
                            <td className="p-3"><span className="text-muted-foreground">optional</span></td>
                          </tr>
                          <tr className="bg-secondary/30">
                            <td className="p-3 text-blue-400">email</td>
                            <td className="p-3">string</td>
                            <td className="p-3"><span className="text-muted-foreground">optional</span></td>
                          </tr>
                          <tr>
                            <td className="p-3 text-blue-400">phone_number</td>
                            <td className="p-3">string</td>
                            <td className="p-3"><span className="text-muted-foreground">optional</span></td>
                          </tr>
                          <tr className="bg-secondary/30">
                            <td className="p-3 text-blue-400">hire_date</td>
                            <td className="p-3">string</td>
                            <td className="p-3"><span className="text-muted-foreground">optional</span></td>
                          </tr>
                          <tr>
                            <td className="p-3 text-blue-400">job_title</td>
                            <td className="p-3">string</td>
                            <td className="p-3"><span className="text-muted-foreground">optional</span></td>
                          </tr>
                          <tr className="bg-secondary/30">
                            <td className="p-3 text-blue-400">job_id</td>
                            <td className="p-3">integer</td>
                            <td className="p-3"><span className="text-muted-foreground">optional</span></td>
                          </tr>
                          <tr>
                            <td className="p-3 text-blue-400">department</td>
                            <td className="p-3">string</td>
                            <td className="p-3"><span className="text-muted-foreground">optional</span></td>
                          </tr>
                          <tr className="bg-secondary/30">
                            <td className="p-3 text-blue-400">status</td>
                            <td className="p-3">string</td>
                            <td className="p-3"><span className="text-muted-foreground">optional</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="response-table">
                    <div className="response-table-header">
                      <h4 className="font-medium">Example</h4>
                    </div>
                    <div className="response-table-content h-96 overflow-auto">
                      <pre className="p-4 font-mono text-sm">
                        {JSON.stringify(responseData, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="request-samples bg-background">
        <h2 className="text-xl font-semibold mb-4">Request samples</h2>
        <div className="sample-tabs grid grid-cols-7 md:grid-cols-12 gap-2 mb-4">
          <button 
            className={`sample-tab ${activeLanguage === 'curl' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('curl')}
          >
            <span className="sample-icon text-green-400">⌘</span>
            <span>Shell</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'js' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('js')}
          >
            <span className="sample-icon text-yellow-400">JS</span>
            <span>JavaScript</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'java' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('java')}
          >
            <span className="sample-icon text-orange-400">☕</span>
            <span>Java</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'swift' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('swift')}
          >
            <span className="sample-icon text-orange-400">🔶</span>
            <span>Swift</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'go' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('go')}
          >
            <span className="sample-icon text-blue-400">Go</span>
            <span>Go</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'php' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('php')}
          >
            <span className="sample-icon text-blue-400">PHP</span>
            <span>PHP</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'python' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('python')}
          >
            <span className="sample-icon text-blue-400">🐍</span>
            <span>Python</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'http' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('http')}
          >
            <span className="sample-icon text-blue-400">HTTP</span>
            <span>HTTP</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'c' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('c')}
          >
            <span className="sample-icon text-blue-400">C</span>
            <span>C</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'c#' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('c#')}
          >
            <span className="sample-icon text-green-400">C#</span>
            <span>C#</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'objc' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('objc')}
          >
            <span className="sample-icon text-gray-400">[C]</span>
            <span>Objective-C</span>
          </button>
          <button 
            className={`sample-tab ${activeLanguage === 'ruby' ? 'bg-accent' : ''}`}
            onClick={() => setActiveLanguage('ruby')}
          >
            <span className="sample-icon text-red-400">💎</span>
            <span>Ruby</span>
          </button>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <div className="bg-secondary p-3 flex justify-between items-center">
            <span className="text-sm font-medium">{activeLanguage === 'curl' ? 'Shell' : activeLanguage === 'js' ? 'JavaScript' : activeLanguage === 'c#' ? 'C#' : activeLanguage === 'objc' ? 'Objective-C' : activeLanguage.charAt(0).toUpperCase() + activeLanguage.slice(1)}</span>
            <button 
              className="code-btn flex items-center space-x-1"
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
          <div className="p-4 bg-background max-h-72 overflow-auto">
            <pre className="text-sm font-mono text-muted-foreground">
              {getSampleCode(activeLanguage)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
