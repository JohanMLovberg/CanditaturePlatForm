import * as React from 'react';
import { INumberInputFieldProps } from '../../../models/FieldModel';

export default function NumberInputField(props: INumberInputFieldProps): JSX.Element {
	return (
		<div>
			<input
				type="number"
				value={props.value}
				onChange={(e) =>
					props.onChange(props.name, parseInt(e.target.value, 10))
				}
				min={props.min}
			/>
		</div>
	);
}