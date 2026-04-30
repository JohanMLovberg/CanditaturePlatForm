import { WebPartContext } from '@microsoft/sp-webpart-base';
import { CountriesFormData } from '../../models/CountriesModel';
import { ICountriesResponsibleRepresentation, IDropDownData } from '../../models/ConstsModel';
import CountriesBaseApi from '../../services/CountriesApi';
import { formatCountriesForm } from '../../utils/formatForm';
import { APIResponse } from '../../models/ApiModel';

export class CountriesFormLogic {
	private sharePointApi: CountriesBaseApi;
	private countriesApi: CountriesBaseApi;

	constructor(context: WebPartContext) {
		this.sharePointApi = new CountriesBaseApi(
			context,
			context.pageContext.web.absoluteUrl
		);

		this.countriesApi = new CountriesBaseApi(
			context,
			"https://devapplicationsws/CountriesServices/api"
		);
	}

	public createEmptyForm(): CountriesFormData {
		return {
			Name: "",
			Abbreviation: "",
			MajorArea: {
				value: "",
				label: ""	
			},
			RegionalGroup: {
				value: "",
				label: ""
			},
			Description: "",
			ResponsibleRepresentations: [],
		};
	}

	public updateFields(
		form: CountriesFormData,
		name: string,
		value: any): CountriesFormData {
		return {
			...form, [name]: value
		};
	}

	public validate(form: CountriesFormData): { [key: string]: string } {
		const errors: { [key: string]: string } = {};

		return errors;
	}

	public async submit(form: CountriesFormData): Promise<APIResponse> {
		const submitForm = formatCountriesForm(form);
		return this.countriesApi.submitCountriesForm(submitForm);
	}

	public async editForm(form: CountriesFormData, id: number): Promise<APIResponse> {
		const submitForm = formatCountriesForm(form);
		return this.countriesApi.editCountriesForm(submitForm, id);
	}

	public async getCountriesFormMock(id?: number): Promise<CountriesFormData> {
		return this.sharePointApi.getCountriesFormByIdMock(id);
	}

	public async getResponsibleRepresentations(): Promise<ICountriesResponsibleRepresentation[]> {
		return this.sharePointApi.getResponsibleRepresentationsMock();
	}
}