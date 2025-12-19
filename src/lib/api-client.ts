
import { IApiResponse } from "@/types/api";

async function fetcher<T>(
  url: string,
  options: RequestInit = {}
): Promise<IApiResponse<T>> {
  try {

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return { data: null, successful: true, error: null };
    }

    const result: IApiResponse<T> = await response.json();
    return result;
  } catch (error) {
    console.error("API error:", error);
    return {
      data: null,
      successful: false,
      error: { 
        message: error instanceof Error ? error.message : "Unknown error" 
      },
    };
  }
}

export const api = {
  get: <T>(url: string, options?: RequestInit) => 
    fetcher<T>(url, { ...options, method: "GET" }),
    
  post: <TResponse, TBody>(url: string, body: TBody, options?: RequestInit) => 
    fetcher<TResponse>(url, { 
      ...options, 
      method: "POST", 
      body: JSON.stringify(body) 
    }),

  put: <TResponse, TBody>(url: string, body: TBody, options?: RequestInit) => 
    fetcher<TResponse>(url, { 
      ...options, 
      method: "PUT", 
      body: JSON.stringify(body) 
    }),

  delete: <TResponse>(url: string, options?: RequestInit) => 
    fetcher<TResponse>(url, { ...options, method: "DELETE" }),
};