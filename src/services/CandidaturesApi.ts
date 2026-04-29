import BaseApi from "./BaseApi";
import { sp } from 'sp-pnp-js';
import { CandidaturesFormData, SubmitCandidaturesFormData } from "../models/CandidaturesModel";
import { ICountry, IElection, ISharePointGroup } from "../models/ConstsModel";
import { mockCountry } from "../mock/Country";
import { mockElection } from "../mock/Election";
import { formatDateTimeForForm } from "../utils/dateUtils";
import { mockCandidaturesFormData } from "../mock/PreMadeFormData";
import { APIResponse } from "../models/ApiModel";
import { YesNoToBoolean } from "../utils/BooleanUtils";
import { mockUserGroups } from "../mock/UserGroups";

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

  public async submitFormCandidatures(formData: SubmitCandidaturesFormData): Promise<APIResponse> {
    return this.handleRequest(() =>
      this.candidaturePlatformApiClient.post("/contracts", formData)
    );
  }

  public async editFormCandidatures(formData: SubmitCandidaturesFormData, id: number): Promise<APIResponse> {
    return this.handleRequest(() =>
      this.candidaturePlatformApiClient.put(`/contracts/${id}`, formData)
    );
  }

  public async getCountryList(): Promise<ICountry[]> {
    const allLists = await sp.web.lists.select("Title", "Id").get();
    const countryList = allLists.find((l: ICountry) => l.Title === "Country");
    if (!countryList) return [];

    let items: ICountry[] = await sp.web.lists.getById(countryList.Id).items.get();
    return items;
  }

  public async getCountryListMock(): Promise<ICountry[]> {
    return mockCountry;
  }

  public async getElectionList(): Promise<IElection[]> {
    const allLists = await sp.web.lists.select("Title", "Id").get();
    const electionList = allLists.find((l: IElection) => l.Title === "Election");
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
          "Title",
          "FullName",
          "CandidaturesStatus",
          "ClearingHouseCategory",
          "AnnouncementDate",
          "VotesReceived",
          "ArchiveId"
        )
        .expand(
          "Country",
          "Election"
        )
        .get();

      const candidaturesForm: CandidaturesFormData = {
        Election: item.Election,
        Country: item.Country,
        PersonSpecificCandidature: YesNoToBoolean(item.PersonSpecificCandidature),
        Title: item.Title,
        FullName: item.FullName,
        CandidatureStatus: item.CandidatureStatus,
        ClearingHouseCategory: item.ClearingHouseCategory,
        AnnouncementDate: formatDateTimeForForm(item.AnnouncementDate) as string,
        VotesReceived: item.VotesReceived,
        ArchiveId: item.ArchiveId
      };

      return candidaturesForm;
    } catch (error) {
      console.error("Error fetching contract item:", error);
      return null;
    }
  }

  public async getCandidaturesFormByIdMock(id?: number): Promise<CandidaturesFormData> {
    const mockdata = await mockCandidaturesFormData;
    mockdata.AnnouncementDate = formatDateTimeForForm(mockdata.AnnouncementDate) as string;
    return mockdata;
  }

  public async getUserGroups(email: string): Promise<ISharePointGroup[]> {
    return mockUserGroups;
    // return await sp.web.siteUsers.getByEmail(email).groups.get();
  }
}