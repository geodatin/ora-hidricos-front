/* eslint-disable react/jsx-no-constructed-context-values */
import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { createContext } from 'use-context-selector';

import { breakpoints } from '../constants/constraints';

const NavigationContext = createContext({});

/**
 * The NavigationProvider is a context to provide navigation data on application.
 * */
export function NavigationProvider({ children }) {
  NavigationProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const isMobile = useMediaQuery(breakpoints.max.lg);

  const [isDisclaimerOpened, setIsDisclaimerOpened] = useState(true);
  const openDisclaimer = useCallback(() => {
    setIsDisclaimerOpened(true);
  }, []);
  const closeDisclaimer = useCallback(() => {
    setIsDisclaimerOpened(false);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        values: {
          isDisclaimerOpened,
          isMobile,
        },
        setters: {},
        functions: {
          closeDisclaimer,
          openDisclaimer,
        },
        loaders: {},
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
