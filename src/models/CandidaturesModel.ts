import { WebPartContext } from "@microsoft/sp-webpart-base";
import { APIResponse } from "./ApiModel";
import { ICountry, IElection, ISharePointGroup } from "./ConstsModel";

export interface ICandidaturesFormProps {
  description: string;
  context: WebPartContext;
}

export interface ICandidaturesFormState {
  form: CandidaturesFormData;
  errors: { [key: string]: string };
  isSubmitting: boolean;
  PopUpWindowCloseButton: boolean;
  userGroups: ISharePointGroup[];
  apiMessage?: APIResponse;
  countries: ICountry[];
  elections: IElection[];
}

export interface CandidaturesFormData {
  Election: IElection;
  Country: ICountry;
  PersonSpecificCandidature: boolean;
  Title: string;
  FullName: string;
  CandidatureStatus: string;
  ClearingHouseCategory: string;
  AnnouncementDate: string;
  VotesReceived: string;
  ArchiveId: string;
}

export interface SubmitCandidaturesFormData {
  Election: IElection;
  Country: ICountry;
  PersonSpecificCandidature: string;
  Title: string;
  FullName: string;
  CandidatureStatus: string;
  ClearingHouseCategory: string;
  AnnouncementDate: string;
  VotesReceived: number;
  ArchiveId: string;
}

export interface ICandidaturesViewProps {
  form: CandidaturesFormData;
  countries: ICountry[];
  elections: IElection[];
  userGroups: ISharePointGroup[];
  errors: { [key: string]: string };
  apiMessage?: APIResponse;
  onInputChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  closePopUpWindow: () => void;
  PopUpWindowCloseButton: boolean;
}