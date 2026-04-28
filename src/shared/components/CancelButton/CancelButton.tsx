import * as React from "react";
import './CancelButton.scss';
import { ICancelButtonProps } from "../../../models/FieldModel";

export default function CancelButton(props: ICancelButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className="secondaryButton"
      onClick={props.onClick}
    >
      Cancel
    </button>
  );
}
