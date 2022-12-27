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

export default function TopoJSONPrecipitation(props) {
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
      layer.setStyle({ fillColor: '#bd513d' });
    } else if (feature.properties.class === 1) {
      layer.setStyle({ fillColor: '#d9792f' });
    } else if (feature.properties.class === 2) {
      layer.setStyle({ fillColor: '#f5a207' });
    } else if (feature.properties.class === 3) {
      layer.setStyle({ fillColor: '#f0d500' });
    } else if (feature.properties.class === 4) {
      layer.setStyle({ fillColor: '#c1f500' });
    } else if (feature.properties.class === 5) {
      layer.setStyle({ fillColor: '#38e200' });
    } else if (feature.properties.class === 6) {
      layer.setStyle({ fillColor: '#0dc140' });
    } else if (feature.properties.class === 7) {
      layer.setStyle({ fillColor: '#1d9e85' });
    } else if (feature.properties.class === 8) {
      layer.setStyle({ fillColor: '#126c87' });
    } else if (feature.properties.class === 9) {
      layer.setStyle({ fillColor: '#072d76' });
    }
    layer.bindPopup(
      `
      <div>
          <p class=${classes.popupItem}>${t('map.points.precipitation.range')}
            </br><span class=${classes.popupItemTitle}>${
        feature.properties.range
      }</span>
          </p>
          <p class=${classes.popupItem}>${t('map.points.precipitation.min')} 
            </br><span class=${classes.popupItemTitle}>${
        feature.properties.min
      }</span>
          </p> 
          <p class=${classes.popupItem}>${t('map.points.precipitation.max')}
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
