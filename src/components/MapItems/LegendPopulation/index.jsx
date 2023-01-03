/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import FilteringContext from '../../../contexts/filtering';
import api from '../../../services/api';
import useStyles from './styles';

const LegendPopulation = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [totalData, setTotalData] = useState();

  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );
  const code = territorySelection?.code;

  useEffect(() => {
    let isSubscribed = true;
    api
      .get(`population/total`, {
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

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{t('map.legend.population.title')}</h2>
      <p className={classes.subtitle}>{t('map.legend.population.subtitle')}</p>

      <p className={classes.subtitle}>
        {t('map.legend.population.Population')}
      </p>
      <p className={classes.subtitle}>
        Total: {t('general.number', { value: Math.trunc(totalData?.count) })}
      </p>

      <div className={classes.separator} />
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#f6f6c8',
          }}
        />
        <span>{t('map.legend.population.until')} 10.000</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#fad393',
          }}
        />
        <span>10.001 - 25.000</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#fad393',
          }}
        />
        <span>25.001 - 50.000</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#f4bb78',
          }}
        />
        <span>50.001 - 75.000</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#ef9f5b',
          }}
        />
        <span>75.001 - 100.000</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#e98942',
          }}
        />
        <span>100.001 - 250.000</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#e77939',
          }}
        />
        <span>250.001 - 500.000</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#e3672e',
          }}
        />
        <span>500.001 - 1.000.000</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#d0572c',
          }}
        />
        <span>1.000.001 - 2.500.000</span>
      </div>

      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#b2482c',
          }}
        />
        <span>2.500.001 - 5.000.000</span>
      </div>
      <div className={classes.content}>
        <div
          className={classes.box}
          style={{
            backgroundColor: '#953828',
          }}
        />
        <span>{t('map.legend.population.above')} 5.000.000</span>
      </div>
    </div>
  );
};
export default LegendPopulation;
