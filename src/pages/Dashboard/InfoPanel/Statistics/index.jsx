import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { indicators } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import MercuryFish from './MercuryFish';
import MercuryHuman from './MercuryHuman';
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
      {(indicatorSelection === indicators.waterSurface.value && (
        <WaterSurface />
      )) ||
        (indicatorSelection === indicators.mercuryHuman.value && (
          <MercuryHuman />
        )) ||
        (indicatorSelection === indicators.mercuryFish.value && (
          <MercuryFish />
        )) ||
        (indicatorSelection === indicators.oil.value && <WQI />) ||
        (indicatorSelection === indicators.illegalMining.value && <WQI />)}
    </div>
  );
}
