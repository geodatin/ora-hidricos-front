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

/* This function provides a statistics list of illegal mining
 * @returns statistics list
 */
export default function IllegalMining({
  extraButton,
  csvCallback,
  fullScreenEnabled,
}) {
  IllegalMining.propTypes = {
    extraButton: PropTypes.node,
    fullScreenEnabled: PropTypes.bool,
    csvCallback: PropTypes.func,
  };

  IllegalMining.defaultProps = {
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
  const [itemsData, setItemsData] = useState();
  const [rankingData, setRankingData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`mining/illegal/total/occurrences`, {
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
      .get(`mining/illegal/countries`, {
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
                data: data.map(({ count }) => count),
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
      .get(`/mining/illegal/ranking`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingData({
            labels: data.x.map(
              (label, index) =>
                `${data.position[index]}°  ${
                  (label === 'ouro' && 'ouro') ||
                  (label === 'Oro' && 'Oro') ||
                  (label === 'Sin informaciÃ³n' && 'Sin información') ||
                  (label === 's.i.' && 's.i.') ||
                  (label === 'Ouro' && 'Ouro') ||
                  (label === 'oro' && 'oro') ||
                  (label === 'MetÃ¡licos' && 'metálicos') ||
                  (label === 'Diamante' && 'Diamante') ||
                  (label === 'Cassiterita' && 'Cassiterita') ||
                  (label === 'Arena' && 'Lapilli') ||
                  (label === 'Lapilli' && 'Lapilli') ||
                  (label === 'Oro, CarbÃ³n' && 'Oro, Carbono') ||
                  (label === 'Tantalio' && 'Tantalio') ||
                  (label === 'TantÃ¡lio' && 'Tantalio') ||
                  (label === 'Ouro/Cassiterita' && 'Ouro/Cassiterita') ||
                  (label === 'Ametista' && 'Ametista') ||
                  (label === 'Pieda' && 'Pieda') ||
                  (label === 'Ouro/Quartzo' && 'Ouro/Quartzo') ||
                  (label === 'cassiterita' && 'cassiterita') ||
                  (label === 'Ouro/Diamante' && 'Ouro/Diamante') ||
                  (label === 'diamante' && 'diamante') ||
                  (label === 'oro, diamante, gemas' &&
                    'oro, diamante, gemas') ||
                  (label === 'Materiales De Const' && 'Materiales De Const') ||
                  (label === 'Oro-Coltan' && 'Oro-Coltan')
                }`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: ['#ef2c35'],
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
      .get(`/mining/illegal/ranking`, {
        params: {
          countryCode: code,
          page: pageAtual,
        },
      })
      .then(({ data }) => {
        if (isSubscribed) {
          setRankingData({
            labels: data.x.map(
              (label, index) =>
                `${data.position[index]}°  ${
                  (label === 'ouro' && 'ouro') ||
                  (label === 'Oro' && 'Oro') ||
                  (label === 'Sin informaciÃ³n' && 'Sin información') ||
                  (label === 's.i.' && 's.i.') ||
                  (label === 'Ouro' && 'Ouro') ||
                  (label === 'oro' && 'oro') ||
                  (label === 'MetÃ¡licos' && 'metálicos') ||
                  (label === 'Diamante' && 'Diamante') ||
                  (label === 'Lapilli' && 'Lapilli') ||
                  (label === 'Cassiterita' && 'Cassiterita') ||
                  (label === 'Arena' && 'Lapilli') ||
                  (label === 'Oro, CarbÃ³n' && 'Oro, Carbono') ||
                  (label === 'Tantalio' && 'Tantalio') ||
                  (label === 'TantÃ¡lio' && 'Tantalio') ||
                  (label === 'Ouro/Cassiterita' && 'Ouro/Cassiterita') ||
                  (label === 'Ametista' && 'Ametista') ||
                  (label === 'Pieda' && 'Pieda') ||
                  (label === 'Ouro/Quartzo' && 'Ouro/Quartzo') ||
                  (label === 'cassiterita' && 'cassiterita') ||
                  (label === 'Ouro/Diamante' && 'Ouro/Diamante') ||
                  (label === 'diamante' && 'diamante') ||
                  (label === 'oro, diamante, gemas' &&
                    'oro, diamante, gemas') ||
                  (label === 'Materiales De Const' && 'Materiales De Const') ||
                  (label === 'Oro-Coltan' && 'Oro-Coltan')
                }`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: ['#ef2c35'],
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
              {t('specific.illegalMining.pieChart.title')}
            </Typography>
            <CustomTooltip
              title={t('specific.illegalMining.pieChart.info')}
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
                ? t('specific.illegalMining.pieChart.plural')
                : t('specific.illegalMining.pieChart.singular')
            }
            color="#ef2c35"
            scale={1.2}
          />
        </div>
      </div>

      <ItemsChart
        title={t('specific.illegalMining.itemChart.title')}
        info={t('specific.illegalMining.itemChart.info')}
        plural={t('specific.illegalMining.itemChart.plural')}
        singular={t('specific.illegalMining.itemChart.singular')}
        data={itemsData}
      />

      <RankingCustom
        title="Ranking das substâncias"
        info="Este gráfico apresenta o ranking das substâncias"
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
