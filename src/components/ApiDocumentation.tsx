
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
  const [headerParamsValues, setHeaderParamsValues] = useState<Record<string, string>>({
    "X-API-KEY": "your_api_key",
    "Content-Type": "application/json",
    "Authorization": "Bearer token"
  });
  const [bodyParamsValues, setBodyParamsValues] = useState<Record<string, string>>({});

  const responseData = {
    "employees": [
      {
        "employee_id": "EMP001",
        "first_name": "John", 
        "last_name": "Smith",
        "email": "john.smith@example.com",
        "phone_number": "+1 123-456-7890",
        "hire_date": "2019-06-15",
        "job_title": "Senior Developer",
        "job_id": 5,
        "hiring_manager_id": "EMP005",
        "hr_manager_id": "EMP010",
        "department": "Engineering",
        "status": "active"
      }
    ],
    "total": 100,
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
    const apiKey = queryParamsValues.api_key || "your_api_key";

    switch (language) {
      case "curl":
        return `curl --location --request ${method} '${apiUrl}' \\
--header 'X-SOURCE: admin' \\
--header 'X-LANG: en' \\
--header 'X-REQUEST-ID: stacktics' \\
--header 'X-DEVICE-ID: stacktics_device' \\
--header 'x-api-key: ${apiKey}' \\
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
    <div className="p-6 max-w-7xl mx-auto bg-background text-foreground">
      {/* API Header Section */}
      <div className="mb-8">
        <div className="flex flex-col mb-2">
          <span className="text-muted-foreground uppercase text-sm">EMPLOYEE</span>
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
        
        {/* Header Parameters */}
        {headerParams && headerParams.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Header Params</h3>
            <div className="flex justify-end mb-2">
              <Button variant="outline" size="sm" className="text-xs">
                Generate Code
              </Button>
            </div>
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
                {headerParams.map((param, index) => (
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
                        value={headerParamsValues[param.name] || ''}
                        onChange={(e) => handleHeaderParamChange(param.name, e.target.value)}
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
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'java' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('java')}
            >
              <span className="bg-gray-700 text-orange-400 px-1">J</span>
              <span>Java</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'swift' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('swift')}
            >
              <span className="bg-gray-700 text-red-400 px-1">S</span>
              <span>Swift</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'go' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('go')}
            >
              <span className="bg-gray-700 text-blue-400 px-1">Go</span>
              <span>Go</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'php' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('php')}
            >
              <span className="bg-gray-700 text-purple-400 px-1">P</span>
              <span>PHP</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'python' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('python')}
            >
              <span className="bg-gray-700 text-blue-400 px-1">Py</span>
              <span>Python</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'http' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('http')}
            >
              <span className="bg-gray-700 text-gray-400 px-1">{}</span>
              <span>HTTP</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'c' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('c')}
            >
              <span className="bg-gray-700 text-gray-400 px-1">C</span>
              <span>C</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'c#' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('c#')}
            >
              <span className="bg-gray-700 text-green-400 px-1">C#</span>
              <span>C#</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'objc' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('objc')}
            >
              <span className="bg-gray-700 text-gray-400 px-1">[C]</span>
              <span>Objective-C</span>
            </button>
            <button 
              className={`px-4 py-1 rounded text-xs flex items-center gap-1 ${activeLanguage === 'ruby' ? 'bg-primary/20 border border-primary/50' : 'bg-secondary/50'}`}
              onClick={() => setActiveLanguage('ruby')}
            >
              <span className="bg-gray-700 text-red-400 px-1">R</span>
              <span>Ruby</span>
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
        <h2 className="text-2xl font-bold mb-6">Responses</h2>
        
        <div className="border rounded-md overflow-hidden mb-6">
          <div 
            className="flex justify-between items-center p-3 cursor-pointer bg-secondary/80"
            onClick={() => setIsResponseCollapsed(!isResponseCollapsed)}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="font-medium">200</span>
              <span className="text-muted-foreground">Success</span>
            </div>
            <button>
              {isResponseCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>
          
          {!isResponseCollapsed && (
            <div className="p-4 bg-secondary/10">
              <div className="bg-[#1E1E28] rounded-md p-3 mb-4">
                <span className="px-3 py-1 rounded text-xs bg-secondary/80">application/json</span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="border rounded-md overflow-hidden">
                  <div className="p-3 bg-secondary/50 font-medium">
                    application/json
                  </div>
                  <div className="h-96 overflow-auto">
                    <Table>
                      <TableHeader className="bg-secondary/30">
                        <TableRow>
                          <TableHead>Field</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Required</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-blue-400">employee_id</TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded text-xs">required</span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-secondary/30">
                          <TableCell className="text-blue-400">first_name</TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">optional</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-blue-400">last_name</TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">optional</span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-secondary/30">
                          <TableCell className="text-blue-400">email</TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">optional</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-blue-400">phone_number</TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">optional</span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-secondary/30">
                          <TableCell className="text-blue-400">hire_date</TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">optional</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-blue-400">job_title</TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">optional</span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-secondary/30">
                          <TableCell className="text-blue-400">job_id</TableCell>
                          <TableCell>integer</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">optional</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-blue-400">department</TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">optional</span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-secondary/30">
                          <TableCell className="text-blue-400">status</TableCell>
                          <TableCell>string</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">optional</span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="p-3 bg-secondary/50 font-medium">
                    Example
                  </div>
                  <div className="h-96 overflow-auto bg-[#1E1E28] text-gray-300 p-4 font-mono text-sm">
                    <pre>
                      {JSON.stringify(responseData, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <div className="flex justify-between items-center p-3 cursor-pointer bg-secondary/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="font-medium">400</span>
              <span className="text-muted-foreground">Bad Request</span>
            </div>
            <button>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
