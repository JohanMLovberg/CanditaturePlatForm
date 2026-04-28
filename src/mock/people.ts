import { PeoplePickerEntity, PeoplePickerEntityData } from 'sp-pnp-js';

const makeEntityData = (title: string, department: string, email: string): PeoplePickerEntityData => ({
  Title: title,
  Department: department,
  Email: email
});

export const SPpeople: PeoplePickerEntity[] = [
  {
    Key: "i:0#.w|anna.larsen",
    DisplayText: "Anna Larsen",
    Description: "i:0#.w|anna.larsen",
    EntityType: "User",
    IsResolved: true,
    MultipleMatches: [],
    ProviderDisplayName: "User",
    ProviderName: "SP",
    EntityData: makeEntityData("Project Manager", "Management", "anna.larsen@example.com")
  },
  {
    Key: "i:0#.w|mikkel.jensen",
    DisplayText: "Mikkel Jensen",
    Description: "i:0#.w|mikkel.jensen",
    EntityType: "User",
    IsResolved: true,
    MultipleMatches: [],
    ProviderDisplayName: "User",
    ProviderName: "SP",
    EntityData: makeEntityData("Software Developer", "IT", "mikkel.jensen@example.com")
  },
  {
    Key: "i:0#.w|sofie.nielsen",
    DisplayText: "Sofie Nielsen",
    Description: "i:0#.w|sofie.nielsen",
    EntityType: "User",
    IsResolved: true,
    MultipleMatches: [],
    ProviderDisplayName: "User",
    ProviderName: "SP",
    EntityData: makeEntityData("UX Designer", "Design", "sofie.nielsen@example.com")
  },
  {
    Key: "i:0#.w|jonas.hansen",
    DisplayText: "Jonas Hansen",
    Description: "i:0#.w|jonas.hansen",
    EntityType: "User",
    IsResolved: true,
    MultipleMatches: [],
    ProviderDisplayName: "User",
    ProviderName: "SP",
    EntityData: makeEntityData("Business Analyst", "Business", "jonas.hansen@example.com")
  },
  {
    Key: "i:0#.w|emma.pedersen",
    DisplayText: "Emma Pedersen",
    Description: "i:0#.w|emma.pedersen",
    EntityType: "User",
    IsResolved: true,
    MultipleMatches: [],
    ProviderDisplayName: "User",
    ProviderName: "SP",
    EntityData: makeEntityData("QA Engineer", "Quality", "emma.pedersen@example.com")
  }
];