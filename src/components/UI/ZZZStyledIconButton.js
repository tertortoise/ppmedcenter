import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import clsx from 'clsx';

const styles = (theme) => ({
  root: {},
});

const StyledIconButton = React.forwardRef((props, ref) => {
  const { classes, className, children, ...other } = props;
  return (
    <IconButton
      ref={ref}
      className={clsx(props.classes.root, props.className)}
      {...other}
    >
      {props.children}
    </IconButton>
  );
})

StyledIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StyledIconButton);
