import { IDropDownData } from "../../models/ConstsModel";

export const CandidatureStatus: IDropDownData[] = [
	{ value: "Announced", label: "Announced" },
	{ value: "Not Announced", label: "Not Announced" },
];

export const ClearingHouseCategory: IDropDownData[] = [
  { value: "Bank", label: "Bank" },
  { value: "Insurance", label: "Insurance" },
  { value: "Investment Firm", label: "Investment Firm" },
  { value: "Broker", label: "Broker" },
  { value: "Clearing Member", label: "Clearing Member" },
  { value: "Custodian", label: "Custodian" },
  { value: "Asset Manager", label: "Asset Manager" },
];

export const Kind: IDropDownData[] = [
	{ value: "Embassy", label: "Embassy" },
	{ value: "Consulates", label: "Consulates" },
];