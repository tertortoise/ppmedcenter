import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styleSheet = (theme) => ({
  btnYes: {
    color: (props) => props.btnYesColor ? props.btnYesColor : theme.palette.primary.main,
  },
  actionsDiv: {
    justifyContent: 'center',
  },
 
});

const DialogAlertMUI = (props) => {
  const {
    classes,
    children,
    renderBtnOpen,
    title,
    yesHandler,
    btnNoName,
    btnYesName,
  } = props;
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = (triggerYesHandler) => () => {
    setOpen(false);
    if (triggerYesHandler) yesHandler();
  }

  return (
    <Fragment>
      {renderBtnOpen(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' disableTypography>
        <Typography align="center" variant="h5">
          {title}
        </Typography>
        
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions className={classes.actionsDiv}>
          <Button onClick={handleClose(false)} color='primary' autoFocus>
            {btnNoName}
          </Button>
          <Button onClick={handleClose(true)} className={classes.btnYes}>
          {btnYesName}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DialogAlertMUI.propTypes = {
  renderBtnOpen: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  yesHandler: PropTypes.func.isRequired,
  btnNoName: PropTypes.string.isRequired,
  btnYesName: PropTypes.string.isRequired,
  btnYesColor: PropTypes.string,
};

export default withStyles(styleSheet)(DialogAlertMUI);
