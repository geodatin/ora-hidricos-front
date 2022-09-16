import { createUseStyles } from 'react-jss';

import { layout } from '../../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: `calc(100% - ${layout.header.sizes.height}px)`,
  },
  mainContainerWrapper: {
    position: 'relative',
    width: '100%',
    height: `calc(100% - ${layout.mobile.navbar.height}px)`,
  },
  navComponentWrapper: {
    zIndex: 1001,
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
      height: layout.mobile.navbar.height,
      backgroundColor: theme.stroke.light,
    },
  },
}));

export default useStyles;
