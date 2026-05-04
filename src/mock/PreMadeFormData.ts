import { CandidaturesFormData } from "../models/CandidaturesModel";
import { CountriesFormData } from "../models/CountriesModel";
import { ElectionBodiesFormData } from "../models/ElectionBodiesModel";
import { RepresentationsFormData } from "../models/RepresentationsModel";

export const mockCandidaturesFormData: CandidaturesFormData = {
  Election: {
    Id: 1,
    Title: "ACABQ 2023 - Board Mebmer - AG"
  },
  Country: {
    Id: 1,
    Title: "Afghanistan"
  },
  PersonSpecificCandidature: true,
  CandidatureStatus: "Announced",
  ClearingHouseCategory: "",
  AnnouncementDate: "2026-03-12",
  VotesReceived: 30,
  ArchiveId: "",
};

export const mockRepresentationsFormData: RepresentationsFormData = {
  Name: "Johan Løvberg",
  Abbreviation: "string",
  Country: {
    Id: 1,
    Title: "Afghanistan"
  },
  Depricated: true,
  Description: "This is a very good string",
  Mailbox: "c-xjohlov@um.dk",
  PrimaryContact: {
    Id: 189,
    Title: "Mikkel Jensen",
    LoginName: "U1\mikjen",
    Email: "x-mikjen@test.dk"
  },
  Kind: "Embassy",
};

export const mockElectionBodiesFormData: ElectionBodiesFormData = {
  Name: "Johan Løvberg",
  Abbreviation: "string",
  Information: "hello",
  ResponsibleRepresentations: [
    {
      Id: 3,
      Name: "Canberra"
    }
  ],
  Depricated: true,
  JournalPlanCode: "12345"
};

export const mockCountriesBodiesFormData: CountriesFormData = {
  Name: "Test country 1",
  Abbreviation: "TC1",
  MajorArea: {
    value: "Europe",
    label: "Europe"
  },
  RegionalGroup: {
    value: "APG",
    label: "APG"
  },
  Description: "This is a test description..",
  ResponsibleRepresentations:
    [
      {
      Id: 1,
      Name: "Canberra"
    }
  ]
};