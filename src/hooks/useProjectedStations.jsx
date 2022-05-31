import { useContextSelector } from 'use-context-selector';

import FilteringContext from '../contexts/filtering';

export function useProjectedStations() {
  const viewProjectedStations = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.viewProjectedStations
  );

  const handleOnViewProjectedStations = useContextSelector(
    FilteringContext,
    (filtering) => filtering.functions.handleOnViewProjectedStations
  );

  return {
    viewProjectedStations,
    handleOnViewProjectedStations,
  };
}
