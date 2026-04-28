import * as React from 'react';
import { ElectionFormLogic } from "./ElectionsLogic";
import ElectionsFormView from "./ElectionsView";
import { isEmpty } from '../../utils/consts/emptyString';
import { ElectionsFormData, IElectionsFormProps, IElectionsFormState } from '../../models/ElectionsModel';
import { APIResponse } from '../../models/ApiModel';

export default class ElectionsForm extends React.Component<
	IElectionsFormProps,
	IElectionsFormState
> {

	private logic: ElectionFormLogic;
	private id: number | undefined = undefined;

	constructor(props: IElectionsFormProps) {
		super(props);
		this.logic = new ElectionFormLogic(this.props.context);

		this.state = {
			form: this.logic.createEmptyForm(),
			electionBodies: [],
			electionPosts: [],
			electionRegionalGroups: [],
			electionStatuses: [],
			electionTypes: [],
			responsibleLineAuthorities: [],
			errors: {},
			isSubmitting: false,
			PopUpWindowCloseButton: true,
			apiMessage: undefined
		};
	}

	public async componentDidMount(): Promise<void> {
		const [
			electionBodies,
			electionPosts,
			electionRegionalGroups,
			electionStatuses,
			electionTypes,
			responsibleLineAuthorities
		] = await Promise.all([
			this.logic.getElectionBodies(),
			this.logic.getElectionPosts(),
			this.logic.getElectionRegionalGroups(),
			this.logic.getElectionStatuses(),
			this.logic.getElectionTypes(),
			this.logic.getResponsibleLineAuthorities()
		]);

		this.setState({
			electionBodies: electionBodies,
			electionPosts: electionPosts,
			electionRegionalGroups: electionRegionalGroups,
			electionStatuses: electionStatuses,
			electionTypes: electionTypes,
			responsibleLineAuthorities: responsibleLineAuthorities
		});

		const params = new URLSearchParams(window.location.search);
		const idParam = params.get("ItemID");
		this.id = idParam ? parseInt(idParam, 10) : undefined;

		if (this.id !== undefined) {
			const prefilledData = await this.logic.getElectionFormMock(this.id);
			this.convertPrefilledData(prefilledData);
		}
	}

	private convertPrefilledData(data: ElectionsFormData): void {
		this.setState({
			form: data
		});
	}

	private handleInputChange = (name: string, value: any) => {
		const updatedForm = this.logic.updateFields(this.state.form, name, value);
		const { [name]: removed, ...updatedErrors } = this.state.errors;
		this.setState({
			form: updatedForm,
			errors: updatedErrors
		}, () => {
			console.log(this.state.form);
		});
	}

	private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errors = this.logic.validate(this.state.form);

		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
			return;
		}

		this.setState({ isSubmitting: true });

		let response: APIResponse;

		if (this.id == undefined) {
			response = await this.logic.submit(this.state.form);
		} else {
			console.log(this.state.form);
			response = await this.logic.editForm(this.state.form, this.id);
		}

		if (response.success) {
			this.setState({
				form: this.logic.createEmptyForm(),
				errors: {},
				apiMessage: {
					success: true,
					message: response.message
				},
			});
		} else {
			this.setState({
				apiMessage: {
					success: false,
					message: response.message
				}
			});
		}
		this.setState({ isSubmitting: false });
	}

	private handleCancel = () => {
		this.setState({
			form: this.logic.createEmptyForm(),
			errors: {}
		});
		const returnUrl = sessionStorage.getItem("returnUrl");
		if (!isEmpty(returnUrl)) {
			sessionStorage.removeItem("returnUrl");
			window.location.href = returnUrl as string;
		}
	}

	private handleClosePopUpWindow = () => {
		this.setState({
			apiMessage: undefined
		});
	}

	public render(): JSX.Element {
		return (
			<ElectionsFormView
				apiMessage={this.state.apiMessage}
				form={this.state.form}
				electionBodies={this.state.electionBodies}
				electionPosts={this.state.electionPosts}
				electionRegionalGroups={this.state.electionRegionalGroups}
				electionStatuses={this.state.electionStatuses}
				electionTypes={this.state.electionTypes}
				responsibleLineAuthorities={this.state.responsibleLineAuthorities}
				errors={this.state.errors}
				onSubmit={this.handleSubmit}
				onCancel={this.handleCancel}
				onInputChange={this.handleInputChange}
				isSubmitting={this.state.isSubmitting}
				closePopUpWindow={this.handleClosePopUpWindow}
				PopUpWindowCloseButton={this.state.PopUpWindowCloseButton}
			/>
		);
	}
}