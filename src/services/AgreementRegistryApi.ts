import { APIResponse } from "../models/ApiModel";
import BaseApi from "./BaseApi";
import {
    IAgreementRegistryPartner,
    IAgreementRegistryCandidature,
    IAgreementRegistryProposedBy,
    IAgreementRegistryRelatedAgreement,
} from "../models/ConstsModel";
import { AgreementRegistryFormData, SubmitAgreementRegistryFormData } from "../models/AgreementRegistryModel";
import { sp } from 'sp-pnp-js';

import { mockAgreementRegistryRelatedAgreement } from "../mock/agreementRegistry/RelatedAgreement";
import { mockAgreementRegistryProposedBy } from "../mock/agreementRegistry/ProposedBy";
import { mockAgreementRegistryPartner } from "../mock/agreementRegistry/Partner";
import { mockAgreementRegistryCandidature } from "../mock/agreementRegistry/Candidature";
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
                Expired: formatDateTimeForForm(item.Expired) as string,
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

    public async getRelatedAgreementsList(): Promise<IAgreementRegistryRelatedAgreement[]> {
        const allLists = await sp.web.lists.select("Name", "Id").get();
        const RelatedAgreementsList = allLists.find(l => l.Name === "Related Agreements");
        if (!RelatedAgreementsList) return [];

        let items: IAgreementRegistryRelatedAgreement[] = await sp.web.lists.getById(RelatedAgreementsList.Id).items.get();
        return items;
    }

    public async getRelatedAgreementsMock(): Promise<IAgreementRegistryRelatedAgreement[]> {
        return mockAgreementRegistryRelatedAgreement;
    }

    public async getProposedByList(): Promise<IAgreementRegistryProposedBy[]> {
        const allLists = await sp.web.lists.select("Name", "Id").get();
        const ProposedByList = allLists.find(l => l.Name === "Proposed By");
        if (!ProposedByList) return [];

        let items: IAgreementRegistryProposedBy[] = await sp.web.lists.getById(ProposedByList.Id).items.get();
        return items;
    }

    public async getProposedByMock(): Promise<IAgreementRegistryProposedBy[]> {
        return mockAgreementRegistryProposedBy;
    }

    public async getPartnerList(): Promise<IAgreementRegistryPartner[]> {
        const allLists = await sp.web.lists.select("Name", "Id").get();
        const PartnerList = allLists.find(l => l.Name === "Partners");
        if (!PartnerList) return [];

        let items: IAgreementRegistryPartner[] = await sp.web.lists.getById(PartnerList.Id).items.get();
        return items;
    }

    public async getPartnerMock(): Promise<IAgreementRegistryPartner[]> {
        return mockAgreementRegistryPartner;
    }

    public async getCandidatureList(): Promise<IAgreementRegistryCandidature[]> {
        const allLists = await sp.web.lists.select("Name", "Id").get();
        const CandidatureList = allLists.find(l => l.Name === "Candidatures");
        if (!CandidatureList) return [];

        let items: IAgreementRegistryCandidature[] = await sp.web.lists.getById(CandidatureList.Id).items.get();
        return items;
    }

    public async getCandidatureMock(): Promise<IAgreementRegistryCandidature[]> {
        return mockAgreementRegistryCandidature;
    }
}