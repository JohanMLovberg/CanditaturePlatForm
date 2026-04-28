import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ElectionsFormData } from '../../models/ElectionsModel';
import { IDropDownData } from '../../models/ConstsModel';
import electionsBaseApi from '../../services/ElectionsApi';
import { formatElectionsForm } from '../../utils/formatForm';
import { APIResponse } from '../../models/ApiModel';

export class ElectionFormLogic {
	private sharePointApi: electionsBaseApi;
	private representationsApi: electionsBaseApi;

	constructor(context: WebPartContext) {
		this.sharePointApi = new electionsBaseApi(
			context,
			context.pageContext.web.absoluteUrl
		);

		this.representationsApi = new electionsBaseApi(
			context,
			"https://devapplicationsws/RepresentationsServices/api"
		);
	}

	public createEmptyForm(): ElectionsFormData {
		return {
			Body: "",
			Post: "",
			RegionalGroup: "",
			Status: "",
			ElectionDate: "",
			TentativeDate: false,
			AnnouncementDeadline: "",
			Seats: 0,
			TentativeSeatCount: false,
			EligibleForVoteSwaps: false,
			DanishVotesInElection: 0,
			ResponsibleLineAuthorities: []
		};
	}

	public updateFields(
		form: ElectionsFormData,
		name: string,
		value: any): ElectionsFormData {
		return {
			...form, [name]: value
		};
	}

	public validate(form: ElectionsFormData): { [key: string]: string } {
		const errors: { [key: string]: string } = {};

		if (!form.Body) errors.body = "Body is a required field";
		if (!form.Status) errors.status = "Election status is a required field";
		if (!form.Seats || form.Seats <= 0) errors.seats = "Seats is a required field";
		if (!form.ResponsibleLineAuthorities || form.ResponsibleLineAuthorities.length <= 0) {
			errors.responsibleLineAuthority = "A responsible line authority is required";
		}

		return errors;
	}

	public async submit(form: ElectionsFormData): Promise<APIResponse> {
		const submitForm = formatElectionsForm(form);
		return this.representationsApi.submitElectionsForm(submitForm);
	}

	public async editForm(form: ElectionsFormData, id: number): Promise<APIResponse> {
		const submitForm = formatElectionsForm(form);
		return this.representationsApi.editElectionForm(submitForm, id);
	}

	public async getElectionFormMock(id?: number): Promise<ElectionsFormData> {
		return this.sharePointApi.getElectionFormByIdMock(id);
	}

	public async getElectionTypes(): Promise<IDropDownData[]> {
		return this.sharePointApi.getElectionTypesMock();
	}

	public async getElectionBodies(): Promise<IDropDownData[]> {
		return this.sharePointApi.getElectionBodiesMock();
	}

	public async getElectionPosts(): Promise<IDropDownData[]> {
		return this.sharePointApi.getElectionPostsMock();
	}

	public async getElectionRegionalGroups(): Promise<IDropDownData[]> {
		return this.sharePointApi.getElectionRegionalGroupsMock();
	}

	public async getElectionStatuses(): Promise<IDropDownData[]> {
		return this.sharePointApi.getElectionStatusesMock();
	}

	public async getResponsibleLineAuthorities(): Promise<IDropDownData[]> {
		return this.sharePointApi.getResponsibleLineAuthoritiesMock();
	}
}