/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
} from '@mui/material';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useQuery } from 'react-query';
import { useContextSelector } from 'use-context-selector';

// import imgMarker from '../../../assets/images/marker-24.png';
import BorderGeojson from '../../../assets/shapes/border.json';
import InverseShape from '../../../assets/shapes/inverseShape.json';
import MapWrapper from '../../../components/MapWrapper';
import MapItem from '../../../components/MapWrapper/Mapitem';
import Typography from '../../../components/Typography';
import { indicators } from '../../../constants/options';
import { darkScheme, lightScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import { useAllStations } from '../../../hooks/useAllStations';
import { useDisclaimer } from '../../../hooks/useDisclaimer';
import { useLayoutConfig } from '../../../hooks/useLayoutConfig';
import { useMap as MapHook } from '../../../hooks/useMap';
import { useMobile } from '../../../hooks/useMobile';
import { useProjectedStations } from '../../../hooks/useProjectedStations';
import api from '../../../services/api';
import 'leaflet/dist/leaflet.css';
import GetPopupMiningMine from './GetPopupMiningMine';
import GetPopupWaterway from './GetPopupWaterway';
import Markers from './Markers';
import useStyles from './styles';
import SuperCluster from './SuperCluster';

import 'react-leaflet-markercluster/dist/styles.min.css';

/**
 * This function provides the monitoring map
 * @returns Monitoring Map
 */

export default function MonitoringMap() {
  const [coordsHuman, setCoordsHuman] = useState();
  const [coordsFish, setCoordsFish] = useState();
  const [coordsOil, setCoordsOil] = useState();
  const [coordsMining, setCoordsMining] = useState();
  const [coordsUnion, setCoordsUnion] = useState();
  const [waterUrl, setWaterUrl] = useState();
  const [mineUrl, setMineUrl] = useState();

  const { viewProjectedStations, handleOnViewProjectedStations } =
    useProjectedStations();
  const { viewAllStations, handleOnViewAllStations } = useAllStations();
  const { setMapRef } = MapHook();

  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );
  const code = territorySelection?.code;

  const { nextLayoutConfig } = useLayoutConfig();
  const { openDisclaimer } = useDisclaimer();
  const { isMobile } = useMobile();

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  const blueIcon = new L.Icon({
    iconUrl:
      'https://visualpharm.com/assets/825/Marker-595b40b75ba036ed117d9f54.svg',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });
  const createClusterCustomIcon = (cluster) =>
    L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className:
        (cluster.getChildCount() <= 10 && classes.markerClusterSmall) ||
        (cluster.getChildCount() <= 50 && classes.markerClusterMedium) ||
        (cluster.getChildCount() >= 51 && classes.markerClusterLarge),
      iconSize: L.point(36, 36, true),
    });

  useEffect(() => {
    api
      .get('mercury/human/points', {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        setCoordsHuman(data);
      });
  }, [code]);

  useEffect(() => {
    api
      .get('mercury/fish/points', {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        setCoordsFish(data);
      });
  }, [code]);

  useEffect(() => {
    api
      .get('oil/field/points', {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        setCoordsOil(data);
      });
  }, [code]);

  useEffect(() => {
    api
      .get('mining/illegal/points', {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        setCoordsMining(data);
      });
  }, [code]);

  useEffect(() => {
    api
      .get('waterUsers/union/points', {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        setCoordsUnion(data);
      });
  }, [code]);

  useEffect(() => {
    api.get('mining/mine/tiles').then(({ data }) => {
      setMineUrl(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('waterway/tiles/image').then(({ data }) => {
      setWaterUrl(data);
    });
  }, [code]);

  const [coords, setCoords] = useState();

  const { isLoading, error } = useQuery('repoData', async () => {
    const res = await fetch(
      // mudar
      'https://dev-rh-ora.geodatin.com/api/waterUsers/union/points'
    );
    const data = await res.json();
    setCoords(data);
  });

  if (isLoading) return <LinearProgress />;

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <MapWrapper
      getMapRef={(ref) => setMapRef(ref)}
      minZoom={5}
      maxZoom={15}
      itemTopChildren={
        !isMobile ? (
          <MapItem onClick={() => nextLayoutConfig()}>
            <AspectRatioRoundedIcon style={{ fontSize: 20 }} />
          </MapItem>
        ) : undefined
      }
      itemAbout={
        <MapItem onClick={() => openDisclaimer()}>
          <InfoOutlinedIcon style={{ fontSize: 20 }} />
        </MapItem>
      }
      itemLayers={
        <MapItem
          popupContent={
            <div style={{ paddingLeft: 10 }}>
              <div className={classes.legendItem}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: 18,
                          },
                        }}
                        checked={viewProjectedStations}
                        onChange={handleOnViewProjectedStations}
                      />
                    }
                    label={
                      <Typography
                        variant="caption"
                        style={{
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t('specific.infoPanel.WaterSurface.title')}
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: 18,
                          },
                        }}
                        checked={viewAllStations}
                        onChange={handleOnViewAllStations}
                      />
                    }
                    label={
                      <Typography
                        variant="caption"
                        style={{
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t('specific.infoPanel.WQI.title')}
                      </Typography>
                    }
                  />
                </FormGroup>
              </div>
            </div>
          }
          onClick={() => {}}
        >
          <LayersRoundedIcon style={{ fontSize: 20 }} />
        </MapItem>
      }
      itemBottomChildren={
        <MapItem
          popupContent={
            <div className={classes.legendContent}>
              <div className={classes.legendItem}>
                <div
                  style={{
                    borderColor: theme === darkScheme ? '#accc0c' : '#728740',
                  }}
                  className={classes.dashedLine}
                />
                {t('specific.legend.territoryLine')}
              </div>
              <div className={classes.legendItem}>
                <div
                  style={{
                    borderColor: '#0023FF',
                    borderStyle: 'solid',
                    opacity: theme === darkScheme ? 0.3 : 0.2,
                  }}
                  className={classes.dashedLine}
                />
                {t('specific.legend.riverLine')}
              </div>
            </div>
          }
        >
          <span
            className={classes.legendBall}
            style={{
              backgroundColor: theme.orange.main,
              height: 17,
              width: 17,
            }}
          >
            <span
              className={classes.legendBall}
              style={{
                backgroundColor: theme.primary.main,
                height: 14,
                width: 14,
              }}
            >
              <span
                className={classes.legendBall}
                style={{
                  backgroundColor: theme.green.main,
                  height: 10,
                  width: 10,
                }}
              />
            </span>
          </span>
        </MapItem>
      }
    >
      <GeoJSON
        data={InverseShape}
        style={() => ({
          stroke: false,
          fillColor: theme === darkScheme ? 'black' : lightScheme.stroke.light,
          fillOpacity: theme === darkScheme ? 0.5 : 0.7,
        })}
      />

      <GeoJSON
        data={BorderGeojson}
        style={() => ({
          fillColor: 'transparent',
          weight: 0.5,
          dashArray: 8,
          lineCap: 'round',
          lineJoin: 'round ',
          color: theme === darkScheme ? '#accc0c' : '#728740',
        })}
      />

      {indicatorSelection === indicators.waterResources.waterSurface.value && (
        <TileLayer
          url="https://storage.googleapis.com/ora-otca/water/2020/{z}/{x}/{y}.png"
          zIndex={2}
        />
      )}
      {indicatorSelection === indicators.waterDemand.Waterways.value && (
        <>
          <TileLayer url={waterUrl?.url} zIndex={2} />
          <GetPopupWaterway />
        </>
      )}

      {indicatorSelection === indicators.ground.minesMining.value && (
        <>
          <TileLayer url={mineUrl?.url} zIndex={2} />
          <GetPopupMiningMine />
        </>
      )}

      {indicatorSelection !== indicators.waterResources.waterSurface.value && (
        <TileLayer
          url="https://storage.googleapis.com/ora-otca/water/drainage/{z}/{x}/{y}.png"
          opacity={theme === darkScheme ? 0.3 : 0.2}
          zIndex={2}
        />
      )}

      {(indicatorSelection === indicators.waterResources.waterSurface.value &&
        '') ||
        (indicatorSelection === indicators.mercury.mercuryHuman.value &&
          coordsHuman?.features?.map((cord) => (
            <Marker
              key={cord.properties.code}
              position={[
                cord.geometry.coordinates[1],
                cord.geometry.coordinates[0],
              ]}
              icon={blueIcon}
            >
              <Popup
                className={classes.popup}
                key={theme === darkScheme ? `dark` : `light`}
              >
                <Typography variant="caption" format="bold">
                  {cord.properties.state}
                </Typography>
                <div className={classes.separator} />
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Publication year
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.publicationYear}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Study
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.study}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Author
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.author}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Title
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.title}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Age group
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.ageGroup}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Collection year
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.collectionYear}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Community
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.community}
                  </Typography>
                </div>

                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Measurement unit
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.measurementUnit}
                  </Typography>
                </div>
              </Popup>
            </Marker>
          ))) ||
        (indicatorSelection === indicators.mercury.mercuryFish.value &&
          coordsFish?.features?.map((cord) => (
            <Marker
              key={cord.properties.code}
              position={[
                cord.geometry.coordinates[1],
                cord.geometry.coordinates[0],
              ]}
              icon={blueIcon}
            >
              <Popup
                className={classes.popup}
                key={theme === darkScheme ? `dark` : `light`}
              >
                <Typography variant="caption" format="bold">
                  {cord.properties.state}
                </Typography>
                <div className={classes.separator} />
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Publication year
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.publicationYear}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Study
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.study}
                  </Typography>
                </div>

                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Author
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.author}
                  </Typography>
                </div>

                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Title
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.title}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Collection year
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.collectionYear}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Community
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.community}
                  </Typography>
                </div>
                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    Measurement unit
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.measurementUnit}
                  </Typography>
                </div>
              </Popup>
            </Marker>
          ))) ||
        (indicatorSelection === indicators.waterDemand.CNARHunion.value && (
          <MarkerClusterGroup
            iconCreateFunction={createClusterCustomIcon}
            showCoverageOnHover={false}
          >
            <Markers data={coordsUnion?.features} />
          </MarkerClusterGroup>
        )) ||
        (indicatorSelection === indicators.waterDemand.CNARHstate.value && (
          <SuperCluster data={coords?.features} />
        ))}

      {(indicatorSelection === indicators.ground.oil.value && (
        <Markers data={coordsOil?.features} />
      )) ||
        (indicatorSelection === indicators.ground.illegalMining.value && (
          <MarkerClusterGroup
            iconCreateFunction={createClusterCustomIcon}
            showCoverageOnHover={false}
          >
            <Markers data={coordsMining?.features} />
          </MarkerClusterGroup>
        ))}
    </MapWrapper>
  );
}
