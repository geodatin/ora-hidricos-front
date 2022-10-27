/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
// import ShareIcon from '@mui/icons-material/Share';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useContextSelector } from 'use-context-selector';

import BorderGeojson from '../../../assets/shapes/border.json';
import InverseShape from '../../../assets/shapes/inverseShape.json';
import StateJson from '../../../assets/shapes/StateJson.json';
import 'leaflet/dist/leaflet.css';
import GetPopupAgricultural from '../../../components/MapItems/GetPopupAgricultural';
import GetPopupIPPO from '../../../components/MapItems/GetPopupIPPO';
import GetPopupMiningMine from '../../../components/MapItems/GetPopupMiningMine';
import GetPopupPopulation from '../../../components/MapItems/GetPopupPopulation';
import GetPopupWatershed from '../../../components/MapItems/GetPopupWatershed';
import GetPopupWaterway from '../../../components/MapItems/GetPopupWaterway';
import GetPopupWetlands from '../../../components/MapItems/GetPopupWetlands';
import LegendEvapotranspiration from '../../../components/MapItems/LegendEvapotranspiration';
import LegendHydroeletric from '../../../components/MapItems/LegendHydroeletric';
import LegendOil from '../../../components/MapItems/LegendOil';
import LegendPrecipitation from '../../../components/MapItems/LegendPrecipitation';
import LegendWaterBalance from '../../../components/MapItems/LegendWaterBalance';
import Markers from '../../../components/MapItems/Markers';
import SuperCluster from '../../../components/MapItems/SuperCluster';
import TopoJSONEvapotranspiration from '../../../components/MapItems/TopoJSONEvapotranspiration';
import TopoJSONHydrogeochemistry from '../../../components/MapItems/TopoJSONHydrogeochemistry';
import TopoJSONPrecipitation from '../../../components/MapItems/TopoJSONPrecipitation';
import TopoJSONWaterBalance from '../../../components/MapItems/TopoJSONWaterBalance';
import MapWrapper from '../../../components/MapWrapper';
import MapItem from '../../../components/MapWrapper/Mapitem';
// import ShareDialog from '../../../components/ShareDialog';
import Typography from '../../../components/Typography';
import { indicators } from '../../../constants/options';
import { darkScheme, lightScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import { useAllStations } from '../../../hooks/useAllStations';
import { useDisclaimer } from '../../../hooks/useDisclaimer';
import { useLayoutConfig } from '../../../hooks/useLayoutConfig';
import { useMap } from '../../../hooks/useMap';
import { useMobile } from '../../../hooks/useMobile';
import { useProjectedStations } from '../../../hooks/useProjectedStations';
// import { useQuery as useQueryHook } from '../../../hooks/useQuery';
import api from '../../../services/api';
import useStyles from './styles';

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
  const [wetlandsUrl, setWetlandsUrl] = useState();
  const [coords, setCoords] = useState();
  const [coordsHydroelectric, setCoordsHydroelectric] = useState();
  const [pollutionUrl, setPollutionUrl] = useState();
  const [populationUrl, setPopulationUrl] = useState();
  const [coordsHydrogeochemistry, setCoordsHydrogeochemistry] = useState();
  const [coordsPrecipitation, setCoordsPrecipitation] = useState();
  const [coordsEvapotranspiration, setCoordsEvapotranspiration] = useState();
  const [coordsWaterBalance, setCoordsWaterBalance] = useState();
  const [watershedUrl, setWatershedUrl] = useState();
  const [agriculturalUrl, setAgriculturalUrl] = useState();
  // const [openShare, setOpenShare] = useState(false);

  const { viewProjectedStations, handleOnViewProjectedStations } =
    useProjectedStations();
  const { viewAllStations, handleOnViewAllStations } = useAllStations();

  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );
  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  /* const autocompleteSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.autocompleteSelection
  );

  const generateRoute = useContextSelector(
    FilteringContext,
    (filtering) => filtering.functions.generateRoute
  ); */
  const { setMapRef } = useMap();

  const code = territorySelection?.code;

  const { nextLayoutConfig } = useLayoutConfig();
  const { openDisclaimer } = useDisclaimer();
  const { isMobile } = useMobile();

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  // const query = useQueryHook();

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
    api.get('waterUsers/union/points').then(({ data }) => {
      setCoordsUnion(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('waterUsers/state/points').then(({ data }) => {
      setCoords(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('mining/mine/tiles').then(({ data }) => {
      setMineUrl(data);
    });
  }, []);

  useEffect(() => {
    api.get('waterway/tiles/image').then(({ data }) => {
      setWaterUrl(data);
    });
  }, []);

  useEffect(() => {
    api.get('flood/tiles').then(({ data }) => {
      setWetlandsUrl(data);
    });
  }, []);

  useEffect(() => {
    api.get('population/tiles').then(({ data }) => {
      setPopulationUrl(data);
    });
  }, []);

  useEffect(() => {
    api.get('pollution/tiles').then(({ data }) => {
      setPollutionUrl(data);
    });
  }, []);

  useEffect(() => {
    api
      .get('hydroelectric/points', {
        params: {
          countryCode: code,
        },
      })
      .then(({ data }) => {
        setCoordsHydroelectric(data);
      });
  }, [code]);

  useEffect(() => {
    api.get('hydrogeochemistry/shape').then(({ data }) => {
      setCoordsHydrogeochemistry(data);
    });
  }, []);

  useEffect(() => {
    api.get('vulnerability/shape/precipitation').then(({ data }) => {
      setCoordsPrecipitation(data);
    });
  }, []);

  useEffect(() => {
    api.get('vulnerability/shape/evapotranspiration').then(({ data }) => {
      setCoordsEvapotranspiration(data);
    });
  }, []);

  useEffect(() => {
    api.get('vulnerability/shape/hydricBalance').then(({ data }) => {
      setCoordsWaterBalance(data);
    });
  }, []);

  useEffect(() => {
    api.get('territory/watershed/tiles').then(({ data }) => {
      setWatershedUrl(data);
    });
  }, []);

  useEffect(() => {
    api.get('agricultural/tiles').then(({ data }) => {
      setAgriculturalUrl(data);
    });
  }, []);

  /*
  function handleShareDialog() {
    setOpenShare(!openShare);
  }

  const embedCustomParam = useMemo(
    () => generateRoute(''),
    [indicatorSelection, autocompleteSelection]
  );

  const shareUrl = useMemo(
    () =>
      window.location.origin +
      generateRoute(`/${process.env.REACT_APP_URL_BASE}/filter?`),
    [indicatorSelection, autocompleteSelection]
  );

  const embedEnabled = useMemo(() => {
    if (
      window.location.pathname === `/${process.env.REACT_APP_URL_BASE}/embed`
    ) {
      const embedingParam = query.get('embeding');

      if (embedingParam === 'false') {
        return false;
      }

      return true;
    }

    return true;
  }, []); */

  return (
    <MapWrapper
      minZoom={5}
      maxZoom={15}
      getMapRef={(ref) => setMapRef(ref)}
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
      /*   itemChildren={
        <>
          <MapItem onClick={() => handleShareDialog()}>
            <ShareIcon style={{ fontSize: 18 }} />
          </MapItem>

        <ShareDialog
            open={openShare}
            onClose={() => setOpenShare(false)}
            url={shareUrl}
            shareMessage="Teste"
            setOpen={setOpenShare}
            embedItems={embedItems}
            customParam={embedCustomParam}
            embedEnabled={embedEnabled}
          /> 
        </> 
      } */
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

      {indicatorSelection ===
        indicators.generalFeatures.hydrogeochemicalCharacteristics.value && (
        <TopoJSONHydrogeochemistry
          key={theme === darkScheme ? `dark` : `light`}
          data={coordsHydrogeochemistry}
          style={() => ({
            fillOpacity: 0.8,
            weight: 4,
          })}
        />
      )}

      {indicatorSelection ===
        indicators.waterResources.annualPrecipitation.value && (
        <>
          <TopoJSONPrecipitation
            key={theme === darkScheme ? `dark` : `light`}
            data={coordsPrecipitation}
            style={() => ({
              fillOpacity: 0.8,
              weight: 0,
            })}
          />
          <LegendPrecipitation />
        </>
      )}

      {indicatorSelection ===
        indicators.waterResources.actualEvapotranspiration.value && (
        <>
          <TopoJSONEvapotranspiration
            key={theme === darkScheme ? `dark` : `light`}
            data={coordsEvapotranspiration}
            style={() => ({
              fillOpacity: 0.8,
              weight: 0,
            })}
          />
          <LegendEvapotranspiration />
        </>
      )}

      {indicatorSelection === indicators.waterResources.waterBalance.value && (
        <>
          <TopoJSONWaterBalance
            key={theme === darkScheme ? `dark` : `light`}
            data={coordsWaterBalance}
            style={() => ({
              fillOpacity: 0.8,
              weight: 0,
            })}
          />
          <LegendWaterBalance />
        </>
      )}

      {indicatorSelection === indicators.waterResources.waterSurface.value && (
        <TileLayer
          url="https://storage.googleapis.com/ora-otca/water/2020/{z}/{x}/{y}.png"
          zIndex={2}
        />
      )}
      {indicatorSelection === indicators.waterDemand.Waterways.value && (
        <>
          <TileLayer
            url={
              waterUrl?.url === undefined
                ? 'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/06de53c3b97af5222d0cb3166c78f48f-6ff39f8fcf7264e96afca3b0b76d6abd/tiles/{z}/{x}/{y}'
                : waterUrl?.url
            }
            zIndex={2}
          />
          <GetPopupWaterway />
        </>
      )}

      {indicatorSelection === indicators.ground.minesMining.value && (
        <>
          <TileLayer
            url={
              mineUrl?.url === undefined
                ? 'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/2331ff62d07cbc51fd01f63f94ec62d1-66976cfe78f1a412385f17be6d897f27/tiles/{z}/{x}/{y}'
                : mineUrl?.url
            }
            zIndex={2}
          />
          <GetPopupMiningMine />
        </>
      )}

      {indicatorSelection === indicators.waterResources.wetlands.value && (
        <>
          <TileLayer
            url={
              wetlandsUrl?.url === undefined
                ? 'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/da5a942cb234453f93a789f81ede2ab0-430aca5892b6c060f4fd9eefe3195ab4/tiles/{z}/{x}/{y}'
                : wetlandsUrl?.url
            }
            zIndex={2}
          />
          <GetPopupWetlands />
        </>
      )}

      {indicatorSelection === indicators.mercury.IPPO.value && (
        <>
          <TileLayer
            url={
              pollutionUrl?.url === undefined
                ? 'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/b4a9a58aeb4d9821ba4c0e72c17d158f-b2cd7dde7e91f6d11d27c11bd3cdb73e/tiles/{z}/{x}/{y}'
                : pollutionUrl?.url
            }
            zIndex={2}
          />
          <GetPopupIPPO />
        </>
      )}

      {indicatorSelection === indicators.waterDemand.Population.value && (
        <>
          <TileLayer
            url={
              populationUrl?.url === undefined
                ? 'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/955ac3bbeca5226bee248494ba2a33fe-3368874f5c56849a7f7b77ef8ff6abf6/tiles/{z}/{x}/{y}'
                : populationUrl?.ur
            }
            zIndex={2}
          />
          <GetPopupPopulation />
        </>
      )}

      {indicatorSelection ===
        indicators.generalFeatures.watershedArea.value && (
        <>
          <TileLayer
            url={
              watershedUrl?.url === undefined
                ? 'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/001bfa15a31668b7ebc3cc94b772d92f-1fd8a5d97e168fe1450f440fbab4dc88/tiles/{z}/{x}/{y}'
                : watershedUrl?.url
            }
            zIndex={2}
          />
          <GetPopupWatershed />
        </>
      )}

      {indicatorSelection === indicators.ground.agricultural.value && (
        <>
          <TileLayer
            url={
              agriculturalUrl?.url === undefined
                ? 'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/d9372586a137116b3c6711ef768d3696-a08bd8d62ee47286e773f6f8a211ccce/tiles/{z}/{x}/{y}'
                : agriculturalUrl?.url
            }
            zIndex={2}
          />
          <GetPopupAgricultural />
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
                    {cord.properties.publicationYear === null
                      ? '--'
                      : cord.properties.publicationYear}
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
                    {cord.properties.study === null
                      ? '--'
                      : cord.properties.study}
                  </Typography>
                </div>

                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    hgMin
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.hgMin === null
                      ? '--'
                      : cord.properties.hgMin}
                  </Typography>
                </div>

                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    hgMax
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.hgMax === null
                      ? '--'
                      : cord.properties.hgMax}
                  </Typography>
                </div>

                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    hgMean
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.hgMean === null
                      ? '--'
                      : cord.properties.hgMean}
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
                    {cord.properties.author === null
                      ? '--'
                      : cord.properties.author}
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
                    {cord.properties.title === null
                      ? '--'
                      : cord.properties.title}
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
                    {cord.properties.ageGroup === null
                      ? '--'
                      : cord.properties.ageGroup}
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
                    {cord.properties.collectionYear === '-' ||
                    cord.properties.collectionYear === null
                      ? '--'
                      : cord.properties.collectionYear}
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
                    {cord.properties.community === null
                      ? '--'
                      : cord.properties.community}
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
                    {cord.properties.measurementUnit === null
                      ? '--'
                      : cord.properties.measurementUnit}
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
                    {cord.properties.publicationYear === null
                      ? '--'
                      : cord.properties.publicationYear}
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
                    {cord.properties.study === null
                      ? '--'
                      : cord.properties.study}
                  </Typography>
                </div>

                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    hgMin
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.hgMin === null
                      ? '--'
                      : cord.properties.hgMin}
                  </Typography>
                </div>

                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    hgMax
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.hgMax === null
                      ? '--'
                      : cord.properties.hgMax}
                  </Typography>
                </div>

                <div className={classes.popupItem}>
                  <Typography
                    variant="caption"
                    className={classes.popupItemTitle}
                  >
                    hgMean
                  </Typography>
                  <Typography variant="caption">
                    {cord.properties.hgMean === null
                      ? '--'
                      : cord.properties.hgMean}
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
                    {cord.properties.author === null
                      ? '--'
                      : cord.properties.author}
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
                    {cord.properties.title === null
                      ? '--'
                      : cord.properties.title}
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
                    {cord.properties.collectionYear === '-' ||
                    cord.properties.collectionYear === null
                      ? '--'
                      : cord.properties.collectionYear}
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
                    {cord.properties.community === null
                      ? '--'
                      : cord.properties.community}
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
                    {cord.properties.measurementUnit === null
                      ? '--'
                      : cord.properties.measurementUnit}
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
          <SuperCluster
            data={
              coords?.features === undefined
                ? StateJson?.features
                : coords?.features
            }
          />
        ))}

      {(indicatorSelection === indicators.ground.oil.value && (
        <>
          <Markers data={coordsOil?.features} />
          <LegendOil />
        </>
      )) ||
        (indicatorSelection === indicators.ground.illegalMining.value && (
          <Markers data={coordsMining?.features} />
        )) ||
        (indicatorSelection === indicators.waterDemand.hydroelectric.value && (
          <>
            <Markers data={coordsHydroelectric?.features} />
            <LegendHydroeletric />
          </>
        ))}
    </MapWrapper>
  );
}
