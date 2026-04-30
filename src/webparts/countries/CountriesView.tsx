import * as React from 'react';
import { ICountriesViewProps } from '../../models/CountriesModel';
import './Countries.scss';
import SaveButton from '../../shared/components/SaveButton/SaveButton';
import CancelButton from '../../shared/components/CancelButton/CancelButton';
import PopUpWindow from '../../shared/components/PopUpWindow/PopUpWindow';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import Row from '../../shared/components/SingleRow/SingleRow';
import InputField from '../../shared/components/InputField/InputField';
import DropDownField from '../../shared/components/DropDownField/DropDownField';
import TextAreaField from '../../shared/components/TextAreaField/TextAreaField';
import MultiSelectDropDownField from '../../shared/components/MultiSelectDropDown/MultiSelectDropDownField';

export default class CountriesFormView extends React.Component<ICountriesViewProps> {
	public render(): React.ReactElement<ICountriesViewProps> {
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
				<div className="titleRow">
					<h1 className='title'>Countries</h1>
				</div>
				<form onSubmit={this.props.onSubmit} className="formContainer">

					<Row
						label='Name'
						required
						element={
							<InputField
								name='Name'
								value={this.props.form.Name}
								onChange={this.props.onInputChange}
							/>
						}
					/>

					<Row
						label='Abbreviaton'
						required
						element={
							<InputField
								name='Name'
								value={this.props.form.Abbreviation}
								onChange={this.props.onInputChange}
							/>
						}
					/>

					<Row
						label='Major Area'
						required
						element={
							<DropDownField
								name='MajorArea'
								value={this.props.form.MajorArea.label}
								options={this.props.majorAreas}
								onChange={this.props.onInputChange}
							/>
						}
					/>

					<Row
						label='Regional Group'
						element={
							<DropDownField
								name='RegionalGroup'
								value={this.props.form.RegionalGroup.label}
								options={this.props.regionalGroups}
								onChange={this.props.onInputChange}
							/>
						}
					/>

					<Row
						label='Description'
						element={
							<TextAreaField
								name='Name'
								value={this.props.form.Description}
								onChange={this.props.onInputChange}
							/>
						}
					/>

					<Row
						label='Responsible Representations'
						element={
							<MultiSelectDropDownField
								name='ResponsibleRepresentations'
								values={this.props.form.ResponsibleRepresentations.map(item => String(item.Id)) || []}
								options={this.props.responsibleRepresentations ? this.props.responsibleRepresentations.map((representation) => ({
                                    value: representation.Id ? String(representation.Id) : "",
                                    label: representation.Name
                                })) : []}
								placeholder='Please select a value...'
								onChange={this.props.onInputChange}
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