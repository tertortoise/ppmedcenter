import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SelectableButton from '../UI/SelectableButton';
import { withStyles } from '@material-ui/styles';

const styleSheet = (theme) => ({
  BtnItem: {
    '&:not(:last-child)': {
      paddingRight: theme.spacing(1),
    },
  },
});

const ApptSpecSwitch = (props) => {
  let selectedSpecialities = false;
  let selectedDoctors = false;
  if (props.alt === 'specialities') {
    selectedSpecialities = true;
  } else if (props.alt === 'doctors') {
    selectedDoctors = true;
  }

  return (
    <Fragment>
      <div className={props.classes.BtnItem}>
        <SelectableButton
          color='primary'
          variant='outlined'
          size='small'
          onClick={(e) => props.switchHandler(e, 'specialities')}
          selected={selectedSpecialities}
        >
          По специальности
        </SelectableButton>
      </div>
      <div className={props.classes.BtnItem}>
        <SelectableButton
          color='primary'
          variant='outlined'
          size='small'
          onClick={(e) => props.switchHandler(e, 'doctors')}
          selected={selectedDoctors}
        >
          По Ф.И.О. врача
        </SelectableButton>
      </div>
    </Fragment>
  );
};

ApptSpecSwitch.propTypes = {
  switchHandler: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(ApptSpecSwitch);
