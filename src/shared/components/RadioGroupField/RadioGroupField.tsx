import { IRadioGroupFieldProps } from "../../../models/FieldModel";
import RadioButton from "../RadioButton/RadioButton";
import * as React from "react";

export function RadioGroupField(props: IRadioGroupFieldProps): JSX.Element {
  const { name, label, value, required, underLabel, onChange } = props;

  return (
    <div className="formRow">
      <div className="formLabel">
        {label}
        { required && 
					<span className="required">*</span>
        }
      </div>

      <div className="formControl">
        <RadioButton
          name={name}
          label="Yes"
          value={true}
          checkedValue={value}
          onChange={onChange}
        />
        <RadioButton
          name={name}
          label="No"
          value={false}
          checkedValue={value}
          onChange={onChange}
        />

        {underLabel && <div>{underLabel}</div>}
      </div>
    </div>
  );
}