import { ElectionsFormData } from "../../models/ElectionsModel";

export const preMadeElectionsFormDataMock: ElectionsFormData = {
	Body: {
		Id: 5,
		Name: "Arms Trade Treaty"
	},
	Post: {
		Id: 3,
		Title: "Chair"
	},
	RegionalGroup: "AG",
	Status: "Held",
	ElectionDate: "2026-04-12",
	TentativeDate: true,
	AnnouncementDeadline: "2026-04-30",
	Seats: 100,
	TentativeSeatCount: true,
	EligibleForVoteSwaps: true,
	DanishVotesInElection: 50,
	ResponsibleLineAuthorities:
		[
			{
				Id: 5,
				Name: "Finansministeriet"
			},
			{
				Id: 4,
				Name: "Udenrigsministeriet"
			}
		]
};