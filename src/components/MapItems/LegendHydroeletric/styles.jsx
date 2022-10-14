import { createUseStyles } from 'react-jss';

import { darkScheme } from '../../../constants/schemes';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    backgroundColor: theme.background.main,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 160,
    left: 20,
    zIndex: 99999,
    padding: '0.5rem',
    width: '18rem',
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
  },
  content: {
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    color: theme === darkScheme ? '#FFFFFF' : '#000000',
    margin: '0.2rem',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },

  image: {
    height: '12px',
    width: '12px',
    marginRight: '0.5rem',
    marginLeft: '0.5rem',
  },
}));

export default useStyles;
