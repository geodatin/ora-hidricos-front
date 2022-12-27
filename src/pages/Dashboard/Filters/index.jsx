import { MenuItem, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useContextSelector } from 'use-context-selector';

import Typography from '../../../components/Typography';
import { indicators } from '../../../constants/options';
import FilteringContext from '../../../contexts/filtering';
import useStyles from './styles';

/**
 * This function provides filters components
 * @returns filters components
 */
export default function Filters() {
  const { t } = useTranslation();

  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  const setIndicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.setters.setIndicatorSelection
  );

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          top: '50px',
          left: '0',
          height: '50px',
          width: '370px',
          borderBottom: `1px solid ${theme.stroke.dark}`,
          zIndex: 100,
          backgroundColor: theme.background.main,
        }}
      >
        {t('header.filters')}
      </div>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiMenuItem: {
              styleOverrides: {
                root: {
                  '&.MuiMenuItem-root	': {
                    color: theme.neutral.gray.main,
                  },
                  '&.Mui-selected': {
                    backgroundColor: theme.button.actived,
                    color: theme.secondary.dark,
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: theme.button.actived,
                    opacity: 0.9,
                  },
                },
              },
            },
          },
        })}
      >
        {/* Características Hidrogeoquímicas das águas */}
        <Typography variant="body" format="bold" className={classes.firstTitle}>
          {t(indicators.generalFeatures.translation)}
        </Typography>
        <MenuItem
          value={
            indicators.generalFeatures.hydrogeochemicalCharacteristics.value
          }
          onClick={() =>
            setIndicatorSelection(
              indicators.generalFeatures.hydrogeochemicalCharacteristics.value
            )
          }
          selected={
            indicatorSelection ===
            indicators.generalFeatures.hydrogeochemicalCharacteristics.value
          }
        >
          <Typography variant="body">
            {t(
              indicators.generalFeatures.hydrogeochemicalCharacteristics
                .translation
            )}
          </Typography>
        </MenuItem>
        {/* Características da bacia */}
        <MenuItem
          value={indicators.generalFeatures.watershedArea.value}
          onClick={() =>
            setIndicatorSelection(
              indicators.generalFeatures.watershedArea.value
            )
          }
          selected={
            indicatorSelection ===
            indicators.generalFeatures.watershedArea.value
          }
        >
          <Typography variant="body">
            {t(indicators.generalFeatures.watershedArea.translation)}
          </Typography>
        </MenuItem>
        {/* Porcentagem da área da bacia sobre o território nacional 
            <MenuItem
              value={indicators.generalFeatures.areaPercentage.value}
              onClick={() =>
                setAuxIndicatorSelection(
                  indicators.generalFeatures.areaPercentage.value
                )
              }
            >
              {t(indicators.generalFeatures.areaPercentage.translation)}
            </MenuItem>

            {/* Unidades hidrológicas superficiais (divisão Otto Pfafstetter) 
            <MenuItem
              value={indicators.generalFeatures.surfaceHydrologicalUnits.value}
              onClick={() =>
                setAuxIndicatorSelection(
                  indicators.generalFeatures.surfaceHydrologicalUnits.value
                )
              }
            >
              {t(
                indicators.generalFeatures.surfaceHydrologicalUnits.translation
              )}
            </MenuItem>

            {/* Unidades hidrológicas subterrâneas 
            <MenuItem
              value={
                indicators.generalFeatures.undergroundHydrologicalUnits.value
              }
              onClick={() =>
                setAuxIndicatorSelection(
                  indicators.generalFeatures.undergroundHydrologicalUnits.value
                )
              }
            >
              {t(
                indicators.generalFeatures.undergroundHydrologicalUnits
                  .translation
              )}
            </MenuItem> */}
        {/* Dados do cadastro nacional de recursos hídricos do Brasil (CNARH) filtro União */}
        <Typography variant="body" format="bold" className={classes.title}>
          {t(indicators.waterDemand.translation)}
        </Typography>
        <MenuItem
          value={indicators.waterDemand.CNARHunion.value}
          onClick={() =>
            setIndicatorSelection(indicators.waterDemand.CNARHunion.value)
          }
          selected={
            indicatorSelection === indicators.waterDemand.CNARHunion.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterDemand.CNARHunion.translation)}
          </Typography>
        </MenuItem>
        {/* Dados do cadastro nacional de recursos hídricos do Brasil (CNARH) filtro Estado */}
        <MenuItem
          value={indicators.waterDemand.CNARHstate.value}
          onClick={() =>
            setIndicatorSelection(indicators.waterDemand.CNARHstate.value)
          }
          selected={
            indicatorSelection === indicators.waterDemand.CNARHstate.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterDemand.CNARHstate.translation)}
          </Typography>
        </MenuItem>
        {/* Hidrelétricas */}
        <MenuItem
          value={indicators.waterDemand.hydroelectric.value}
          onClick={() =>
            setIndicatorSelection(indicators.waterDemand.hydroelectric.value)
          }
          selected={
            indicatorSelection === indicators.waterDemand.hydroelectric.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterDemand.hydroelectric.translation)}
          </Typography>
        </MenuItem>
        {/* Hidrovias */}
        <MenuItem
          value={indicators.waterDemand.Waterways.value}
          onClick={() =>
            setIndicatorSelection(indicators.waterDemand.Waterways.value)
          }
          selected={
            indicatorSelection === indicators.waterDemand.Waterways.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterDemand.Waterways.translation)}
          </Typography>
        </MenuItem>
        {/* População na bacia  */}
        <MenuItem
          value={indicators.waterDemand.Population.value}
          onClick={() =>
            setIndicatorSelection(indicators.waterDemand.Population.value)
          }
          selected={
            indicatorSelection === indicators.waterDemand.Population.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterDemand.Population.translation)}
          </Typography>
        </MenuItem>
        <Typography variant="body" format="bold" className={classes.title}>
          {t(indicators.waterResources.translation)}
        </Typography>
        <MenuItem
          value={indicators.waterResources.waterSurface.value}
          onClick={() =>
            setIndicatorSelection(indicators.waterResources.waterSurface.value)
          }
          selected={
            indicatorSelection === indicators.waterResources.waterSurface.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterResources.waterSurface.translation)}
          </Typography>
        </MenuItem>
        {/* Zonas Inundáveis */}
        <MenuItem
          value={indicators.waterResources.wetlands.value}
          onClick={() =>
            setIndicatorSelection(indicators.waterResources.wetlands.value)
          }
          selected={
            indicatorSelection === indicators.waterResources.wetlands.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterResources.wetlands.translation)}
          </Typography>
        </MenuItem>
        {/* Precipitação anual */}
        <MenuItem
          value={indicators.waterResources.annualPrecipitation.value}
          onClick={() =>
            setIndicatorSelection(
              indicators.waterResources.annualPrecipitation.value
            )
          }
          selected={
            indicatorSelection ===
            indicators.waterResources.annualPrecipitation.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterResources.annualPrecipitation.translation)}
          </Typography>
        </MenuItem>
        <MenuItem
          value={indicators.waterResources.actualEvapotranspiration.value}
          onClick={() =>
            setIndicatorSelection(
              indicators.waterResources.actualEvapotranspiration.value
            )
          }
          selected={
            indicatorSelection ===
            indicators.waterResources.actualEvapotranspiration.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterResources.actualEvapotranspiration.translation)}
          </Typography>
        </MenuItem>
        {/* Balanço hídrico */}
        <MenuItem
          value={indicators.waterResources.waterBalance.value}
          onClick={() =>
            setIndicatorSelection(indicators.waterResources.waterBalance.value)
          }
          selected={
            indicatorSelection === indicators.waterResources.waterBalance.value
          }
        >
          <Typography variant="body">
            {t(indicators.waterResources.waterBalance.translation)}
          </Typography>
        </MenuItem>
        {/* Mercúrio em Humanos */}
        <Typography variant="body" format="bold" className={classes.title}>
          {t(indicators.mercury.translation)}
        </Typography>
        <MenuItem
          value={indicators.mercury.mercuryHuman.value}
          onClick={() => {
            setIndicatorSelection(indicators.mercury.mercuryHuman.value);
          }}
          selected={
            indicatorSelection === indicators.mercury.mercuryHuman.value
          }
        >
          <Typography variant="body">
            {t(indicators.mercury.mercuryHuman.translation)}
          </Typography>
        </MenuItem>
        {/* Mercúrio em Peixes */}
        <MenuItem
          value={indicators.mercury.mercuryFish.value}
          onClick={() => {
            setIndicatorSelection(indicators.mercury.mercuryFish.value);
          }}
          selected={indicatorSelection === indicators.mercury.mercuryFish.value}
        >
          <Typography variant="body">
            {t(indicators.mercury.mercuryFish.translation)}
          </Typography>
        </MenuItem>
        {/* Indicador Potencial de Poluição Orgânica */}
        <MenuItem
          value={indicators.mercury.IPPO.value}
          onClick={() => {
            setIndicatorSelection(indicators.mercury.IPPO.value);
          }}
          selected={indicatorSelection === indicators.mercury.IPPO.value}
        >
          <Typography variant="body">
            {t(indicators.mercury.IPPO.translation)}
          </Typography>
        </MenuItem>
        {/* Lotes petrolíferos */}
        <Typography variant="body" format="bold" className={classes.title}>
          {t(indicators.ground.translation)}
        </Typography>
        <MenuItem
          value={indicators.ground.oil.value}
          onClick={() => {
            setIndicatorSelection(indicators.ground.oil.value);
          }}
          selected={indicatorSelection === indicators.ground.oil.value}
        >
          <Typography variant="body">
            {t(indicators.ground.oil.translation)}
          </Typography>
        </MenuItem>
        {/* Mineração ilegal */}
        <MenuItem
          value={indicators.ground.illegalMining.value}
          onClick={() => {
            setIndicatorSelection(indicators.ground.illegalMining.value);
          }}
          selected={
            indicatorSelection === indicators.ground.illegalMining.value
          }
        >
          <Typography variant="body">
            {t(indicators.ground.illegalMining.translation)}
          </Typography>
        </MenuItem>
        {/* Lavras de mineração */}
        <MenuItem
          value={indicators.ground.minesMining.value}
          onClick={() => {
            setIndicatorSelection(indicators.ground.minesMining.value);
          }}
          selected={indicatorSelection === indicators.ground.minesMining.value}
        >
          <Typography variant="body">
            {t(indicators.ground.minesMining.translation)}
          </Typography>
        </MenuItem>
        {/* Agropecuária */}
        <MenuItem
          value={indicators.ground.agricultural.value}
          onClick={() => {
            setIndicatorSelection(indicators.ground.agricultural.value);
          }}
          selected={indicatorSelection === indicators.ground.agricultural.value}
        >
          <Typography variant="body">
            {t(indicators.ground.agricultural.translation)}
          </Typography>
        </MenuItem>
        {/* Desmatamento 
              <MenuItem
                value={indicators.ground.deforesting.value}
                onClick={() => {
                  setIndicatorSelection(indicators.ground.deforesting.value);
                }}
              >
                {t(indicators.ground.deforesting.translation)}
              </MenuItem> */}
        {/* Recorrência de eventos de secas extremas 
              <MenuItem
                value={
                  indicators.hydroclimaticVulnerability.droughtEvents.value
                }
                onClick={() => {
                  setIndicatorSelection(
                    indicators.hydroclimaticVulnerability.droughtEvents.value
                  );
                }}
              >
                {t(
                  indicators.hydroclimaticVulnerability.droughtEvents
                    .translation
                )}
              </MenuItem> */}
        {/* Recorrência de eventos de cheia */}
        {/*  <MenuItem
          value={indicators.hydroclimaticVulnerability.floodEvents.value}
          onClick={() => {
            setIndicatorSelection(
              indicators.hydroclimaticVulnerability.floodEvents.value
            );
          }}
        >
          <Typography variant="body">
            {t(indicators.hydroclimaticVulnerability.floodEvents.translation)}
          </Typography>
        </MenuItem>
       Vulnerabilidade a secas 
              <MenuItem
                value={
                  indicators.hydroclimaticVulnerability.droughtVulnerability
                    .value
                }
                onClick={() => {
                  setIndicatorSelection(
                    indicators.hydroclimaticVulnerability.droughtVulnerability
                      .value
                  );
                }}
              >
                {t(
                  indicators.hydroclimaticVulnerability.droughtVulnerability
                    .translation
                )}
              </MenuItem>

              {/* Vulnerabilidade a inundações 
              <MenuItem
                value={
                  indicators.hydroclimaticVulnerability.floodVulnerability.value
                }
                onClick={() => {
                  setIndicatorSelection(
                    indicators.hydroclimaticVulnerability.floodVulnerability
                      .value
                  );
                }}
              >
                {t(
                  indicators.hydroclimaticVulnerability.floodVulnerability
                    .translation
                )}
              </MenuItem> */}
        {/* Autoridades de águas dos países e suas funções 
              <MenuItem
                value={indicators.waterGovernance.authorities.value}
                onClick={() => {
                  setIndicatorSelection(
                    indicators.waterGovernance.authorities.value
                  );
                }}
              >
                {t(indicators.waterGovernance.authorities.translation)}
              </MenuItem> */}
        {/* Legislações de águas dos países */}
        {/*    <MenuItem
          value={indicators.waterGovernance.legislation.value}
          onClick={() => {
            setIndicatorSelection(indicators.waterGovernance.legislation.value);
          }}
         
        >
          <Typography variant="body">
            {t(indicators.waterGovernance.legislation.translation)}
          </Typography>
        </MenuItem>
       Publicações e documentos científicos sobre recursos hídricos 
              <MenuItem
                value={indicators.waterGovernance.publications.value}
                onClick={() => {
                  setIndicatorSelection(
                    indicators.waterGovernance.publications.value
                  );
                }}
              >
                {t(indicators.waterGovernance.publications.translation)}
              </MenuItem> */}
        {/* Relatórios dos países sobre recursos hídricos 
              <MenuItem
                value={indicators.waterGovernance.countryReports.value}
                onClick={() => {
                  setIndicatorSelection(
                    indicators.waterGovernance.countryReports.value
                  );
                }}
              >
                {t(indicators.waterGovernance.countryReports.translation)}
              </MenuItem> */}
      </ThemeProvider>
    </div>
  );
}
