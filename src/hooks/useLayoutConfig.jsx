import { useContextSelector } from 'use-context-selector';

import MapContext from '../contexts/mapping';

export function useLayoutConfig() {
  const layoutConfig = useContextSelector(
    MapContext,
    (navigation) => navigation.values.layoutConfig
  );

  const setLayoutConfig = useContextSelector(
    MapContext,
    (navigation) => navigation.setters.setLayoutConfig
  );

  const nextLayoutConfig = useContextSelector(
    MapContext,
    (navigation) => navigation.functions.nextLayoutConfig
  );

  return { layoutConfig, setLayoutConfig, nextLayoutConfig };
}
