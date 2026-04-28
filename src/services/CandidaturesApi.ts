import BaseApi from "./BaseApi";
import { sp} from 'sp-pnp-js';
import { CandidaturesFormData, SubmitCandidaturesFormData } from "../models/CandidaturesModel";
import { ICountry, IElection } from "../models/ConstsModel";
import { mockCountry } from "../mock/Country";
import { mockElection } from "../mock/Election";
import { formatDateTimeForForm } from "../utils/dateUtils";
import { mockCandidaturesFormData } from "../mock/PreMadeFormData";
import { APIResponse } from "../models/ApiModel";

export default class CandidaturesApi extends BaseApi {

  public async submitFormToSharepointCandiatures(formData: SubmitCandidaturesFormData): Promise<APIResponse> {
    const payload = {
      ...formData
    };

    return this.handleRequest(() =>
      this.sharePointApiClient.post("/_api/web/lists/getByTitle('Candidatures')/items", payload)
    );
  }

  public async editFormToSharepointCandiatures(formData: SubmitCandidaturesFormData, id: number): Promise<APIResponse> {
    const payload = {
      ...formData
    };

    return this.handleRequest(() =>
      this.sharePointApiClient.post(
        `/_api/web/lists/getByTitle('Candidatures')/items(${id})`,
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

  public async submitFormCandiatures(formData: SubmitCandidaturesFormData): Promise<APIResponse> {
    return this.handleRequest(() =>
      this.candidaturePlatformApiClient.post("/contracts", formData)
    );
  }

  public async editFormCandiatures(formData: SubmitCandidaturesFormData, id: number): Promise<APIResponse> {
    return this.handleRequest(() =>
      this.candidaturePlatformApiClient.put(`/contracts/${id}`, formData)
    );
  }

  public async getCountryList(): Promise<ICountry[]> {
    const allLists = await sp.web.lists.select("Title", "Id").get();
    const countryList = allLists.find(l => l.Title === "Country");
    if (!countryList) return [];

    let items: ICountry[] = await sp.web.lists.getById(countryList.Id).items.get();
    return items;
  }

  public async getCountryListMock(): Promise<ICountry[]> {
    return mockCountry;
  }

  public async getElectionList(): Promise<IElection[]> {
    const allLists = await sp.web.lists.select("Title", "Id").get();
    const electionList = allLists.find(l => l.Title === "Election");
    if (!electionList) return [];

    let items: IElection[] = await sp.web.lists.getById(electionList.Id).items.get();
    return items;
  }

  public async getElectionListMock(): Promise<IElection[]> {
    return mockElection;
  }

  public async getCandidaturesFormById(id?: number): Promise<CandidaturesFormData | null> {
    if (!id) return null;

    try {
      const item = await sp.web.lists
        .getByTitle("Candidatures")
        .items.getById(id)
        .select(
          "Election/Id",
          "Election/Title",
          "Country/Id",
          "Country/Title",
          "PersonSpecificCandidature",
          "CandidaturesStatus/Id",
          "CandidaturesStatus/Title",
          "ClearingHouseCategory/Id",
          "ClearingHouseCategory/Title",
          "AnnouncementDate",
          "VotesRecived",
          "CandidatureNotes/Title",
          "CandidatureNotes/NoteDate",
          "CandidatureNotes/Modified",
          "CandidatureNotes/ModifiedBy"
        )
        .expand(
          "Election",
          "Country",
          "PersonSpecificCandidature",
          "CandidaturesStatus",
          "ClearingHouseCategory",
          "CandidatureNotes"
        )
        .get();

      const candidaturesForm: CandidaturesFormData = {
        Election: item.Election,
        Country: item.Country,
        PersonSpecificCandidature: item.PersonSpecificCandidature,
        CandidatureStatus: item.CandidatureStatus,
        ClearingHouseCategory: item.ClearingHouseCategory,
        AnnouncementDate: formatDateTimeForForm(item.AnnouncementDate),
        VotesRecived: item.VotesRecived,
        CandidatureNotes: item.CandidatureNotes
      };

      return candidaturesForm;
    } catch (error) {
      console.error("Error fetching contract item:", error);
      return null;
    }
  }

  public async getCandidaturesFormByIdMock(id?: number): Promise<CandidaturesFormData> {
    const mockdata = await mockCandidaturesFormData;
    mockdata.AnnouncementDate = formatDateTimeForForm(mockdata.AnnouncementDate);
    return mockdata;
  }
}