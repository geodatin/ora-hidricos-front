import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import RankingCustom from '../../../../../components/Charts/RankingCustom';
import Treemap from '../../../../../components/Charts/Treemap';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import { getTextWidth } from '../../../../../utils/helpers';
import useStyles from './styles';

/* This function provides a statistics list of oil
 * @returns statistics list
 */
export default function Oil() {
  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );
  const code = territorySelection?.code;

  const theme = useTheme();
  const classes = useStyles();

  const { t } = useTranslation();

  const [rankingParams, setRankingParams] = useState({
    order: true,
    page: 1,
    totalPages: 1,
  });

  const [treemapData, setTreemapData] = useState();
  const [rankingData, setRankingData] = useState();

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
          setRankingData({
            labels: data.x.map(
              (label, index) =>
                `${data.position[index]}°  ${
                  (label === 'YPFB' && 'YPFB') ||
                  (label === 'AGENCIA NACIONAL DE HIDROCARBUROS' &&
                    'AGENCIA NACIONAL DE HIDROCARBUROS') ||
                  (label === 'YPFB ANDINA S.A.' && 'YPFB ANDINA S.A.') ||
                  (label === 'Petroamazonas EP' && 'Petroamazonas EP') ||
                  (label === 'YPFB CHACO S.A.' && 'YPFB CHACO S.A.') ||
                  (label === 'Secretaria de Hidrocarburos' &&
                    'Secretaria de Hidrocarburos') ||
                  (label === 'GRAN TIERRA ENERGY COLOMBIA, LLC' &&
                    'GRAN TIERRA ENERGY COLOMBIA, LLC') ||
                  (label === 'Rosneft Brasil E&P Ltda.' &&
                    'Rosneft Brasil E&P Ltda.') ||
                  (label === 'AMERISUR EXPLORACION COLOMBIA LIMITED' &&
                    'AMERISUR EXPLORACION COLOMBIA LIMITED') ||
                  (label === 'PetrÃ³leo Brasileiro S.A.' &&
                    'Petróleo Brasileiro S.A.') ||
                  (label === 'ECOPETROL S.A.' && 'ECOPETROL S.A.') ||
                  (label === 'EMERALD ENERGY PLC' && 'EMERALD ENERGY PLC') ||
                  (label === 'REPSOL YPF E&P' && 'REPSOL YPF E&P') ||
                  (label === 'GRAN TIERRA COLOMBIA INC' &&
                    'GRAN TIERRA COLOMBIA INC') ||
                  (label === 'Andes Petroleum Ecuador Ltd.' &&
                    'Andes Petroleum Ecuador Ltd') ||
                  (label === 'TOTAL E&P BOLIVIE' && 'TOTAL E&P BOLIVIE') ||
                  (label === 'PLUSPETROL' && 'PLUSPETROL') ||
                  (label ===
                    'PERENCO PERU PETROLEUM LIMITED, SUCURSAL DEL PERU' &&
                    'PERENCO PERU PETROLEUM LIMITED SUCURSAL DEL PERU') ||
                  (label === 'HUPECOL OPERATING CO LLC' &&
                    'HUPECOL OPERATING CO LLC') ||
                  (label === 'Enap Sipetrol S.A.' && 'Enap Sipetrol S.A.') ||
                  (label === 'PLUSPETROL PERU CORPORATION S.A.' &&
                    'PLUSPETROL PERU CORPORATION S.A.') ||
                  (label === 'YPF E & P PERÃš S.A.C.' &&
                    'YPF E & P PERU S.A.C.') ||
                  (label === 'HUNT OIL COMPANY OF PERÃš' &&
                    'HUNT OIL COMPANY OF PERU') ||
                  (label === 'Repsol Ecuador S.A.' && 'Repsol Ecuador S.A.') ||
                  (label === 'Petrooriental S.A.' && 'Petrooriental S.A.') ||
                  (label === 'PACIFIC STRATUS ENERGY DEL PERU S.A.' &&
                    'PACIFIC STRATUS ENERGY DEL PERU S.A.') ||
                  (label === 'CANADIAN ENERGY' && 'CANADIAN ENERGY') ||
                  (label === 'SHONA ENERGY (COLOMBIA) LIMITED' &&
                    'SHONA ENERGY (COLOMBIA) LIMITED') ||
                  (label === 'GTLI' && 'GTLI') ||
                  (label === 'REPSOL EXPLORACION PERU, SUCURSAL DEL PERU' &&
                    'REPSOL EXPLORACION PERU, SUCURSAL DEL PERU') ||
                  (label === 'PETROLIFERA PETROLEUM DEL PERU S.R.L.' &&
                    'PETROLIFERA PETROLEUM DEL PERU S.R.L.') ||
                  (label === 'PETROBRAS BOLIVIA S.A.' &&
                    'PETROBRAS BOLIVIA S.A.') ||
                  (label === 'Tecpecuador S.A.' && 'Tecpecuador S.A.') ||
                  (label === 'Consorcio Petrosud-Petroriva' &&
                    'Consorcio Petrosud-Petroriva') ||
                  (label === 'CEPSA PERUANA S.A.C.' &&
                    'CEPSA PERUANA S.A.C.') ||
                  (label === 'MATPETROL' && 'MATPETROL') ||
                  (label === 'VINTAGE PETROLEUM' && 'VINTAGE PETROLEUM') ||
                  (label === 'REPSOL EXPLORACIÃ“N S.A.' &&
                    'REPSOL EXPLORACIÓN S.A.') ||
                  (label === 'YPF S.A.' && 'YPF S.A.') ||
                  (label === 'Agip Oil Ecuador B.V.' &&
                    'Agip Oil Ecuador B.V.') ||
                  (label === 'Petrobell Inc.' && 'Petrobell Inc.') ||
                  (label === 'MOMPOS OIL COMPANY INC.' &&
                    'MOMPOS OIL COMPANY INC.') ||
                  (label === 'CNPC PERU S.A.' && 'CNPC PERU S.A.') ||
                  (label === 'GRAN TIERRA ENERGY PERU S.R.L.' &&
                    'GRAN TIERRA ENERGY PERU S.R.L.') ||
                  (label === 'PLUSPETROL E&P S.A.' && 'PLUSPETROL E&P S.A.') ||
                  (label === 'Orionoil ER S.A.' && 'Orionoil ER S.A.') ||
                  (label === 'PETROBRAS ARGENTINA S.A.' &&
                    'PETROBRAS ARGENTINA S.A.') ||
                  (label === 'REPSOL EXPLORATION PERÃš' &&
                    'REPSOL EXPLORATION PERU') ||
                  (label === 'Consorcio Petrolero Palanda-Yuca Sur' &&
                    'Consorcio Petrolero Palanda-Yuca Sur') ||
                  (label === 'AGUAYTÃA ENERGY DEL PERU S.R.L.' &&
                    'AGUAYTIAA ENERGY DEL PERU S.R.L.') ||
                  (label === 'Campo Puma Oriente S.A.' &&
                    'Campo Puma Oriente S.A.') ||
                  (label === 'Consorcio Bloque 28' && 'Consorcio Bloque 28') ||
                  (label === 'PLUSPETROL NORTE S.A.' &&
                    'PLUSPETROL NORTE S.A.') ||
                  (label === 'Orion Energy OcanoPB S.A.' &&
                    'Orion Energy OcanoPB S.A.') ||
                  (label === 'Gente Oil Ecuador Pte. Ltd.' &&
                    'Gente Oil Ecuador Pte. Ltd.') ||
                  (label === 'PETRO CARIBBEAN RESOURCES LTD' &&
                    'PETRO CARIBBEAN RESOURCES LTD') ||
                  (label === 'HUNT OIL COMPAÃ‘Y OF PERÃš' &&
                    'HUNT OIL COMPANY OF PERU') ||
                  (label === 'GEOPARK PERU S.A.C' && 'GEOPARK PERU S.A.C')
                }`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: ['#ec249c'],
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
      .get(`oil/field/ranking`, {
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
                  (label === 'YPFB' && 'YPFB') ||
                  (label === 'AGENCIA NACIONAL DE HIDROCARBUROS' &&
                    'AGENCIA NACIONAL DE HIDROCARBUROS') ||
                  (label === 'YPFB ANDINA S.A.' && 'YPFB ANDINA S.A.') ||
                  (label === 'Petroamazonas EP' && 'Petroamazonas EP') ||
                  (label === 'YPFB CHACO S.A.' && 'YPFB CHACO S.A.') ||
                  (label === 'Secretaria de Hidrocarburos' &&
                    'Secretaria de Hidrocarburos') ||
                  (label === 'GRAN TIERRA ENERGY COLOMBIA, LLC' &&
                    'GRAN TIERRA ENERGY COLOMBIA, LLC') ||
                  (label === 'Rosneft Brasil E&P Ltda.' &&
                    'Rosneft Brasil E&P Ltda.') ||
                  (label === 'AMERISUR EXPLORACION COLOMBIA LIMITED' &&
                    'AMERISUR EXPLORACION COLOMBIA LIMITED') ||
                  (label === 'PetrÃ³leo Brasileiro S.A.' &&
                    'Petróleo Brasileiro S.A.') ||
                  (label === 'ECOPETROL S.A.' && 'ECOPETROL S.A.') ||
                  (label === 'EMERALD ENERGY PLC' && 'EMERALD ENERGY PLC') ||
                  (label === 'REPSOL YPF E&P' && 'REPSOL YPF E&P') ||
                  (label === 'GRAN TIERRA COLOMBIA INC' &&
                    'GRAN TIERRA COLOMBIA INC') ||
                  (label === 'Andes Petroleum Ecuador Ltd.' &&
                    'Andes Petroleum Ecuador Ltd') ||
                  (label === 'TOTAL E&P BOLIVIE' && 'TOTAL E&P BOLIVIE') ||
                  (label === 'PLUSPETROL' && 'PLUSPETROL') ||
                  (label ===
                    'PERENCO PERU PETROLEUM LIMITED, SUCURSAL DEL PERU' &&
                    'PERENCO PERU PETROLEUM LIMITED SUCURSAL DEL PERU') ||
                  (label === 'HUPECOL OPERATING CO LLC' &&
                    'HUPECOL OPERATING CO LLC') ||
                  (label === 'Enap Sipetrol S.A.' && 'Enap Sipetrol S.A.') ||
                  (label === 'PLUSPETROL PERU CORPORATION S.A.' &&
                    'PLUSPETROL PERU CORPORATION S.A.') ||
                  (label === 'YPF E & P PERÃš S.A.C.' &&
                    'YPF E & P PERU S.A.C.') ||
                  (label === 'HUNT OIL COMPANY OF PERÃš' &&
                    'HUNT OIL COMPANY OF PERU') ||
                  (label === 'Repsol Ecuador S.A.' && 'Repsol Ecuador S.A.') ||
                  (label === 'Petrooriental S.A.' && 'Petrooriental S.A.') ||
                  (label === 'PACIFIC STRATUS ENERGY DEL PERU S.A.' &&
                    'PACIFIC STRATUS ENERGY DEL PERU S.A.') ||
                  (label === 'CANADIAN ENERGY' && 'CANADIAN ENERGY') ||
                  (label === 'SHONA ENERGY (COLOMBIA) LIMITED' &&
                    'SHONA ENERGY (COLOMBIA) LIMITED') ||
                  (label === 'GTLI' && 'GTLI') ||
                  (label === 'REPSOL EXPLORACION PERU, SUCURSAL DEL PERU' &&
                    'REPSOL EXPLORACION PERU, SUCURSAL DEL PERU') ||
                  (label === 'PETROLIFERA PETROLEUM DEL PERU S.R.L.' &&
                    'PETROLIFERA PETROLEUM DEL PERU S.R.L.') ||
                  (label === 'PETROBRAS BOLIVIA S.A.' &&
                    'PETROBRAS BOLIVIA S.A.') ||
                  (label === 'Tecpecuador S.A.' && 'Tecpecuador S.A.') ||
                  (label === 'Consorcio Petrosud-Petroriva' &&
                    'Consorcio Petrosud-Petroriva') ||
                  (label === 'CEPSA PERUANA S.A.C.' &&
                    'CEPSA PERUANA S.A.C.') ||
                  (label === 'MATPETROL' && 'MATPETROL') ||
                  (label === 'VINTAGE PETROLEUM' && 'VINTAGE PETROLEUM') ||
                  (label === 'REPSOL EXPLORACIÃ“N S.A.' &&
                    'REPSOL EXPLORACIÓN S.A.') ||
                  (label === 'YPF S.A.' && 'YPF S.A.') ||
                  (label === 'Agip Oil Ecuador B.V.' &&
                    'Agip Oil Ecuador B.V.') ||
                  (label === 'Petrobell Inc.' && 'Petrobell Inc.') ||
                  (label === 'MOMPOS OIL COMPANY INC.' &&
                    'MOMPOS OIL COMPANY INC.') ||
                  (label === 'CNPC PERU S.A.' && 'CNPC PERU S.A.') ||
                  (label === 'GRAN TIERRA ENERGY PERU S.R.L.' &&
                    'GRAN TIERRA ENERGY PERU S.R.L.') ||
                  (label === 'PLUSPETROL E&P S.A.' && 'PLUSPETROL E&P S.A.') ||
                  (label === 'Orionoil ER S.A.' && 'Orionoil ER S.A.') ||
                  (label === 'PETROBRAS ARGENTINA S.A.' &&
                    'PETROBRAS ARGENTINA S.A.') ||
                  (label === 'REPSOL EXPLORATION PERÃš' &&
                    'REPSOL EXPLORATION PERU') ||
                  (label === 'Consorcio Petrolero Palanda-Yuca Sur' &&
                    'Consorcio Petrolero Palanda-Yuca Sur') ||
                  (label === 'AGUAYTÃA ENERGY DEL PERU S.R.L.' &&
                    'AGUAYTIAA ENERGY DEL PERU S.R.L.') ||
                  (label === 'Campo Puma Oriente S.A.' &&
                    'Campo Puma Oriente S.A.') ||
                  (label === 'Consorcio Bloque 28' && 'Consorcio Bloque 28') ||
                  (label === 'PLUSPETROL NORTE S.A.' &&
                    'PLUSPETROL NORTE S.A.') ||
                  (label === 'Orion Energy OcanoPB S.A.' &&
                    'Orion Energy OcanoPB S.A.') ||
                  (label === 'Gente Oil Ecuador Pte. Ltd.' &&
                    'Gente Oil Ecuador Pte. Ltd.') ||
                  (label === 'PETRO CARIBBEAN RESOURCES LTD' &&
                    'PETRO CARIBBEAN RESOURCES LTD') ||
                  (label === 'HUNT OIL COMPAÃ‘Y OF PERÃš' &&
                    'HUNT OIL COMPANY OF PERU') ||
                  (label === 'GEOPARK PERU S.A.C' && 'GEOPARK PERU S.A.C')
                }`
            ),
            datasets: [
              {
                data: data.series[0].data.map((number) => number),
                backgroundColor: ['#ec249c'],
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

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`/oil/field/situation`, {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        if (isSubscribed && data) {
          setTreemapData({
            datasets: [
              {
                tree: data,
                key: 'amount',
                groups: ['situation'],
                borderColor: theme.background.main,
                borderWidth: 2,
                spacing: 0,
                labels: {
                  display: true,
                  color: theme.background.main,
                  font: {
                    size: 16,
                  },
                  hoverFont: {
                    weight: 'bold',
                  },
                  formatter: (ctx) => {
                    const translation = t(
                      `specific.oil.treemapChart.situation.${ctx?.raw.g}`
                    );
                    let label = '';
                    Array.from(translation).forEach((c) => {
                      if (getTextWidth(`${label}...`, 16) < ctx.raw.w - 40) {
                        label += c;
                      }
                    });
                    return label === translation
                      ? `${translation} (${ctx.raw.v})`
                      : `${label}...`;
                  },
                },
                captions: {
                  display: false,
                },
                backgroundColor: '#ec249c',
              },
            ],
          });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [t, theme, code]);

  return (
    <ul>
      <RankingCustom
        title={t('specific.oil.rankingChart.title')}
        info={t('specific.oil.rankingChart.info')}
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

      <Treemap
        title={t('specific.oil.treemapChart.title')}
        info={t('specific.oil.treemapChart.info')}
        data={treemapData}
        fullScreenEnabled
        options={{
          plugins: {
            tooltip: {
              displayColors: false,
              callbacks: {
                label(ctx) {
                  return `${t(
                    `specific.oil.treemapChart.situation.${ctx.raw.g}`
                  )}: ${ctx.raw.v} ${
                    ctx.raw.v !== 1
                      ? t(
                          `specific.oil.treemapChart.station.plural`
                        ).toLowerCase()
                      : t(
                          `specific.oil.treemapChart.station.singular`
                        ).toLowerCase()
                  }`;
                },
                title() {},
              },
            },
          },
        }}
      />
    </ul>
  );
}
