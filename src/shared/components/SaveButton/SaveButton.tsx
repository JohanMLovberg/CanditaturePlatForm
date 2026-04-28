import * as React from "react";
import './SaveButton.scss';

export default function SaveButton(): JSX.Element {
  return (
    <button
      type="submit"
      className="primaryButton"
    >
      Save
    </button>
  );
}
