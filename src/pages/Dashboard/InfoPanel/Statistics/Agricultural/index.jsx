import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useFullScreenHandle } from 'react-full-screen';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import ChartExportMenu from '../../../../../components/ChartContainer/ChartExportMenu';
import DataDough from '../../../../../components/Charts/DataDough';
import RankingCustom from '../../../../../components/Charts/RankingCustom';
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import useStyles from './styles';

/* This function provides a statistics list of Agricultural
 * @returns statistics list
 */
export default function Agricultural({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  Agricultural.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  Agricultural.defaultProps = {
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
  const refContainer = useRef();

  const { t } = useTranslation();

  const [rankingParams, setRankingParams] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const handle = useFullScreenHandle();
  const [totalData, setTotalData] = useState();
  const [rankingArea, setRankingArea] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`agricultural/total`, {
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

  const pageAtual = rankingParams.page;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`agricultural/ranking/area`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingArea({
            labels: data.x.map(
              (label, index) => `${data.position[index]}°  ${label}`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: '#96522f',
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
      .get(`agricultural/ranking/area`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingArea({
            labels: data.x.map(
              (label, index) => `${data.position[index]}°  ${label}`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: '#96522f',
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
              {t('specific.Agricultural.pieChart.title')}
            </Typography>
            <CustomTooltip
              title={t('specific.Agricultural.pieChart.title')}
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
            sufix={t('specific.Agricultural.pieChart.area')}
            color="#96522f"
            scale={1.2}
          />
        </div>
      </div>

      <RankingCustom
        title={t('specific.Agricultural.rankingChart.title')}
        info={t('specific.Agricultural.rankingChart.info')}
        data={rankingArea}
        stylePagination={classes.pagination}
        customFormatter={{
          formatter(value) {
            return t('general.number', { value });
          },
        }}
        params={rankingParams}
        setParams={setRankingParams}
      />
    </ul>
  );
}
