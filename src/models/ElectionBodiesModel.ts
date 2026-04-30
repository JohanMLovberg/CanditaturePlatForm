import { WebPartContext } from "@microsoft/sp-webpart-base";
import { APIResponse } from "./ApiModel";

export interface IElectionBodiesFormProps {
  description: string;
  context: WebPartContext;
}

export interface IElectionBodiesFormState {
  form: ElectionBodiesFormData;
  errors: { [key: string]: string };
  isSubmitting: boolean;
  PopUpWindowCloseButton: boolean;
  apiMessage?: APIResponse;
  responsibleRepresentations: IResponsibleRepresentations[];
}

export interface IElectionBodiesViewProps {
  form: ElectionBodiesFormData;
  errors: { [key: string]: string };
  apiMessage?: APIResponse;
  onInputChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  closePopUpWindow: () => void;
  PopUpWindowCloseButton: boolean;
  responsibleRepresentations: IResponsibleRepresentations[];
}

export interface ElectionBodiesFormData {
  Name: string;
  Abbreviation: string;
  Information: string;
  ResponsibleRepresentations: IResponsibleRepresentations[];
  Depricated: boolean;
  JournalPlanCode: string;
}

export interface SubmitElectionBodiesFormData {
  Name: string;
  Abbreviation: string;
  Information: string;
  ResponsibleRepresentations: IResponsibleRepresentations[];
  Depricated: boolean;
  JournalPlanCode: string;
}

export interface IResponsibleRepresentations {
  Id: number;
  Name: string;
}