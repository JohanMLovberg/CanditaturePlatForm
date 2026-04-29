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

export type IDropDownData = {
  value: string;
  label: string;
};