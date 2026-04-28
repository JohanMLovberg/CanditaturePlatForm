import { RequestOptions } from "../models/ApiModel";

export default class CandidaturePlatformApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      retries = method === 'GET' ? 2 : 0,
      retryDelay = 500
    } = options;

    const url = `${this.baseUrl}${endpoint}`;
    let attempt = 0;

    while (true) {
      try {
        const response = await fetch(url, {
          method,
          credentials: "include",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...headers
          },
          body: body ? JSON.stringify(body) : undefined
        });

        if (!response.ok) {
          if (response.status >= 500 && attempt < retries) {
            await this.delay(retryDelay * Math.pow(2, attempt));
            attempt++;
            continue;
          }
          throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        if (attempt < retries) {
          await this.delay(retryDelay * Math.pow(2, attempt));
          attempt++;
          continue;
        }
        throw error;
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public get<T = any>(endpoint: string, config?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...config });
  }

  public post<T = any>(endpoint: string, data: any, config?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data, ...config });
  }

  public put<T = any>(endpoint: string, data: any, config?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body: data, ...config });
  }

  public delete<T = any>(endpoint: string, config?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...config });
  }
}