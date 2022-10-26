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
      <div ref={childrentableref}>
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
              <TableCell>País</TableCell>
              <TableCell>Objetivo</TableCell>
              <TableCell>Lei</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Produtos</TableCell>
              <TableCell>Responsabilidade</TableCell>
              <TableCell>Tema</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((legislation) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  width={100}
                  style={{ color: theme.neutral.gray.main }}
                >
                  {legislation.country}
                </TableCell>
                <TableCell
                  width={400}
                  style={{ color: theme.neutral.gray.main }}
                >
                  {legislation.goal}
                </TableCell>
                <TableCell
                  width={100}
                  style={{ color: theme.neutral.gray.main }}
                >
                  {legislation.law}
                </TableCell>
                <TableCell
                  width={100}
                  style={{ color: theme.neutral.gray.main }}
                >
                  <a href={legislation.link} target="_blank" rel="noreferrer">
                    <LinkIcon />
                  </a>
                </TableCell>
                <TableCell
                  width={100}
                  style={{ color: theme.neutral.gray.main }}
                >
                  {legislation.product}
                </TableCell>
                <TableCell
                  width={100}
                  style={{ color: theme.neutral.gray.main }}
                >
                  {legislation.responsible}
                </TableCell>
                <TableCell
                  width={100}
                  style={{ color: theme.neutral.gray.main }}
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
