/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { createContext } from 'use-context-selector';

import { layoutConfigs, mobileNavs } from '../constants/options';
import { useMobile } from '../hooks/useMobile';

const MapContext = createContext({});

/**
 * The MappingProvider is a context to provide map ref.
 * */
export function MappingProvider({ children }) {
  MappingProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const { isMobile, setMobileNavValue } = useMobile();

  const [mapRef, setMapRef] = useState();
  const panOnMap = useCallback(
    (coordinates) => {
      if (isMobile) setMobileNavValue(mobileNavs.map.value);
      mapRef?.setView(coordinates, 10, {
        animate: true,
        pan: {
          duration: 0.5,
        },
      });
    },
    [isMobile, mapRef]
  );

  const [layoutConfig, setLayoutConfig] = useState(0);
  const nextLayoutConfig = useCallback(() => {
    setLayoutConfig((current) => {
      const next = current + 1;
      return next > layoutConfigs.isRightHidden.length - 1 ? 0 : next;
    });
    setTimeout(() => {
      mapRef?.invalidateSize();
    }, [1000]);
  }, [mapRef]);

  return (
    <MapContext.Provider
      value={{
        values: { mapRef, layoutConfig },
        setters: { setMapRef, setLayoutConfig },
        functions: { panOnMap, nextLayoutConfig },
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export default MapContext;
