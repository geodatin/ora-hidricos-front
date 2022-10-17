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
import React, { useEffect, useRef, useState } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import ChartExportMenu from '../../../../../components/ChartContainer/ChartExportMenu';
import DataDough from '../../../../../components/Charts/DataDough';
import RankingChart from '../../../../../components/Charts/Ranking';
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import useStyles from './styles';

/* This function provides a statistics list of Hydroelectric
 * @returns statistics list
 */
export default function Hydroelectric({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  Hydroelectric.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  Hydroelectric.defaultProps = {
    extraButton: undefined,
    csvCallback: undefined,
    fullScreenEnabled: false,
  };

  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );
  const code = territorySelection?.code;

  const theme = useTheme();
  const classes = useStyles();

  const childrenref = useRef(null);
  const childrentableref = useRef(null);

  const refContainer = useRef();

  const { t } = useTranslation();

  const [rankingParams, setRankingParams] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const handle = useFullScreenHandle();
  const [rankingCountry, setRankingCountry] = useState();
  const [rankingPotency, setRankingPotency] = useState();
  const [statusPCH, setStatusPCH] = useState();
  const [statusUHE, setStatusUHE] = useState();
  const [totalData, setTotalData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`hydroelectric/total`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setTotalData(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`hydroelectric/PCH/status`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setStatusPCH(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`hydroelectric/UHE/status`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setStatusUHE(data);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`hydroelectric/ranking/country`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingCountry({
            labels: data.x.map(
              (label, index) => `${data.position[index]}°  ${label}`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: [theme.primary.main],
                borderRadius: 5,
                barThickness: 15,
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code, t]);

  const pageAtual = rankingParams.page;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`hydroelectric/ranking/potency`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingPotency({
            labels: data.x.map(
              (label, index) => `${data.position[index]}°  ${label}`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: [theme.primary.main],
                borderRadius: 5,
                barThickness: 15,
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [pageAtual, t]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`hydroelectric/ranking/potency`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingPotency({
            labels: data.x.map(
              (label, index) => `${data.position[index]}°  ${label}`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: [theme.primary.main],
                borderRadius: 5,
                barThickness: 15,
              },
            ],
          });
          setRankingParams({
            page: 1,
            totalPages: data.pages,
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [code, t]);

  return (
    <ul>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            <Typography variant="body" format="bold">
              {t('specific.hydroelectric.pieChart.title')}
            </Typography>
            <CustomTooltip
              title={t('specific.hydroelectric.pieChart.title')}
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
              childrenRef={childrenref}
            />
          </div>
        </div>
        <div ref={childrenref}>
          <DataDough
            value={totalData?.count}
            sufix={
              totalData?.count > 1
                ? t('specific.hydroelectric.pieChart.plural')
                : t('specific.hydroelectric.pieChart.singular')
            }
            color={theme.primary.main}
            scale={1.2}
          />
        </div>
      </div>

      <RankingChart
        title={t('specific.hydroelectric.rankingChartCountry.title')}
        info={t('specific.hydroelectric.rankingChartCountry.info')}
        data={rankingCountry}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
      />
      <RankingChart
        title={t('specific.hydroelectric.rankingChartPotency.title')}
        info={t('specific.hydroelectric.rankingChartPotency.info')}
        data={rankingPotency}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParams}
        setParams={setRankingParams}
      />

      <div className={classes.tableContainer}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            <Typography variant="body" format="bold">
              {t('specific.hydroelectric.table.title')}
            </Typography>
            <CustomTooltip
              title={t('specific.hydroelectric.table.info')}
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
                <TableCell>{t('specific.hydroelectric.table.type')}</TableCell>
                <TableCell align="right">
                  {statusUHE === undefined ? '' : statusUHE[0]?.type}
                </TableCell>
                <TableCell align="right">
                  {statusPCH === undefined ? '' : statusPCH[0]?.type}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ color: theme.neutral.gray.main }}>
                  {t('specific.hydroelectric.table.planned')}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: theme.neutral.gray.main }}
                >
                  {statusUHE === undefined ? '' : statusUHE[0]?.total}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: theme.neutral.gray.main }}
                >
                  {statusPCH === undefined ? '' : statusPCH[0]?.total}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell style={{ color: theme.neutral.gray.main }}>
                  {t('specific.hydroelectric.table.operation')}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: theme.neutral.gray.main }}
                >
                  {statusUHE === undefined ? '' : statusUHE[2]?.total}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: theme.neutral.gray.main }}
                >
                  {statusPCH === undefined ? '' : statusPCH[1]?.total}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ color: theme.neutral.gray.main }}>
                  {t('specific.hydroelectric.table.construction')}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: theme.neutral.gray.main }}
                >
                  {statusUHE === undefined ? '' : statusUHE[1]?.total}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: theme.neutral.gray.main }}
                >
                  {statusPCH === undefined ? '' : statusPCH[2]?.total}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </ul>
  );
}
