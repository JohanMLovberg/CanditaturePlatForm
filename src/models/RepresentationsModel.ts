import { WebPartContext } from "@microsoft/sp-webpart-base";
import { APIResponse } from "./ApiModel";
import { ICountry } from "./ConstsModel";
import { IPersonaProps } from 'office-ui-fabric-react';
import { IUserPicker } from "./UserPicker";

export interface IRepresentationsFormProps {
  description: string;
  context: WebPartContext;
}

export interface IRepresentationsFormState {
  form: RepresentationsFormData;
  errors: { [key: string]: string };
  isSubmitting: boolean;
  PopUpWindowCloseButton: boolean;
  apiMessage?: APIResponse;
  countries: ICountry[];
  resetUser: boolean;
}

export interface IRepresentationsViewProps {
  form: RepresentationsFormData;
  errors: { [key: string]: string };
  apiMessage?: APIResponse;
  onInputChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  closePopUpWindow: () => void;
  PopUpWindowCloseButton: boolean;
  countries: ICountry[];
  onResolveSuggestions: (filterText: string) => Promise<IPersonaProps[]>;
  resetUser: boolean;
}

export interface RepresentationsFormData {
  Name: string;
  Abbreviation: string;
  Country: ICountry;
  Depricated: boolean;
  Description: string;
  Mailbox: string;
  PrimaryContact: IUserPicker;
  Kind: string;
}

export interface SubmitRepresentationsFormData {
  Name: string;
  Abbreviation: string;
  Country: ICountry;
  Depricated: boolean;
  Description: string;
  Mailbox: string;
  PrimaryContactId: number;
  Kind: string;
}