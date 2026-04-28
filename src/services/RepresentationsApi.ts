import { mockCountry } from "../mock/Country";
import { SPpeople } from "../mock/people";
import { mockRepresentationsFormData } from "../mock/PreMadeFormData";
import { APIResponse } from "../models/ApiModel";
import { ICountry } from "../models/ConstsModel";
import { RepresentationsFormData, SubmitRepresentationsFormData } from "../models/RepresentationsModel";
import BaseApi from "./BaseApi";
import { PeoplePickerEntity, sp, PeoplePickerEntityData } from 'sp-pnp-js';

export default class RepresentationsApi extends BaseApi {

  public async submitFormToSharepointRepresentations(formData: SubmitRepresentationsFormData): Promise<APIResponse> {
    const payload = {
      ...formData
    };

    return this.handleRequest(() =>
      this.sharePointApiClient.post("/_api/web/lists/getByTitle('Representations')/items", payload)
    );
  }

  public async editFormToSharepointRepresentations(formData: SubmitRepresentationsFormData, id: number): Promise<APIResponse> {
    const payload = {
      ...formData
    };

    return this.handleRequest(() =>
      this.sharePointApiClient.post(
        `/_api/web/lists/getByTitle('Representations')/items(${id})`,
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

  public async submitFormRepresentations(formData: SubmitRepresentationsFormData): Promise<APIResponse> {
    return this.handleRequest(() =>
      this.candidaturePlatformApiClient.post("/contracts", formData)
    );
  }

  public async editFormRepresentations(formData: SubmitRepresentationsFormData, id: number): Promise<APIResponse> {
    return this.handleRequest(() =>
      this.candidaturePlatformApiClient.put(`/contracts/${id}`, formData)
    );
  }

  public async peoplePicker(inputString: string) {
    const users = await sp.profiles.clientPeoplePickerSearchUser({
      QueryString: inputString,
      MaximumEntitySuggestions: 5
    });

    const usersWithId = await Promise.all(users.map(async user => {
      const spUser = await sp.web.ensureUser(user.Key);
      return {
        ...user,
        SharePointId: spUser.data.Id
      };
    }));
    return usersWithId;
  }

  public async peoplePickerMock(inputString: string): Promise<PeoplePickerEntity[]> {
    return new Promise<PeoplePickerEntity[]>((resolve) => {
      const filtered = SPpeople
        .filter(p => p.DisplayText.toLowerCase().indexOf(inputString.toLowerCase()) !== -1)
        .slice(0, 5)
        .map<PeoplePickerEntity>(p => ({
          Key: p.Key,
          DisplayText: p.DisplayText,
          Description: p.Key,
          EntityType: "User",
          IsResolved: true,
          MultipleMatches: [],
          ProviderDisplayName: "User",
          ProviderName: "SP",
          EntityData: {
            Title: p.EntityData.Title,
            Department: p.EntityData.Department,
            Email: p.EntityData.Email
          } as PeoplePickerEntityData
        }));

      resolve(filtered);
    });
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

  public async getRepresentationsFormById(id?: number): Promise<RepresentationsFormData | null> {
    if (!id) return null;

    try {
      const item = await sp.web.lists
        .getByTitle("Representations")
        .items.getById(id)
        .select(
          "Name",
          "Abbreviation",
          "Country/Id",
          "Country/Title",
          "Depricated",
          "Description",
          "Mailbox",
          "PrimaryContact",
          "Kind"
        )
        .expand(
          "Country",
        )
        .get();

      const representationsForm: RepresentationsFormData = {
        Name: item.Name,
        Abbreviation: item.Abbreviation,
        Country: item.Country,
        Depricated: item.Depricated,
        Description: item.Description,
        Mailbox: item.Mailbox,
        PrimaryContact: item.PrimaryContact,
        Kind: item.Kind
      };

      return representationsForm;
    } catch (error) {
      console.error("Error fetching contract item:", error);
      return null;
    }
  }

  public async getRepresentationsFormByIdMock(id?: number): Promise<RepresentationsFormData> {
    const mockdata = await mockRepresentationsFormData;
    return mockdata;
  }

}