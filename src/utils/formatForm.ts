import { CandidaturesFormData, SubmitCandidaturesFormData } from "../models/CandidaturesModel";
import { ElectionBodiesFormData, SubmitElectionBodiesFormData } from "../models/ElectionBodiesModel";
import { ElectionsFormData, SubmitElectionsFormData } from "../models/ElectionsModel";
import { RepresentationsFormData, SubmitRepresentationsFormData } from "../models/RepresentationsModel";
import { formatDateTimeForForm } from "./dateUtils";

export function formattingCandidaturesForm(form: CandidaturesFormData): SubmitCandidaturesFormData {
  return {
    Election: form.Election,
    Country: form.Country,
    PersonSpecificCandidature: form.PersonSpecificCandidature ? "Yes" : "No",
    Title: form.Title,
    FullName: form.FullName,
    CandidatureStatus: form.CandidatureStatus,
    ClearingHouseCategory: form.ClearingHouseCategory,
    AnnouncementDate: formatDateTimeForForm(form.AnnouncementDate) as string,
    VotesReceived: form.VotesReceived ? Number(form.VotesReceived) : 0,
    ArchiveId: form.ArchiveId
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
    ElectionBody: form.Body,
    ElectionPost: form.Post,
    ElectionRegionalGroup: form.RegionalGroup,
    ElectionStatus: form.Status,
    ElectionDate: form.ElectionDate,
    ElectionDateIsTentative: form.TentativeDate,
    ElectionAnnouncementDeadline: form.AnnouncementDeadline,
    ElectionSeats: form.Seats,
    IsTentativeSeats: form.TentativeSeatCount,
    IsEligibleForVoteSwaps: form.EligibleForVoteSwaps,
    DanishVotesInElection: form.DanishVotesInElection,
    ResponsibleLineAuthorities: form.ResponsibleLineAuthorities
  };
}