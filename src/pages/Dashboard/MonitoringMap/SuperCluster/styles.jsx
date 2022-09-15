import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  markerClusterSmall: {
    backgroundColor: '#8ac77eae',
    border: '5px solid #8ac77e2d',
    borderRadius: '50%',
    color: '#000',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
  },

  markerClusterMedium: {
    backgroundColor: '#e2ca40b2',
    border: '5px solid #e2ca4036',
    borderRadius: '50%',
    color: '#000',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
  },

  markerClusterLarge: {
    backgroundColor: '#f0721eab',
    border: '5px solid #f08e1e30',
    borderRadius: '50%',
    color: '#000',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
  },
}));

export default useStyles;
