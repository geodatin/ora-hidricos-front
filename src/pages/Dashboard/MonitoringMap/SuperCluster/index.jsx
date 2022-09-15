/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import L from 'leaflet';
import React, { useCallback, useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import useSupercluster from 'use-supercluster';

import useStyles from './styles';

const blueIcon = new L.Icon({
  iconUrl:
    'https://visualpharm.com/assets/825/Marker-595b40b75ba036ed117d9f54.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [1, -34],
});

function SuperCluster({ data }) {
  const classes = useStyles();

  const maxZoom = 22;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);
  const map = useMap();

  const createClusterCustomIcon = (count) =>
    L.divIcon({
      html: `<span>${count}</span>`,
      className:
        (count <= 10 && classes.markerClusterSmall) ||
        (count <= 50 && classes.markerClusterMedium) ||
        (count >= 51 && classes.markerClusterLarge),
      iconSize: L.point(36, 36, true),
    });

  // get map bounds
  function updateMap() {
    console.log('updating');
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  React.useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  const points = data?.map((crime) => ({
    type: 'Feature',
    properties: { cluster: false, crimeId: crime.id, category: crime.category },

    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(crime.geometry.coordinates[0]),
        parseFloat(crime.geometry.coordinates[1]),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  console.log(clusters.length);

  console.log(clusters);
  return (
    <>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster?.geometry?.coordinates;
        // the point may be either a cluster or a crime point
        const { cluster: isCluster, point_count: pointCount } =
          cluster?.properties;

        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster?.id}`}
              position={[latitude, longitude]}
              icon={createClusterCustomIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster?.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        // we have a single point (crime) to render
        return (
          <Marker
            key={cluster.properties.crimeId}
            position={[latitude, longitude]}
            // eslint-disable-next-line react/jsx-no-bind
            icon={blueIcon}
          />
        );
      })}
    </>
  );
}

export default SuperCluster;
