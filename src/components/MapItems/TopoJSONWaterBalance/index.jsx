/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GeoJSON } from 'react-leaflet';
import * as topojson from 'topojson-client';

import useStyles from '../styles';

export default function TopoJSONWaterBalance(props) {
  const layerRef = useRef(null);
  const { data, ...otherProps } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  function addData(layer, jsonData) {
    if (jsonData?.type === 'Topology') {
      for (const key in jsonData.objects) {
        const geojson = topojson?.feature(jsonData, jsonData.objects[key]);

        layer.addData(geojson);
      }
    } else {
      layer.addData(jsonData);
    }
  }
  const PopupClass = {
    className: classes.popup,
  };

  function onEachFeature(feature, layer) {
    if (feature.properties.class === 0) {
      layer.setStyle({ fillColor: '#eb0d16' });
    } else if (feature.properties.class === 1) {
      layer.setStyle({ fillColor: '#fe5526' });
    } else if (feature.properties.class === 2) {
      layer.setStyle({ fillColor: '#f98531' });
    } else if (feature.properties.class === 3) {
      layer.setStyle({ fillColor: '#feb341' });
    } else if (feature.properties.class === 4) {
      layer.setStyle({ fillColor: '#fde45e' });
    } else if (feature.properties.class === 5) {
      layer.setStyle({ fillColor: '#e4ef74' });
    } else if (feature.properties.class === 6) {
      layer.setStyle({ fillColor: '#c4d290' });
    } else if (feature.properties.class === 7) {
      layer.setStyle({ fillColor: '#97bfa5' });
    } else if (feature.properties.class === 8) {
      layer.setStyle({ fillColor: '#67a8b2' });
    } else if (feature.properties.class === 9) {
      layer.setStyle({ fillColor: '#2995c6' });
    }
    layer.bindPopup(
      `
      <div>
          <p class=${classes.popupItem}>${t('map.points.waterBalance.range')}
            </br><span class=${classes.popupItemTitle}>${
        feature.properties.range
      }</span>
          </p>
          <p class=${classes.popupItem}>${t('map.points.waterBalance.min')} 
            </br><span class=${classes.popupItemTitle}>${
        feature.properties.min
      }</span>
          </p> 
          <p class=${classes.popupItem}>${t('map.points.waterBalance.max')}
            </br><span class=${classes.popupItemTitle}>${
        feature.properties.max
      }</span>
          </p> 
          
          </div>
        `,
      PopupClass
    );
  }

  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props.data, t]);

  return (
    <GeoJSON ref={layerRef} {...otherProps} onEachFeature={onEachFeature} />
  );
}
