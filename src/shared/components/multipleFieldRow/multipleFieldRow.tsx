import * as React from "react";
import { MultipleFieldRowProps } from "../../../models/FieldModel";
import './multipleFieldRow.scss';

export default function MultipleFieldRow(props: MultipleFieldRowProps): JSX.Element {
  return (
    <div className="formRow">
      <div className="formLabel">
        {props.label}
        {props.required && <span className="required">*</span>}
      </div>
      <div className="formControl">
        <div className="multipleField">
          {props.firstElement}
          {props.secondLabel}
          {props.secondElement}
        </div>
        {props.error && (
          <div className="error">
            {props.error}
          </div>
        )}
      </div>
    </div>
  );
}