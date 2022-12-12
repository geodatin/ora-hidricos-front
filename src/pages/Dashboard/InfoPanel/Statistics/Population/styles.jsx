import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  pagination: {
    '& .MuiPaginationItem-root': {
      color: theme.secondary.dark,
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: '#953828',
      color: theme.background.main,
    },
    '& .MuiPaginationItem-page.Mui-selected:disabled': {
      backgroundColor: 'transparent',
      color: 'gray',
    },
    '& .MuiPaginationItem-page.Mui-selected:hover': {
      backgroundColor: '#8a534a',
    },
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    padding: 15,
    marginBottom: 10,
  },
  fullScreenWrapper: {
    backgroundColor: theme.background.main,
    height: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    padding: 15,
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  tooltipInner: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartWrapper: {
    width: '100%',
    height: '300px',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  fullScreenChartWrapper: {
    width: '100%',
    height: '100%',
  },
  menu: {
    backgroundColor: theme.popup.background,
    '& .MuiMenuItem-root:hover': {
      backgroundColor: theme.popup.hover,
    },
    '& .MuiMenuItem-root.MuiMenuItem-gutters.Mui-selected': {
      backgroundColor: theme.popup.actived,
    },
  },
}));

export default useStyles;
