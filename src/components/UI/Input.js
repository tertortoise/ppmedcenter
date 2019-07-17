import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Input.module.scss';

const Input = (props) => {
  const inputMessage = !props.readOnly && props.inputMessage ? props.inputMessage : <span>&nbsp;</span>;

  return (
    <div
      className={clsx(
        styles.Input,
        !props.readOnly && styles.Editable,
        props.touched && styles.Touched,
        !props.valid && styles.Invalid
      )}
    >
      
      <input
        className={styles.InputSpan}
        id={props.id}
        type={props.elementConfig.type}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        onBlur={props.blurred}
        readOnly={props.readOnly}
      />
      <label htmlFor={props.id} className={styles.LabelSpan}>
        {props.label}
      </label>
      <div className={styles.HelperSpan}>{inputMessage}</div>
    </div>
  );
};

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.object,
  value: PropTypes.string,
  label: PropTypes.string,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  changed: PropTypes.func,
  message: PropTypes.string,
};

export default Input;
