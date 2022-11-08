import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  tableContainer: {
    zIndex: 99999,
    padding: '1rem 30rem 5rem 10rem',
  },

  tittle: {
    fontSize: '2.125rem',
    fontWeight: '300',
    lineHeight: '2.235rem',
    margin: '50px 0',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },

  text: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: '300',
    marginBottom: '10px',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },

  subtitle: {
    fontSize: '1.25rem',
    fontWeight: '400',
    lineHeight: '1.6rem',
    margin: '40px 0 20px 0',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
}));

export default useStyles;
