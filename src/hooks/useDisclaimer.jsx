import { useContextSelector } from 'use-context-selector';

import NavigationContext from '../contexts/navigation';

export function useDisclaimer() {
  const isDisclaimerOpened = useContextSelector(
    NavigationContext,
    (navigation) => navigation.values.isDisclaimerOpened
  );

  const openDisclaimer = useContextSelector(
    NavigationContext,
    (navigation) => navigation.functions.openDisclaimer
  );

  const closeDisclaimer = useContextSelector(
    NavigationContext,
    (navigation) => navigation.functions.closeDisclaimer
  );

  return { isDisclaimerOpened, openDisclaimer, closeDisclaimer };
}
