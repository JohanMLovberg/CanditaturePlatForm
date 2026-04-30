import { AgreementRegistryFormData } from "../../models/AgreementRegistryModel";

export const preMadeMockAgreementRegistryFormData: AgreementRegistryFormData = {
    AgreementType: { value: "Reciprocal Support", label: "Reciprocal Support" },
    AgreementStatus: { value: "Draft", label: "Draft" },
    IsCounterProposal: true,
    Candidatures: [
        { Id: 4, Title: "NOR for Biodiversity" },
        { Id: 1, Title: "DNK for CRPD" }
    ],
    Partners: [
        { Id: 3, Title: "Burkina Faso" },
        { Id: 4, Title: "Denmark" }
    ],
    ProposedBy: { Id: 3, Title: "Burkina Faso" },
    Proposed: "2026-04-30",
    Accepted: "2026-05-30",
    Expired: "2026-12-30",
    Description: "This is an example description used in the Agreement Registry Form",
    RelatedAgreements: [
            { Id: 2, Title: "Example agreement 2" },
            { Id: 4, Title: "Example agreement 4" }
    ]
};