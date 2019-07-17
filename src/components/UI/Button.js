import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = (props) => {
  const className = [styles.Button];
  if (props.btnTypes) {
    for (const type of props.btnTypes) {
      
      className.push(styles[type]);
    }
  }
  if (props.selected) {
    className.push(styles.Selected);
  }

  return (
    <button ref={props.buttonRef} className={className.join(' ')} disabled={props.disabled} onClick={props.clickHandler}>
      {props.btnName}
    </button>
  );
};

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  btnTypes: PropTypes.arrayOf(PropTypes.string),
  btnName: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  buttonRef: PropTypes.func,
};

export default Button;
