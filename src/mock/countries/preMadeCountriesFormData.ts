import { CountriesFormData } from "../../models/CountriesModel";

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