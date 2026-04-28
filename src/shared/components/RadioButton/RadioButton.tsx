import * as React from "react";
import { IRadioButtonProps } from "../../../models/FieldModel";

export default function RadioButton(props: IRadioButtonProps): JSX.Element {
  return (
    <label>
      <input
        type="radio"
        name={props.name}
        checked={props.checkedValue === props.value}
        onChange={() => props.onChange(props.name, props.value)}
      />
      {props.label}
    </label>
  );
}
