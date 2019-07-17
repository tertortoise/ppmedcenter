import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import SelectableButton from '../UI/SelectableButton';

const styleSheet = (theme) => ({
  BtnItem: {
    '&:not(:last-child)': {
      paddingRight: theme.spacing(1),
    },
  },
});

const ApptProgress = ({
  classes,
  stageChangeHandler,
  activeStage: { type, next, prev },
}) => {
  let btn1Name = '1. ВЫБЕРИТЕ ВРАЧА',
    btn2Name = '2. ВЫБЕРИТЕ ДАТУ И ВРЕМЯ',
    btn3Name = '3. ПОДТВЕРДИТЕ ЗАПИСЬ';
  let btn1Selected = true,
    btn2Selected = false,
    btn3Selected = false;
  let btn1Disabled = false,
    btn2Disabled = true,
    btn3Disabled = true;
  if (type === 'specialities' || type === 'doctors') {
    btn1Disabled = true;
    btn2Disabled = !next;
  }
  if (type === 'schedule' || type === 'confirm' || type === 'confirmed') {
    btn1Selected = false;
    btn1Name = '1. ВЕРНУТЬСЯ К ВЫБОРУ ВРАЧА';
    if (type === 'schedule') {
      btn2Disabled = true;
      btn3Disabled = !next;
      btn2Selected = true;
    }
    if (type === 'confirm') {
      btn2Disabled = false;
      btn1Selected = false;
      btn3Selected = true;
      btn2Name = '2. ВЕРНУТЬСЯ К ВЫБОРУ ДАТЫ И ВРЕМЕНИ';
    }
    if (type === 'confirmed') {
      btn1Name = '1. ВЫБЕРИТЕ ВРАЧА';
      btn1Selected = false;
      btn3Selected = true;
      btn3Name = '3. ЗАПИСЬ ПОДТВЕРЖДЕНА';
    }
  }
  return (
    <Fragment>
      <div className={classes.BtnItem}>
        <SelectableButton
          color='primary'
          variant='outlined'
          onClick={(e) => stageChangeHandler(e, 'specialities')}
          selected={btn1Selected}
          disabled={btn1Disabled}
        >
          {btn1Name}
        </SelectableButton>
      </div>
      <div className={classes.BtnItem}>
        <SelectableButton
          color='primary'
          variant='outlined'
          onClick={(e) => stageChangeHandler(e, 'schedule')}
          selected={btn2Selected}
          disabled={btn2Disabled}
        >
          {btn2Name}
        </SelectableButton>
      </div>
      <div className={classes.BtnItem}>
        <SelectableButton
          color='primary'
          variant='outlined'
          onClick={(e) => stageChangeHandler(e, 'confirm')}
          selected={btn3Selected}
          disabled={btn3Disabled}
        >
          {btn3Name}
        </SelectableButton>
      </div>
    </Fragment>
  );
};

ApptProgress.propTypes = {
  activeStage: PropTypes.object.isRequired,
  stageChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(ApptProgress);
