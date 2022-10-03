/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useRef, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import * as topojson from 'topojson-client';

import useStyles from '../styles';

export default function TopoJSONHydrogeochemistry(props) {
  const layerRef = useRef(null);
  const { data, ...otherProps } = props;
  const classes = useStyles();

  function addData(layer, jsonData) {
    if (jsonData?.type === 'Topology') {
      for (const key in jsonData.objects) {
        const geojson = topojson.feature(jsonData, jsonData.objects[key]);

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
      layer.setStyle({ color: '#7e6330' });
    } else if (feature.properties.aspect === 'Clara') {
      layer.setStyle({ color: '#f1d8af' });
    } else if (feature.properties.aspect === 'Intermediária Tipo B') {
      layer.setStyle({ color: '#ecb247' });
    } else if (feature.properties.aspect === 'Preta') {
      layer.setStyle({ color: '#000000' });
    } else if (feature.properties.aspect === 'Branca') {
      layer.setStyle({ color: '#e6ddd3' });
    } else if (feature.properties.aspect === 'Intermediária Tipo A') {
      layer.setStyle({ color: '#ffa500' });
    } else if (feature.properties.aspect === null) {
      layer.setStyle({ color: '#868583' });
    }
    layer.bindPopup(
      `
      <div>
          <p class=${classes.popupItem}>Code
            </br><span class=${classes.popupItemTitle}>${feature.properties.code}</span>
          </p>
          <p class=${classes.popupItem}>Domain 
            </br><span class=${classes.popupItemTitle}>${feature.properties.domain}</span>
          </p> 
          <p class=${classes.popupItem}>River name 
            </br><span class=${classes.popupItemTitle}>${feature.properties.riverName}</span>
          </p> 
          <p class=${classes.popupItem}>Aspect 
            </br><span class=${classes.popupItemTitle}>${feature.properties.aspect}</span>
          </p> 
          </div>
        `,
      PopupClass
    );
  }

  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props.data]);

  return (
    <GeoJSON ref={layerRef} {...otherProps} onEachFeature={onEachFeature} />
  );
}
