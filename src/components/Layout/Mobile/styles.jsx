import { createUseStyles } from 'react-jss';

import { layout } from '../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: `calc(100% - ${layout.header.sizes.height}px)`,
  },
  mainContainerWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  navComponentWrapper: {
    zIndex: 10000,
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: theme.background.main,
  },
  nav: {
    zIndex: 9999,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,

    '&.MuiBottomNavigation-root': {
      backgroundColor: theme.stroke.light,
    },
  },
}));

export default useStyles;