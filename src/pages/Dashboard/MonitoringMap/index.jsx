/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import ShareIcon from '@mui/icons-material/Share';
import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from '@mui/material';
import L from 'leaflet';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useQuery } from 'react-query';
import { useContextSelector } from 'use-context-selector';

import markerFish1Icon from '../../../assets/icons/map/fish1.png';
import markerFish2Icon from '../../../assets/icons/map/fish2.png';
import markerFish3Icon from '../../../assets/icons/map/fish3.png';
import markerFish4Icon from '../../../assets/icons/map/fish4.png';
import markerHuman1Icon from '../../../assets/icons/map/human1.png';
import markerHuman2Icon from '../../../assets/icons/map/human2.png';
import markerHuman3Icon from '../../../assets/icons/map/human3.png';
import markerHuman4Icon from '../../../assets/icons/map/human4.png';
import BorderGeojson from '../../../assets/shapes/border.json';
import InverseShape from '../../../assets/shapes/inverseShape.json';
import StateJson from '../../../assets/shapes/StateJson.json';
import WatershedGeojson from '../../../assets/shapes/subwatersheds.json';
import 'leaflet/dist/leaflet.css';
import CustomTooltip from '../../../components/CustomTooltip';
import GetPopupAgricultural from '../../../components/MapItems/GetPopupAgricultural';
import GetPopupIPPO from '../../../components/MapItems/GetPopupIPPO';
import GetPopupMiningMine from '../../../components/MapItems/GetPopupMiningMine';
import GetPopupPopulation from '../../../components/MapItems/GetPopupPopulation';
import GetPopupWatershed from '../../../components/MapItems/GetPopupWatershed';
import GetPopupWaterway from '../../../components/MapItems/GetPopupWaterway';
import GetPopupWetlands from '../../../components/MapItems/GetPopupWetlands';
import LegendAgricultural from '../../../components/MapItems/LegendAgricultural';
import LegendEvapotranspiration from '../../../components/MapItems/LegendEvapotranspiration';
import LegendHydroeletric from '../../../components/MapItems/LegendHydroeletric';
import LegendIPPO from '../../../components/MapItems/LegendIPPO';
import LegendMercuryFish from '../../../components/MapItems/LegendMercuryFish';
import LegendMercuryHuman from '../../../components/MapItems/LegendMercuryHuman';
import LegendMiningMine from '../../../components/MapItems/LegendMiningMine';
import LegendOil from '../../../components/MapItems/LegendOil';
import LegendPopulation from '../../../components/MapItems/LegendPopulation';
import LegendPrecipitation from '../../../components/MapItems/LegendPrecipitation';
import LegendWaterBalance from '../../../components/MapItems/LegendWaterBalance';
import LegendWetlands from '../../../components/MapItems/LegendWetlands';
import Markers from '../../../components/MapItems/Markers';
import SuperCluster from '../../../components/MapItems/SuperCluster';
import TopoJSONEvapotranspiration from '../../../components/MapItems/TopoJSONEvapotranspiration';
import TopoJSONHydrogeochemistry from '../../../components/MapItems/TopoJSONHydrogeochemistry';
import TopoJSONPrecipitation from '../../../components/MapItems/TopoJSONPrecipitation';
import TopoJSONWaterBalance from '../../../components/MapItems/TopoJSONWaterBalance';
import MapWrapper from '../../../components/MapWrapper';
import Legend from '../../../components/MapWrapper/Legend';
import MapItem from '../../../components/MapWrapper/Mapitem';
import ShareDialog from '../../../components/ShareDialog';
import Typography from '../../../components/Typography';
import { indicators, embedItems } from '../../../constants/options';
import { darkScheme, lightScheme } from '../../../constants/schemes';
import FilteringContext from '../../../contexts/filtering';
import { useDisclaimer } from '../../../hooks/useDisclaimer';
import { useLayoutConfig } from '../../../hooks/useLayoutConfig';
import { useMap } from '../../../hooks/useMap';
import { useMobile } from '../../../hooks/useMobile';
import { useQuery as useQueryHook } from '../../../hooks/useQuery';
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
  const [coordsUnion, setCoordsUnion] = useState();
  const [waterUrl, setWaterUrl] = useState();
  const [mineUrl, setMineUrl] = useState();
  const [wetlandsUrl, setWetlandsUrl] = useState();
  const [coords, setCoords] = useState();
  const [coordsHydroelectric, setCoordsHydroelectric] = useState();
  const [pollutionUrl, setPollutionUrl] = useState();
  const [populationUrl, setPopulationUrl] = useState();
  const [oilUrl, setOilUrl] = useState();
  const [coordsHydrogeochemistry, setCoordsHydrogeochemistry] = useState();
  const [coordsPrecipitation, setCoordsPrecipitation] = useState();
  const [coordsEvapotranspiration, setCoordsEvapotranspiration] = useState();
  const [coordsWaterBalance, setCoordsWaterBalance] = useState();
  const [watershedUrl, setWatershedUrl] = useState();
  const [agriculturalUrl, setAgriculturalUrl] = useState();
  const [illegalMiningUrl, setIllegalMiningUrl] = useState();

  const [openShare, setOpenShare] = useState(false);
  const [coordsLoad, setCoordsLoad] = useState();

  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );

  const generateRoute = useContextSelector(
    FilteringContext,
    (filtering) => filtering.functions.generateRoute
  );
  const { setMapRef } = useMap();

  const code = territorySelection?.code;

  const { nextLayoutConfig } = useLayoutConfig();
  const { openDisclaimer } = useDisclaimer();
  const { isMobile } = useMobile();

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  const query = useQueryHook();

  const [value, setValue] = useState('country');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value === 'miningMine') {
      if (indicatorSelection === indicators.ground.minesMining.value) {
        setValue('country');
      }
    }
    if (value === 'illegalMining') {
      if (indicatorSelection === indicators.ground.illegalMining.value) {
        setValue('country');
      }
    }
    if (value === 'oil') {
      if (indicatorSelection === indicators.ground.oil.value) {
        setValue('country');
      }
    }
    if (value === 'agricultural') {
      if (indicatorSelection === indicators.ground.agricultural.value) {
        setValue('country');
      }
    }
    if (value === 'mercuryHuman') {
      if (indicatorSelection === indicators.mercury.mercuryHuman.value) {
        setValue('country');
      }
    }
    if (value === 'mercuryFish') {
      if (indicatorSelection === indicators.mercury.mercuryFish.value) {
        setValue('country');
      }
    }
    if (value === 'IPPO') {
      if (indicatorSelection === indicators.mercury.IPPO.value) {
        setValue('country');
      }
    }
  }, [indicatorSelection]);

  const fish1Icon = new L.Icon({
    iconUrl: markerFish1Icon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const fish2Icon = new L.Icon({
    iconUrl: markerFish2Icon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const fish3Icon = new L.Icon({
    iconUrl: markerFish3Icon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const fish4con = new L.Icon({
    iconUrl: markerFish4Icon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const human1Icon = new L.Icon({
    iconUrl: markerHuman1Icon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const human2Icon = new L.Icon({
    iconUrl: markerHuman2Icon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const human3Icon = new L.Icon({
    iconUrl: markerHuman3Icon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, -34],
  });

  const human4Icon = new L.Icon({
    iconUrl: markerHuman4Icon,
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
  }, [code]);

  useEffect(() => {
    api.get('waterway/tiles/image').then(({ data }) => {
      setWaterUrl(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('flood/tiles').then(({ data }) => {
      setWetlandsUrl(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('population/tiles').then(({ data }) => {
      setPopulationUrl(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('pollution/tiles').then(({ data }) => {
      setPollutionUrl(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('oil/field/tiles').then(({ data }) => {
      setOilUrl(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('mining/illegal/tiles').then(({ data }) => {
      setIllegalMiningUrl(data);
    });
  }, [code]);

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
  }, [code]);

  useEffect(() => {
    api.get('vulnerability/shape/precipitation').then(({ data }) => {
      setCoordsPrecipitation(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('vulnerability/shape/evapotranspiration').then(({ data }) => {
      setCoordsEvapotranspiration(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('vulnerability/shape/hydricBalance').then(({ data }) => {
      setCoordsWaterBalance(data);
    });
  }, [code]);

  useLayoutEffect(() => {
    api.get('territory/watershed/tiles').then(({ data }) => {
      setWatershedUrl(data);
    });
  }, [code]);

  useEffect(() => {
    api.get('agricultural/tiles').then(({ data }) => {
      setAgriculturalUrl(data);
    });
  }, [code]);

  function handleShareDialog() {
    setOpenShare(!openShare);
  }

  const embedCustomParam = useMemo(
    () => generateRoute(''),
    [indicatorSelection, territorySelection]
  );

  const shareUrl = useMemo(
    () =>
      window.location.origin +
      generateRoute(`/${process.env.REACT_APP_URL_BASE}/filter?`),
    [indicatorSelection, territorySelection]
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
  }, []);

  const { isLoading, error } = useQuery('repoData', async () => {
    const res = await fetch(
      'https://dev-rh-ora.geodatin.com/api/waterUsers/union/points'
    );
    const data = await res.json();
    setCoordsLoad(data);
    console.log(coordsLoad);
  });

  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );

  if (error) return `An error has occurred: ${error.message}`;

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
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        sx={{
                          paddingLeft: 2,
                        }}
                      >
                        <FormControlLabel
                          value="country"
                          control={<Radio />}
                          label={
                            <Typography
                              variant="caption"
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Country
                            </Typography>
                          }
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 18,
                            },
                          }}
                        />
                        <FormControlLabel
                          value="watershed"
                          control={<Radio />}
                          label={
                            <Typography
                              variant="caption"
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Watershed
                            </Typography>
                          }
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 18,
                            },
                          }}
                        />
                        {indicatorSelection !==
                          indicators.ground.minesMining.value && (
                          <FormControlLabel
                            value="miningMine"
                            control={<Radio />}
                            label={
                              <Typography
                                variant="caption"
                                style={{
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {t(indicators.ground.minesMining.translation)}
                              </Typography>
                            }
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fontSize: 18,
                              },
                            }}
                          />
                        )}
                        {indicatorSelection !==
                          indicators.ground.illegalMining.value && (
                          <FormControlLabel
                            value="illegalMining"
                            control={<Radio />}
                            label={
                              <Typography
                                variant="caption"
                                style={{
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {t(indicators.ground.illegalMining.translation)}
                              </Typography>
                            }
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fontSize: 18,
                              },
                            }}
                          />
                        )}
                        {indicatorSelection !== indicators.ground.oil.value && (
                          <FormControlLabel
                            value="oil"
                            control={<Radio />}
                            label={
                              <Typography
                                variant="caption"
                                style={{
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {t(indicators.ground.oil.translation)}
                              </Typography>
                            }
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fontSize: 18,
                              },
                            }}
                          />
                        )}

                        {indicatorSelection !==
                          indicators.ground.agricultural.value && (
                          <FormControlLabel
                            value="agricultural"
                            control={<Radio />}
                            label={
                              <Typography
                                variant="caption"
                                style={{
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {t(indicators.ground.agricultural.translation)}
                              </Typography>
                            }
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fontSize: 18,
                              },
                            }}
                          />
                        )}
                        {indicatorSelection !==
                          indicators.mercury.mercuryHuman.value && (
                          <FormControlLabel
                            value="mercuryHuman"
                            control={<Radio />}
                            label={
                              <Typography
                                variant="caption"
                                style={{
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {t(indicators.mercury.mercuryHuman.translation)}
                              </Typography>
                            }
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fontSize: 18,
                              },
                            }}
                          />
                        )}
                        {indicatorSelection !==
                          indicators.mercury.mercuryFish.value && (
                          <FormControlLabel
                            value="mercuryFish"
                            control={<Radio />}
                            label={
                              <Typography
                                variant="caption"
                                style={{
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {t(indicators.mercury.mercuryFish.translation)}
                              </Typography>
                            }
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fontSize: 18,
                              },
                            }}
                          />
                        )}
                        {indicatorSelection !==
                          indicators.mercury.IPPO.value && (
                          <FormControlLabel
                            value="IPPO"
                            control={<Radio />}
                            label={
                              <Typography
                                variant="caption"
                                style={{
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {t(indicators.mercury.IPPO.translation)}
                              </Typography>
                            }
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fontSize: 18,
                              },
                            }}
                          />
                        )}
                      </RadioGroup>
                    }
                    label={<div />}
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
      itemChildren={
        <>
          <MapItem onClick={() => handleShareDialog()}>
            <ShareIcon style={{ fontSize: 18 }} />
          </MapItem>

          <ShareDialog
            open={openShare}
            onClose={() => setOpenShare(false)}
            url={shareUrl}
            shareMessage="Acompanhe os dados de monitoramento hídricos"
            setOpen={setOpenShare}
            embedItems={embedItems}
            customParam={embedCustomParam}
            embedEnabled={embedEnabled}
          />
        </>
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
      itemLegendChildren={
        indicatorSelection === indicators.waterResources.waterSurface.value && (
          <Legend
            popupContent={
              <CustomTooltip
                placement="bottom"
                title={t('map.legend.watersurface.title')}
                className={classes.legendContentSlide}
              >
                <div className={classes.legendContainerSlide}>
                  <div className={classes.slideLine} />
                  <div className={classes.itemsSlide}>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CustomTooltip>
            }
          >
            <span
              className={classes.legendBall}
              style={{
                backgroundColor: '#00ffff',
                height: 24,
                width: 24,
                transform: 'rotate(25deg)',
              }}
            >
              <span
                className={classes.legendBall}
                style={{
                  backgroundColor: '#008eff',
                  height: 20,
                  width: 20,
                }}
              >
                <span
                  className={classes.legendBall}
                  style={{
                    backgroundColor: '#0037ff',
                    height: 16,
                    width: 16,
                  }}
                >
                  <span
                    className={classes.legendBall}
                    style={{
                      backgroundColor: '#0000a3',
                      height: 12,
                      width: 12,
                    }}
                  />
                </span>
              </span>
            </span>
          </Legend>
        )
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

      {value === 'country' && (
        <GeoJSON
          data={BorderGeojson}
          style={() => ({
            fillColor: 'transparent',
            weight: 2,
            dashArray: 8,
            lineCap: 'round',
            lineJoin: 'round ',
            color: theme === darkScheme ? '#accc0c' : '#728740',
          })}
        />
      )}

      {value === 'watershed' && (
        <GeoJSON
          data={WatershedGeojson}
          style={() => ({
            fillColor: 'transparent',
            weight: 2,
            dashArray: 8,
            lineCap: 'round',
            lineJoin: 'round ',
            color: theme === darkScheme ? '#38a00f' : '#508740',
          })}
        />
      )}

      {value === 'miningMine' && (
        <>
          <TileLayer url={mineUrl?.url} zIndex={999} />
          <GetPopupMiningMine />
        </>
      )}

      {value === 'illegalMining' && (
        <TileLayer url={illegalMiningUrl?.url} zIndex={999} />
      )}

      {value === 'oil' && <TileLayer url={oilUrl?.url} zIndex={999} />}

      {value === 'agricultural' && (
        <>
          <TileLayer
            url={
              agriculturalUrl?.url === undefined
                ? 'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/d9372586a137116b3c6711ef768d3696-a08bd8d62ee47286e773f6f8a211ccce/tiles/{z}/{x}/{y}'
                : agriculturalUrl?.url
            }
            zIndex={999}
          />
          <GetPopupAgricultural />
        </>
      )}

      {value === 'mercuryHuman' &&
        coordsHuman?.features?.map((cord) => (
          <Marker
            key={cord.properties.code}
            position={[
              cord.geometry.coordinates[1],
              cord.geometry.coordinates[0],
            ]}
            icon={(() => {
              if (cord.properties.hgMean < 2) {
                return human1Icon;
              }
              if (cord.properties.hgMean >= 2 && cord.properties.hgMean < 6) {
                return human2Icon;
              }
              if (cord.properties.hgMean >= 6 && cord.properties.hgMean <= 10) {
                return human3Icon;
              }
              if (cord.properties.hgMean > 10) {
                return human4Icon;
              }
              return null;
            })()}
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
                  {t('map.points.mercuryHuman.publicationYear')}
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
                  {t('map.points.mercuryHuman.study')}
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
                  {t('map.points.mercuryHuman.hgMin')}
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
                  {t('map.points.mercuryHuman.hgMax')}
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
                  {t('map.points.mercuryHuman.hgMean')}
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
                  {t('map.points.mercuryHuman.author')}
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
                  {t('map.points.mercuryHuman.title')}
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
                  {t('map.points.mercuryHuman.ageGroup')}
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
                  {t('map.points.mercuryHuman.collectionYear')}
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
                  {t('map.points.mercuryHuman.community')}
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
                  {t('map.points.mercuryHuman.measurementUnit')}
                </Typography>
                <Typography variant="caption">
                  {cord.properties.measurementUnit === null
                    ? '--'
                    : cord.properties.measurementUnit}
                </Typography>
              </div>
            </Popup>
          </Marker>
        ))}

      {value === 'mercuryFish' &&
        coordsFish?.features?.map((cord) => (
          <Marker
            key={cord.properties.code}
            position={[
              cord.geometry.coordinates[1],
              cord.geometry.coordinates[0],
            ]}
            icon={(() => {
              if (cord.properties.hgMean < 0.1) {
                return fish1Icon;
              }
              if (
                cord.properties.hgMean >= 0.1 &&
                cord.properties.hgMean < 0.5
              ) {
                return fish2Icon;
              }
              if (
                cord.properties.hgMean >= 0.5 &&
                cord.properties.hgMean <= 1.0
              ) {
                return fish3Icon;
              }
              if (cord.properties.hgMean > 1.0) {
                return fish4con;
              }
              return null;
            })()}
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
                  {t('map.points.mercuryFish.publicationYear')}
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
                  {t('map.points.mercuryFish.study')}
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
                  {t('map.points.mercuryFish.hgMin')}
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
                  {t('map.points.mercuryFish.hgMax')}
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
                  {t('map.points.mercuryFish.hgMean')}
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
                  {t('map.points.mercuryFish.author')}
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
                  {t('map.points.mercuryFish.title')}
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
                  {t('map.points.mercuryFish.collectionYear')}
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
                  {t('map.points.mercuryFish.community')}
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
                  {t('map.points.mercuryFish.measurementUnit')}
                </Typography>
                <Typography variant="caption">
                  {cord.properties.measurementUnit === null
                    ? '--'
                    : cord.properties.measurementUnit}
                </Typography>
              </div>
            </Popup>
          </Marker>
        ))}

      {value === 'IPPO' && (
        <>
          <TileLayer url={pollutionUrl?.url} zIndex={999} />
          <GetPopupIPPO />
        </>
      )}

      {indicatorSelection ===
        indicators.generalFeatures.hydrogeochemicalCharacteristics.value && (
        <TopoJSONHydrogeochemistry
          key={theme === darkScheme ? `dark` : `light`}
          data={
            coordsHydrogeochemistry === undefined ? '' : coordsHydrogeochemistry
          }
          style={() => ({
            fillOpacity: 0.8,
            weight: 2,
          })}
        />
      )}

      {indicatorSelection ===
        indicators.waterResources.annualPrecipitation.value && (
        <>
          <TopoJSONPrecipitation
            key={theme === darkScheme ? `dark` : `light`}
            data={coordsPrecipitation === undefined ? '' : coordsPrecipitation}
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
            data={
              coordsEvapotranspiration === undefined
                ? ''
                : coordsEvapotranspiration
            }
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
            data={coordsWaterBalance === undefined ? '' : coordsWaterBalance}
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
          <TileLayer url={waterUrl?.url} zIndex={2} />
          <GetPopupWaterway />
        </>
      )}

      {indicatorSelection === indicators.ground.illegalMining.value && (
        <TileLayer url={illegalMiningUrl?.url} zIndex={2} />
      )}

      {indicatorSelection === indicators.ground.minesMining.value && (
        <>
          <TileLayer url={mineUrl?.url} zIndex={2} />
          <GetPopupMiningMine />
          <LegendMiningMine />
        </>
      )}

      {indicatorSelection === indicators.waterResources.wetlands.value && (
        <>
          <TileLayer url={wetlandsUrl?.url} zIndex={2} />
          <GetPopupWetlands />
          <LegendWetlands />
        </>
      )}

      {indicatorSelection === indicators.mercury.IPPO.value && (
        <>
          <TileLayer url={pollutionUrl?.url} zIndex={2} />
          <GetPopupIPPO />
          <LegendIPPO />
        </>
      )}

      {indicatorSelection === indicators.waterDemand.Population.value && (
        <>
          <TileLayer url={populationUrl?.url} zIndex={2} />
          <GetPopupPopulation />
          <LegendPopulation />
        </>
      )}

      {indicatorSelection ===
        indicators.generalFeatures.watershedArea.value && (
        <>
          <TileLayer url={watershedUrl?.url} zIndex={2} />
          <GetPopupWatershed />
        </>
      )}

      {indicatorSelection === indicators.ground.oil.value && (
        <TileLayer url={oilUrl?.url} zIndex={2} />
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
          <LegendAgricultural />
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
            <>
              <Marker
                key={cord.properties.code}
                position={[
                  cord.geometry.coordinates[1],
                  cord.geometry.coordinates[0],
                ]}
                icon={(() => {
                  if (cord.properties.hgMean < 2) {
                    return human1Icon;
                  }
                  if (
                    cord.properties.hgMean >= 2 &&
                    cord.properties.hgMean < 6
                  ) {
                    return human2Icon;
                  }
                  if (
                    cord.properties.hgMean >= 6 &&
                    cord.properties.hgMean <= 10
                  ) {
                    return human3Icon;
                  }
                  if (cord.properties.hgMean > 10) {
                    return human4Icon;
                  }
                  return null;
                })()}
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
                      {t('map.points.mercuryHuman.publicationYear')}
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
                      {t('map.points.mercuryHuman.study')}
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
                      {t('map.points.mercuryHuman.hgMin')}
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
                      {t('map.points.mercuryHuman.hgMax')}
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
                      {t('map.points.mercuryHuman.hgMean')}
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
                      {t('map.points.mercuryHuman.author')}
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
                      {t('map.points.mercuryHuman.title')}
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
                      {t('map.points.mercuryHuman.ageGroup')}
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
                      {t('map.points.mercuryHuman.collectionYear')}
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
                      {t('map.points.mercuryHuman.community')}
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
                      {t('map.points.mercuryHuman.measurementUnit')}
                    </Typography>
                    <Typography variant="caption">
                      {cord.properties.measurementUnit === null
                        ? '--'
                        : cord.properties.measurementUnit}
                    </Typography>
                  </div>
                </Popup>
              </Marker>
              <LegendMercuryHuman />
            </>
          ))) ||
        (indicatorSelection === indicators.mercury.mercuryFish.value &&
          coordsFish?.features?.map((cord) => (
            <>
              <Marker
                key={cord.properties.code}
                position={[
                  cord.geometry.coordinates[1],
                  cord.geometry.coordinates[0],
                ]}
                icon={(() => {
                  if (cord.properties.hgMean < 0.1) {
                    return fish1Icon;
                  }
                  if (
                    cord.properties.hgMean >= 0.1 &&
                    cord.properties.hgMean < 0.5
                  ) {
                    return fish2Icon;
                  }
                  if (
                    cord.properties.hgMean >= 0.5 &&
                    cord.properties.hgMean <= 1.0
                  ) {
                    return fish3Icon;
                  }
                  if (cord.properties.hgMean > 1.0) {
                    return fish4con;
                  }
                  return null;
                })()}
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
                      {t('map.points.mercuryFish.publicationYear')}
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
                      {t('map.points.mercuryFish.study')}
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
                      {t('map.points.mercuryFish.hgMin')}
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
                      {t('map.points.mercuryFish.hgMax')}
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
                      {t('map.points.mercuryFish.hgMean')}
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
                      {t('map.points.mercuryFish.author')}
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
                      {t('map.points.mercuryFish.title')}
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
                      {t('map.points.mercuryFish.collectionYear')}
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
                      {t('map.points.mercuryFish.community')}
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
                      {t('map.points.mercuryFish.measurementUnit')}
                    </Typography>
                    <Typography variant="caption">
                      {cord.properties.measurementUnit === null
                        ? '--'
                        : cord.properties.measurementUnit}
                    </Typography>
                  </div>
                </Popup>
              </Marker>
              <LegendMercuryFish />
            </>
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

      {(indicatorSelection === indicators.ground.oil.value && <LegendOil />) ||
        (indicatorSelection === indicators.waterDemand.hydroelectric.value && (
          <>
            <Markers data={coordsHydroelectric?.features} />
            <LegendHydroeletric />
          </>
        ))}
    </MapWrapper>
  );
}
