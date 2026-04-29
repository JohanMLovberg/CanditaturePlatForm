import { WebPartContext } from "@microsoft/sp-webpart-base";
import { APIResponse } from "./ApiModel";
import { IDropDownData } from "./ConstsModel";
import { 
    IAgreementRegistryType, 
    IAgreementRegistryStatus,
    IAgreementRegistryCandidature,
    IAgreementRegistryPartner,
    IAgreementRegistryProposedBy,
    IAgreementRegistryRelatedAgreement
} from "./ConstsModel";

export interface IAgreementRegistryFormProps {
    description: string;
    context: WebPartContext;
}

export interface AgreementRegistryFormData {
    AgreementType: IDropDownData,
    AgreementStatus: IDropDownData,
    IsCounterProposal: boolean,
    Candidatures: IAgreementRegistryCandidature[],
    Partners: IAgreementRegistryPartner[],
    ProposedBy: IAgreementRegistryProposedBy,
    Proposed: string,
    Accepted: string,
    Expired: string,
    Description: string,
    RelatedAgreements: IAgreementRegistryRelatedAgreement[]
}

export interface SubmitAgreementRegistryFormData {
    AgreementType: IDropDownData,
    AgreementStatus: IDropDownData,
    IsCounterProposal: boolean,
    Candidatures: IAgreementRegistryCandidature[],
    Partners: IAgreementRegistryPartner[],
    ProposedBy: IAgreementRegistryProposedBy,
    Proposed: string,
    Accepted: string,
    Expired: string,
    Description: string,
    RelatedAgreements: IAgreementRegistryRelatedAgreement[]
}

export interface IAgreementRegistryFormState {
    form: AgreementRegistryFormData;
    apiMessage?: APIResponse;
    errors: { [key: string]: string };
    relatedAgreements: IAgreementRegistryRelatedAgreement[],
    proposedBy: IAgreementRegistryProposedBy[],
    partners: IAgreementRegistryPartner[],
    candidatures: IAgreementRegistryCandidature[],
    agreementStatus: IDropDownData[],
    agreementType: IDropDownData[],
    isSubmitting: boolean;
    PopUpWindowCloseButton: boolean;
}

export interface IAgreementRegistryViewProps {
    form: AgreementRegistryFormData;
    apiMessage?: APIResponse;
    agreementType: IDropDownData[],
    agreementStatus: IDropDownData[],
    candidatures: IAgreementRegistryCandidature[],
    partners: IAgreementRegistryPartner[],
    proposedBy: IAgreementRegistryProposedBy[],
    relatedAgreements: IAgreementRegistryRelatedAgreement[],
    errors: { [key: string]: string };
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    onInputChange: (name: string, value: any) => void;
    closePopUpWindow: () => void;
    PopUpWindowCloseButton: boolean;
    isSubmitting: boolean;
}