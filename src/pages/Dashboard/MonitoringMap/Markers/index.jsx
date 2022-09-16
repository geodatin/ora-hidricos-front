import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'react-jss';
import { Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import { useContextSelector } from 'use-context-selector';

import Typography from '../../../../components/Typography';
import { indicators } from '../../../../constants/options';
import { darkScheme } from '../../../../constants/schemes';
import FilteringContext from '../../../../contexts/filtering';
import api from '../../../../services/api';
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
    color: theme === darkScheme ? '#accc0c' : '#728740',
    dashArray: '3',
    fillOpacity: 0.5,
  });

  const blueIcon = new L.Icon({
    iconUrl:
      'https://visualpharm.com/assets/825/Marker-595b40b75ba036ed117d9f54.svg',
    iconSize: [24, 24],
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
          icon={blueIcon}
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
      data?.features?.map((cord) => (
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
      )))
  );
}
