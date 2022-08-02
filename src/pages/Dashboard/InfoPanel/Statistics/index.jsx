import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { indicators } from '../../../../constants/options';
import FilteringContext from '../../../../contexts/filtering';
import { useLayoutConfig } from '../../../../hooks/useLayoutConfig';
import WaterSurface from './WaterSurface';

/**
 * This function provides a statistics list
 * @returns statistics list
 */

export default function Statistics() {
  const { setLayoutConfig, nextLayoutConfig } = useLayoutConfig();

  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  return (
    <div>
      {(indicatorSelection === indicators.waterSurface.value &&
        (nextLayoutConfig() === setLayoutConfig(0), (<WaterSurface />))) ||
        (indicatorSelection === indicators.mercuryHuman.value &&
          nextLayoutConfig() === setLayoutConfig(3)) ||
        (indicatorSelection === indicators.mercuryFish.value &&
          nextLayoutConfig() === setLayoutConfig(3)) ||
        (indicatorSelection === indicators.oil.value &&
          nextLayoutConfig() === setLayoutConfig(3))}
    </div>
  );
}
