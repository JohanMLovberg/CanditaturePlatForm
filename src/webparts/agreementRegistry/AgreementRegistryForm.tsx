import * as React from 'react';
import {
    AgreementRegistryFormData,
    IAgreementRegistryFormProps,
    IAgreementRegistryFormState
} from "../../models/AgreementRegistryModel";
import { AgreementRegistryLogic } from "./AgreementRegistryLogic";
import AgreementRegistryView from "./AgreementRegistryView";
import { APIResponse } from '../../models/ApiModel';
import { isEmpty } from '../../utils/consts/emptyString';
import { AgreementRegistryAgreementType, AgreementRegistryStatus } from '../../utils/consts/DropDownConsts';

export default class AgreementRegistryForm extends React.Component<
    IAgreementRegistryFormProps,
    IAgreementRegistryFormState
> {
    private logic: AgreementRegistryLogic;
    private id: number | undefined = undefined;

    constructor(props: IAgreementRegistryFormProps) {
        super(props);
        this.logic = new AgreementRegistryLogic(this.props.context);

        this.state = {
            form: this.logic.createEmptyForm(),
            relatedAgreements: [],
            proposedBy: [],
            partners: [],
            candidatures: [],
            agreementStatus: [],
            agreementType: [],
            errors: {},
            isSubmitting: false,
            PopUpWindowCloseButton: true,
            apiMessage: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        const [
            relatedAgreements,
            proposedBy,
            partners,
            candidatures,
        ] = await Promise.all([
            this.logic.getRelatedAgreements(),
            this.logic.getProposedBy(),
            this.logic.getPartners(),
            this.logic.getCandidatures(),
        ]);

        this.setState({
            relatedAgreements: relatedAgreements,
            proposedBy: proposedBy,
            partners: partners,
            candidatures: candidatures,
            agreementStatus: AgreementRegistryStatus,
            agreementType: AgreementRegistryAgreementType
        });

        const params = new URLSearchParams(window.location.search);
        const idParam = params.get("ItemID");
        this.id = idParam ? parseInt(idParam, 10) : undefined;

        if (this.id !== undefined) {
            const prefilledData = await this.logic.getAgreementRegistryFormMock(this.id);
            this.convertPrefilledData(prefilledData);
        }
    }

    private convertPrefilledData(data: AgreementRegistryFormData): void {
        this.setState({
            form: data
        })
    }

    private handleAgreementTypeInput(value: string): void {
        const agreementTypeValue = value;
        const agreementTypeArray = this.state.agreementType.filter((d) => {
            return d.value === agreementTypeValue;
        });
        const agreementType = agreementTypeArray.length > 0 ? agreementTypeArray[0] : { Id: null, Title: "" };
        this.setState((prev: IAgreementRegistryFormState) => ({
            form: {
                ...prev.form,
                AgreementType: agreementType
            }
        }));
    }

    private handleAgreementStatusInput(value: string): void {
        const agreementStatusValue = value;
        const agreementStatusArray = this.state.agreementStatus.filter((d) => {
            return d.value === agreementStatusValue;
        });
        const agreementStatus = agreementStatusArray.length > 0 ? agreementStatusArray[0] : { Id: null, Title: "" };
        this.setState((prev: IAgreementRegistryFormState) => ({
            form: {
                ...prev.form,
                AgreementStatus: agreementStatus
            }
        }));
    }

    private handleProposedByInput(value: Number): void {
        const proposedByValue = Number(value);
        const proposedByArray = this.state.proposedBy.filter((d) => {
            return d.Id === proposedByValue;
        });
        const proposedBy = proposedByArray.length > 0 ? proposedByArray[0] : { Id: null, Title: "" };
        this.setState(prev => ({
            form: {
                ...prev.form,
                ProposedBy: proposedBy
            }
        }));
    }

    private handleCandidaturesInput(values: Number[]): void {
        var ids = values.map(function (v) {
            return Number(v);
        });
        var matchedGroups = this.state.candidatures.filter(function (d) {
            return ids.indexOf(d.Id ? d.Id : -1) !== -1;
        });
        this.setState(function (prev) {
            return {
                form: {
                    ...prev.form,
                    Candidatures: matchedGroups
                }
            };
        });
    }

    private handlePartnersInput(values: Number[]): void {
        var ids = values.map(function (v) {
            return Number(v);
        });
        var matchedGroups = this.state.partners.filter(function (d) {
            return ids.indexOf(d.Id ? d.Id : -1) !== -1;
        });
        this.setState(function (prev) {
            return {
                form: {
                    ...prev.form,
                    Partners: matchedGroups
                }
            };
        });
    }

    private handleRelatedAgreementsInput(values: Number[]): void {
        var ids = values.map(function (v) {
            return Number(v);
        });
        var matchedGroups = this.state.relatedAgreements.filter(function (d) {
            return ids.indexOf(d.Id ? d.Id : -1) !== -1;
        });
        this.setState(function (prev) {
            return {
                form: {
                    ...prev.form,
                    RelatedAgreements: matchedGroups
                }
            };
        });
    }

    private handleInputChange = (name: string, value: any) => {
        if (name === "AgreementType") this.handleAgreementTypeInput(value);
        else if (name === "AgreementStatus") this.handleAgreementStatusInput(value);
        else if (name === "Candidatures") this.handleCandidaturesInput(value);
        else if (name === "Partners") this.handlePartnersInput(value);
        else if (name === "ProposedBy") this.handleProposedByInput(value);
        else if (name === "RelatedAgreements") this.handleRelatedAgreementsInput(value);
        else {
            const updatedForm = this.logic.updateFields(this.state.form, name, value);
            const { [name]: removed, ...updatedErrors } = this.state.errors;
            this.setState({
                form: updatedForm,
                errors: updatedErrors
            }, () => {
                console.log(this.state.form);
            });
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

    private getDateFieldStates = () => {
        var fieldStateMap: { [key: string]: { proposed: boolean; accepted: boolean; expired: boolean } } = {};

        fieldStateMap["Draft"] = { proposed: true, accepted: true, expired: true }; // Draft
        fieldStateMap["Final"] = { proposed: true, accepted: true, expired: true }; // Final
        fieldStateMap["Proposed"] = { proposed: false, accepted: true, expired: true }; // Proposed
        fieldStateMap["Accepted"] = { proposed: false, accepted: false, expired: true }; // Accepted 
        fieldStateMap["Expired"] = { proposed: false, accepted: false, expired: false }; // Expired
        fieldStateMap["Withdrawn"] = { proposed: false, accepted: false, expired: true }; // Withdrawn
        fieldStateMap["Ignored"] = { proposed: false, accepted: false, expired: true }; // Ignored
        fieldStateMap["Declined"] = { proposed: false, accepted: true, expired: true }; // Declined

        var key = this.state.form.AgreementStatus && this.state.form.AgreementStatus.label ? this.state.form.AgreementStatus.label : null;
        var state = key && fieldStateMap[key] ? fieldStateMap[key] : { proposed: true, accepted: true, expired: true };

        return {
            proposedFieldDisabled: state.proposed,
            acceptedFieldDisabled: state.accepted,
            expiredFieldDisabled: state.expired
        };
    }

    public render(): JSX.Element {
        return (
            <AgreementRegistryView
                apiMessage={this.state.apiMessage}
                form={this.state.form}
                relatedAgreements={this.state.relatedAgreements}
                proposedBy={this.state.proposedBy}
                partners={this.state.partners}
                candidatures={this.state.candidatures}
                agreementStatus={AgreementRegistryStatus}
                agreementType={AgreementRegistryAgreementType}
                errors={this.state.errors}
                onSubmit={this.handleSubmit}
                onCancel={this.handleCancel}
                onInputChange={this.handleInputChange}
                isSubmitting={this.state.isSubmitting}
                closePopUpWindow={this.handleClosePopUpWindow}
                PopUpWindowCloseButton={this.state.PopUpWindowCloseButton}
                DisableDateFields={this.getDateFieldStates()}
            />
        );
    }
}