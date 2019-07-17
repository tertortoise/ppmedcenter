import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props) =>
      props.selected ? theme.palette.primary.light : null,

    color: (props) =>
      props.selected ? theme.palette.primary.dark : theme.palette.primary.main,
    fontWeight: (props) => (props.selected ? 700 : 400),
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.dark,
    },
    '&.Mui-disabled': {
      backgroundColor: (props) =>
        props.selected ? theme.palette.primary.light : null,
      color: (props) =>
        props.selected ? theme.palette.primary.dark : 'rgba(0, 0, 0, 0.26)',
    },
  },
}));

function SelectableButton(props) {
  const { selected, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

export default SelectableButton;
