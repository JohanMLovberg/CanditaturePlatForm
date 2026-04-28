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
              <InputField
                className='BigInputField'
                name={'Information'}
                value={this.props.form.Information}
                onChange={this.props.onInputChange}
              />
            }
          />
          <Row
            label={"Responsible Representations"}
            element={
              <InputField
                name={'ResponsibleRepresentations'}
                value={this.props.form.ResponsibleRepresentations}
                onChange={this.props.onInputChange}
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