import * as React from 'react';
import { CountriesFormLogic } from "./CountriesLogic";
import CountriesFormView from "./CountriesView";
import { isEmpty } from '../../utils/consts/emptyString';
import { CountriesFormData, ICountriesFormProps, ICountriesFormState } from '../../models/CountriesModel';
import { APIResponse } from '../../models/ApiModel';
import { CountriesMajorArea, CountriesRegionalGroup } from '../../utils/consts/DropDownConsts';

export default class Countries extends React.Component<
	ICountriesFormProps,
	ICountriesFormState
> {

	private logic: CountriesFormLogic;
	private id: number | undefined = undefined;

	constructor(props: ICountriesFormProps) {
		super(props);
		this.logic = new CountriesFormLogic(this.props.context);

		this.state = {
			form: this.logic.createEmptyForm(),
			errors: {},
			responsibleRepresentations: [],
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
			responsibleRepresentations
		] = await Promise.all([
			this.logic.getResponsibleRepresentations()
		]);

		this.setState({
			responsibleRepresentations: responsibleRepresentations
		});

		const params = new URLSearchParams(window.location.search);
		const idParam = params.get("ItemID");
		this.id = idParam ? parseInt(idParam, 10) : undefined;

		if (this.id !== undefined) {
			const prefilledData = await this.logic.getCountriesFormMock(this.id);
			this.convertPrefilledData(prefilledData);
		}
	}

	private convertPrefilledData(data: CountriesFormData): void {
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
			<CountriesFormView
				apiMessage={this.state.apiMessage}
				form={this.state.form}
				errors={this.state.errors}
				responsibleRepresentations={this.state.responsibleRepresentations}
				majorAreas={CountriesMajorArea}
				regionalGroups={CountriesRegionalGroup}
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