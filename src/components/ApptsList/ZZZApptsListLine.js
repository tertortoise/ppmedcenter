import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Delete, Create } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import Modal from '../UI/ZZZModal';
import ModalConfirm from '../UI/ZZZModalConfirm';
import styles from './ApptsListLine.module.scss';

const styleSheet = (theme) => ({
  LineCont: {
    display: 'flex',
    flexWrap: 'nowrap',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1),
    }
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
    }
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
  state = {
    modalOpen: false,
  };

  /** modal management */
  toggleScrollLock = () =>
    document.querySelector('html').classList.toggle('u-lock-scroll');

  modalOnOpen = () => {
    this.setState({ modalOpen: true }, () => {
      this.closeModalButton.focus();
    });
    this.toggleScrollLock();
  };

  modalOnClose = (e, type) => {
    this.setState({ modalOpen: false });
    this.openModalButton && this.openModalButton.focus();
    this.toggleScrollLock();
    if (type === 'confirm') {
      this.props.deleteApptHandler(this.props.appt.apptId);
    }
  };

  modalOnClickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.modalOnClose();
  };

  render() {
    const { appt, classes, apptStatus } = this.props;
    let buttonBlock;
    if (this.props.showButtons && this.props.apptStatus === 'Active') {
      buttonBlock = (
        <div className={classes.ButtsCont}>
          <div>
            <IconButton
              color='primary'
              onClick={(e) => this.props.editApptHandler(e, appt.apptId)}
            >
              <Create />
            </IconButton>
          </div>
          <div>
            <IconButton
              color='primary'
              onClick={(e) => this.modalOnOpen()}
              // ref={this.openModalButton}
              ref={(node) => (this.openModalButton = node)}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
      );
    }
    return (
      <Fragment>
        <div className={classes.LineCont}>
          <div className={clsx(classes.TextCont, classes[apptStatus])}>
            <div className={classes.TextItem}>{appt.apptId}</div>
            <div className={classes.TextItem}>{appt.date.split('-').reverse().join('.')}</div>
            <div className={classes.TextItem}>{appt.time}</div>
            <div className={classes.TextItem}>{appt.speciality}</div>
            <div className={classes.TextItem}>{appt.docFullName}</div>
          </div>

          {buttonBlock}
        </div>
        {this.state.modalOpen && (
          <Modal>
            <ModalConfirm
              appt={appt}
              modalOnClickAway={this.modalOnClickAway}
              modalOnClose={this.modalOnClose}
              buttonRef={(node) => (this.closeModalButton = node)}
              modalRef={(node) => (this.ModalNode = node)}
            >
              <div className={styles.ConfirmMessage}>
                <div>Вы отменяете прием врача:</div>
                <div>{appt.apptId}</div>
                <div>{appt.docFullName}</div>
                <div>{appt.speciality}</div>
                <div>{appt.dateTime}</div>
                <div>Подтверждаете?</div>
              </div>
            </ModalConfirm>
          </Modal>
        )}
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
