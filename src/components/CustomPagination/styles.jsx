import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  pagination: {
    '& .MuiPaginationItem-root': {
      color: theme.secondary.dark,
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: theme.primary.main,
      color: theme.background.main,
    },
    '& .MuiPaginationItem-page.Mui-selected:disabled': {
      backgroundColor: 'transparent',
      color: 'gray',
    },
    '& .MuiPaginationItem-page.Mui-selected:hover': {
      backgroundColor: theme.primary.light,
    },
  },
}));

export default useStyles;
