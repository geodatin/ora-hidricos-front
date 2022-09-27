import { createUseStyles } from 'react-jss';

import { darkScheme } from '../../constants/schemes';

const useStyles = createUseStyles((theme) => ({
  markerClusterCustom: {
    background: '#00B9F1',
    border: '2px solid #067293',
    borderRadius: '50%',
    color: '#FFFFFF',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
  },
  markerClusterSmall: {
    backgroundColor: '#6fcc39c5',
    border: '4px solid #b5e28c81',
    borderRadius: '50%',
    color: theme === darkScheme ? '#FFFFFF' : '#000000',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    font: '12px',
  },

  markerClusterMedium: {
    backgroundColor: '#f0c20cce',
    border: '4px solid #f1d25783',
    backgroundClip: 'paddingBox',
    borderRadius: '50%',
    color: theme === darkScheme ? '#FFFFFF' : '#000000',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    font: '12px',
  },

  markerClusterLarge: {
    backgroundColor: '#f18017c5',
    border: '4px solid #fd9c737f',
    borderRadius: '50%',
    color: theme === darkScheme ? '#FFFFFF' : '#000000',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    font: '12px',
  },
  popup: {
    '& .leaflet-popup-content-wrapper': {
      backgroundColor: theme.background.main,
      borderRadius: 5,
      boxShadow: '2px 3px 6px 3px rgba(0,0,0,0.17)',
    },
    '& .leaflet-popup-tip': {
      backgroundColor: theme.background.main,
    },
    '& .leaflet-popup-content': {
      color: theme.secondary.dark,
    },
  },
  separator: {
    backgroundColor: theme.stroke.dark,
    margin: '5px 0px',
    width: '100%',
    height: 1,
  },
  popupItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 5,

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  popupItemTitle: {
    color: theme.neutral.gray.main,
  },
}));

export default useStyles;
