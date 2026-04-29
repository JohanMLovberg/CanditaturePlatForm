import { WebPartContext } from '@microsoft/sp-webpart-base';
import { AgreementRegistryFormData } from '../../models/AgreementRegistryModel';
import AgreementRegistryBaseApi from '../../services/AgreementRegistryApi';
import { APIResponse } from '../../models/ApiModel';
import { formatAgreementForm } from '../../utils/formatForm';
import { 
    IAgreementRegistryCandidature, 
    IAgreementRegistryPartner, 
    IAgreementRegistryProposedBy, 
    IAgreementRegistryRelatedAgreement, 
} from '../../models/ConstsModel';

export class AgreementRegistryLogic {
    private sharePointApi: AgreementRegistryBaseApi;
    private agreementRegistryBaseApi: AgreementRegistryBaseApi;


    constructor(context: WebPartContext) {
        this.sharePointApi = new AgreementRegistryBaseApi(
            context,
            context.pageContext.web.absoluteUrl
        )
        
        this.agreementRegistryBaseApi = new AgreementRegistryBaseApi(
            context, 
            "https://devapplicationsws/CandidaturesServices/api"
        );
    }

    public createEmptyForm(): AgreementRegistryFormData {
        return {
            AgreementType: { // Default value
                value: "Reciprocal Support",
                label: "Reciprocal Support",
            },
            AgreementStatus: { // Default value
                value: "Draft",
                label: "Draft",
            },
            IsCounterProposal: false,
            Candidatures: [],
            Partners: [],
            ProposedBy: {
                Id: null,
                Title: "",
            },
            Proposed: "",
            Accepted: "",
            Expired: "",
            Description: "",
            RelatedAgreements: []
        };
    }

    public updateFields(
        form: AgreementRegistryFormData,
        name: string,
        value: any): AgreementRegistryFormData {
        return {
            ...form, [name]: value
        };
    }

    public validate(form: AgreementRegistryFormData): { [key: string]: string } {
        const errors: { [key: string]: string } = {};

        if (form.AgreementStatus.value === null) errors.AgreementStatus = "Agreement Status is a required field"
        if (form.Candidatures.length <= 0) errors.Candidatures = "Candidatures is a required field"
        if (form.Partners.length <= 0) errors.Partners = "Partners is a required field"
        if (form.ProposedBy.Id === null) errors.ProposedBy = "Proposed By is a required field"

        return errors;
    }

    public async submit(form: AgreementRegistryFormData): Promise<APIResponse> {
        const submitForm = formatAgreementForm(form);
        return this.agreementRegistryBaseApi.submitAgreementRegistryForm(submitForm);
    }

    public async editForm(form: AgreementRegistryFormData, id: number): Promise<APIResponse> {
        const submitForm = formatAgreementForm(form);
        return this.agreementRegistryBaseApi.editAgreementRegistryForm(submitForm, id);
    }

    public async getAgreementRegistryFormMock(id?: number): Promise<AgreementRegistryFormData> {
        return this.sharePointApi.getFormMock();
    }

    public async getRelatedAgreements(): Promise<IAgreementRegistryRelatedAgreement[]> {
        return this.sharePointApi.getRelatedAgreementsMock();
    }
    
    public async getProposedBy(): Promise<IAgreementRegistryProposedBy[]> {
        return this.sharePointApi.getProposedByMock();
    }

    public async getPartners(): Promise<IAgreementRegistryPartner[]> {
        return this.sharePointApi.getPartnerMock();
    }

    public async getCandidatures(): Promise<IAgreementRegistryCandidature[]> {
        return this.sharePointApi.getCandidatureMock();
    }
}