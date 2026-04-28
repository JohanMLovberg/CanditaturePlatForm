import * as React from 'react';
import { ICandidaturesFormProps, ICandidaturesFormState } from "../../models/CandidaturesModel";
import CandidaturesView from "./CandidaturesView";
import { CandidaturesLogic } from './CandidaturesLogic';
import { isEmpty } from '../../utils/consts/emptyString';
import { APIResponse } from '../../models/ApiModel';

export default class CandidaturesForm extends React.Component<
  ICandidaturesFormProps,
  ICandidaturesFormState
> {
  private logic: CandidaturesLogic;
  private id = undefined;

  constructor(props: ICandidaturesFormProps) {
    super(props);

    this.logic = new CandidaturesLogic(this.props.context);

    this.state = {
      form: this.logic.createEmptyForm(),
      errors: {},
      isSubmitting: false,
      PopUpWindowCloseButton: true,
      countries: [],
      elections: []
    };
  }

  public async componentDidMount(): Promise<void> {
    if (!sessionStorage.getItem("returnUrl")) {
      sessionStorage.setItem("returnUrl", document.referrer);
    }
    const countries = await this.logic.getCountry();
    const elections = await this.logic.getElection();

    this.setState({
      countries: countries,
      elections: elections
    });

    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("itemID");
    this.id = idParam ? parseInt(idParam, 10) : undefined;

    if (this.id !== undefined) {
      const prefilledData = await this.logic.getCandidaturesForm(this.id);
      this.convertPrefilledData(prefilledData);
    }
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
      response = await this.logic.submitForm(this.state.form);
    } else {
      response = await this.logic.editForm(this.state.form, this.id);
    }

    if (response.success) {
      this.setState({
        form: this.logic.createEmptyForm(),
        errors: {},
        apiMessage: {
          success: true,
          message: response.message,
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
          message: response.message,
        },
      });
    }
    this.setState({ isSubmitting: false });
  }

  private handleInputChange = (name: string, value: any) => {
    if (name === "Country") {
      this.handleCountryInput(value);
    } else if (name === "Election") {
      this.handleElectionInput(value);
    } else {
      const updatedForm = this.logic.updateField(this.state.form, name, value);
      const { [name]: removed, ...updatedErrors } = this.state.errors;
      this.setState({
        form: updatedForm,
        errors: updatedErrors
      });
    }
  }
  private handleCountryInput(value: Number): void {
    const countryValue = Number(value);
    const countryArray = this.state.countries.filter((d) => {
      return d.Id === countryValue;
    });
    const country = countryArray.length > 0 ? countryArray[0] : { Id: null, Title: "" };
    this.setState(prev => ({
      form: {
        ...prev.form,
        Country: country
      }
    }));
  }

  private handleElectionInput(value: Number): void {
    const electionValue = Number(value);
    const electionArray = this.state.elections.filter((d) => {
      return d.Id === electionValue;
    });
    const election = electionArray.length > 0 ? electionArray[0] : { Id: null, Title: "" };
    this.setState(prev => ({
      form: {
        ...prev.form,
        Election: election
      }
    }));
  }

  private convertPrefilledData(data): void {
    this.setState({
      form: data
    });
  }

  private handleClosePopUpWindow = () => {
    this.setState({
      apiMessage: undefined
    });
  }

  private handleCancel = () => {
    this.setState({
      form: this.logic.createEmptyForm(),
      errors: {},
    });
    const returnUrl = sessionStorage.getItem("returnUrl");
    if (!isEmpty(returnUrl)) {
      sessionStorage.removeItem("returnUrl");
      window.location.href = returnUrl;
    }
  }

  public render(): JSX.Element {
    return (
      <CandidaturesView 
        form={this.state.form}
        errors={this.state.errors}
        onInputChange={this.handleInputChange}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        isSubmitting={this.state.isSubmitting}
        closePopUpWindow={this.handleClosePopUpWindow}
        PopUpWindowCloseButton={this.state.PopUpWindowCloseButton}
        apiMessage={this.state.apiMessage}
        countries={this.state.countries}
        elections={this.state.elections}
      />
    )
  }
}