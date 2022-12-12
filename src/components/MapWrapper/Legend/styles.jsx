import { createUseStyles } from 'react-jss';

import { transitions } from '../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  container: {
    position: 'absolute',
    backgroundColor: theme.background.main,
    color: theme.secondary.dark,
    width: 45,
    height: 45,
    zIndex: 997,
    borderRadius: 5,
    border: `1px solid ${theme.stroke.dark}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '-550px',
  },
  button: {
    '&.MuiButtonBase-root': {
      color: theme.secondary.dark,
      transition: transitions.bgColor,
      borderRadius: 5,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 45,
      height: 45,
      minWidth: 0,
      minHeight: 0,
      overflow: 'hidden',

      '&:hover': {
        backgroundColor: theme.button.hover,

        '&:active': {
          '&::before': {
            backgroundColor: theme.button.clicked,
          },
        },
      },
      '&::before': {
        position: 'absolute',
        content: "''",
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        transition: 'background-color .2s ease',
        opacity: 0.4,
        zIndex: 0,
      },
    },
  },
  popup: {
    position: 'absolute',
    zIndex: 1,
    left: 45,
    top: 0,
    backgroundColor: theme.background.main,
    borderRadius: 5,
    border: `1px solid ${theme.stroke.dark}`,
  },
}));

export default useStyles;
