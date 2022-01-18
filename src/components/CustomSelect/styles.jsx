import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  root: {
    width: '100%',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.neutral.gray.main,
      borderRadius: 5,
    },
  },
  select: {
    '&.MuiSelect-select': {
      height: 10,
      minHeight: 10,
      padding: '9px 34px 9px 14px',
    },
  },
  selectEmphasis: {
    '&.MuiSelect-select': {
      height: 10,
      minHeight: 10,
      padding: '9px 34px 9px 14px',
      color: theme.primary.main,
    },
  },
  icon: {
    '&.MuiSelect-icon': {
      color: theme.secondary.dark,
    },
  },
}));

export default useStyles;