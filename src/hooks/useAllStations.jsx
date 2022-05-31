import { useContextSelector } from 'use-context-selector';

import FilteringContext from '../contexts/filtering';

export function useAllStations() {
  const viewAllStations = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.viewAllStations
  );

  const handleOnViewAllStations = useContextSelector(
    FilteringContext,
    (filtering) => filtering.functions.handleOnViewAllStations
  );

  return {
    viewAllStations,
    handleOnViewAllStations,
  };
}
