import { WebPartContext } from "@microsoft/sp-webpart-base";
import { CandidaturesFormData } from "../../models/CandidaturesModel";
import { ICountry, IElection, ISharePointGroup } from "../../models/ConstsModel";
import CandidaturesApi from "../../services/CandidaturesApi";
import { APIResponse } from "../../models/ApiModel";
import { formattingCandidaturesForm } from "../../utils/formatForm";

export class CandidaturesLogic {
  private sharePointApi: CandidaturesApi;
  private candidaturesBaseApi: CandidaturesApi;

  constructor(context: WebPartContext) {
    this.sharePointApi = new CandidaturesApi(
      context,
      context.pageContext.web.absoluteUrl
    );

    this.candidaturesBaseApi = new CandidaturesApi(
      context,
      "https://devapplicationsws/CandidaturesServices/api"
    );
  }

  public createEmptyForm(): CandidaturesFormData {
    return {
      Election:
      {
        Id: -1,
        Title: ""
      },
      Country:
      {
        Id: -1,
        Title: ""
      },
      PersonSpecificCandidature: false,
      Title: "",
      FullName: "",
      CandidatureStatus: "",
      ClearingHouseCategory: "",
      AnnouncementDate: "",
      VotesReceived: undefined,
      ArchiveId: ""
    };
  }

  public updateField(
    form: CandidaturesFormData,
    name: string,
    value: any
  ): CandidaturesFormData {

    return { ...form, [name]: value };
  }

  public validate(form: CandidaturesFormData): { [key: string]: string; } {
    const errors: { [key: string]: string } = {};

    if (!form.Country || !form.Country.Id) errors.Country = "Country is required";
    if (!form.CandidatureStatus) errors.CandidatureStatus = "Candidature Status is required";

    if (form.PersonSpecificCandidature) {
      if (!form.Title) errors.Title = "Title is required"
      if (!form.FullName) errors.FullName = "FullName is required"
    }

    if (form.AnnouncementDate) {
      const selectedDate = new Date(form.AnnouncementDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.AnnouncementDate = "Announcement date must be today or later";
      }
    }

    return errors;
  }

  public async submitForm(form: CandidaturesFormData): Promise<APIResponse> {
    const submitForm = formattingCandidaturesForm(form);
    return this.candidaturesBaseApi.submitFormCandidatures(submitForm);
  }

  public async editForm(form: CandidaturesFormData, id: number): Promise<APIResponse> {
    const submitForm = formattingCandidaturesForm(form);
    return this.candidaturesBaseApi.editFormCandidatures(submitForm, id);
  }

  public async getCandidaturesForm(id?: number): Promise<CandidaturesFormData> {
    return this.sharePointApi.getCandidaturesFormByIdMock(id);
  }

  public async getCountry(): Promise<ICountry[]> {
    return this.sharePointApi.getCountryListMock();
  }

  public async getElection(): Promise<IElection[]> {
    return this.sharePointApi.getElectionListMock();
  }

  public async getUserGroups(email: string): Promise<ISharePointGroup[]> {
    return this.sharePointApi.getUserGroups(email);
  }
}