import React, { forwardRef } from 'react';
import errorIcon from '../assets/icon-error.svg';

const FormInput = forwardRef(
  ({ placeholder = '', errorMsg = '', valid = false }, ref) => {
    return (
      <div className="input-container">
        <div className={`form-group ${valid ? '' : 'invalid'}`}>
          <input
            ref={ref}
            type="text"
            className="form-input"
            placeholder={placeholder}
            maxLength={30}
          />
          {!valid && <img src={errorIcon} alt="error icon" />}
        </div>
        {!valid && <small>{errorMsg}</small>}
      </div>
    );
  },
);

export default FormInput;
