import * as React from "react";
import { IInputFieldProps } from "../../../models/FieldModel";
import './InputField.scss';

export default function InputField(props: IInputFieldProps): JSX.Element {
  return (
    <div >
      <input
        type="text"
        className={props.className}
        name={props.name}
        value={props.value}
        onChange={(ev) =>
          props.onChange(ev.target.name, ev.target.value)
        }
      />
    </div>
  );
}
