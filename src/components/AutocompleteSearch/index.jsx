/* eslint-disable no-unused-vars */
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Autocomplete, TextField } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import useStyles from './styles';

/**
 * This component renders a advanced filter
 * @returns Advanced Filter
 */
export default function AutocompleteSearch({
  TextFieldProps,
  onSelect,
  onInputChange,
  onChange,
  onClose,
  onOpen,
  paperClass,
  className,
  setInputValue,
  ...rest
}) {
  const classes = useStyles();
  const theme = useTheme();
  const inputRef = useRef();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete
      id="search-box"
      autoHighlight
      selectOnFocus
      classes={{ paper: classNames(classes.paper, paperClass) }}
      className={classNames(classes.root, className)}
      open={open}
      onOpen={(e) => {
        setOpen(true);
        onOpen(e);
      }}
      onClose={(e) => {
        setOpen(false);
        onClose(e);
      }}
      onInputChange={(e, newValue) => {
        setInputValue(newValue);
        onInputChange(e, newValue);
      }}
      clearIcon={
        <CloseRoundedIcon
          className={classes.addIcon}
          style={{ fontSize: 20, color: theme.secondary.dark }}
        />
      }
      popupIcon={
        <KeyboardArrowDownRoundedIcon
          className={classes.addIcon}
          style={{ fontSize: 20, color: theme.secondary.dark }}
        />
      }
      onChange={(e, newValue) => {
        onSelect(newValue);
        onChange(e, newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          margin="none"
          size="small"
          placeholder={t('specific.autocompletesearch.placeholder')}
          variant="outlined"
          classes={{ root: classes.textfield }}
          fullWidth
          {...TextFieldProps}
        />
      )}
      groupBy={(option) => option.type}
      {...rest}
    />
  );
}

AutocompleteSearch.defaultProps = {
  TextFieldProps: {},
  onInputChange: () => {},
  onChange: () => {},
  onClose: () => {},
  onOpen: () => {},
  paperClass: '',
  className: '',
};

AutocompleteSearch.propTypes = {
  TextFieldProps: PropTypes.shape(),
  onSelect: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  paperClass: PropTypes.string,
  className: PropTypes.string,
  setInputValue: PropTypes.func.isRequired,
};
