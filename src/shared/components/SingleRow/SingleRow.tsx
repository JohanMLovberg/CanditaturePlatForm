import * as React from "react";
import './SingleRow.scss';
import { RowProps } from "../../../models/FieldModel";

export default function Row(props: RowProps): JSX.Element {
  return (
    <div className="formRow">
      <div className="formLabel">
        {props.label}
        {props.required &&
          <span className="required">*</span>
        }
      </div>
      <div className="formControl">
        {props.element}

        {props.underLabel && (
          <div>({props.underLabel})</div>
        )}

        {props.error && (
          <div className="error">
            {props.error}
          </div>
        )}
      </div>
    </div>
  );
}