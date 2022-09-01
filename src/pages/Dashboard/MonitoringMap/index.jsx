/* eslint-disable no-shadow */
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import L from 'leaflet';
import { map } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useContextSelector } from 'use-context-selector';
import 'react-leaflet-markercluster/dist/styles.min.css';

import 'leaflet.vectorgrid';
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
import useStyles from './styles';
import BlocksVectorGrid from './VectorGrid';

/**
 * This function provides the monitoring map
 * @returns Monitoring Map
 */

function Markers({ data }) {
  const classes = useStyles();
  const theme = useTheme();
  const [coordsOilCode, setCoordsOilCode] = useState();
  const [coordsIllegalMiningCode, setCoordsIllegalMiningCode] = useState();

  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  const geoJsonRef = useRef();

  const style = () => ({
    weight: 1.0,
    opacity: 0.8,
    color: theme === darkScheme ? '#accc0c' : '#728740',
    dashArray: '3',
    fillOpacity: 0.5,
  });

  // eslint-disable-next-line no-underscore-dangle
  // set the data to new data whenever it changes

  // eslint-disable-next-line no-unused-expressions
  (indicatorSelection === indicators.ground.oil.value &&
    useEffect(() => {
      if (geoJsonRef.current) {
        geoJsonRef.current.clearLayers(); // remove old data
        geoJsonRef.current.addData(coordsOilCode); // might need to be geojson.features
      }
    }, [geoJsonRef, coordsOilCode])) ||
    (indicatorSelection === indicators.ground.illegalMining.value &&
      useEffect(() => {
        if (geoJsonRef.current) {
          geoJsonRef.current.clearLayers(); // remove old data
          geoJsonRef.current.addData(coordsIllegalMiningCode); // might need to be geojson.features
        }
      }, [geoJsonRef, coordsIllegalMiningCode]));

  return (
    (indicatorSelection === indicators.ground.oil.value &&
      data?.features?.map((cord) => (
        <Marker
          key={cord.properties.code}
          eventHandlers={{
            click: () => {
              map.setView(
                [cord.geometry.coordinates[1], cord.geometry.coordinates[0]],
                10
              );
              api
                .get(`oil/field/points`, {
                  params: {
                    code: cord?.properties?.code,
                  },
                })
                // eslint-disable-next-line no-shadow
                .then(({ data }) => {
                  setCoordsOilCode(data);
                });
            },
          }}
          position={{
            lat: cord.geometry.coordinates[1],
            lng: cord.geometry.coordinates[0],
          }}
        >
          <Popup
            className={classes.popup}
            key={theme === darkScheme ? `dark` : `light`}
          >
            <GeoJSON
              ref={geoJsonRef}
              data={coordsOilCode?.features}
              onEachFeature={setCoordsOilCode}
              style={style}
            />

            <Typography variant="caption" format="bold">
              {cord.properties.country}
            </Typography>
            <div className={classes.separator} />
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Name
              </Typography>
              <Typography variant="caption">{cord.properties.name}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Company
              </Typography>
              <Typography variant="caption">
                {cord.properties.company}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Situation
              </Typography>
              <Typography variant="caption">
                {cord.properties.situation}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Source
              </Typography>
              <Typography variant="caption">
                {cord.properties.source}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Institution
              </Typography>
              <Typography variant="caption">
                {cord.properties.institution}
              </Typography>
            </div>
          </Popup>
        </Marker>
      ))) ||
    (indicatorSelection === indicators.ground.illegalMining.value &&
      data?.features?.map((cord) => (
        <Marker
          key={cord.properties.code}
          eventHandlers={{
            click: () => {
              map.setView(
                [cord.geometry.coordinates[1], cord.geometry.coordinates[0]],
                10
              );
              api
                .get(`mining/illegal/points`, {
                  params: {
                    code: cord?.properties?.code,
                  },
                })
                // eslint-disable-next-line no-shadow
                .then(({ data }) => {
                  setCoordsIllegalMiningCode(data);
                });
            },
          }}
          position={{
            lat: cord.geometry.coordinates[1],
            lng: cord.geometry.coordinates[0],
          }}
        >
          <Popup
            className={classes.popup}
            key={theme === darkScheme ? `dark` : `light`}
          >
            <GeoJSON
              ref={geoJsonRef}
              data={coordsIllegalMiningCode?.features}
              onEachFeature={setCoordsIllegalMiningCode}
              style={style}
            />
            <Typography variant="caption" format="bold">
              {cord.properties.name}
            </Typography>
            <div className={classes.separator} />
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Description
              </Typography>
              <Typography variant="caption">
                {cord.properties.description}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Exploration method
              </Typography>
              <Typography variant="caption">
                {cord.properties.explorationMethod}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Substance
              </Typography>
              <Typography variant="caption">
                {cord.properties.substance}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Contamination
              </Typography>
              <Typography variant="caption">
                {cord.properties.contamination}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Situation end
              </Typography>
              <Typography variant="caption">
                {cord.properties.situationEnd}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Information source
              </Typography>
              <Typography variant="caption">
                {cord.properties.informationSource}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Institution
              </Typography>
              <Typography variant="caption">
                {cord.properties.institution}
              </Typography>
            </div>
          </Popup>
        </Marker>
      ))) ||
    (indicatorSelection === indicators.waterDemand.CNARHunion.value &&
      data?.features?.map((cord) => (
        <Marker
          key={cord.properties.code}
          position={[
            cord.geometry.coordinates[1],
            cord.geometry.coordinates[0],
          ]}
        >
          <Popup
            className={classes.popup}
            key={theme === darkScheme ? `dark` : `light`}
          >
            <Typography variant="caption" format="bold">
              Organic pollution
            </Typography>
            <div className={classes.separator} />
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Bestowal type
              </Typography>
              <Typography variant="caption">
                {cord.properties.bestowalType}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Interference type
              </Typography>
              <Typography variant="caption">
                {cord.properties.interferenceType}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Org name
              </Typography>
              <Typography variant="caption">
                {cord.properties.orgName}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Bestowal situation
              </Typography>
              <Typography variant="caption">
                {cord.properties.bestowalSituation}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Interference subtype
              </Typography>
              <Typography variant="caption">
                {cord.properties.interferenceSubtype}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Water body name
              </Typography>
              <Typography variant="caption">
                {cord.properties.waterBodyName}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Goal
              </Typography>
              <Typography variant="caption">{cord.properties.goal}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                valid date
              </Typography>
              <Typography variant="caption">
                {cord.properties.validDate}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Avg flow
              </Typography>
              <Typography variant="caption">
                {cord.properties.avgFlow}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Max flow
              </Typography>
              <Typography variant="caption">
                {cord.properties.maxFlow}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                volume
              </Typography>
              <Typography variant="caption">
                {cord.properties.volume}
              </Typography>
            </div>
          </Popup>
        </Marker>
      )))
  );
}

