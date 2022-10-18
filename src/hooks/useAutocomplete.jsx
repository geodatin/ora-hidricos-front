import { useContextSelector } from 'use-context-selector';

import FilteringContext from '../contexts/filtering';

export function useAutocomplete() {
  const autocompleteSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.autocompleteSelection
  );

  const setAutocompleteSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.setters.setAutocompleteSelection
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
    autocompleteSelection,
    setAutocompleteSelection,
    autocompleteStraightSelection,
    setAutocompleteStraightSelection,
  };
}
