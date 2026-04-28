import * as React from "react";
import { IDateFieldProps } from "../../../models/FieldModel";

export default function DateField(props: IDateFieldProps): JSX.Element {
  return (
    <div>
      <input
        className={props.className}
        type="date"
        name={props.name}
        value={props.value || ""}
        onChange={(e) =>
          props.onChange(e.target.name, e.target.value)
        }
      />
    </div>
  );
}