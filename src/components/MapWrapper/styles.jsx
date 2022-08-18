import { createUseStyles } from 'react-jss';

import { breakpoints } from '../../constants/constraints';

const useStyles = createUseStyles({
  mapContainer: {
    position: 'fixed',
    left: 0,
    right: 500,
  },
  itemContainer: {
    position: 'absolute',
    left: 290,
    top: 10,

    '& > div': {
      marginBottom: 10,
    },

    [breakpoints.max.md]: {
      left: 'initial',
      right: 10,
    },
    transition: 'all 0.5s ease',
  },

  itemContainerZ: {
    position: 'absolute',
    left: 10,
    top: 10,

    '& > div': {
      marginBottom: 10,
    },

    [breakpoints.max.md]: {
      left: 'initial',
      right: 10,
    },
    transition: 'all 0.5s ease',
  },

  northIcon: {
    position: 'absolute',
    height: 30,
    right: 490,
    top: 10,
    zIndex: 997,

    [breakpoints.max.md]: {
      right: 'initial',
      left: 10,
    },
    transition: 'all 0.5s ease',
  },

  northIconZ: {
    position: 'absolute',
    height: 30,
    right: 10,
    top: 10,
    zIndex: 997,

    [breakpoints.max.md]: {
      right: 'initial',
      left: 10,
    },
    transition: 'all 0.5s ease',
  },
  geodatinLogoWrapper: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 997,
  },
  geodatinLogo: {
    height: 25,
  },
  tileLayer: {
    filter: 'invert(1) hue-rotate(200deg) brightness(0.9)',
  },
});

export default useStyles;
