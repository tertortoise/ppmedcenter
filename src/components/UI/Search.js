import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 0,
  },
}));

const Search = (props) => {
  const classes = useStyles();

  const searchPreProcessor = (e) => {
    /** preprocessing searchstring to match cyrillic letters with whitespaces only */
    const regexp = /[\u0430-\u044f\s]+/gi;
    const interim = e.target.value.match(regexp);
    let refined = '';
    if (interim && interim[0] !== ' ') {
      refined = interim.join('').replace(/\s{2,}/g, ' ');
    }
    props.changeSearchHandler(refined);
  };

  return (
    <TextField
      className={clsx(classes.root)}
      variant='outlined'
      label={props.label}
      color='primary'
      margin='dense'
      placeholder={props.placeholder}
      value={props.value}
      onChange={searchPreProcessor}
      helperText={props.helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

Search.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  changeSearchHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default Search;
