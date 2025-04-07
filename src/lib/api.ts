import axios from 'axios';

// API Configuration
const API_URL = 'https://hrms-api.xpectrum-ai.com';
const API_KEY = 'xpectrum_api_key_123@ai';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
});

// API helper functions for Applications
export const applicationsApi = {
  getAll: async () => {
    const response = await api.get(`/terminsurance/api/v1/applications?api_key=${API_KEY}`);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/terminsurance/api/v1/applications/${id}?api_key=${API_KEY}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post(`/terminsurance/api/v1/applications?api_key=${API_KEY}`, data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/terminsurance/api/v1/applications/${id}?api_key=${API_KEY}`, data);
    return response.data;
  }
};

// API helper functions for Plan Quotes
export const planQuoteApi = {
  getById: async (id: string) => {
    const response = await api.get(`/terminsurance/api/v1/plan_quote/${id}?api_key=${API_KEY}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post(`/terminsurance/api/v1/plan_quote/?api_key=${API_KEY}`, data);
    return response.data;
  }
};

// API helper functions for Policies
export const policiesApi = {
  getById: async (id: string) => {
    const response = await api.get(`/terminsurance/api/v1/policies/${id}?api_key=${API_KEY}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post(`/terminsurance/api/v1/policies/?api_key=${API_KEY}`, data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/terminsurance/api/v1/policies/${id}?api_key=${API_KEY}`, data);
    return response.data;
  }
};

// API helper functions for Riders
export const ridersApi = {
  getById: async (name: string) => {
    const response = await api.get(`/terminsurance/api/v1/riders/${name}?api_key=${API_KEY}`);
    return response.data;
  }
};

// API helper functions for Rider Applications
export const ridersApplicationsApi = {
  getById: async (id: string) => {
    const response = await api.get(`/terminsurance/api/v1/riders_applications/${id}?api_key=${API_KEY}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post(`/terminsurance/api/v1/riders_applications?api_key=${API_KEY}`, data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/terminsurance/api/v1/riders_applications/${id}?api_key=${API_KEY}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/terminsurance/api/v1/riders_applications/${id}?api_key=${API_KEY}`);
    return response.data;
  }
};

// API helper functions for Rider Quotes
export const ridersQuoteApi = {
  getAll: async () => {
    const response = await api.get(`/terminsurance/api/v1/riders_quote?api_key=${API_KEY}`);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/terminsurance/api/v1/riders_quote/${id}?api_key=${API_KEY}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post(`/terminsurance/api/v1/riders_quote?api_key=${API_KEY}`, data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/terminsurance/api/v1/riders_quote/${id}?api_key=${API_KEY}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/terminsurance/api/v1/riders_quote/${id}?api_key=${API_KEY}`);
    return response.data;
  }
};

// API helper functions for Term Life Insurance Plans
export const termLifePlansApi = {
  getAll: async () => {
    const response = await api.get(`/terminsurance/api/v1/term_life_plans?api_key=${API_KEY}`);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/terminsurance/api/v1/term_life_plans/${id}?api_key=${API_KEY}`);
    return response.data;
  }
};

export default {
  applicationsApi,
  planQuoteApi,
  policiesApi,
  ridersApi,
  ridersApplicationsApi,
  ridersQuoteApi,
  termLifePlansApi
}; 
