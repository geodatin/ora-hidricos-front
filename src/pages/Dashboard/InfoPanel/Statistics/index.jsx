import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { indicators } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import IllegalMining from './IllegalMining';
import MercuryFish from './MercuryFish';
import MercuryHuman from './MercuryHuman';
import Oil from './Oil';
import WaterSurface from './WaterSurface';
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
          <WQI />
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
        (indicatorSelection === indicators.mercury.IPPO.value && <WQI />) ||
        (indicatorSelection === indicators.ground.oil.value && <Oil />) ||
        (indicatorSelection === indicators.ground.illegalMining.value && (
          <IllegalMining />
        )) ||
        (indicatorSelection === indicators.ground.minesMining.value && (
          <WQI />
        )) ||
        (indicatorSelection === indicators.ground.agricultural.value && (
          <WQI />
        )) ||
        (indicatorSelection === indicators.ground.deforesting.value && <WQI />)}
    </div>
  );
}
