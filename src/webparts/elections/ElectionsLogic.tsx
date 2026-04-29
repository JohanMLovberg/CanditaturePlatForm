import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ElectionsFormData, IElectionBody, IElectionPost, IElectionResponsibleLineAuthority } from '../../models/ElectionsModel';
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
			Body: {
				Id: null,
				Name: ""
			},
			Post: {
				Id: null,
				Title: ""
			},
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

	//TODO change to not call mock
	public async getElectionForm(id?: number): Promise<ElectionsFormData> {
		return this.sharePointApi.getElectionFormByIdMock(id);
	}
	//TODO change to not call mock
	public async getBodyList(): Promise<IElectionBody[]> {
		return this.sharePointApi.getBodyListMock();
	}
	//TODO change to not call mock
	public async getElectionPosts(): Promise<IElectionPost[]> {
		return this.sharePointApi.getPostListMock();
	}
	//TODO change to not call mock
	public async getResponsibleLineAuthorities(): Promise<IElectionResponsibleLineAuthority[]> {
		return this.sharePointApi.getResponsibleLineAuthoritiesMock();
	}
}