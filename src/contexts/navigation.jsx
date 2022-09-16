/* eslint-disable react/jsx-no-constructed-context-values */
import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { createContext } from 'use-context-selector';

import { breakpoints } from '../constants/constraints';
import { mobileNavs, panels } from '../constants/options';

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
  const [mobileNavValue, setMobileNavValue] = useState(mobileNavs.map.value);

  const [isDisclaimerOpened, setIsDisclaimerOpened] = useState(true);
  const openDisclaimer = useCallback(() => {
    setIsDisclaimerOpened(true);
  }, []);
  const closeDisclaimer = useCallback(() => {
    setIsDisclaimerOpened(false);
  }, []);

  const [panelIndexValue, setPanelIndexValue] = useState(
    panels.statistics.index
  );
  const handleOnChangePanel = useCallback((event, newPanel) => {
    if (newPanel !== null) {
      setPanelIndexValue(newPanel);
    }
  }, []);

  const [station, setStation] = useState();
  const openStation = useCallback(
    (item) => {
      setStation(item);
      setPanelIndexValue(panels.station.index);
      if (isMobile) setMobileNavValue(mobileNavs.panel.value);
    },
    [isMobile]
  );

  const closeStation = useCallback((panelRef) => {
    setPanelIndexValue(panels.list.index);
    panelRef?.current.scrollTo(0, 0);
    setStation(undefined);
  }, []);

  const refreshStation = useCallback(() => {
    setStation((prev) => {
      const refreshed = { ...prev };
      return refreshed;
    });
  }, []);

  const handleOnFilterApplied = useCallback(() => {
    if (station) closeStation();
  }, [station]);

  return (
    <NavigationContext.Provider
      value={{
        values: {
          mobileNavValue,
          panelIndexValue,
          station,
          isMobile,
          isDisclaimerOpened,
        },
        setters: { setMobileNavValue, setPanelIndexValue },
        functions: {
          handleOnChangePanel,
          handleOnFilterApplied,
          openStation,
          closeStation,
          refreshStation,
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
