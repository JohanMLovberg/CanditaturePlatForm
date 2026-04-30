import { WebPartContext } from "@microsoft/sp-webpart-base";
import ElectionBodiesApi from "../../services/ElectionBodiesApi";
import { ElectionBodiesFormData, IResponsibleRepresentations } from "../../models/ElectionBodiesModel";
import { APIResponse } from "../../models/ApiModel";
import { formattingElectionBodiesForm } from "../../utils/formatForm";

export class ElectionBodiesLogic {

  private sharePointApi: ElectionBodiesApi;
  private representationsApi: ElectionBodiesApi;

  constructor(context: WebPartContext) {
    this.sharePointApi = new ElectionBodiesApi(
      context,
      context.pageContext.web.absoluteUrl
    );

    this.representationsApi = new ElectionBodiesApi(
      context,
      "https://devapplicationsws/RepresentationsServices/api"
    );
  }

  public createEmptyForm(): ElectionBodiesFormData {
    return {
      Name: "",
      Abbreviation: "",
      Information: "",
      ResponsibleRepresentations: [],
      Depricated: false,
      JournalPlanCode: "",
    };
  }

  public updateField(
    form: ElectionBodiesFormData,
    name: string,
    value: any
  ): ElectionBodiesFormData {

    return { ...form, [name]: value };
  }

  public validate(form: ElectionBodiesFormData): { [key: string]: string; } {
    const errors: { [key: string]: string } = {};

    if (!form.Name) errors.Name = "Name is required";
    if (!form.Abbreviation) errors.Abbreviation = "Abbreviation is required";
    if (!form.JournalPlanCode) errors.JournalPlanCode = "Journal Plan Code is required";
    return errors;
  }

  public async submitForm(form: ElectionBodiesFormData): Promise<APIResponse> {
    const submitForm = formattingElectionBodiesForm(form);
    return this.representationsApi.submitFormElectionBodies(submitForm);
  }

  public async editForm(form: ElectionBodiesFormData, id: number): Promise<APIResponse> {
    const submitForm = formattingElectionBodiesForm(form);
    return this.representationsApi.editFormElectionBodies(submitForm, id);
  }

	//TODO change to not call mock
  public async getElectionBodiesForm(id?: number): Promise<ElectionBodiesFormData> {
    return this.sharePointApi.getElectionBodiesFormByIdMock(id);
  }

	//TODO change to not call mock
	public async getResponsibleRepresentations(): Promise<IResponsibleRepresentations[]> {
		return this.sharePointApi.getResponsibleRepresentationsListMock();
	}

}