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

export default function TopoJSONHydrogeochemistry(props) {
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
    if (feature.properties.aspect === 'Salobra') {
      layer.setStyle({ color: '#ba6ea3' });
    } else if (feature.properties.aspect === 'Clara') {
      layer.setStyle({ color: '#3a5298' });
    } else if (feature.properties.aspect === 'Intermediária Tipo B') {
      layer.setStyle({ color: '#ee3c37' });
    } else if (feature.properties.aspect === 'Preta') {
      layer.setStyle({ color: '#010101' });
    } else if (feature.properties.aspect === 'Branca') {
      layer.setStyle({ color: '#f68f30' });
    } else if (feature.properties.aspect === 'Intermediária Tipo A') {
      layer.setStyle({ color: '#00a94d' });
    } else if (feature.properties.aspect === null) {
      layer.setStyle({ color: '#868583' });
    }
    layer.bindPopup(
      `
      <div>
          <p class=${classes.popupItem}>${t(
        'map.points.hydrogeochemistry.code'
      )}
            </br><span class=${classes.popupItemTitle}>${
        feature.properties.code
      }</span>
          </p>
          <p class=${classes.popupItem}>${t(
        'map.points.hydrogeochemistry.domain'
      )} 
            </br><span class=${classes.popupItemTitle}>${
        feature.properties.domain
      }</span>
          </p> 
          <p class=${classes.popupItem}>${t(
        'map.points.hydrogeochemistry.name'
      )}
            </br><span class=${classes.popupItemTitle}>${
        feature.properties.riverName
      }</span>
          </p> 
          <p class=${classes.popupItem}>${t(
        'map.points.hydrogeochemistry.aspect'
      )} 
            </br><span class=${classes.popupItemTitle}>${
        feature.properties.aspect
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
