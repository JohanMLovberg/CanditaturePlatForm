import BaseApi from "./BaseApi";
import { APIResponse } from "../models/ApiModel";
import { SubmitCountriesFormData, CountriesFormData } from "../models/CountriesModel";
import { sp } from 'sp-pnp-js';
import { mockCountriesBodiesFormData } from "../mock/PreMadeFormData";
import { ICountriesResponsibleRepresentation } from "../models/ConstsModel";
import { mockResponsibleRepresentations } from "../mock/countries/mockResponsibleRepresentations";

export default class CountriesAPI extends BaseApi {
	public async submitCountriesForm(formData: SubmitCountriesFormData): Promise<APIResponse> {
		return this.handleRequest(() =>
			this.candidaturePlatformApiClient.post("/countries/", formData)
		);
	}

	public async editCountriesForm(formData: SubmitCountriesFormData, id: number): Promise<APIResponse> {
		return this.handleRequest(() =>
			this.candidaturePlatformApiClient.put(`/countries/${id}`, formData)
		);
	}

	public async getCountriesFormById(id?: number): Promise<CountriesFormData | null> {
		if (!id) return null;

		try {
			const item = await sp.web.lists
				.getByTitle("Countries")
				.items.getById(id)
				.select(
					"Name",
					"Abbreviation",
					"MajorArea",
					"RegionalGroup",
					"Description",
					"ResponsibleRepresentations/Id",
					"ResponsibleRepresentations/Title"
				)
				.expand(
					"ResponsibleRepresentations"
				)
				.get();

			const countriesForm: CountriesFormData = {
				Name: item.Name,
				Abbreviation: item.Abbreviation,
				MajorArea: item.MajorArea,
				RegionalGroup: item.RegionalGroup,
				Description: item.Description,
				ResponsibleRepresentations: item.ResponsibleRepresentations || []
			};

			return countriesForm;
		} catch (error) {
			console.error("Error fetching contract item:", error);
			return null;
		}
	}

	public async getCountriesFormByIdMock(id?: number): Promise<CountriesFormData> {
		return mockCountriesBodiesFormData;
	}

	public async getResponsibleRepresentations(): Promise<ICountriesResponsibleRepresentation[]> {
		const allLists = await sp.web.lists.select("Title", "Id").get();
		const ResponsibleRepresentationsList = allLists.find(l => l.Title === "ResponsibleRepresentations");
		if (!ResponsibleRepresentationsList) return [];

		let items: ICountriesResponsibleRepresentation[] = await sp.web.lists.getById(ResponsibleRepresentationsList.Id).items.get();
		return items;
	}

	public async getResponsibleRepresentationsMock(): Promise<ICountriesResponsibleRepresentation[]> {
		return mockResponsibleRepresentations;
	}
}