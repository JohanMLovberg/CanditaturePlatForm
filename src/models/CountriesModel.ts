import { WebPartContext } from "@microsoft/sp-webpart-base";
import { APIResponse } from "./ApiModel";
import { IDropDownData } from "./ConstsModel";

export interface CountriesFormData {
	Name: string;
	Abbreviation: string;
	MajorArea: IDropDownData;
	RegionalGroup: IDropDownData;
	Description: string;
	ResponsibleRepresentations: IResponsibleRepresentation[];
}

export interface SubmitCountriesFormData {
	Name: string;
	Abbreviation: string;
	MajorArea: string;
	RegionalGroup: string;
	Description: string;
	ResponsibleRepresentations: IResponsibleRepresentation[];
}

export interface ICountriesFormProps {
	description: string;
	context: WebPartContext;
}

export interface ICountriesFormState {
	form: CountriesFormData;
	apiMessage?: APIResponse;
	responsibleRepresentations: IResponsibleRepresentation[];
	majorAreas: IDropDownData[];
	regionalGroups: IDropDownData[];
	errors: { [key: string]: string };
	isSubmitting: boolean;
	PopUpWindowCloseButton: boolean;
}

export interface ICountriesViewProps {
	form: CountriesFormData;
	apiMessage?: APIResponse;
	errors: { [key: string]: string };
	responsibleRepresentations: IResponsibleRepresentation[];
	majorAreas: IDropDownData[];
	regionalGroups: IDropDownData[];
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
	onInputChange: (name: string, value: any) => void;
	closePopUpWindow: () => void;
	PopUpWindowCloseButton: boolean;
	isSubmitting: boolean;
}

export interface IResponsibleRepresentation {
	Id: number;
	Name: string;
}