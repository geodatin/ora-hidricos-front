import { useContextSelector } from 'use-context-selector';

import MapContext from '../contexts/mapping';

export function useMap() {
  const mapRef = useContextSelector(
    MapContext,
    (mapping) => mapping.values.mapRef
  );

  const setMapRef = useContextSelector(
    MapContext,
    (mapping) => mapping.setters.setMapRef
  );

  const panOnMap = useContextSelector(
    MapContext,
    (mapping) => mapping.functions.panOnMap
  );

  return { mapRef, setMapRef, panOnMap };
}
