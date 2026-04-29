import * as React from "react";
import './TextAreaField.scss';
import { ITextAreaFieldProps } from "../../../models/FieldModel";

export default function TextAreaField(props: ITextAreaFieldProps): JSX.Element {
    return (
        <div>
            <textarea
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