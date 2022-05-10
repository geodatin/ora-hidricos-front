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
}));

export default useStyles;
