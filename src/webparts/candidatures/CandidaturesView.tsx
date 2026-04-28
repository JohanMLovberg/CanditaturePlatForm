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
import { ISharePointGroup } from '../../models/ConstsModel';
import Row from '../../shared/components/SingleRow/SingleRow';

export default class CandidaturesView extends React.Component<ICandidaturesViewProps> {
  private disableClearingHouseCategory(selectedCountry: string): boolean {
    if (selectedCountry === "Denmark") return false;
    return true;
  }

  private showArchiveIdArchiveId(userGroups: ISharePointGroup[]): boolean {
    console.log(userGroups);
    for (const group of userGroups) {
      if (group.Title === "Candidature Platform Developers") {
        return false;
      }
    }
    return true;
  }

  public render(): React.ReactElement<ICandidaturesViewProps> {
    const disableClearingHouseCategory = this.disableClearingHouseCategory(this.props.form.Country.Title);
    const showArchiveIdField = this.showArchiveIdArchiveId(this.props.userGroups);
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
                options={this.props.elections
                  ? this.props.elections.map((election) => ({
                    value: election.Id,
                    label: election.Title
                  }))
                  : []}
                onChange={this.props.onInputChange}
              />
            }
          />

          <Row
            label="Country"
            error={this.props.errors.Country}
            required
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

          {this.props.form.PersonSpecificCandidature && (
            <Row
              label='Title'
              error={this.props.errors.Title}
              required
              element={
                <InputField
                  name="Title"
                  onChange={this.props.onInputChange}
                  value={this.props.form.Title}
                />
              }
            />
          )}

          {this.props.form.PersonSpecificCandidature && (
            <Row
              label='FullName'
              error={this.props.errors.FullName}
              required
              element={<InputField
                name="FullName"
                onChange={this.props.onInputChange}
                value={this.props.form.FullName}
              />
              }
            />
          )}

          <Row
            label='Candidature Status'
            error={this.props.errors.CandidatureStatus}
            required
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
            label='Clearing House Category'
            element={
              <DropDownField
                name="ClearingHouseCategory"
                value={this.props.form.ClearingHouseCategory ? String(this.props.form.ClearingHouseCategory) : ""}
                onChange={this.props.onInputChange}
                disabled={disableClearingHouseCategory}
                options={ClearingHouseCategory}
              />
            }
          />

          <Row
            label='Announcement Date'
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
            label='Votes Received'
            element={
              <InputField
                name={'VotesReceived'}
                value={this.props.form.VotesReceived}
                onChange={this.props.onInputChange}
              />
            }
          />

          {showArchiveIdField && (
            <Row
              label='ArchiveId'
              element={
                <InputField
                  name={'ArchiveId'}
                  value={this.props.form.ArchiveId}
                  onChange={this.props.onInputChange}
                />
              }
            />
          )}

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
