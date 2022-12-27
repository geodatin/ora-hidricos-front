import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  separator: {
    margin: '20px 0px',
    height: 1,
    width: '100%',
    backgroundColor: theme.stroke.dark,
  },
  noSelectionText: {
    color: theme.neutral.gray.main,
  },
  autocompleteGroup: {
    '&.MuiListSubheader-root': {
      fontSize: 12.8,
      backgroundColor: theme.popup.background,
      height: 40,
      paddingLeft: 15,
      transform: 'translateY(0px)',
    },
  },
  autocompletePaper: {
    '&::after': {
      content: "''",
      width: 'calc(100% - 20px)',
      height: 13,
      backgroundColor: theme.popup.background,
      position: 'fixed',
      left: 0,
      top: 5,
      borderRadius: '5px 0px 0px 0px',
    },
  },
}));

export default useStyles;
