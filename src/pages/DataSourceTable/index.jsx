import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef, useState, useMemo } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import { useTheme } from 'react-jss';

import dataSourceDate from '../../assets/shapes/dataSource.json';
import ChartExportMenu from '../../components/ChartContainer/ChartExportMenu';
import CustomTooltip from '../../components/CustomTooltip';
import Typography from '../../components/Typography';
import useStyles from './styles';

/* This function provides DataSourceTable component
 * @returns Data source table
 */

export default function DataSourceTable({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  DataSourceTable.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  DataSourceTable.defaultProps = {
    extraButton: undefined,
    csvCallback: undefined,
    fullScreenEnabled: false,
  };
  const [search, setSearch] = useState('');

  const handle = useFullScreenHandle();
  const theme = useTheme();
  const classes = useStyles();
  const childrentableref = useRef(null);
  const refContainer = useRef();

  const filterData = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    return dataSourceDate.filter((dataSource) =>
      dataSource.Tema.toLowerCase().includes(lowerSearch)
    );
  }, [search]);

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <div className={classes.tableContainer}>
      <div className={classes.searchGorup}>
        <input
          className={classes.searchInput}
          placeholder="Buscar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={classes.searchIcon}>
          {search === '' ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearSearch} />
          )}
        </div>
      </div>

      <div className={classes.header}>
        <div className={classes.headerTitle}>
          <Typography variant="body" format="bold">
            Data Source
          </Typography>
          <CustomTooltip title="Data source table" placement="bottom">
            <div className={classes.tooltipInner}>
              <InfoOutlined
                style={{
                  color: theme.secondary.dark,
                  fontSize: '18px',
                }}
              />
            </div>
          </CustomTooltip>
        </div>

        <div>
          {extraButton && extraButton}
          {fullScreenEnabled && (
            <IconButton
              id="export-button"
              className={classes.button}
              onClick={handle.enter}
            >
              <FullscreenRoundedIcon
                style={{ fontSize: 20, color: theme.secondary.dark }}
              />
            </IconButton>
          )}
          <ChartExportMenu
            csvCallback={csvCallback}
            containerRef={refContainer}
            childrenRef={childrentableref}
          />
        </div>
      </div>
      <div ref={childrentableref} className={classes.table}>
        <Table
          aria-label="customized table"
          sx={{
            '& .MuiTableCell-root': {
              borderColor: theme.neutral.border,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: '100px' }}>Item</TableCell>
              <TableCell style={{ minWidth: '450px' }}>Tema</TableCell>
              <TableCell style={{ minWidth: '180px' }}>Fontes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((dataSource) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  style={{
                    color: theme.neutral.gray.main,
                    minWidth: '100px',
                  }}
                >
                  {dataSource.Item}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '450px' }}
                >
                  {dataSource.Tema}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '180px' }}
                >
                  {dataSource.Fontes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
