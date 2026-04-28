import * as React from "react";
import { IDropDownFieldProps } from "../../../models/FieldModel";

export default function DropDownField(props: IDropDownFieldProps): JSX.Element {
  const {
    name,
    value,
    options,
    className = "",
    onChange
  } = props;

  return (
    <div>
      <select
        className={className}
        name={name}
        value={value}
        onChange={(ev) =>
          onChange(ev.target.name, ev.target.value)
        }
      >
        <option value="">Please select a value</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
