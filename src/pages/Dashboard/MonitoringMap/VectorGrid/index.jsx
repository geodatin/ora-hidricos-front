import L from 'leaflet';
import { useMap } from 'react-leaflet';

export default function BlocksVectorGrid({ url }) {
  const map = useMap();

  L.vectorGrid
    .protobuf(url, {
      vectorTileLayerStyles: {
        zIndex: 999,
        weight: 1,
        fillColor: '#390870',
        fillOpacity: 1,
        opacity: 1,
        fill: true,
      },
      subdomains: '',
      key: 'abcdefghi01234567890',
    })
    .addTo(map);

  return null;
}
