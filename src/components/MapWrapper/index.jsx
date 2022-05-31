import L from 'leaflet';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useTheme } from 'react-jss';
import { MapContainer, TileLayer } from 'react-leaflet';

import DarkNorthIcon from '../../assets/images/dark-north.svg';
import GeodatinLogo from '../../assets/images/geodatin-map.svg';
import LightNorthIcon from '../../assets/images/light-north.svg';
import { darkScheme } from '../../constants/schemes';
import useStyles from './styles';
import ZoomButton from './ZoomButton';

/**
 * This component renders a react-leaflet component
 * @returns Map component
 */
export default function MapWrapper({
  children,
  itemChildren,
  itemAbout,
  itemLayers,
  itemTopChildren,
  itemBottomChildren,
  getMapRef,
  ...rest
}) {
  const position = [-7.3800011, -64.3420118];
  const classes = useStyles();
  const itemsRef = useRef();
  const theme = useTheme();
  const [map, setMap] = useState();
  const lightTileRef = useRef();
  const darkTileRef = useRef();

  useEffect(() => {
    if (getMapRef) getMapRef(map);
  }, [map]);

  /**
   * Disable click propagation
   */
  useEffect(() => {
    if (itemsRef?.current) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(itemsRef.current);
    }
  }, []);

  /**
   * Handle map darkmode
   */
  useEffect(() => {
    if (map && lightTileRef.current && darkTileRef.current) {
      if (theme === darkScheme) {
        lightTileRef.current.remove();
        darkTileRef.current.addTo(map);
      } else {
        darkTileRef.current.remove();
        lightTileRef.current.addTo(map);
      }
      map.getContainer().style.backgroundColor = theme.background.main;
    }
  }, [theme, map]);

  return (
    <MapContainer
      whenCreated={setMap}
      className={classes.mapContainer}
      center={position}
      zoom={5}
      zoomControl={false}
      {...rest}
    >
      <TileLayer
        ref={lightTileRef}
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        ref={darkTileRef}
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className={classes.tileLayer}
      />
      <div ref={itemsRef} className={classes.itemContainer}>
        {itemTopChildren}
        {itemAbout}
        {itemChildren}
        {itemLayers}
        <ZoomButton />
        {itemBottomChildren}
      </div>
      <img
        alt="north"
        src={theme === darkScheme ? DarkNorthIcon : LightNorthIcon}
        className={classes.northIcon}
      />
      <a
        href="https://geodatin.com"
        target="_blank"
        rel="noreferrer"
        className={classes.geodatinLogoWrapper}
      >
        <img
          alt="geodatin"
          src={GeodatinLogo}
          className={classes.geodatinLogo}
        />
      </a>
      {children}
    </MapContainer>
  );
}

MapWrapper.defaultProps = {
  children: undefined,
  itemChildren: undefined,
  itemTopChildren: undefined,
  itemAbout: undefined,
  itemBottomChildren: undefined,
  getMapRef: undefined,
  itemLayers: undefined,
};

MapWrapper.propTypes = {
  children: PropTypes.node,
  itemChildren: PropTypes.node,
  itemTopChildren: PropTypes.node,
  itemAbout: PropTypes.node,
  itemLayers: PropTypes.node,
  itemBottomChildren: PropTypes.node,
  getMapRef: PropTypes.func,
};
