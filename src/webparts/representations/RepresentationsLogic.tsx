import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ICountry } from "../../models/ConstsModel";
import { RepresentationsFormData } from "../../models/RepresentationsModel";
import RepresentationsApi from "../../services/RepresentationsApi";
import { APIResponse } from "../../models/ApiModel";
import { formattingRepresentationsForm } from "../../utils/formatForm";

export class RepresentationsLogic {
  private sharePointApi: RepresentationsApi;
  private representationsApi: RepresentationsApi;

  constructor(context: WebPartContext) {
    this.sharePointApi = new RepresentationsApi(
      context,
      context.pageContext.web.absoluteUrl
    );

    this.representationsApi = new RepresentationsApi(
      context,
      "https://devapplicationsws/RepresentationsServices/api"
    );
  }

  public createEmptyForm(): RepresentationsFormData {
    return {
      Name: "",
      Abbreviation: "",
      Country:
      {
        Id: null,
        Title: ""
      },
      Depricated: false,
      Description: "",
      Mailbox: "",
      PrimaryContact: {
        Id: null,
        Title: "",
        LoginName: "",
        Email: "",
      },
      Kind: "",
    };
  }

  public updateField(
    form: RepresentationsFormData,
    name: string,
    value: any
  ): RepresentationsFormData {

    return { ...form, [name]: value };
  }

  public validate(form: RepresentationsFormData): { [key: string]: string; } {
    const errors: { [key: string]: string } = {};

    if (!form.Name) errors.Name = "Name is required";
    if (!form.Abbreviation) errors.Abbreviation = "Abbreviation is required";
    if (!form.Country || !form.Country.Id) errors.Country = "Country is required";
    if (!form.PrimaryContact || !form.PrimaryContact.Id) errors.PrimaryContact = "PrimaryContact is required";
    if (!form.Kind) errors.Kind = "Kind is required";
    return errors;
  }

  public async submitForm(form: RepresentationsFormData): Promise<APIResponse> {
    const submitForm = formattingRepresentationsForm(form);
    return this.representationsApi.submitFormRepresentations(submitForm);
  }

  public async editForm(form: RepresentationsFormData, id: number): Promise<APIResponse> {
    const submitForm = formattingRepresentationsForm(form);
    return this.representationsApi.editFormRepresentations(submitForm, id);
  }

  public async getUsers(filterText: string): Promise<{
    key: string;
    text: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    optionalText: string;
  }[]> {
    if (!filterText) return [];
    const users = await this.sharePointApi.peoplePicker(filterText);
    return users.map(u => ({
      key: u.Key,
      text: u.DisplayText,
      primaryText: u.DisplayText,
      secondaryText: u.EntityData.Email,
      tertiaryText: u.EntityData.Department,
      optionalText: u.Description,
      id: u.SharePointId
    }));
  }
  
  //TODO change to not call mock
  public async getCountry(): Promise<ICountry[]> {
    return this.sharePointApi.getCountryListMock();
  }

  //TODO change to not call mock
  public async getRepresentationsForm(id?: number): Promise<RepresentationsFormData> {
    return this.sharePointApi.getRepresentationsFormByIdMock(id);
  }
}