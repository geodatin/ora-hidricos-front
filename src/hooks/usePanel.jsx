import { useContextSelector } from 'use-context-selector';

import NavigationContext from '../contexts/navigation';

export function usePanel() {
  const panelIndexValue = useContextSelector(
    NavigationContext,
    (navigation) => navigation.values.panelIndexValue
  );

  const handleOnChangePanel = useContextSelector(
    NavigationContext,
    (navigation) => navigation.functions.handleOnChangePanel
  );

  return { panelIndexValue, handleOnChangePanel };
}
