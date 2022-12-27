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
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import legislationDate from '../../assets/shapes/legislation.json';
import legislationDateEn from '../../assets/shapes/legislationEn.json';
import legislationDateEs from '../../assets/shapes/legislationEs.json';
import ChartExportMenu from '../../components/ChartContainer/ChartExportMenu';
import CustomTooltip from '../../components/CustomTooltip';
import Typography from '../../components/Typography';
import useStyles from './styles';

/* This function provides LegislationTable component
 * @returns legislation table
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
  const { i18n, t } = useTranslation();

  const filterData = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    if (i18n.language === 'en') {
      return legislationDateEn.filter(
        (legislation) =>
          legislation.country?.toLowerCase().includes(lowerSearch) ||
          legislation.goal?.toLowerCase().includes(lowerSearch)
      );
    }

    if (i18n.language === 'es') {
      return legislationDateEs.filter(
        (legislation) =>
          legislation.country?.toLowerCase().includes(lowerSearch) ||
          legislation.goal?.toLowerCase().includes(lowerSearch)
      );
    }

    return legislationDate.filter(
      (legislation) =>
        legislation.country.toLowerCase().includes(lowerSearch) ||
        legislation.goal.toLowerCase().includes(lowerSearch)
    );
  }, [search, i18n.language]);

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
            {t('legislation.title')}
          </Typography>
          <CustomTooltip title={t('legislation.info')} placement="bottom">
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
              <TableCell style={{ minWidth: '100px' }}>
                {t('legislation.country')}
              </TableCell>
              <TableCell style={{ minWidth: '450px' }}>
                {t('legislation.goal')}
              </TableCell>
              <TableCell style={{ minWidth: '180px' }}>
                {t('legislation.law')}
              </TableCell>
              <TableCell style={{ minWidth: '100px' }}>
                {t('legislation.link')}
              </TableCell>
              <TableCell style={{ minWidth: '100px' }}>
                {t('legislation.product')}
              </TableCell>
              <TableCell style={{ minWidth: '150px' }}>
                {t('legislation.responsible')}
              </TableCell>
              <TableCell style={{ minWidth: '150px' }}>
                {t('legislation.theme')}
              </TableCell>
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
