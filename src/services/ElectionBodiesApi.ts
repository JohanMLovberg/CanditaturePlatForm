import { mockResponsibleRepresentations } from "../mock/electionBodies/mockResponsibleRepresentations";
import { mockElectionBodiesFormData } from "../mock/PreMadeFormData";
import { APIResponse } from "../models/ApiModel";
import { ElectionBodiesFormData, IResponsibleRepresentations, SubmitElectionBodiesFormData } from "../models/ElectionBodiesModel";
import BaseApi from "./BaseApi";
import { sp } from 'sp-pnp-js';

export default class ElectionBodiesApi extends BaseApi {

  public async submitFormToSharepointElectionBodies(formData: SubmitElectionBodiesFormData): Promise<APIResponse> {
    const payload = {
      ...formData
    };

    return this.handleRequest(() =>
      this.sharePointApiClient.post("/_api/web/lists/getByTitle('ElectionBodies')/items", payload)
    );
  }

  public async editFormToSharepointElectionBodies(formData: SubmitElectionBodiesFormData, id: number): Promise<APIResponse> {
    const payload = {
      ...formData
    };

    return this.handleRequest(() =>
      this.sharePointApiClient.post(
        `/_api/web/lists/getByTitle('ElectionBodies')/items(${id})`,
        payload,
        {
          headers: {
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*"
          }
        }
      )
    );
  }

  public async submitFormElectionBodies(formData: SubmitElectionBodiesFormData): Promise<APIResponse> {
    return this.handleRequest(() =>
      this.candidaturePlatformApiClient.post("/contracts", formData)
    );
  }

  public async editFormElectionBodies(formData: SubmitElectionBodiesFormData, id: number): Promise<APIResponse> {
    return this.handleRequest(() =>
      this.candidaturePlatformApiClient.put(`/contracts/${id}`, formData)
    );
  }

  public async getElectionBodiesFormById(id?: number): Promise<ElectionBodiesFormData | null> {
    if (!id) return null;

    try {
      const item = await sp.web.lists
        .getByTitle("ElectionBodies")
        .items.getById(id)
        .select(
          "Title",
          "Abbreviation",
          "Information",
          "ResponsibleRepresentations/Id",
          "ResponsibleRepresentations/Name",
          "Depricated",
          "JournalPlan",
        )
        //TODO
				//Use Internal name or the column name
        .expand("ResponsibleRepresentations")
        .get();

      const representationsForm: ElectionBodiesFormData = {
        Name: item.Name,
        Abbreviation: item.Abbreviation,
        Information: item.Information,
        ResponsibleRepresentations: item.ResponsibleRepresentations,
        Depricated: item.Depricated,
        JournalPlanCode: item.JournalPlanCode,
      };

      return representationsForm;
    } catch (error) {
      console.error("Error fetching contract item:", error);
      return null;
    }
  }

  public async getElectionBodiesFormByIdMock(id?: number): Promise<ElectionBodiesFormData> {
    const mockdata = await mockElectionBodiesFormData;
    return mockdata;
  }

  public async getResponsibleRepresentationsList(): Promise<IResponsibleRepresentations[]> {
    const allLists = await sp.web.lists.select("Name", "Id").get();
    const responsibleRepresentationsList = allLists.find(l => l.Title === "ResponsibleRepresentations");
    if (!responsibleRepresentationsList) return [];

    let items: IResponsibleRepresentations[] = await sp.web.lists.getById(responsibleRepresentationsList.Id).items.get();
    return items;
  }

  public async getResponsibleRepresentationsListMock(): Promise<IResponsibleRepresentations[]> {
    return mockResponsibleRepresentations;
  }

}