import * as React from 'react';
import './PopUpWindow.scss';
import { IPopUpWindow } from '../../../models/FieldModel';

export default function PopUpWindow({ onClose, success, message, closeButton }: IPopUpWindow): JSX.Element {
  const stateClass = success
    ? 'PopUpWindowSuccess'
    : 'PopUpWindowError';

  return (
    <div className="PopUpWindowOverlay">
      <div className={`PopUpWindowPopup ${stateClass}`}>

        <div className="PopUpWindowHeader">
          <h1 className="PopUpWindowTitle">
            {success ? 'Submission successful' : 'Submission failed'}
          </h1>
        </div>

        <div className="PopUpWindowBody">
          <text className="PopUpWindowMessage">{message}</text>
        </div>

        <div className="PopUpWindowFooter">
          {closeButton && (
            <button
              className="PopUpWindowButton PopUpWindowCloseBtn"
              onClick={onClose}
            >
              OK
            </button>
          )}
        </div>

      </div>
    </div>
  );
}