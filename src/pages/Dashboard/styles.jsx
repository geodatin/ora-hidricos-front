import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  filtersWrapper: {
    minWidth: 370,
    borderRight: `1px solid ${theme.stroke.dark}`,
    overflow: 'auto',
    height: '100vh',
    padding: 8,
    backgroundColor: theme.background.main,
    zIndex: 998,
  },
  filtersMobileWrapper: {
    position: 'absolute',
    top: 'initial',
    overflow: 'auto',
    borderTop: `1px solid ${theme.stroke.dark}`,
    padding: 8,
    bottom: 0,
    height: 250,
    borderRadius: '10px 10px 0px 0px',
  },
  notificationsWrapper: {
    padding: 15,
    zIndex: 0,
  },
  notificationsMobileWrapper: { padding: 15 },
  breadBarWrapper: {
    padding: 15,
    marginLeft: 120,
  },
  mapWrapper: {},
  statisticsWrapper: {
    overflow: 'auto',
    minWidth: 400,
    borderLeft: `1px solid ${theme.stroke.dark}`,
  },
  statisticsMobileWrapper: {
    overflow: 'auto',
  },
  infoPanelWrapper: {
    minWidth: 480,
    borderLeft: `1px solid ${theme.stroke.dark}`,
    backgroundColor: theme.background.main,
    zIndex: 998,
  },
}));

export default useStyles;
