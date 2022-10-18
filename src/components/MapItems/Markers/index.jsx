import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'react-jss';
import { Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import { useContextSelector } from 'use-context-selector';

import circleBuildingIcon from '../../../assets/icons/map/circle-map-building.svg';
import circleExploitation from '../../../assets/icons/map/circle-map-exploitation.svg';
import circleExploration from '../../../assets/icons/map/circle-map-exploration.svg';
import circleOperationIcon from '../../../assets/icons/map/circle-map-operation.svg';
import circleOthers from '../../../assets/icons/map/circle-map-others.svg';
import circlePlannedIcon from '../../../assets/icons/map/circle-map-project.svg';
import circleRequest from '../../../assets/icons/map/circle-map-request.svg';
import buildingIcon from '../../../assets/icons/map/map-building.svg';
import operationIcon from '../../../assets/icons/map/map-operation.svg';
import plannedIcon from '../../../assets/icons/map/map-project.svg';
import { indicators } from '../../../constants/options';
import { darkScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import api from '../../../services/api';
import Typography from '../../Typography';
import useStyles from '../styles';

export default function Markers({ data }) {
  const classes = useStyles();
  const map = useMap();
  const theme = useTheme();
  const geoJsonRef = useRef();
  const [coordsOilCode, setCoordsOilCode] = useState();
  const [coordsIllegalMiningCode, setCoordsIllegalMiningCode] = useState();

  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  const style = () => ({
    weight: 1.0,
    opacity: 0.8,
    color: '#fbb7e0',
    dashArray: '3',
    fillOpacity: 0.5,
  });

  const blueIcon = new L.Icon({
    iconUrl:
      'https://visualpharm.com/assets/825/Marker-595b40b75ba036ed117d9f54.svg',
    iconSize: [18, 18],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const MarkerPlannedIcon = new L.Icon({
    iconUrl: plannedIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const MarkerOperationIcon = new L.Icon({
    iconUrl: operationIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const MarkerBuildingIcon = new L.Icon({
    iconUrl: buildingIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const CircleMarkerPlannedIcon = new L.Icon({
    iconUrl: circlePlannedIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const CircleMarkerOperationIcon = new L.Icon({
    iconUrl: circleOperationIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const CircleMarkerBuildingIcon = new L.Icon({
    iconUrl: circleBuildingIcon,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const CircleExplorationIcon = new L.Icon({
    iconUrl: circleExploration,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const CircleRequestIcon = new L.Icon({
    iconUrl: circleRequest,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });
  const CircleExploitationIcon = new L.Icon({
    iconUrl: circleExploitation,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const CircleOthersIcon = new L.Icon({
    iconUrl: circleOthers,
    iconSize: [12, 12],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
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
      data?.map((cord) => (
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
          icon={(() => {
            switch (cord.properties.situation) {
              case 'en exploraciÃ³n':
                return CircleExplorationIcon;

              case 'AREA EN EXPLORACION':
                return CircleExplorationIcon;

              case 'ExploraciÃ³n':
                return CircleExplorationIcon;

              case 'ExploraÃ§Ã£o':
                return CircleExplorationIcon;

              case 'Solicitud':
                return CircleRequestIcon;

              case 'en explotaciÃ³n':
                return CircleExploitationIcon;

              case 'ExplotaciÃ³n':
                return CircleExploitationIcon;

              case 'Ãrea con CSP en etapa de ProtocolizaciÃ³n':
                return CircleOthersIcon;

              case 'Ãrea Reservada a favor de YPFB':
                return CircleOthersIcon;

              case 'Ãreas de promociÃ³n frontera':
                return CircleOthersIcon;

              case 'Ãreas de promociÃ³n semiexplorada':
                return CircleOthersIcon;

              case 'NegociaciÃ³n':
                return CircleOthersIcon;

              case 'AREA DISPONIBLE':
                return CircleOthersIcon;

              case 'TEA':
                return CircleOthersIcon;

              case 'AREA EN PRODUCCION':
                return CircleOthersIcon;

              case 'AREA RESERVADA':
                return CircleOthersIcon;

              case 'Desenvolvimento':
                return CircleOthersIcon;

              case 'Em DevoluÃ§Ã£o':
                return CircleOthersIcon;

              case 'Convenio de evaluaciÃ³n tÃ©cnica contrato':
                return CircleOthersIcon;

              case 'Proceso simplificado':
                return CircleOthersIcon;

              case 'Convenio de evaluaciÃ³n tÃ©cnica':
                return CircleOthersIcon;

              case 'ProduÃ§Ã£o':
                return CircleOthersIcon;

              case 'Ãrea con CSP en NegociaciÃ³n':
                return CircleOthersIcon;

              case 'Ãrea Libre':
                return CircleOthersIcon;

              default:
                return '';
            }
          })()}
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
      data?.map((cord) => (
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
          icon={blueIcon}
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
      data?.map((cord) => (
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
              Status da Interferência
            </Typography>
            <div className={classes.separator} />
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Tipo de Outorga
              </Typography>
              <Typography variant="caption">
                {cord.properties.bestowalType}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Tipo da Interferência
              </Typography>
              <Typography variant="caption">
                {cord.properties.interferenceType}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Nome do Orgão gestor
              </Typography>
              <Typography variant="caption">
                {cord.properties.orgName}
              </Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Situação da Outorga
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
                Nome do Corpo Hídrico
              </Typography>
              <Typography variant="caption">
                {cord.properties.waterBodyName}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Finalidade
              </Typography>
              <Typography variant="caption">{cord.properties.goal}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Data de Vencimento
              </Typography>
              <Typography variant="caption">
                {cord.properties.validDate}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Vazão Média
              </Typography>
              <Typography variant="caption">
                {cord.properties.avgFlow}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Vazão Máxima
              </Typography>
              <Typography variant="caption">
                {cord.properties.maxFlow}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Volume
              </Typography>
              <Typography variant="caption">
                {cord.properties.volume}
              </Typography>
            </div>
          </Popup>
        </Marker>
      ))) ||
    (indicatorSelection === indicators.waterDemand.hydroelectric.value &&
      data?.map((cord) => (
        <Marker
          key={cord.properties.code}
          position={[
            cord.geometry.coordinates[1],
            cord.geometry.coordinates[0],
          ]}
          icon={(() => {
            switch (cord.properties.sub + cord.properties.type) {
              case 'planeadaUHE':
                return MarkerPlannedIcon;
              case 'en operaciónUHE':
                return MarkerOperationIcon;
              case 'en construcciónUHE':
                return MarkerBuildingIcon;
              case 'planeadaPCH':
                return CircleMarkerPlannedIcon;
              case 'en operaciónPCH':
                return CircleMarkerOperationIcon;
              case 'en construcciónPCH':
                return CircleMarkerBuildingIcon;
              default:
                return blueIcon;
            }
          })()}
        >
          <Popup
            className={classes.popup}
            key={theme === darkScheme ? `dark` : `light`}
          >
            <Typography variant="caption" format="bold">
              {cord.properties.country}
            </Typography>
            <div className={classes.separator} />
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Code
              </Typography>
              <Typography variant="caption">{cord.properties.code}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Type
              </Typography>
              <Typography variant="caption">{cord.properties.type}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Author
              </Typography>
              <Typography variant="caption">
                {cord.properties.author}
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
                Potency
              </Typography>
              <Typography variant="caption">
                {cord.properties.potency}
              </Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Sub
              </Typography>
              <Typography variant="caption">{cord.properties.sub}</Typography>
            </div>
            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Institution
              </Typography>
              <Typography variant="caption">
                {cord.properties.institution}
              </Typography>
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
                Name
              </Typography>
              <Typography variant="caption">{cord.properties.name}</Typography>
            </div>

            <div className={classes.popupItem}>
              <Typography variant="caption" className={classes.popupItemTitle}>
                Status
              </Typography>
              <Typography variant="caption">
                {cord.properties.status}
              </Typography>
            </div>
          </Popup>
        </Marker>
      )))
  );
}