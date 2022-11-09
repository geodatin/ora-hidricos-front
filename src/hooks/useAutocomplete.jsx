import { useContextSelector } from 'use-context-selector';

import FilteringContext from '../contexts/filtering';

export function useAutocomplete() {
  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );

  const setTerritorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.setters.setTerritorySelection
  );

  const autocompleteStraightSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.autocompleteStraightSelection
  );

  const setAutocompleteStraightSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.setters.setAutocompleteStraightSelection
  );

  return {
    territorySelection,
    setTerritorySelection,
    autocompleteStraightSelection,
    setAutocompleteStraightSelection,
  };
}
