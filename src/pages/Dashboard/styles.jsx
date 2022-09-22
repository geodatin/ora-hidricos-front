import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  filtersNotificationsWrapper: {
    minWidth: 280,
  },
  filtersNotificationsWrapperZ: {
    minWidth: 280,
    zIndex: 0,
  },
  filtersWrapper: {
    borderRight: `1px solid ${theme.stroke.dark}`,
    borderBottom: `1px solid ${theme.stroke.dark}`,
    height: 400,
    padding: 15,
    backgroundColor: theme.background.main,
    zIndex: 998,
  },
  filtersMobileWrapper: {
    position: 'absolute',
    top: 'initial',
    bottom: 0,
    height: 450,
    borderRadius: '10px 10px 0px 0px',
    padding: 15,
  },
  notificationsWrapper: {
    padding: 15,
    zIndex: 0,
  },
  notificationsMobileWrapper: { padding: 15 },
  breadBarWrapper: {
    padding: 15,
    borderBottom: `1px solid ${theme.stroke.dark}`,
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
