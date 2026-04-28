import * as React from 'react';
import { IMultiSelectDropDownState, IMultiSelectDropdownProps } from '../../../models/FieldModel';
import './MultiSelectDropDownField.scss';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

export default class MultiSelectDropDownField extends React.Component<IMultiSelectDropdownProps, IMultiSelectDropDownState> {
	constructor(props: IMultiSelectDropdownProps) {
		super(props);
		this.state = {
			selectedItems: this.props.values ? this.props.values : [],
			selectedItem: undefined
		};
	}

	public componentDidUpdate(prevProps: IMultiSelectDropdownProps) {
		if (this.props.values && prevProps.values !== this.props.values) {
			this.setState({
				selectedItems: this.props.values
			});
		}
	}

	public onChangeMultiSelect = (item: IDropdownOption): void => {
		const updated = [...this.state.selectedItems];

		if (item.selected) {
			updated.push(item.key as string);
		} else {
			const index = updated.indexOf(item.key as string);
			if (index > -1) updated.splice(index, 1);
		}

		this.setState({ selectedItems: updated }, () => {
			this.props.onChange(this.props.name, updated);
		});
	}

	private removeItem = (key: string) => {
		const updated = this.state.selectedItems.filter(item => item !== key);

		this.setState({
			selectedItems: updated
		}, () => {
			this.props.onChange(this.props.name, updated);
		});
	};

	private onRenderTitle = (options?: IDropdownOption[]): JSX.Element => {
		return (
			<div className="custom-dropdown-title">
				{options.map(opt => (
					<span key={opt.key} className="dropdown-chip">
						<span className="dropdown-chip-text">{opt.text}</span>
						<IconButton
							iconProps={{ iconName: 'Cancel' }}
							className="dropdown-chip-remove"
							onClick={(e) => {
								e.stopPropagation();
								this.removeItem(opt.key as string);
							}}
						/>
					</span>
				))}
			</div>
		);
	};

	public render() {
		const mappedOptions: IDropdownOption[] = [...this.props.options]
			.sort((a, b) => a.label.localeCompare(b.label))
			.map((opt) => ({
				key: opt.value,
				text: opt.label,
			}));

		return (
			<Dropdown
				placeHolder="Please select a value"
				selectedKeys={this.state.selectedItems}
				multiSelect
				options={mappedOptions}
				onChanged={this.onChangeMultiSelect}
				onRenderTitle={this.onRenderTitle}
			/>
		);
	}
}