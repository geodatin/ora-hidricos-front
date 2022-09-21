import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { indicators } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import CNARHstate from './CNARHstate';
import CNARHunion from './CNARHunion';
import Hydroelectric from './Hydroelectric';
import IllegalMining from './IllegalMining';
import IPPO from './IPPO';
import MercuryFish from './MercuryFish';
import MercuryHuman from './MercuryHuman';
import MiningMine from './MiningMine';
import Oil from './Oil';
import Population from './Population';
import WaterSurface from './WaterSurface';
import Waterway from './Waterway';
import Wetlands from './Wetlands';
import WQI from './WQI';

/**
 * This function provides a statistics list
 * @returns statistics list
 */

export default function Statistics() {
  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  return (
    <div>
      {(indicatorSelection === indicators.waterResources.waterSurface.value && (
        <WaterSurface />
      )) ||
        (indicatorSelection === indicators.waterResources.wetlands.value && (
          <Wetlands />
        )) ||
        (indicatorSelection ===
          indicators.waterResources.annualPrecipitation.value && <WQI />) ||
        (indicatorSelection ===
          indicators.waterResources.actualEvapotranspiration.value && (
          <WQI />
        )) ||
        (indicatorSelection ===
          indicators.waterResources.waterBalance.value && <WQI />) ||
        (indicatorSelection === indicators.mercury.mercuryHuman.value && (
          <MercuryHuman />
        )) ||
        (indicatorSelection === indicators.mercury.mercuryFish.value && (
          <MercuryFish />
        )) ||
        (indicatorSelection === indicators.mercury.IPPO.value && <IPPO />) ||
        (indicatorSelection === indicators.ground.oil.value && <Oil />) ||
        (indicatorSelection === indicators.ground.illegalMining.value && (
          <IllegalMining />
        )) ||
        (indicatorSelection === indicators.ground.minesMining.value && (
          <MiningMine />
        )) ||
        (indicatorSelection === indicators.ground.agricultural.value && (
          <WQI />
        )) ||
        (indicatorSelection === indicators.ground.deforesting.value && (
          <WQI />
        )) ||
        (indicatorSelection === indicators.waterDemand.hydroelectric.value && (
          <Hydroelectric />
        )) ||
        (indicatorSelection === indicators.waterDemand.Waterways.value && (
          <Waterway />
        )) ||
        (indicatorSelection === indicators.waterDemand.Population.value && (
          <Population />
        )) ||
        (indicatorSelection === indicators.waterDemand.CNARHunion.value && (
          <CNARHunion />
        )) ||
        (indicatorSelection === indicators.waterDemand.CNARHstate.value && (
          <CNARHstate />
        )) ||
        (indicatorSelection ===
          indicators.generalFeatures.watershedArea.value && <WQI />) ||
        (indicatorSelection ===
          indicators.generalFeatures.areaPercentage.value && <WQI />) ||
        (indicatorSelection ===
          indicators.generalFeatures.surfaceHydrologicalUnits.value && (
          <WQI />
        )) ||
        (indicatorSelection ===
          indicators.generalFeatures.undergroundHydrologicalUnits.value && (
          <WQI />
        )) ||
        (indicatorSelection ===
          indicators.generalFeatures.hydrogeochemicalCharacteristics.value && (
          <WQI />
        )) ||
        (indicatorSelection ===
          indicators.hydroclimaticVulnerability.droughtEvents.value && (
          <WQI />
        )) ||
        (indicatorSelection ===
          indicators.hydroclimaticVulnerability.floodEvents.value && <WQI />) ||
        (indicatorSelection ===
          indicators.hydroclimaticVulnerability.droughtVulnerability.value && (
          <WQI />
        )) ||
        (indicatorSelection ===
          indicators.hydroclimaticVulnerability.floodVulnerability.value && (
          <WQI />
        )) ||
        (indicatorSelection ===
          indicators.waterGovernance.authorities.value && <WQI />) ||
        (indicatorSelection ===
          indicators.waterGovernance.legislation.value && <WQI />) ||
        (indicatorSelection ===
          indicators.waterGovernance.publications.value && <WQI />) ||
        (indicatorSelection ===
          indicators.waterGovernance.countryReports.value && <WQI />)}
    </div>
  );
}
