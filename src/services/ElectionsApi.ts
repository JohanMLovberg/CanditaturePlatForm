import BaseApi from "./BaseApi";
import { mockElectionTypes } from "../mock/elections/mockElectionTypes";
import { mockElectionBodies } from "../mock/elections/mockElectionBodies";
import { mockElectionPosts } from "../mock/elections/mockElectionPosts";
import { mockElectionRegionalGroups } from "../mock/elections/mockElectionRegionalGroups";
import { mockElectionStatuses } from "../mock/elections/mockElectionStatuses";
import { mockResponsibleLineAuthorities } from "../mock/elections/mockResponsibleLineAuthorities";
import { IDropDownData } from "../models/ConstsModel";
import { ElectionsFormData, IElectionBody, IElectionPost, IElectionResponsibleLineAuthority, SubmitElectionsFormData } from "../models/ElectionsModel";
import { preMadeElectionsFormDataMock } from "../mock/elections/preMadeElectionsFormData";
import { APIResponse } from "../models/ApiModel";
import { formatDateTimeForForm } from "../utils/dateUtils";
import { sp } from 'sp-pnp-js';
import { YesNoToBoolean } from "../utils/BooleanUtils";

export default class ElectionsAPI extends BaseApi {

	public async submitElectionsForm(formData: SubmitElectionsFormData): Promise<APIResponse> {
		const payload = {
			__metadata: { type: "SP.Data.ContractdatabaseListItem" },
			...formData
		};

		return this.handleRequest(() =>
			this.candidaturePlatformApiClient.post("/_api/web/lists/getByTitle('Contract Database')/items", payload)
		);
	}

	public async editElectionForm(formData: SubmitElectionsFormData, id: number): Promise<APIResponse> {
		const payload = {
			__metadata: { type: "SP.Data.ContractdatabaseListItem" },
			...formData
		};

		return this.handleRequest(() =>
			this.candidaturePlatformApiClient.post(
				`/_api/web/lists/getByTitle('Elections Database')/items(${id})`,
				payload,
				{
					headers: {
						"X-HTTP-Method": "MERGE",
						"IF-MATCH": "*"
					}
				}
			)
		);
	}

	public async getElectionFormById(id?: number): Promise<ElectionsFormData | null> {
		if (!id) return null;

		try {
			const item = await sp.web.lists
				.getByTitle("Elections")
				.items.getById(id)
				.select(
					"Election_x0020_body/Id",
					"Election_x0020_body/Title",
					"Post/Id",
					"Post/Title",
					"Date",
					"IsTentativeElectionDate",
					"CandidatureAnnouncementDeadline",
					"Seats",
					"IsTentativeSeatCount",
					"EligibleForVoteSwaps",
					"DanishVotes",
					"ResponsibleLineAuthority/Id",
					"ResponsibleLineAuthority/Title",
				)
				.expand(
					"Election_x0020_body",
					"Post",
					"ResponsibleLineAuthority",
				)
				.get();

			const candidaturesForm: ElectionsFormData = {
				Body: item.Body,
				Post: item.Post,
				RegionalGroup: item.RegionalGroup,
				Status: item.Status,
				ElectionDate: formatDateTimeForForm(item.ElectionDate),
				TentativeDate: YesNoToBoolean(item.TentativeDate),
				AnnouncementDeadline: formatDateTimeForForm(item.AnnouncementDeadline),
				Seats: item.Seats,
				TentativeSeatCount: YesNoToBoolean(item.TentativeSeatCount),
				EligibleForVoteSwaps: YesNoToBoolean(item.EligibleForVoteSwaps),
				DanishVotesInElection: item.DanishVotesInElection,
				ResponsibleLineAuthorities: item.ResponsibleLineAuthorities
			};

			return candidaturesForm;
		} catch (error) {
			console.error("Error fetching contract item:", error);
			return null;
		}
	}

	public async getElectionFormByIdMock(id?: number): Promise<ElectionsFormData> {
		return preMadeElectionsFormDataMock;
	}

	public async getBodyList(): Promise<IElectionBody[]> {
    const allLists = await sp.web.lists.select("Name", "Id").get();
    const BodyList = allLists.find(l => l.Name === "Body");
    if (!BodyList) return [];

    let items: IElectionBody[] = await sp.web.lists.getById(BodyList.Id).items.get();
    return items;
  }

	public async getElectionBodiesMock(): Promise<IDropDownData[]> {
		return mockElectionBodies;
	}

	public async getElectionTypesMock(): Promise<IDropDownData[]> {
		return mockElectionTypes;
	}

	public async getPostList(): Promise<IElectionPost[]> {
    const allLists = await sp.web.lists.select("Title", "Id").get();
    const PostList = allLists.find(l => l.Title === "Post");
    if (!PostList) return [];

    let items: IElectionPost[] = await sp.web.lists.getById(PostList.Id).items.get();
    return items;
  }

	public async getElectionPostsMock(): Promise<IDropDownData[]> {
		return mockElectionPosts;
	}

	public async getElectionRegionalGroupsMock(): Promise<IDropDownData[]> {
		return mockElectionRegionalGroups;
	}

	public async getElectionStatusesMock(): Promise<IDropDownData[]> {
		return mockElectionStatuses;
	}

	public async getResponsibleLineAuthorities(): Promise<IElectionResponsibleLineAuthority[]> {
    const allLists = await sp.web.lists.select("Name", "Id").get();
    const ResponsibleLineAuthorityList = allLists.find(l => l.Name === "ResponsibleLineAuthority");
    if (!ResponsibleLineAuthorityList) return [];

    let items: IElectionResponsibleLineAuthority[] = await sp.web.lists.getById(ResponsibleLineAuthorityList.Id).items.get();
    return items;
  }

	public async getResponsibleLineAuthoritiesMock(): Promise<IDropDownData[]> {
		return mockResponsibleLineAuthorities;
	}
}