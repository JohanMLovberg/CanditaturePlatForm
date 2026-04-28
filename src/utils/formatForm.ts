import { CandidaturesFormData, SubmitCandidaturesFormData } from "../models/CandidaturesModel";
import { ElectionBodiesFormData, SubmitElectionBodiesFormData } from "../models/ElectionBodiesModel";
import { ElectionsFormData, SubmitElectionsFormData } from "../models/ElectionsModel";
import { RepresentationsFormData, SubmitRepresentationsFormData } from "../models/RepresentationsModel";
import { formatDateTimeForForm } from "./dateUtils";

export function formattingCandidaturesForm(form: CandidaturesFormData): SubmitCandidaturesFormData {
  return {
    Election: form.Election,
    Country: form.Country,
    PersonSpecificCandidature: form.PersonSpecificCandidature,
    CandidatureStatus: form.CandidatureStatus,
    ClearingHouseCategory: form.ClearingHouseCategory,
    AnnouncementDate: formatDateTimeForForm(form.AnnouncementDate),
    VotesRecived: form.VotesRecived,
    CandidatureNotes: form.CandidatureNotes
  };
}

export function formattingRepresentationsForm(form: RepresentationsFormData): SubmitRepresentationsFormData {
  return {
    Name: form.Name,
    Abbreviation: form.Abbreviation,
    Country: form.Country,
    Depricated: form.Depricated,
    Description: form.Description,
    Mailbox: form.Mailbox,
    PrimaryContactId: form.PrimaryContact.Id,
    Kind: form.Kind
  };
}

export function formattingElectionBodiesForm(form: ElectionBodiesFormData): SubmitElectionBodiesFormData {
  return {
    Name: form.Name,
    Abbreviation: form.Abbreviation,
    Information: form.Information,
    ResponsibleRepresentations: form.ResponsibleRepresentations,
    Depricated: form.Depricated,
    JournalPlanCode: form.JournalPlanCode,
  };
}

export function formatElectionsForm(form: ElectionsFormData): SubmitElectionsFormData {
  return {
    ElectionBody: form.ElectionBody,
    ElectionPost: form.ElectionPost,
    ElectionRegionalGroup: form.ElectionRegionalGroup,
    ElectionStatus: form.ElectionStatus,
    ElectionDate: form.ElectionDate,
    ElectionDateIsTentative: form.ElectionDateIsTentative,
    ElectionAnnouncementDeadline: form.ElectionAnnouncementDeadline,
    ElectionSeats: form.ElectionSeats,
    IsTentativeSeats: form.IsTentativeSeats,
    IsEligibleForVoteSwaps: form.IsEligibleForVoteSwaps,
    DanishVotesInElection: form.DanishVotesInElection,
    ResponsibleLineAuthorities: form.ResponsibleLineAuthorities
  };
}