import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import PopUpWindow from "../../shared/components/PopUpWindow/PopUpWindow";
import { IElectionBodiesViewProps } from '../../models/ElectionBodiesModel';
import InputField from '../../shared/components/InputField/InputField';
import Checkbox from '../../shared/components/Checkbox/Checkbox';
import SaveButton from '../../shared/components/SaveButton/SaveButton';
import CancelButton from '../../shared/components/CancelButton/CancelButton';
import './ElectionBodies.scss';
import Row from '../../shared/components/SingleRow/SingleRow';
import MultiSelectDropDownField from '../../shared/components/MultiSelectDropDown/MultiSelectDropDownField';
import TextAreaField from '../../shared/components/TextAreaField/TextAreaField';

export default class ElectionBodiesView extends React.Component<IElectionBodiesViewProps> {
  public render(): React.ReactElement<IElectionBodiesViewProps> {
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
              Election Bodies
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
            label={"Information"}
            element={
              <TextAreaField
                name={'Information'}
                value={this.props.form.Information}
                onChange={this.props.onInputChange}
              />
            }
          />
          <Row
            label={"Responsible Representations"}
            element={
              <MultiSelectDropDownField
                name={'ResponsibleRepresentations'}
                placeholder="Please select a value"
                values={
                  Array.isArray(this.props.form.ResponsibleRepresentations)
                    ? this.props.form.ResponsibleRepresentations.map(function (x) {
                      return String(x.Id);
                    })
                    : []
                }
                onChange={this.props.onInputChange}
                options={
                  this.props.responsibleRepresentations
                    ? this.props.responsibleRepresentations.map(function (x) {
                      return {
                        value: String(x.Id),
                        label: x.Name
                      };
                    })
                    : []
                }
              />
            }
          />
          <Row
            label={"Depricated"}
            element={
              <Checkbox
                name='Depricated'
                value={this.props.form.Depricated}
                onChange={this.props.onInputChange}
              />
            }
          />
          <Row
            label={"Journal Plan Code"}
            required
            error={this.props.errors.JournalPlanCode}
            element={
              <InputField
                name={'JournalPlanCode'}
                value={this.props.form.JournalPlanCode}
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