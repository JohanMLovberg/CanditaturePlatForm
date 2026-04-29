import * as React from 'react';
import { IMultiSelectDropdownProps } from '../../../models/FieldModel';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import './MultiSelectDropDownField.scss';

export default class MultiSelectDropDownField extends React.Component<IMultiSelectDropdownProps, {}> {

	private onChanged = (item: IDropdownOption): void => {
		var key = String(item.key);
		var current = this.props.values || [];
		var updated;

		if (current.indexOf(key) > -1) {
			updated = current.filter(function (x) { return x !== key; });
		} else {
			updated = current.concat([key]);
		}

		this.props.onChange(this.props.name, updated);
	};

	private removeItem = (key: string): void => {
		var current = this.props.values || [];

		var updated = current.filter(function (x) {
			return x !== key;
		});

		this.props.onChange(this.props.name, updated);
	};

	private onRenderTitle = (options?: IDropdownOption[]): JSX.Element => {
		if (!options) {
			return React.createElement('div', null);
		}

		return (
			<div className="custom-dropdown-title">
				{options.map(function (opt) {
					return (
						<span key={opt.key} className="dropdown-chip">
							<span className="dropdown-chip-text">{opt.text}</span>

							<IconButton
								iconProps={{ iconName: 'Cancel' }}
								onClick={function (e) {
									e.stopPropagation();
									this.removeItem(String(opt.key));
								}.bind(this)}
							/>
						</span>
					);
				}, this)}
			</div>
		);
	};

	public render(): JSX.Element {

		var mappedOptions = this.props.options.map(function (opt) {
			return {
				key: String(opt.value),
				text: String(opt.label)
			};
		});

		return (
			<Dropdown
				placeHolder={this.props.placeholder}
				multiSelect={true}
				options={mappedOptions}
				selectedKeys={this.props.values || []}
				onChanged={this.onChanged}
				onRenderTitle={this.onRenderTitle}
			/>
		);
	}
}