import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import Treemap from '../../../../../components/Charts/Treemap';
import FilteringContext from '../../../../../contexts/filtering';
import api from '../../../../../services/api';
import { getTextWidth } from '../../../../../utils/helpers';

/* This function provides a statistics list of Organic Pollution Potential Indicator
 * @returns statistics list
 */
export default function IPPO() {
  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );
  const code = territorySelection?.code;

  const theme = useTheme();
  const { t } = useTranslation();
  const [treemapData, setTreemapData] = useState();

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`pollution/situation`, {
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
                      `specific.IPPO.treemapChart.situation.${ctx?.raw.g}`
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
                backgroundColor: (ctx) => {
                  const colors = ['#a1292a', '#3b100f'];
                  if (ctx.type === 'data') {
                    // eslint-disable-next-line no-underscore-dangle
                    return colors[ctx.raw._data._idx];
                  }
                  return 'transparent';
                },
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
      <Treemap
        title={t('specific.IPPO.treemapChart.title')}
        info={t('specific.IPPO.treemapChart.info')}
        data={treemapData}
        fullScreenEnabled
        options={{
          plugins: {
            tooltip: {
              displayColors: false,
              callbacks: {
                label(ctx) {
                  return `${t(
                    `specific.IPPO.treemapChart.situation.${ctx.raw.g}`
                  )}: ${ctx.raw.v} ${
                    ctx.raw.v !== 1
                      ? t(
                          `specific.IPPO.treemapChart.station.plural`
                        ).toLowerCase()
                      : t(
                          `specific.IPPO.treemapChart.station.singular`
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
