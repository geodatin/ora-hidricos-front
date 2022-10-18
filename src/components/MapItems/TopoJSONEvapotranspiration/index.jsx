/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useRef, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import * as topojson from 'topojson-client';

import useStyles from '../styles';

export default function TopoJSONEvapotranspiration(props) {
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
    if (feature.properties.class === 0) {
      layer.setStyle({ fillColor: '#b3ffb3' });
    } else if (feature.properties.class === 1) {
      layer.setStyle({ fillColor: '#99ff99' });
    } else if (feature.properties.class === 2) {
      layer.setStyle({ fillColor: '#80ff80' });
    } else if (feature.properties.class === 3) {
      layer.setStyle({ fillColor: '#66ff66' });
    } else if (feature.properties.class === 4) {
      layer.setStyle({ fillColor: '#4dff4d' });
    } else if (feature.properties.class === 5) {
      layer.setStyle({ fillColor: '#33ff33' });
    } else if (feature.properties.class === 6) {
      layer.setStyle({ fillColor: '#1aff1a' });
    } else if (feature.properties.class === 7) {
      layer.setStyle({ fillColor: '#00ff00' });
    } else if (feature.properties.class === 8) {
      layer.setStyle({ fillColor: '#00e600' });
    } else if (feature.properties.class === 9) {
      layer.setStyle({ fillColor: '#00cc00' });
    }
    layer.bindPopup(
      `
      <div>
          <p class=${classes.popupItem}>Range
            </br><span class=${classes.popupItemTitle}>${feature.properties.range}</span>
          </p>
          <p class=${classes.popupItem}>Min 
            </br><span class=${classes.popupItemTitle}>${feature.properties.min}</span>
          </p> 
          <p class=${classes.popupItem}>Max
            </br><span class=${classes.popupItemTitle}>${feature.properties.max}</span>
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