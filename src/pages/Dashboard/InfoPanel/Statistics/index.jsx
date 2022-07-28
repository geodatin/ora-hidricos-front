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
  const { setLayoutConfig } = useLayoutConfig();

  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  return (
    <div>
      {console.log(indicatorSelection)}
      {(indicatorSelection === indicators.waterSurface.value &&
        (setLayoutConfig(0), (<WaterSurface />))) ||
        (indicatorSelection === indicators.mercuryHuman.value &&
          setLayoutConfig(3)) ||
        (indicatorSelection === indicators.mercuryFish.value &&
          setLayoutConfig(3))}
    </div>
  );
}
