import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import PopUpWindow from "../../shared/components/PopUpWindow/PopUpWindow";
import { IRepresentationsViewProps } from '../../models/RepresentationsModel';
import InputField from '../../shared/components/InputField/InputField';
import DropDownField from '../../shared/components/DropDownField/DropDownField';
import Checkbox from '../../shared/components/Checkbox/Checkbox';
import SaveButton from '../../shared/components/SaveButton/SaveButton';
import CancelButton from '../../shared/components/CancelButton/CancelButton';
import { Kind } from '../../utils/consts/DropDownConsts';
import './Representations.scss';
import UserPicker from '../../shared/components/userPicker/userPicker';
import Row from '../../shared/components/SingleRow/SingleRow';

export default class RepresentationsView extends React.Component<IRepresentationsViewProps> {
  public render(): React.ReactElement<IRepresentationsViewProps> {
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
              Representations
            </h1>
          </div>
          <Row
            label={"Name"}
            required
            error={this.props.errors.Name}
            element={
              <InputField
                name={'Name'}
                value={this.props.form.Name}
                onChange={this.props.onInputChange}
              />
            }
          />
          <Row
            label={"Abbreviation"}
            required
            error={this.props.errors.Abbreviation}
            element={
              <InputField
                name={'Abbreviation'}
                value={this.props.form.Abbreviation}
                onChange={this.props.onInputChange}
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
            label='Depricated'
            element={
              <Checkbox
                name='Depricated'
                value={this.props.form.Depricated}
                onChange={this.props.onInputChange}
              />
            }
          />
          <Row
            label="Description"
            element={
              <InputField
                className='BigInputField'
                name={'Description'}
                value={this.props.form.Description}
                onChange={this.props.onInputChange}
              />
            }
          />

          <Row
            label="Mailbox"
            element={
              <InputField
                name={'Mailbox'}
                value={this.props.form.Mailbox}
                onChange={this.props.onInputChange}
              />
            }
          />
          <Row
            label="Primary Contact"
            required
            error={this.props.errors.PrimaryContact}
            element={
              <div>
                <UserPicker
                  value={this.props.form.PrimaryContact.Title}
                  keyValue={this.props.form.PrimaryContact.Id}
                  itemLimit={1}
                  onUserSelected={(user) => this.props.onInputChange('PrimaryContact', user)}
                  onResolveSuggestions={this.props.onResolveSuggestions}
                  clearSelection={this.props.resetUser}
                />
              </div>
            }
          />
          <Row
            label="Kind"
            required
            error={this.props.errors.Kind}
            element={
              <DropDownField
                name="Kind"
                value={this.props.form.Kind ? String(this.props.form.Kind) : ""}
                onChange={this.props.onInputChange}
                options={Kind}
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