/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useRef, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import * as topojson from 'topojson-client';

export default function TopoJSON(props) {
  const layerRef = useRef(null);
  const { data, ...otherProps } = props;

  function addData(layer, jsonData) {
    if (jsonData.type === 'Topology') {
      for (const key in jsonData.objects) {
        const geojson = topojson.feature(jsonData, jsonData.objects[key]);
        layer.addData(geojson);
      }
    } else {
      layer.addData(jsonData);
    }
  }

  function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  }

  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props.data]);

  return (
    <GeoJSON ref={layerRef} {...otherProps} onEachFeature={onEachFeature} />
  );
}
