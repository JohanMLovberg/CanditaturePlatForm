import { RequestOptions } from "../models/ApiModel";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export default class SharePointApiClient {
  private baseUrl: string;
  private context: WebPartContext;

  constructor(context: WebPartContext, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.context = context;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { method = "GET", headers = {}, body } = options;
    const url = `${this.baseUrl}${endpoint}`;

    const spHeaders = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...headers
    };

    const response: SPHttpClientResponse = await this.context.spHttpClient.fetch(
      url,
      SPHttpClient.configurations.v1,
      {
        method,
        headers: spHeaders,
        body: body ? JSON.stringify(body) : undefined
      }
    );

    if (!response.ok) {
      throw new Error(`SharePoint error: ${response.status} - ${response.statusText}`);
    }
  
    const text = await response.text();
    if (!text) {
      return null as any as T;
    }
  
    return JSON.parse(text) as T;
  }

  public get<T = any>(endpoint: string, config?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", ...config });
  }

  public post<T = any>(endpoint: string, data: any, config?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: "POST", body: data, ...config });
  }

  public put<T = any>(endpoint: string, data: any, config?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: "PUT", body: data, ...config });
  }

  public delete<T = any>(endpoint: string, config?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", ...config });
  }
}