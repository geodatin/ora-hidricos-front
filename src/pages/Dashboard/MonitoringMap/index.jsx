import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { TileLayer, GeoJSON } from 'react-leaflet';

import BorderGeojson from '../../../assets/shapes/border.json';
import InverseShape from '../../../assets/shapes/inverseShape.json';
import MapWrapper from '../../../components/MapWrapper';
import MapItem from '../../../components/MapWrapper/Mapitem';
import Typography from '../../../components/Typography';
import { darkScheme, lightScheme } from '../../../constants/schemes';
import { useAllStations } from '../../../hooks/useAllStations';
import { useDisclaimer } from '../../../hooks/useDisclaimer';
import { useLayoutConfig } from '../../../hooks/useLayoutConfig';
import { useMap } from '../../../hooks/useMap';
import { useMobile } from '../../../hooks/useMobile';
import { useProjectedStations } from '../../../hooks/useProjectedStations';
import useStyles from './styles';

/**
 * This function provides the monitoring map
 * @returns Monitoring Map
 */
export default function MonitoringMap() {
  const { viewProjectedStations, handleOnViewProjectedStations } =
    useProjectedStations();
  const { viewAllStations, handleOnViewAllStations } = useAllStations();
  const { setMapRef } = useMap();

  const { nextLayoutConfig } = useLayoutConfig();
  const { openDisclaimer } = useDisclaimer();
  const { isMobile } = useMobile();

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <MapWrapper
      getMapRef={(ref) => setMapRef(ref)}
      minZoom={5}
      maxZoom={15}
      maxBounds={[
        [-28.483177, -100.582582],
        [14.211898, -30.591429],
      ]}
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
      <TileLayer
        url="https://storage.googleapis.com/ora-otca/water/drainage/{z}/{x}/{y}.png"
        opacity={theme === darkScheme ? 0.3 : 0.2}
        zIndex={2}
      />
    </MapWrapper>
  );
}
