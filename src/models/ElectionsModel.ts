import { WebPartContext } from "@microsoft/sp-webpart-base";
import { APIResponse } from "./ApiModel";
import { IDropDownData } from "./ConstsModel";

export interface ElectionsFormData {
	Body: string;
	Post: string;
	RegionalGroup: string;
	Status: string;
	ElectionDate: string;
	TentativeDate: boolean;
	AnnouncementDeadline: string;
	Seats: number;
	TentativeSeatCount: boolean;
	EligibleForVoteSwaps: boolean;
	DanishVotesInElection: number;
	ResponsibleLineAuthorities: string[];
}

export interface SubmitElectionsFormData {
	Body: string;
	Post: string;
	RegionalGroup: string;
	Status: string;
	ElectionDate: string;
	TentativeDate: boolean;
	AnnouncementDeadline: string;
	Seats: number;
	TentativeSeatCount: boolean;
	EligibleForVoteSwaps: boolean;
	DanishVotesInElection: number;
	ResponsibleLineAuthorities: string | string[];
}

export interface IElectionsFormProps {
	description: string;
	context: WebPartContext;
}

export interface IElectionsFormState {
	form: ElectionsFormData;
	electionBodies: IDropDownData[];
	electionPosts: IDropDownData[];
	electionRegionalGroups: IDropDownData[];
	electionStatuses: IDropDownData[];
	electionTypes: IDropDownData[];
	responsibleLineAuthorities: IDropDownData[];
	apiMessage?: APIResponse;
	errors: { [key: string]: string };
	isSubmitting: boolean;
	PopUpWindowCloseButton: boolean;
}

export interface IElectionViewProps {
	form: ElectionsFormData;
	apiMessage?: APIResponse;
	electionBodies: IDropDownData[];
	electionPosts: IDropDownData[];
	electionRegionalGroups: IDropDownData[];
	electionStatuses: IDropDownData[];
	electionTypes: IDropDownData[];
	responsibleLineAuthorities: IDropDownData[];
	errors: { [key: string]: string };
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
	onInputChange: (name: string, value: any) => void;
	closePopUpWindow: () => void;
	PopUpWindowCloseButton: boolean;
	isSubmitting: boolean;
}

export interface IElectionBody {
  Id: number;
  Name: string;
}

export interface IElectionPost {
  Id: number;
  Title: string;
}

export interface IElectionResponsibleLineAuthority {
  Id: number;
  Name: string;
}