import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Delete, Create } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import DialogAlertMUI from '../UI/DialogAlertMUI';

const styleSheet = (theme) => ({
  LineCont: {
    display: 'flex',
    fontSize: '1.2rem',
    flexWrap: 'nowrap',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  TextCont: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  TextItem: {
    '&:not(:last-child)': {
      paddingRight: theme.spacing(1),
    },
    '&:first-child': {
      fontWeight: 'bold',
    },
  },
  Active: {
    color: theme.palette.primary.main,
  },
  Past: {
    color: theme.palette.grey[600],
  },
  ButtsCont: {
    display: 'flex',
    alignItems: 'center',
  },
});

class ApptsListLine extends Component {
  dialogYesHandler = () => {
    this.props.deleteApptHandler(this.props.appt.apptId);
  };

  render() {
    const { appt, classes, apptStatus } = this.props;
    let buttonBlock;
    if (this.props.showButtons && this.props.apptStatus === 'Active') {
      buttonBlock = (
        <div className={classes.ButtsCont}>
          <div>
            <IconButton
              color='secondary'
              onClick={(e) => this.props.editApptHandler(e, appt.apptId)}
            >
              <Create />
            </IconButton>
          </div>
          <div>
            <DialogAlertMUI
              renderBtnOpen={(handleClickOpen) => (
                <IconButton color='secondary' onClick={handleClickOpen}>
                  <Delete />
                </IconButton>
              )}
              title='Отмена записи'
              yesHandler={this.dialogYesHandler}
              btnNoName='Нет'
              btnYesName='Да, отменить!'
              btnYesColor="red"
            >
              <Fragment>
                <div>Подтвердите отмену записи к врачу.</div>
                <div>Номер талона: {appt.apptId}</div>
            <div>
              Дата: {appt.date
                .split('-')
                .reverse()
                .join('.')}
            </div>
            <div>Время: {appt.time}</div>
            <div>Врач: {appt.speciality.toLowerCase()}</div>
            <div>{appt.docFullName}</div>
              </Fragment>
            </DialogAlertMUI>
          </div>
        </div>
      );
    }
    return (
      <Fragment>
        <div className={classes.LineCont}>
          <div className={clsx(classes.TextCont, classes[apptStatus])}>
            <div className={classes.TextItem}>{appt.apptId}</div>
            <div className={classes.TextItem}>
              {appt.date
                .split('-')
                .reverse()
                .join('.')}
            </div>
            <div className={classes.TextItem}>{appt.time}</div>
            <div className={classes.TextItem}>{appt.speciality}</div>
            <div className={classes.TextItem}>{appt.docFullName}</div>
          </div>

          {buttonBlock}
        </div>
        
      </Fragment>
    );
  }
}

ApptsListLine.propTypes = {
  appt: PropTypes.object,
  deleteApptHandler: PropTypes.func,
  editApptHandler: PropTypes.func,
  apptStatus: PropTypes.oneOf(['Active', 'Past']),
  showButtons: PropTypes.bool,
};

export default withStyles(styleSheet)(ApptsListLine);
