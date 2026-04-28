import * as React from 'react';
import { IElectionViewProps } from '../../models/ElectionsModel';
import './Elections.scss';
import MultiSelectDropDownField from '../../shared/components/MultiSelectDropDown/MultiSelectDropDownField';
import NumberInputField from '../../shared/components/NumberInputField/NumberInputField';
import DateField from '../../shared/components/DateField/DateField';
import Checkbox from '../../shared/components/Checkbox/Checkbox';
import DropDownField from '../../shared/components/DropDownField/DropDownField';
import SaveButton from '../../shared/components/SaveButton/SaveButton';
import CancelButton from '../../shared/components/CancelButton/CancelButton';
import PopUpWindow from '../../shared/components/PopUpWindow/PopUpWindow';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import MultipleField from '../../shared/components/multipleFieldRow/multipleFieldRow';
import Row from '../../shared/components/SingleRow/SingleRow';
import { ElectionStatus, RegionalGroup } from '../../utils/consts/ElectionConsts';

export default class ElectionsFormView extends React.Component<IElectionViewProps> {
	public render(): React.ReactElement<IElectionViewProps> {
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
					<h1 className='title'>Elections</h1>
				</div>
				<form onSubmit={this.props.onSubmit} className="formContainer">
					<Row
						label="Body"
						required
						element={
							<DropDownField
								name="Body"
								value={this.props.form.Body}
								options={this.props.electionBodies}
								onChange={this.props.onInputChange}
							/>
						}
						error={this.props.errors.body}
					/>
					<Row
						label="Post"
						element={
							<DropDownField
								name="Post"
								value={this.props.form.Post}
								options={this.props.electionPosts}
								onChange={this.props.onInputChange}
							/>
						}
					/>
					<Row
						label="Regional Group"
						element={
							<DropDownField
								name="RegionalGroup"
								value={this.props.form.RegionalGroup}
								options={RegionalGroup}
								onChange={this.props.onInputChange}
							/>
						}
					/>
					<Row
						label="Status"
						element={
							<DropDownField
								name="Status"
								value={this.props.form.Status}
								onChange={this.props.onInputChange}
								options={ElectionStatus}
							/>
						}
						required
						error={this.props.errors.status}
					/>
					<MultipleField
						label={'Election Date'}
						secondLabel={'Tentative Date'}
						firstElement={
							<DateField
								name='electionDate'
								value={this.props.form.ElectionDate}
								onChange={this.props.onInputChange}
							/>
						}
						secondElement={
							<Checkbox
								name="TentativeDate"
								value={this.props.form.TentativeDate}
								onChange={(name, value) => this.props.onInputChange(name, value)}
							/>
						}
					/>
					<Row
						label="Announcement Deadline (if relevant)"
						element={
							<DateField
								name="AnnouncementDeadline"
								value={this.props.form.AnnouncementDeadline}
								onChange={this.props.onInputChange}
							/>
						}
					/>
					<MultipleField
						label={'Seats'}
						required
						secondLabel={'Tentative Seat Count'}
						firstElement={
							<NumberInputField
								name="Seats"
								value={this.props.form.Seats}
								onChange={(name, value) => this.props.onInputChange(name, value)}
								min={0}
							/>
						}
						secondElement={
							<Checkbox
								name="TentativeSeatCount"
								value={this.props.form.TentativeSeatCount}
								onChange={(name, value) => this.props.onInputChange(name, value)}
							/>
						}
						error={this.props.errors.seats}
					/>
					<Row
						label="Eligible For Vote Swaps"
						element={
							<Checkbox
								name="EligibleForVoteSwaps"
								className="EligibleForVoteSwaps"
								value={this.props.form.EligibleForVoteSwaps}
								onChange={(name, value) => this.props.onInputChange(name, value)}
							/>
						}
					/>
					<Row
						label="Danish Votes In Election"
						element={
							<NumberInputField
								name="DanishVotesInElection"
								value={this.props.form.DanishVotesInElection}
								onChange={(name, value) => this.props.onInputChange(name, value)}
								min={0}
							/>
						}
					/>
					<Row
						label="Responsible Line Authority"
						required
						element={
							<MultiSelectDropDownField
								name="ResponsibleLineAuthorities"
								options={this.props.responsibleLineAuthorities}
								placeholder="Select Authorities"
								onChange={this.props.onInputChange}
								values={this.props.form.ResponsibleLineAuthorities}
							/>
						}
						error={this.props.errors.responsibleLineAuthority}
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