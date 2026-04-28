import * as React from 'react';
import { ICandidaturesViewProps } from "../../models/CandidaturesModel";
import SaveButton from '../../shared/components/SaveButton/SaveButton';
import CancelButton from '../../shared/components/CancelButton/CancelButton';
import InputField from '../../shared/components/InputField/InputField';
import DropDownField from '../../shared/components/DropDownField/DropDownField';
import DateField from '../../shared/components/DateField/DateField';
import Checkbox from '../../shared/components/Checkbox/Checkbox';
import './Candidatures.scss';
import { CandidatureStatus, ClearingHouseCategory } from '../../utils/consts/DropDownConsts';
import PopUpWindow from '../../shared/components/PopUpWindow/PopUpWindow';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import Row from '../../shared/components/SingleRow/SingleRow';

export default class CandidaturesView extends React.Component<ICandidaturesViewProps> {
  public render(): React.ReactElement<ICandidaturesViewProps> {
    return (
      <div className="formWrapper">
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
        <form onSubmit={this.props.onSubmit} className="formContainer">
          <div className="titleRow">
            <h1 className='title'>
              Candidatures
            </h1>
          </div>
          <Row
            label="Election"
            element={
              <DropDownField
                name="Election"
                value={this.props.form.Election ? String(this.props.form.Election.Id) : ""}
                onChange={this.props.onInputChange}
                options={
                  this.props.elections
                    ? this.props.elections.map((election) => ({
                      value: election.Id,
                      label: election.Title
                    }))
                    : []
                }
              />
            }
          />
          <Row
            label="Country"
            required
            error={this.props.errors.Country}
            element={
              <DropDownField
                name="Country"
                value={this.props.form.Country ? String(this.props.form.Country.Id) : ""}
                onChange={this.props.onInputChange}
                options={
                  this.props.countries
                    ? this.props.countries.map((country) => ({
                      value: country.Id,
                      label: country.Title
                    }))
                    : []
                }
              />
            }
          />
          <Row
            label='Person Specific Candidature'
            element={
              <Checkbox
                name='PersonSpecificCandidature'
                value={this.props.form.PersonSpecificCandidature}
                onChange={this.props.onInputChange}
              />
            }
          />
          <Row
            label="Candidature Status"
            required
            error={this.props.errors.CandidatureStatus}
            element={
              <DropDownField
                name="CandidatureStatus"
                value={this.props.form.CandidatureStatus ? String(this.props.form.CandidatureStatus) : ""}
                onChange={this.props.onInputChange}
                options={CandidatureStatus}
              />
            }
          />
          <Row
            label="Clearing House Category"
            element={
              <DropDownField
                name="ClearingHouseCategory"
                value={this.props.form.ClearingHouseCategory ? String(this.props.form.ClearingHouseCategory) : ""}
                onChange={this.props.onInputChange}
                options={ClearingHouseCategory}
              />
            }
          />
          <Row
            label="Announcement Date"
            error={this.props.errors.AnnouncementDate}
            element={
              <DateField
                name="AnnouncementDate"
                value={this.props.form.AnnouncementDate}
                onChange={this.props.onInputChange}
              />
            }
          />
          <Row
            label={"VotesRecived"}
            element={
              <InputField
                name={'VotesRecived'}
                value={this.props.form.VotesRecived}
                onChange={this.props.onInputChange}
              />
            }
          />
          <div className="formRow">
            <div className="buttonRow">
              <SaveButton />
              <CancelButton
                onClick={this.props.onCancel}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
