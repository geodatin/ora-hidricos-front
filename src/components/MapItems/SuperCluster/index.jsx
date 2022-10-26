/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import L from 'leaflet';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'react-jss';
import { Marker, Popup, useMap } from 'react-leaflet';
import useSupercluster from 'use-supercluster';

import { darkScheme } from '../../../constants/schemes';
import Typography from '../../Typography';
import useStyles from '../styles';

const blueIcon = new L.Icon({
  iconUrl:
    'https://visualpharm.com/assets/825/Marker-595b40b75ba036ed117d9f54.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [1, -34],
});

function SuperCluster({ data }) {
  const classes = useStyles();
  const theme = useTheme();

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

  useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  const points = data?.map((coord) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      coordId: coord.id,
      bestowalType: coord.properties.bestowalType,
      interferenceType: coord.properties.interferenceType,
      orgName: coord.properties.orgName,
      bestowalSituation: coord.properties.bestowalSituation,
      interferenceSubtype: coord.properties.interferenceSubtype,
      waterBodyName: coord.properties.waterBodyName,
      goal: coord.properties.goal,
      validDate: coord.properties.validDate,
      avgFlow: coord.properties.avgFlow,
      maxFlow: coord.properties.maxFlow,
      volume: coord.properties.volume,
    },

    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(coord.geometry.coordinates[0]),
        parseFloat(coord.geometry.coordinates[1]),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster?.geometry?.coordinates;
        // the point may be either a cluster or a coord point
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

        // we have a single point (coord) to render
        return (
          <Marker
            key={cluster.properties.coordId}
            position={[latitude, longitude]}
            // eslint-disable-next-line react/jsx-no-bind
            icon={blueIcon}
          >
            <Popup
              className={classes.popup}
              key={theme === darkScheme ? `dark` : `light`}
            >
              <Typography variant="caption" format="bold">
                Status da Interferência
              </Typography>
              <div className={classes.separator} />
              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Tipo de Outorga
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.bestowalType}
                </Typography>
              </div>
              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Tipo da Interferência
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.interferenceType}
                </Typography>
              </div>

              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Nome do Orgão gestor
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.orgName}
                </Typography>
              </div>

              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Situação da Outorga
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.bestowalSituation}
                </Typography>
              </div>
              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Interference subtype
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.interferenceSubtype}
                </Typography>
              </div>
              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Nome do Corpo Hídrico
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.waterBodyName}
                </Typography>
              </div>
              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Finalidade
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.goal}
                </Typography>
              </div>
              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Data de Vencimento
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.validDate}
                </Typography>
              </div>
              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Vazão Média
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.avgFlow}
                </Typography>
              </div>
              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Vazão Máxima
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.maxFlow}
                </Typography>
              </div>
              <div className={classes.popupItem}>
                <Typography
                  variant="caption"
                  className={classes.popupItemTitle}
                >
                  Volume
                </Typography>
                <Typography variant="caption">
                  {cluster.properties.volume}
                </Typography>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default SuperCluster;
