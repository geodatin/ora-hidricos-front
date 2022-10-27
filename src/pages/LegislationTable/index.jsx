import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import LinkIcon from '@mui/icons-material/Link';
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

import legislationDate from '../../assets/shapes/legislation.json';
import ChartExportMenu from '../../components/ChartContainer/ChartExportMenu';
import CustomTooltip from '../../components/CustomTooltip';
import Typography from '../../components/Typography';
import useStyles from './styles';

/* This function provides a statistics list of LegislationTable
 * @returns statistics list
 */
export default function LegislationTable({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  LegislationTable.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  LegislationTable.defaultProps = {
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

    return legislationDate.filter(
      (legislation) =>
        legislation.country.toLowerCase().includes(lowerSearch) ||
        legislation.goal.toLowerCase().includes(lowerSearch)
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
            Legislações
          </Typography>
          <CustomTooltip
            title="Legislações de águas dos países"
            placement="bottom"
          >
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
              <TableCell style={{ minWidth: '100px' }}>País</TableCell>
              <TableCell style={{ minWidth: '450px' }}>Objetivo</TableCell>
              <TableCell style={{ minWidth: '180px' }}>Lei</TableCell>
              <TableCell style={{ minWidth: '100px' }}>Link</TableCell>
              <TableCell style={{ minWidth: '100px' }}>Produtos</TableCell>
              <TableCell style={{ minWidth: '150px' }}>
                Responsabilidade
              </TableCell>
              <TableCell style={{ minWidth: '150px' }}>Tema</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((legislation) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  style={{
                    color: theme.neutral.gray.main,
                    minWidth: '100px',
                  }}
                >
                  {legislation.country}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '450px' }}
                >
                  {legislation.goal}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '180px' }}
                >
                  {legislation.law}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '100px' }}
                >
                  <a href={legislation.link} target="_blank" rel="noreferrer">
                    <LinkIcon />
                  </a>
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '100px' }}
                >
                  {legislation.product}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '150px' }}
                >
                  {legislation.responsible}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '150px' }}
                >
                  {legislation.theme}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
