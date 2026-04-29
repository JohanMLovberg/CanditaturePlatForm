import { IDropDownData } from "../../models/ConstsModel";

export const CandidatureStatus: IDropDownData[] = [
	{ value: "Draft", label: "Draft" },
  { value: "Announced", label: "Announced" },
  { value: "Elected", label: "Elected" },
  { value: "Not elected", label: "Not elected" },
  { value: "Withdrawn", label: "Withdrawn" },
  { value: "Disqualified", label: "Disqualified" },
];

export const ClearingHouseCategory: IDropDownData[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

export const Kind: IDropDownData[] = [
	{ value: "Embassy", label: "Embassy" },
	{ value: "Consulates", label: "Consulates" },
];