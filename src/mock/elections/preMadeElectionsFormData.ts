import { ElectionsFormData } from "../../models/ElectionsModel";

export const preMadeElectionsFormDataMock: ElectionsFormData = {
	ElectionBody: "cityCouncil",
	ElectionPost: "schoolBoardMember",
	ElectionRegionalGroup: "east",
	ElectionStatus: "completed",
	ElectionDate: "2026-04-12",
	ElectionDateIsTentative: true,
	ElectionAnnouncementDeadline: "2026-04-30",
	ElectionSeats: 100,
	IsTentativeSeats: true,
	IsEligibleForVoteSwaps: true,
	DanishVotesInElection: 50,
	ResponsibleLineAuthorities: ["5", "6"]
};