import * as React from 'react';
import { IElectionBodiesFormProps, IElectionBodiesFormState } from '../../models/ElectionBodiesModel';
import ElectionBodiesView from './ElectionBodiesView';
import { isEmpty } from '../../utils/consts/emptyString';
import { APIResponse } from '../../models/ApiModel';
import { ElectionBodiesLogic } from './ElectionBodiesLogic';

export default class ElectionBodiesForm extends React.Component<
  IElectionBodiesFormProps,
  IElectionBodiesFormState
> {

  private logic: ElectionBodiesLogic;
  private id = undefined;

  constructor(props: IElectionBodiesFormProps) {
    super(props);

    this.logic = new ElectionBodiesLogic(this.props.context);

    this.state = {
      form: this.logic.createEmptyForm(),
      errors: {},
      isSubmitting: false,
      PopUpWindowCloseButton: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    if (!sessionStorage.getItem("returnUrl")) {
      sessionStorage.setItem("returnUrl", document.referrer);
    }

    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("itemID");
    this.id = idParam ? parseInt(idParam, 10) : undefined;

    if (this.id !== undefined) {
      const prefilledData = await this.logic.getElectionBodiesForm(this.id);
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
    const updatedForm = this.logic.updateField(this.state.form, name, value);
    const { [name]: removed, ...updatedErrors } = this.state.errors;
    this.setState({
      form: updatedForm,
      errors: updatedErrors
    });

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
      <ElectionBodiesView
        form={this.state.form}
        errors={this.state.errors}
        onInputChange={this.handleInputChange}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        isSubmitting={this.state.isSubmitting}
        closePopUpWindow={this.handleClosePopUpWindow}
        PopUpWindowCloseButton={this.state.PopUpWindowCloseButton}
        apiMessage={this.state.apiMessage}
      />
    )
  }
}
