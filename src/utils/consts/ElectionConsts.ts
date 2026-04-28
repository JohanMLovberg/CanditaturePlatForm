import { IDropDownData } from "../../models/ConstsModel";

export const ElectionStatus: IDropDownData[] = [
	{ value: "Announced", label: "Announced" },
	{ value: "Scheduled", label: "Scheduled" },
  { value: "Held", label: "Held" },
	{ value: "Canceled", label: "Canceled" },
];

export const RegionalGroup: IDropDownData[] = [
	{ value: "AG", label: "AG" },
	{ value: "APG", label: "APG" },
  { value: "EEG", label: "EEG" },
	{ value: "GRULAC", label: "GRULAC" },
  { value: "WEOG", label: "WEOG" },
];