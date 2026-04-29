import * as React from 'react';
import { IAgreementRegistryViewProps } from '../../models/AgreementRegistryModel';
import './AgreementRegistry.scss';

import PopUpWindow from '../../shared/components/PopUpWindow/PopUpWindow';
import MultiSelectDropDownField from '../../shared/components/MultiSelectDropDown/MultiSelectDropDownField';
import DropDownField from '../../shared/components/DropDownField/DropDownField';
import Checkbox from '../../shared/components/Checkbox/Checkbox';
import DateField from '../../shared/components/DateField/DateField';

import SaveButton from '../../shared/components/SaveButton/SaveButton';
import CancelButton from '../../shared/components/CancelButton/CancelButton';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import InputField from '../../shared/components/InputField/InputField';
import { IAgreementRegistryType, IDropDownData } from '../../models/ConstsModel';
import Row from '../../shared/components/SingleRow/SingleRow';

export default class AgreementRegistryView extends React.Component<IAgreementRegistryViewProps, any> {
    private getDateFieldStates = function (agreementStatus: IDropDownData) {
        var fieldStateMap: { [key: string]: { proposed: boolean; accepted: boolean; expired: boolean } } = {};

        fieldStateMap["Draft"] = { proposed: true, accepted: true, expired: true }; // Draft
        fieldStateMap["Final"] = { proposed: true, accepted: true, expired: true }; // Final
        fieldStateMap["Proposed"] = { proposed: false, accepted: true, expired: true }; // Proposed
        fieldStateMap["Accepted"] = { proposed: false, accepted: false, expired: true }; // Accepted 
        fieldStateMap["Expired"] = { proposed: false, accepted: false, expired: false }; // Expired
        fieldStateMap["Withdrawn"] = { proposed: false, accepted: false, expired: true }; // Withdrawn
        fieldStateMap["Ignored"] = { proposed: false, accepted: false, expired: true }; // Ignored
        fieldStateMap["Declined"] = { proposed: false, accepted: true, expired: true }; // Declined

        var key = agreementStatus && agreementStatus.value ? agreementStatus.value : null;
        var state = key && fieldStateMap[key] ? fieldStateMap[key] : { proposed: true, accepted: true, expired: true };

        return {
            proposedFieldDisabled: state.proposed,
            acceptedFieldDisabled: state.accepted,
            expiredFieldDisabled: state.expired
        };
    };

    public render() {
        const {
            proposedFieldDisabled,
            acceptedFieldDisabled,
            expiredFieldDisabled
        } = this.getDateFieldStates(this.props.form.AgreementStatus);

        return (
            <div className="container">
                {this.props.isSubmitting && (
                    <div className="spinnerOverlay">
                        <Spinner size={SpinnerSize.large} label="Submitting contract..." />
                    </div>
                )}
                {this.props.apiMessage && (
                    <PopUpWindow
                        onClose={this.props.closePopUpWindow}
                        success={this.props.apiMessage.success}
                        message={this.props.apiMessage.message}
                        closeButton={this.props.PopUpWindowCloseButton}
                    />
                )}
                <div className="titleRow">
                    <h1 className='title'>Agreement Registry</h1>
                </div>

                <form onSubmit={this.props.onSubmit} className="formContainer">
                    <Row
                        label="Agreement Type"
                        required
                        element={
                            <DropDownField
                                name='AgreementType'
                                value={this.props.form.AgreementType ? this.props.form.AgreementType.label : ""}
                                options={this.props.agreementType}
                                onChange={this.props.onInputChange}
                            />
                        }
                    />

                    <Row
                        label='Agreement Status'
                        error={this.props.errors.AgreementStatus}
                        required
                        element={
                            <DropDownField
                                name="AgreementStatus"
                                value={this.props.form.AgreementStatus ? this.props.form.AgreementStatus.label : ""}
                                options={this.props.agreementStatus}
                                onChange={this.props.onInputChange}
                            />
                        }
                    />

                    <Row
                        label='Is Counter Proposal'
                        element={
                            <Checkbox
                                name="IsCounterProposal"
                                value={this.props.form.IsCounterProposal ? true : false}
                                onChange={this.props.onInputChange}
                            />
                        }
                    />

                    <Row
                        label='Candidatures'
                        error={this.props.errors.Candidatures}
                        required
                        element={
                            <MultiSelectDropDownField
                                options={this.props.candidatures ? this.props.candidatures.map((candidature) => ({
                                    value: candidature.Id ? String(candidature.Id) : "-1",
                                    label: candidature.Title
                                })) : []}
                                placeholder='Please select a value...'
                                name="Candidatures"
                                onChange={this.props.onInputChange}
                                values={this.props.form.Candidatures.map(item => String(item.Id)) || []}
                            />
                        }
                    />

                    <Row
                        label='Partners'
                        error={this.props.errors.Partners}
                        required
                        element={
                            <MultiSelectDropDownField
                                options={this.props.partners ? this.props.partners.map((partner) => ({
                                    value: partner.Id ? String(partner.Id) : "-1",
                                    label: partner.Title
                                })) : []}
                                placeholder='Please select a value...'
                                name="Partners"
                                onChange={this.props.onInputChange}
                                values={this.props.form.Partners.map(item => String(item.Id)) || []}
                            />
                        }
                    />

                    <Row
                        label='Proposed by'
                        error={this.props.errors.ProposedBy}
                        required
                        element={
                            <DropDownField
                                options={this.props.proposedBy ? this.props.proposedBy.map((proposedBy) => ({
                                    value: proposedBy.Id ? String(proposedBy.Id) : "-1",
                                    label: proposedBy.Title
                                })) : []}
                                name="ProposedBy"
                                onChange={this.props.onInputChange}
                                value={this.props.form.ProposedBy ? String(this.props.form.ProposedBy.Id) : ""}
                            />
                        }
                    />

                    <Row
                        label='Proposed'
                        error={this.props.errors.Proposed}
                        element={
                            <DateField
                                name="Proposed"
                                value={this.props.form.Proposed}
                                onChange={this.props.onInputChange}
                                disabled={proposedFieldDisabled}
                            />
                        }
                    />

                    <Row
                        label='Accepted'
                        error={this.props.errors.Accepted}
                        element={
                            <DateField
                                name="Accepted"
                                value={this.props.form.Accepted}
                                onChange={this.props.onInputChange}
                                disabled={acceptedFieldDisabled}
                            />
                        }
                    />

                    <Row
                        label='Expired'
                        element={
                            <DateField
                                name="Expired"
                                value={this.props.form.Expired}
                                onChange={this.props.onInputChange}
                                disabled={expiredFieldDisabled}
                            />
                        }
                    />

                    <Row
                        label='Description'
                        element={
                            <InputField
                                name="Description"
                                value={this.props.form.Description}
                                onChange={this.props.onInputChange}
                            />
                        }
                    />

                    <Row
                        label='Related Agreements'
                        error={this.props.errors.RelatedAgreements}
                        element={
                            <MultiSelectDropDownField
                                options={this.props.relatedAgreements ? this.props.relatedAgreements.map((relatedAgreement) => ({
                                    value: relatedAgreement.Id ? String(relatedAgreement.Id) : "-1",
                                    label: relatedAgreement.Title
                                })) : []}
                                placeholder='Please select a value...'
                                name="RelatedAgreements"
                                onChange={this.props.onInputChange}
                                values={this.props.form.RelatedAgreements.map(item => String(item.Id)) || []}
                            />
                        }
                    />

                    <div className="buttonRow">
                        <SaveButton />
                        <CancelButton onClick={this.props.onCancel} />
                    </div>

                </form>
            </div>
        );
    }
}