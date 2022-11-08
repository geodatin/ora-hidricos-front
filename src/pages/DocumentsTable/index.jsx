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

import documentsTable from '../../assets/shapes/otherDocuments.json';
import ChartExportMenu from '../../components/ChartContainer/ChartExportMenu';
import CustomTooltip from '../../components/CustomTooltip';
import Typography from '../../components/Typography';
import useStyles from './styles';

/* This function provides DocumentsTable component
 * @returns document table
 */
export default function DocumentsTable({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  DocumentsTable.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  DocumentsTable.defaultProps = {
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

    return documentsTable.filter(
      (documents) =>
        documents['Nome do projeto  ou iniciativa']
          .toLowerCase()
          .includes(lowerSearch) ||
        documents.Categoria.toLowerCase().includes(lowerSearch)
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
            Documentos
          </Typography>
          <CustomTooltip title="Documentos" placement="bottom">
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
              <TableCell style={{ minWidth: '120px' }}>
                Nome do projeto ou iniciativa
              </TableCell>
              <TableCell style={{ minWidth: '120px' }}>Categoria</TableCell>
              <TableCell style={{ minWidth: '100px' }}>Sub-bacia</TableCell>
              <TableCell style={{ minWidth: '100px' }}>Descrição</TableCell>
              <TableCell style={{ minWidth: '200px' }}>
                Resultados Alcançados
              </TableCell>
              <TableCell style={{ minWidth: '200px' }}>
                Contribuições para Qualidade da Água
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((documents) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  style={{
                    color: theme.neutral.gray.main,
                    minWidth: '120px',
                  }}
                >
                  {documents['Nome do projeto  ou iniciativa']}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '120px' }}
                >
                  {documents.Categoria}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '180px' }}
                >
                  {documents['Sub-bacia']}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '100px' }}
                >
                  {documents.Descrição}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '200px' }}
                >
                  {documents['Resultados Alcançados']}
                </TableCell>
                <TableCell
                  style={{ color: theme.neutral.gray.main, minWidth: '200px' }}
                >
                  {documents['Contribuições  para Qualidade da  Água']}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
