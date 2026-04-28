import * as React from "react";
import { ICheckboxProps } from "../../../models/FieldModel";

export default function Checkbox(props: ICheckboxProps): JSX.Element {
  return (
    <div>
      <input
        type="checkbox"
        id={props.name}
        className={props.className}
        name={props.name}
        checked={props.value}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
          props.onChange(ev.target.name, ev.target.checked)
        }
      />
    </div>
  );
}