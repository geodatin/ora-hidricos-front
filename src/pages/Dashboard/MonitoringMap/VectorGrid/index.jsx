import L from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import { withLeaflet } from 'react-leaflet';
import VectorGridDefault from 'react-leaflet-vectorgrid';

export default function BlocksVectorGrid({ url }) {
  BlocksVectorGrid.propTypes = {
    url: PropTypes.string.isRequired,
  };
  const VectorGrid = withLeaflet(VectorGridDefault);

  const options = {
    type: 'protobuf',
    url,
    subdomains: '',
    interactive: true,
    rendererFactory: L.canvas.tile,
    popup: (feature) => `<div>${feature.properties.name}</div>`,
    vectorTileLayerStyles: {
      zIndex: 9999,
      weight: 0.5,
      fillColor: '#390870',
      fillOpacity: 1,
      opacity: 1,
      fill: true,
    },
  };
  return <VectorGrid {...options} />;
}
