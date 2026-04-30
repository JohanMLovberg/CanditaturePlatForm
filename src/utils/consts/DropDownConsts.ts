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
  { value: "Embassy and Permanent Mission", label: "Embassy and Permanent Mission" },
  { value: "Ministry", label: "Ministry" },
  { value: "NATO Representative Office", label: "NATO Representative Office" },
  { value: "OECD Delegation", label: "OECD Delegation" },
  { value: "Permanent Mission to the United Nations", label: "Permanent Mission to the United Nations" },
  { value: "Permanent Representation to the Council of Europe", label: "Permanent Representation to the Council of Europe" },
  { value: "Permanent Representation to the European Union", label: "Permanent Representation to the European Union" },
  { value: "Representative Office", label: "Representative Office" },
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