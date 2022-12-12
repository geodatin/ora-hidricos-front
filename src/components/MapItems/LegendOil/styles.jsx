import { createUseStyles } from 'react-jss';

import { darkScheme } from '../../../constants/schemes';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    backgroundColor: theme.background.main,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 60,
    left: 380,
    zIndex: 99999,
    padding: '0.5rem',
    width: '12rem',
    '@media (max-width: 600px)': {
      bottom: 120,
      left: 6,
    },
  },
  separator: {
    backgroundColor: theme.stroke.dark,
    margin: '5px 0px',
    width: '100%',
    height: 1,
  },
  title: {
    zIndex: 99999,
    color: theme === darkScheme ? '#FFFFFF' : '#000000',
    fontSize: '1.2em',
    fontWeight: 'bold',
    '@media (max-width: 600px)': {
      fontSize: '0.8em',
    },
  },

  subtitle: {
    color: theme.neutral.gray.main,
    '@media (max-width: 600px)': {
      fontSize: '0.7em',
    },
  },

  content: {
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    color: theme === darkScheme ? '#FFFFFF' : '#000000',
    margin: '0.2rem',
    fontSize: '1.2em',
    fontWeight: 'bold',
    '@media (max-width: 600px)': {
      fontSize: '0.8em',
    },
  },

  image: {
    height: '12px',
    width: '12px',
    marginRight: '0.5rem',
    marginLeft: '0.5rem',
  },
}));

export default useStyles;
