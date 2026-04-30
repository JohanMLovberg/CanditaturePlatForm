export interface ICountry {
  Id: number;
  Title: string;
}
export interface IElection {
  Id: number;
  Title: string;
}

export interface ISharePointGroup {
  Id: number;
  Title: string;
  Description: string;
}

export interface IAgreementRegistryCandidature {
  Id: number | null;
  Title: string;
}

export interface IAgreementRegistryPartner {
  Id: number | null;
  Title: string;
}

export interface IAgreementRegistryProposedBy {
  Id: number | null;
  Title: string;
}

export interface IAgreementRegistryRelatedAgreement {
  Id: number | null;
  Title: string;
}

export interface ICountriesResponsibleRepresentation {
  Id: number;
  Name: string;
}

export type IDropDownData = {
  value: string;
  label: string;
};