export default function MonitoringMap() {
  const [coordsHuman, setCoordsHuman] = useState();
  const [coordsFish, setCoordsFish] = useState();
  const [coordsOil, setCoordsOil] = useState();
  const [coordsMining, setCoordsMining] = useState();
  const [coordsUnion, setCoordsUnion] = useState();

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

  L.Marker.prototype.options.icon = blueIcon;

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

  return (
    <MapWrapper
      preferCanvas={false}
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
          <MarkerClusterGroup>
            <Markers data={coordsUnion} />
          </MarkerClusterGroup>
        ))}

      {(indicatorSelection === indicators.ground.oil.value && (
        <Markers data={coordsOil} />
      )) ||
        (indicatorSelection === indicators.ground.illegalMining.value && (
          <MarkerClusterGroup>
            <Markers data={coordsMining} />
          </MarkerClusterGroup>
        )) ||
        (indicatorSelection === indicators.ground.minesMining.value && (
          <BlocksVectorGrid
            url={`https://dev-rh-ora.geodatin.com/api/mining/mine/tiles/{z}/{x}/{y}.pbf?countryCode=${code}`}
          />
        )) ||
        (indicatorSelection === indicators.mercury.IPPO.value && (
          <BlocksVectorGrid
            url={`https://dev-rh-ora.geodatin.com/api/pollution/tiles/{z}/{x}/{y}.pbf?countryCode=${code}`}
          />
        ))}
    </MapWrapper>
  );
}
