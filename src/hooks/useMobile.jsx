import { useContextSelector } from 'use-context-selector';

import NavigationContext from '../contexts/navigation';

export function useMobile() {
  const isMobile = useContextSelector(
    NavigationContext,
    (navigation) => navigation.values.isMobile
  );

  const mobileNavValue = useContextSelector(
    NavigationContext,
    (navigation) => navigation.values.mobileNavValue
  );

  const setMobileNavValue = useContextSelector(
    NavigationContext,
    (navigation) => navigation.setters.setMobileNavValue
  );

  return { isMobile, mobileNavValue, setMobileNavValue };
}
