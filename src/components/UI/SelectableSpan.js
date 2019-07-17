import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './SelectableSpan.module.scss';

const SelectableSpan = ({classNames, selected, title, clickHandler, children}) => {
  return (
    <span className={clsx(styles.Span, selected && styles.Selected, classNames)} onClick={clickHandler} title={title}>
      {children}
    </span>
  );
};

SelectableSpan.propTypes = {
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  classNames: PropTypes.string,
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.selected === nextProps.selected) return true;
  else return false;
}

export default React.memo(SelectableSpan, areEqual);