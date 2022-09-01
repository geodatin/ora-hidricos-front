import L from 'leaflet';
import React from 'react';
import { withLeaflet } from 'react-leaflet';
import VectorGridDefault from 'react-leaflet-vectorgrid';

export default function BlocksVectorGrid() {
  const VectorGrid = withLeaflet(VectorGridDefault);

  const options = {
    type: 'protobuf',
    url: 'https://dev-rh-ora.geodatin.com/api/mining/mine/tiles/{z}/{x}/{y}.pbf',
    subdomains: '',
    interactive: true,
    rendererFactory: L.canvas.tile,
    popup: (feature) => `<div>${feature.properties.name}</div>`,
    vectorTileLayerStyles: {
      zIndex: 9999,
      weight: 1,
      fillColor: '#390870',
      fillOpacity: 1,
      opacity: 1,
      fill: true,
    },
  };
  return <VectorGrid {...options} />;
}
