import { createUseStyles } from 'react-jss';

import BlueStationDark from '../../../assets/icons/map/blue-station-dark.png';
import BlueStationLight from '../../../assets/icons/map/blue-station-light.png';
import GrayStationDark from '../../../assets/icons/map/gray-station-dark.png';
import GrayStationLight from '../../../assets/icons/map/gray-station-light.png';
import GreenStationDark from '../../../assets/icons/map/green-station-dark.png';
import GreenStationLight from '../../../assets/icons/map/green-station-light.png';
import OrangeStationDark from '../../../assets/icons/map/orange-station-dark.png';
import OrangeStationLight from '../../../assets/icons/map/orange-station-light.png';
import { darkScheme } from '../../../constants/schemes';

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
  slideLine: {
    width: '200px',
    height: '8px',
    backgroundImage:
      'linear-gradient(90deg, rgba(0,255,255,1) 0%, rgba(0,142,255,1) 40%, rgba(0,55,255,1) 70%, rgba(0,0,163,1) 100%)',
    border: 'none',
  },
  legendContainerSlide: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '4px',
  },
  itemsSlide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  legendContentSlide: {
    padding: 2,
    height: '40px',
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
  legendBall: {
    position: 'relative',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  legendContent: {
    padding: 10,
  },
  legendItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    marginBottom: 10,

    '&:last-of-type': { marginBottom: 0 },
  },
  legendIcon: {
    width: 17,
    marginRight: 5,
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 300,
    height: '400px',
    overflow: 'auto',
    zIndex: 999,
  },
  dashedLine: {
    width: 17,
    height: 1,
    marginRight: 5,
    border: '1px solid',
    borderStyle: 'dashed',
    transform: 'rotate(-45deg)',
  },
  '@keyframes pulseRing': {
    '0%': {
      transform: 'translate(-50%, -50%) scale(0.33)',
    },
    '80%, 100%': {
      transform: 'translate(-50%, -50%)',
      opacity: 0,
    },
  },
  '@keyframes pulseDot': {
    '0%': {
      transform: 'translate(-50%, -50%) scale(1)',
    },
    '50%': {
      transform: 'translate(-50%, -50%) scale(1.25)',
    },
    '100%': {
      transform: 'translate(-50%, -50%) scale(1)',
    },
  },
  orangePulsatingCircle: {
    position: 'absolute',

    '&::after': {
      content: "''",
      width: '20px',
      height: '20px',
      background:
        theme === darkScheme
          ? `url(${OrangeStationDark})`
          : `url(${OrangeStationLight})`,
      backgroundSize: '20px 20px',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseDot infinite 1.25s',
    },
    '&::before': {
      content: "''",
      width: '50px',
      height: '50px',
      backgroundColor: 'red',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseRing infinite 1.25s',
      pointerEvents: 'none',
    },
  },
  bluePulsatingCircle: {
    position: 'absolute',

    '&::after': {
      content: "''",
      width: '20px',
      height: '20px',
      background:
        theme === darkScheme
          ? `url(${BlueStationDark})`
          : `url(${BlueStationLight})`,
      backgroundSize: '20px 20px',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseDot infinite 1.25s',
    },
    '&::before': {
      content: "''",
      width: '50px',
      height: '50px',
      backgroundColor: 'red',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseRing infinite 1.25s',
      pointerEvents: 'none',
    },
  },
  grayPulsatingCircle: {
    position: 'absolute',

    '&::after': {
      content: "''",
      width: '20px',
      height: '20px',
      background:
        theme === darkScheme
          ? `url(${GrayStationDark})`
          : `url(${GrayStationLight})`,
      backgroundSize: '20px 20px',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseDot infinite 1.25s',
    },
    '&::before': {
      content: "''",
      width: '50px',
      height: '50px',
      backgroundColor: 'red',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseRing infinite 1.25s',
      pointerEvents: 'none',
    },
  },
  greenPulsatingCircle: {
    position: 'absolute',

    '&::after': {
      content: "''",
      width: '20px',
      height: '20px',
      background:
        theme === darkScheme
          ? `url(${GreenStationDark})`
          : `url(${GreenStationLight})`,
      backgroundSize: '20px 20px',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseDot infinite 1.25s',
    },
    '&::before': {
      content: "''",
      width: '50px',
      height: '50px',
      backgroundColor: 'red',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseRing infinite 1.25s',
      pointerEvents: 'none',
    },
  },
  alertStationLegend: {
    position: 'relative',
    width: 17,
    height: 17,
    marginRight: 5,

    '&::after': {
      content: "''",
      width: 6,
      height: 6,
      backgroundColor: theme.stroke.dark,
      border: `solid 1px ${theme.stroke.dark}`,
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseDot infinite 1.25s',
    },
    '&::before': {
      content: "''",
      width: 17,
      height: 17,
      backgroundColor: 'red',
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      animation: '$pulseRing infinite 1.25s',
    },
  },
}));

export default useStyles;
