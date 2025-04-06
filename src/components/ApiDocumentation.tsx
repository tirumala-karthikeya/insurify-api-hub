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
        if (endpoint.includes("applications")) {
          // Applications example
          return JSON.stringify({
            "application_id": "AP38211",
            "applicant_id": "PH5533",
            "plan_name": "Professional Shield",
            "plan_id": "TL003",
            "quote_id": "QU3616",
            "first_name": "Subhankar",
            "last_name": "Ghosh",
            "email_id": "iisubho1@gmail.com",
            "age": 55,
            "coverage_amount": 5000000,
            "quoted_monthly_premium": ["3960"],
            "term_length": 10,
            "application_date": "2025-01-21",
            "application_time": "02:21:53.425121",
            "status": "approved",
            "riders": [
              "{'rider_application_id': 'AP2571', 'rider_applicant_id': 'RH6196', 'rider_name': 'Disability Insurance Rider', 'rider_id': 'DI001', 'rider_quote_id': 'QU3128', 'premium': 158.4, 'frequency': 'monthly', 'application_date': '2025-01-21', 'application_time': '02:21:59.432586', 'status': 'approved', 'quote_details': [{'age': 55, 'occupation': 'others', 'income': 75000, 'benefit_percentage': 60, 'waiting_period': 12, 'health_condition': 'Good', 'geographical_location': 'rural', 'smoking_status': 'non-smoker', 'premium': 158.4, 'frequency': 'monthly'}]}"
            ],
            "beneficiary": {
              "DOB": "11-30-1995",
              "id_number": "12354",
              "last_name": "Sar",
              "first_name": "San",
              "relationship": "spouse"
            },
            "approved_details": [
              "{'approved_date': '2025-01-21', 'approved_time': '02:23:03', 'approved_by': 'Ramar John'}"
            ],
            "quote_details": null,
            "premium": null,
            "frequency": null
          }, null, 2);
        } else if (endpoint.includes("quotes")) {
          // Quotes example
          return JSON.stringify({
            "quote_id": "QU361665",
            "plan_name": "Professional Shield",
            "plan_id": "TL003",
            "age": 55,
            "health_condition": "Good",
            "smoking_status": "non-smoker",
            "occupation": "others",
            "coverage_amount": 5000000,
            "term_length": 10,
            "monthly_premium": ["3960"],
            "plan": {
              "id": "TL003",
              "name": "Professional Shield",
              "features": {
                "policy_type": "Professional Term",
                "grace_period": 60,
                "tax_benefits": true,
                "payment_methods": [
                  "Bank Transfer",
                  "Online Payment",
                  "Corporate Payroll Deduction"
                ],
                "digital_services": {
                  "claim_intimation": true,
                  "policy_management": true,
                  "professional_risk_assessment": true
                },
                "nomination_process": [
                  "Online",
                  "Branch",
                  "Corporate Liaison"
                ]
              },
              "age_range": {
                "maximum_entry_age": 55,
                "minimum_entry_age": 25,
                "maximum_maturity_age": 70
              },
              "description": "A specialized term life insurance plan tailored for high-earning professionals",
              "available_riders": [
                "Disability Insurance Rider",
                "Critical Illness Rider"
              ]
            }
          }, null, 2);
        } 
        else if (endpoint.includes("riders_applications")) {
          // Riders applications example
          return JSON.stringify({
            "rider_application_id": "AP38554",
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
              {
                "age": 40,
                "health_condition": "Good",
                "smoking_status": "non-smoker",
                "occupation": "construction",
                "base_policy_premium": 200,
                "premium": 27.0,
                "waiting_period_in_months": 12,
                "geographical_location": "rural"
              }
            ]
          }, null, 2);
        } else if (endpoint.includes("riders_quote")) {
          // Riders quote example
          return JSON.stringify({
            "rider_quote_id": "QU65355",
            "rider_id": "CI001",
            "rider_name": "Critical Illness Rider",
            "details": [
              {
                "age": 55,
                "health_condition": "Good",
                "smoking_status": "non-smoker",
                "additional_coverage": 100000,
                "geographical_location": "rural",
                "premium": 480.0
              }
            ],
            "premium": "480.00"
          }, null, 2);
        } else {
          // For other endpoints or fallback, create from parameters
          currentEndpoint.bodyParams.forEach(param => {
            if (param.name === "application_id") exampleBody[param.name] = "AP38211";
            else if (param.name === "applicant_id") exampleBody[param.name] = "PH5533";
            else if (param.name === "first_name") exampleBody[param.name] = "Subhankar";
            else if (param.name === "last_name") exampleBody[param.name] = "Ghosh";
            else if (param.name === "email_id") exampleBody[param.name] = "iisubho1@gmail.com";
            else if (param.name === "age") exampleBody[param.name] = 55;
            else if (param.name === "coverage_amount") exampleBody[param.name] = 5000000;
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
  const [headerParamsValues, setHeaderParamsValues] = useState<Record<string, string>>({
    "X-API-KEY": "xpectrum_api_key_123@ai",
    "Content-Type": "application/json",
    "Authorization": "Bearer token"
  });

  // Use the actual response example from the API data
  const responseData = currentEndpoint?.responseExample || (() => {
    // Generate appropriate response examples based on endpoint
    if (endpoint.includes("applications")) {
      return {
        "application_id": "AP38211",
        "applicant_id": "PH5533",
        "first_name": "Subhankar",
        "last_name": "Ghosh",
        "status": "approved"
      };
    } else if (endpoint.includes("quotes")) {
      return {
        "quote_id": "QU361665",
        "plan_name": "Professional Shield",
        "monthly_premium": ["3960"]
      };
    } else if (endpoint.includes("riders")) {
      return {
        "rider_id": "CI001",
        "rider_name": "Critical Illness Rider"
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

  const handleHeaderParamChange = (name: string, value: string) => {
    setHeaderParamsValues(prev => ({ ...prev, [name]: value }));
  };

  const getSampleCode = (language: string) => {
    const apiUrl = `${baseUrl}${path}`;
    const apiKey = (queryParamsValues.api_key || "xpectrum_api_key_123@ai");

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
    "X-SOURCE": "admin",
    "X-LANG": "en",
    "X-REQUEST-ID": "stacktics",
    "X-DEVICE-ID": "stacktics_device",
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
  "X-SOURCE": "admin",
  "X-LANG": "en",
  "X-REQUEST-ID": "stacktics",
  "X-DEVICE-ID": "stacktics_device",
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
      .header("X-SOURCE", "admin")
      .header("X-LANG", "en")
      .header("X-REQUEST-ID", "stacktics")
      .header("X-DEVICE-ID", "stacktics_device")
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

      case "swift":
        return `import Foundation

let url = URL(string: "${apiUrl}")!
var request = URLRequest(url: url)
request.httpMethod = "${method}"
request.addValue("admin", forHTTPHeaderField: "X-SOURCE")
request.addValue("en", forHTTPHeaderField: "X-LANG")
request.addValue("stacktics", forHTTPHeaderField: "X-REQUEST-ID")
request.addValue("stacktics_device", forHTTPHeaderField: "X-DEVICE-ID")
request.addValue("${apiKey}", forHTTPHeaderField: "x-api-key")
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
  
  req.Header.Add("X-SOURCE", "admin")
  req.Header.Add("X-LANG", "en")
  req.Header.Add("X-REQUEST-ID", "stacktics")
  req.Header.Add("X-DEVICE-ID", "stacktics_device")
  req.Header.Add("x-api-key", "${apiKey}")
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
    "X-SOURCE: admin",
    "X-LANG: en",
    "X-REQUEST-ID": "stacktics",
    "X-DEVICE-ID": "stacktics_device",
    "x-api-key": "${apiKey}",
    "Content-Type": "application/json"
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
      client.DefaultRequestHeaders.Add("X-SOURCE", "admin");
      client.DefaultRequestHeaders.Add("X-LANG", "en");
      client.DefaultRequestHeaders.Add("X-REQUEST-ID", "stacktics");
      client.DefaultRequestHeaders.Add("X-DEVICE-ID", "stacktics_device");
      client.DefaultRequestHeaders.Add("x-api-key", "${apiKey}");
      
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

[request setValue:@"admin" forHTTPHeaderField:@"X-SOURCE"];
[request setValue:@"en" forHTTPHeaderField:@"X-LANG"];
[request setValue:@"stacktics" forHTTPHeaderField:@"X-REQUEST-ID"];
[request setValue:@"stacktics_device" forHTTPHeaderField:@"X-DEVICE-ID"];
[request setValue:@"${apiKey}" forHTTPHeaderField:@"x-api-key"];
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
request['X-SOURCE'] = 'admin'
request['X-LANG'] = 'en'
request['X-REQUEST-ID'] = 'stacktics'
request['X-DEVICE-ID'] = 'stacktics_device'
request['x-api-key'] = '${apiKey}'
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
    headers = curl_slist_append(headers, "X-SOURCE: admin");
    headers = curl_slist_append(headers, "X-LANG: en");
    headers = curl_slist_append(headers, "X-REQUEST-ID: stacktics");
    headers = curl_slist_append(headers, "X-DEVICE-ID: stacktics_device");
    headers = curl_slist_append(headers, "x-api-key": "${apiKey}");
    headers = curl_slist_append(headers, "Content-Type": "application/json");
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
X-SOURCE: admin
X-LANG: en
X-REQUEST-ID: stacktics
X-DEVICE-ID: stacktics_device
x-api-key: ${apiKey}
Content-Type: application/json
${method === "POST" || method === "PUT" ? `

${requestBody}` : ""}`;

      default:
        return "Select a language to see code examples";
    }
  };

  // Function to get all field properties for the response
  const getResponseFields = () => {
    if (!currentEndpoint || !currentEndpoint.responseExample) return [];
    
    const fields = [];
    const extractFields = (obj: any, prefix = '') => {
      if (typeof obj !== 'object' || obj === null) return;
      
      Object.entries(obj).forEach(([key, value]) => {
        const fieldPath = prefix ? `${prefix}.${key}` : key;
        
        // Determine if field is required
        const isRequired = 
          key === 'application_id' || 
          key === 'policy_id' || 
          key === 'quote_id' || 
          key === 'rider_id' ||
          key === 'rider_application_id' ||
          key === 'rider_quote_id';
        
        if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === 'object') {
            // Handle array of objects
            fields.push({
              field: fieldPath,
              type: 'array of objects',
              required: isRequired
            });
            extractFields(value[0], `${fieldPath}[0]`);
          } else {
            // Handle array of primitives
            fields.push({
              field: fieldPath,
              type: `array of ${value.length > 0 ? typeof value[0] : 'any'}`,
              required: isRequired
            });
          }
        } else if (typeof value === 'object' && value !== null) {
          // Handle nested object
          fields.push({
            field: fieldPath,
            type: 'object',
            required: isRequired
          });
          extractFields(value, fieldPath);
        } else {
          // Handle primitive values
          fields.push({
            field: fieldPath,
            type: typeof value,
            required: isRequired
          });
        }
      });
    };
    
    extractFields(currentEndpoint.responseExample);
    return fields;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-background text-foreground">
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
                        value={headerParamsValues[param.name] || param.example || ''}
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
                readOnly
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
        <h2 className="text-2xl font-bold mb-6">Response</h2>
        <div className="border rounded-md overflow-hidden">
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
        </div>
      </div>
    </div>
  );
}
