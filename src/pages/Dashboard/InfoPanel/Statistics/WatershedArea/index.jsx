import { InfoOutlined } from '@mui/icons-material';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useFullScreenHandle } from 'react-full-screen';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import ChartExportMenu from '../../../../../components/ChartContainer/ChartExportMenu';
import DataDough from '../../../../../components/Charts/DataDough';
import ItemsChart from '../../../../../components/Charts/Items';
import RankingCustom from '../../../../../components/Charts/RankingCustom';
import CustomTooltip from '../../../../../components/CustomTooltip';
import Typography from '../../../../../components/Typography';
import { countryCodes } from '../../../../../constants/options';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import useStyles from './styles';

/* This function provides a statistics list of WatershedArea
 * @returns statistics list
 */
export default function WatershedArea({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  WatershedArea.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  WatershedArea.defaultProps = {
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

  const [itemsData, setItemsData] = useState();
  const handle = useFullScreenHandle();
  const [rankingData, setRankingData] = useState();
  const [totalData, setTotalData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api.get(`territory/watershed/area`).then(({ data }) => {
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
      .get(`territory/watershed/area/country`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed && data) {
          setItemsData({
            labels: data.map(({ country }) => country),
            datasets: [
              {
                data: data.map(({ count }) => count * 100),
                icons: data.map(({ countryCode }) => (
                  <ReactCountryFlag
                    svg
                    countryCode={countryCodes[countryCode]}
                    style={{ fontSize: 30, marginRight: 5, borderRadius: 12 }}
                  />
                )),
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
      .get(`territory/watershed/area/country/ranking`, {
        params: {
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingData({
            labels: data.x.map(
              (label, index) => `${data.position[index]}°  ${label}`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => Math.trunc(number)),
                backgroundColor: 'green',
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
      .get(`territory/watershed/area/country/ranking`, {
        params: {
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingData({
            labels: data.x.map(
              (label, index) => `${data.position[index]}°  ${label}`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => Math.trunc(number)),
                backgroundColor: 'green',
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
              {t('specific.watershedArea.pieChart.title')}
            </Typography>
            <CustomTooltip
              title={t('specific.watershedArea.pieChart.title')}
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
            value={Math.trunc(totalData?.count)}
            sufix={
              totalData?.count > 1
                ? t('specific.watershedArea.pieChart.plural')
                : t('specific.watershedArea.pieChart.singular')
            }
            color="green"
            scale={1.2}
          />
        </div>
      </div>

      <ItemsChart
        title={t('specific.watershedArea.itemChart.title')}
        info={t('specific.watershedArea.itemChart.info')}
        plural={t('specific.watershedArea.itemChart.plural')}
        singular={t('specific.watershedArea.itemChart.singular')}
        data={itemsData}
      />

      <RankingCustom
        title={t('specific.watershedArea.rankingChart.title')}
        info={t('specific.watershedArea.rankingChart.info')}
        stylePagination={classes.pagination}
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
