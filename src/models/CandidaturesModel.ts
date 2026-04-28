import { WebPartContext } from "@microsoft/sp-webpart-base";
import { APIResponse } from "./ApiModel";
import { ICountry, IElection } from "./ConstsModel";

export interface ICandidaturesFormProps {
  description: string;
  context: WebPartContext;
}

export interface ICandidaturesFormState {
  form: CandidaturesFormData;
  errors: { [key: string]: string };
  isSubmitting: boolean;
  PopUpWindowCloseButton: boolean;
  apiMessage?: APIResponse;
  countries: ICountry[];
  elections: IElection[];
}

export interface CandidaturesFormData {
  Election: IElection;
  Country: ICountry;
  PersonSpecificCandidature: boolean;
  CandidatureStatus: string;
  ClearingHouseCategory: string;
  AnnouncementDate: string;
  VotesRecived: string;
  CandidatureNotes: CandidatureNotes
}

export interface SubmitCandidaturesFormData {
  Election: IElection;
  Country: ICountry;
  PersonSpecificCandidature: boolean;
  CandidatureStatus: string;
  ClearingHouseCategory: string;
  AnnouncementDate: string;
  VotesRecived: string;
  CandidatureNotes: CandidatureNotes
}

export interface CandidatureNotes {
  Title: string;
  NoteDate: string;
  Modified: string;
  ModifiedBy: string;
}

export interface ICandidaturesViewProps {
  form: CandidaturesFormData;
  countries: ICountry[];
  elections: IElection[];
  errors: { [key: string]: string };
  apiMessage?: APIResponse;
  onInputChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  closePopUpWindow: () => void;
  PopUpWindowCloseButton: boolean;
}