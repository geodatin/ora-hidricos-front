import { createUseStyles } from 'react-jss';

import { layout } from '../../../../constants/constraints';

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: `calc(100% - ${layout.header.sizes.height}px)`,
  },
  bar: {
    display: 'flex',
    flexFlow: 'row nowrap',
    borderBottom: 'solid 1px',
    borderBottomColor: theme.stroke.dark,
    padding: 15,
  },
  expandableWrapper: {
    backgroundColor: theme.stroke.light,
    padding: 15,
  },
  mainContainerWrapper: { padding: 15 },
}));

export default useStyles;
