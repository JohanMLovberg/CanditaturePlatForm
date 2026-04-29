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

export const AgreementRegistryStatus: IDropDownData[] = [
  { value: "Draft", label: "Draft" },
  { value: "Final", label: "Final" },
  { value: "Proposed", label: "Proposed" },
  { value: "Accepted", label: "Accepted" },
  { value: "Expired", label: "Expired" },
  { value: "Withdrawn", label: "Withdrawn" },
  { value: "Ignored", label: "Ignored" },
  { value: "Declined", label: "Declined" }
];

export const AgreementRegistryAgreementType: IDropDownData[] = [
  { value: "Alternative Agreement", label: "Alternative Agreement" },
  { value: "Reciprocal Support", label: "Reciprocal Support" },
  { value: "Unilateral Support", label: "Unilateral Support" }
];