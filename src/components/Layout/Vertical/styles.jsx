import { createUseStyles } from 'react-jss';

import { layout } from '../../../constants/constraints';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    height: `100%`,
  },
  upRow: {
    height: layout.upRow.sizes.height,
  },
  mainContainer: {
    height: '100%',
  },
  downRow: {
    height: 200,
  },
});

export default useStyles;
