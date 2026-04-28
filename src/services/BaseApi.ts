import { APIResponse } from "../models/ApiModel";
import CandidaturePlatformApiClient from "./CandidaturePlatformApiClient";
import SharePointApiClient from "./SharepointApiClient";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class BaseApi {
  protected candidaturePlatformApiClient: CandidaturePlatformApiClient;
  protected sharePointApiClient: SharePointApiClient;

  constructor(context: WebPartContext, baseUrl: string) {
    this.candidaturePlatformApiClient = new CandidaturePlatformApiClient(baseUrl);
    this.sharePointApiClient = new SharePointApiClient(context, baseUrl);
  }

  protected async handleRequest<T>(
    request: () => Promise<T>
  ): Promise<APIResponse> {
    try {
      const data = await request();
      return {
        success: true,
        message: "Submission successful",
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}