import { APIResponse } from "../models/ApiModel";
import BaseApi from "./BaseApi";

import {
    IAgreementRegistryPartner,
    IAgreementRegistryCandidature,
    IAgreementRegistryProposedBy,
    IAgreementRegistryRelatedAgreement,
    IAgreementRegistryStatus,
    IAgreementRegistryType
} from "../models/ConstsModel";
import { AgreementRegistryFormData, SubmitAgreementRegistryFormData } from "../models/AgreementRegistryModel";
import { sp } from 'sp-pnp-js';

import { mockAgreementRegistryRelatedAgreement } from "../mock/agreementRegistry/RelatedAgreement";
import { mockAgreementRegistryProposedBy } from "../mock/agreementRegistry/ProposedBy";
import { mockAgreementRegistryPartner } from "../mock/agreementRegistry/Partner";
import { mockAgreementRegistryCandidature } from "../mock/agreementRegistry/Candidature";
import { mockAgreementRegistryStatus } from "../mock/agreementRegistry/Status";
import { mockAgreementRegistryType } from "../mock/agreementRegistry/Type";
import { preMadeMockAgreementRegistryFormData } from "../mock/agreementRegistry/PreMadeAgreementRegistryFormData";
import { YesNoToBoolean } from "../utils/BooleanUtils";
import { formatDateTimeForForm } from "../utils/dateUtils";

export default class AgreementRegistryBaseAPI extends BaseApi {

    public async submitAgreementRegistryForm(formData: SubmitAgreementRegistryFormData): Promise<APIResponse> {
        return this.handleRequest(() =>
            this.candidaturePlatformApiClient.post("/agreement-registry", formData)
        );
    }

    public async editAgreementRegistryForm(formData: SubmitAgreementRegistryFormData, id: number): Promise<APIResponse> {
        return this.handleRequest(() =>
            this.candidaturePlatformApiClient.put(`/agreement-registry/${id}`, formData)
        );
    }

    public async getAgreementRegistryForm(id?: number): Promise<AgreementRegistryFormData | null> {
        if (!id) return null;

        try {
            const item = await sp.web.lists
                .getByTitle("AgreementRegistry")
                .items.getById(id)
                .select(
                    "AgreementType",
                    "AgreementStatus",
                    "IsCounterProposal",
                    "Candidatures/Id",
                    "Candidatures/Title",
                    "Partners/Id",
                    "Partners/Title",
                    "ProposedBy/Id",
                    "ProposedBy/Title",
                    "Proposed",
                    "Accepted",
                    "Expired",
                    "Description",
                    "RelatedAgreements/Id",
                    "RelatedAgreements/Title",
                )
                .expand(
                    "Candidatures",
                    "Partners",
                    "ProposedBy",
                    "RelatedAgreements"
                )
                .get();

            const agreementRegistryForm: AgreementRegistryFormData = {
                AgreementType: item.AgreementType,
                AgreementStatus: item.AgreementStatus,
                IsCounterProposal: YesNoToBoolean(item.IsCounterProposal),
                Candidatures: item.Candidatures,
                Partners: item.Partners,
                ProposedBy: item.ProposedBy,
                Proposed: formatDateTimeForForm(item.Proposed) as string,
                Accepted: formatDateTimeForForm(item.Accepted) as string,
                Expired:  formatDateTimeForForm(item.Expired) as string,
                Description: item.Description,
                RelatedAgreements: item.RelatedAgreements
            };

            return agreementRegistryForm;
        } catch (error) {
            console.error("Error fetching agreement registry item:", error);
            return null;
        }
    }


    public async getFormMock(): Promise<AgreementRegistryFormData> {
        return preMadeMockAgreementRegistryFormData;
    }

    public async getRelatedAgreementsMock(): Promise<IAgreementRegistryRelatedAgreement[]> {
        return mockAgreementRegistryRelatedAgreement;
    }

    public async getProposedByMock(): Promise<IAgreementRegistryProposedBy[]> {
        return mockAgreementRegistryProposedBy;
    }

    public async getPartnerMock(): Promise<IAgreementRegistryPartner[]> {
        return mockAgreementRegistryPartner;
    }

    public async getCandidatureMock(): Promise<IAgreementRegistryCandidature[]> {
        return mockAgreementRegistryCandidature;
    }

    public async getStatusMock(): Promise<IAgreementRegistryStatus[]> {
        return mockAgreementRegistryStatus;
    }

    public async getTypeMock(): Promise<IAgreementRegistryType[]> {
        return mockAgreementRegistryType;
    }
}