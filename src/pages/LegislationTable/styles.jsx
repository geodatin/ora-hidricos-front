import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  header: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchGorup: {
    display: 'flex',
    marginBottom: 25,
  },

  searchInput: {
    padding: '15px',
    border: `1px solid ${theme.neutral.gray.main}`,
    backgroundColor: theme.background.main,
    color: theme.secondary.dark,
    width: '600px',
    height: '40px',
    borderRadius: '8px',
  },

  searchIcon: {
    height: '40px',
    width: '50px',
    marginLeft: '-50px',
    color: theme.neutral.gray.main,
    backgroundColor: 'transparent',
    display: 'grid',
    placeItems: 'center',
    border: 'none',
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
  tableContainer: {
    zIndex: 99999,
    padding: '1rem',
  },
}));

export default useStyles;
