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
			responsibleLineAuthorities: [],
			errors: {},
			isSubmitting: false,
			PopUpWindowCloseButton: true,
			apiMessage: undefined
		};
	}

	public async componentDidMount(): Promise<void> {
		if (!sessionStorage.getItem("returnUrl")) {
			sessionStorage.setItem("returnUrl", document.referrer);
		}

		const [
			electionBodies,
			electionPosts,
			responsibleLineAuthorities
		] = await Promise.all([
			this.logic.getBodyList(),
			this.logic.getElectionPosts(),
			this.logic.getResponsibleLineAuthorities()
		]);

		this.setState({
			electionBodies: electionBodies,
			electionPosts: electionPosts,
			responsibleLineAuthorities: responsibleLineAuthorities
		});

		const params = new URLSearchParams(window.location.search);
		const idParam = params.get("ItemID");
		this.id = idParam ? parseInt(idParam, 10) : undefined;

		if (this.id !== undefined) {
			const prefilledData = await this.logic.getElectionForm(this.id);
			this.convertPrefilledData(prefilledData);
		}
	}

	private convertPrefilledData(data: ElectionsFormData): void {
		this.setState({
			form: data
		});
	}

	private handleInputChange = (name: string, value: any) => {
		if (name === "ResponsibleLineAuthorities") {
			this.handleResponsibleLineAuthoritiesInput(value);
		} else if (name === "Post") {
			this.handlePostInput(value);
		} else if (name === "Body") {
			this.handleBodyInput(value);
		} else {
			const updatedForm = this.logic.updateFields(this.state.form, name, value);
			const { [name]: removed, ...updatedErrors } = this.state.errors;
			this.setState({
				form: updatedForm,
				errors: updatedErrors
			});
		}
	}

	private handleResponsibleLineAuthoritiesInput(values: string[]) {
		var ids = values.map(function (value) {
			return Number(value);
		});

		var selected = this.state.responsibleLineAuthorities.filter(function (x) {
			return ids.indexOf(x.Id) > -1;
		});

		this.setState(prev => ({
			form: {
				...prev.form,
				ResponsibleLineAuthorities: selected
			}
		}));
	}

	private handleBodyInput(value: Number): void {
		const bodyValue = Number(value);
		const BodyArray = this.state.electionBodies.filter((d) => {
			return d.Id === bodyValue;
		});
		const body = BodyArray.length > 0 ? BodyArray[0] : { Id: null, Name: "" };
		this.setState(prev => ({
			form: {
				...prev.form,
				Body: body
			}
		}));
	}

	private handlePostInput(value: Number): void {
		const postValue = Number(value);
		const PostArray = this.state.electionPosts.filter((d) => {
			return d.Id === postValue;
		});
		const post = PostArray.length > 0 ? PostArray[0] : { Id: null, Title: "" };
		this.setState(prev => ({
			form: {
				...prev.form,
				Post: post
			}
		}));
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

			const returnUrl = sessionStorage.getItem("returnUrl");
			if (!isEmpty(returnUrl)) {
				this.setState({
					PopUpWindowCloseButton: false
				});
				setTimeout(() => {
					sessionStorage.removeItem("returnUrl");
					window.location.href = returnUrl;
				}, 2000);
			}
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