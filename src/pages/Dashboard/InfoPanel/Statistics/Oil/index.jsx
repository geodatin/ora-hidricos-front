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
import RankingChart from '../../../../../components/Charts/Ranking';
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import useStyles from './styles';

/* This function provides a statistics list of WQI
 * @returns statistics list
 */
export default function Oil({ extraButton, csvCallback, fullScreenEnabled }) {
  Oil.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  Oil.defaultProps = {
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
  const [rankingData, setRankingData] = useState();
  const [totalData, setTotalData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`oil/field/total`, {
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
  }, [code]);

  const pageAtual = rankingParams.page;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`oil/field/ranking`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          const labels = data.x;
          setRankingData({
            labels,
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
  }, [pageAtual]);

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`oil/field/ranking`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          const labels = data.x;
          setRankingData({
            labels,
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
  }, [code]);

  return (
    <ul>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>
            <Typography variant="body" format="bold">
              Número total de lotes
            </Typography>
            <CustomTooltip
              title="Este gráfico apresenta o número total de lotes"
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
            sufix={totalData?.count > 1 ? 'Lotes' : 'Lote'}
            color={theme.primary.main}
            scale={1.2}
          />
        </div>
      </div>

      <RankingChart
        title="Ranking das empresas de campos de petróleo"
        info="Este gráfico apresenta o ranking das empresas de campos de petróleo"
        data={rankingData}
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
