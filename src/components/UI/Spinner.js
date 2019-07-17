import React from 'react';
import PropTypes from 'prop-types';

import styles from './Spinner.module.scss';

const Spinner = props => {
  return (
    <div className={styles.Spinner}>
      Загружаются {props.contentType}. Подождите пожалуйста ...
    </div>
  );
};

Spinner.propTypes = {
  contentType: PropTypes.string.isRequired
};

export default Spinner;