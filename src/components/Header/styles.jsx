import { createUseStyles } from 'react-jss';

import { breakpoints, layout, transitions } from '../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    height: layout.header.sizes.height,
    width: '100%',
    backgroundColor: theme.stroke.light,
    transition: transitions.bgColor,
  },
  button: {
    '&.MuiButtonBase-root': {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      textTransform: 'none',
      color: theme.neutral.gray.main,
      height: '100%',
      borderRadius: 0,
      padding: '0px 15px',

      '&:hover': {
        backgroundColor: theme.button.hover,

        '&:active': {
          backgroundColor: 'transparent',
        },
      },
      '&:active': {
        color: theme.secondary.dark,
      },
      '& .MuiTouchRipple-child, .MuiTouchRipple-childPulsate': {
        backgroundColor: theme.button.clicked,
      },
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15,
    userSelect: 'none',
    textDecoration: 'none',
    color: 'inherit',
  },
  logoDetail: {
    backgroundColor: theme.primary.main,
    width: 5,
    height: '100%',
    marginRight: 10,
  },
  menuItems: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  initialItems: {
    display: 'flex',
  },
  buttonWrapper: {
    display: 'flex',

    [breakpoints.max.md]: {
      display: 'none',
    },
  },
  endItems: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
  },
  separator: {
    backgroundColor: theme.stroke.dark,
    width: 1,
    height: 30,
    margin: '0px 10px',
    transition: transitions.bgColor,
  },
  logo: {
    height: 30,
    userSelect: 'none',

    '& > path': {
      fill: theme.secondary.dark,
    },
  },
  logoWrapper: {
    position: 'relative',
    display: 'flex',
  },
  caption: {
    position: 'absolute',
    right: 10,
    bottom: -3,
    fontWeight: 700,
    fontSize: 9,
    color: theme.primary.main,
    textTransform: 'uppercase',
  },
  menuButton: {
    [breakpoints.min.md]: {
      display: 'none',
    },
  },
}));

export default useStyles;
