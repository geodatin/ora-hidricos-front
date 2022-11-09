/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

import {
  filterDefaults,
  networkByValue,
  networkByValueT,
} from '../constants/options';
import { useQuery } from '../hooks/useQuery';

const FilteringContext = createContext({});

/**
 * The FilteringProvider is a context to provide the dashboard filtering options.
 * */
export function FilteringProvider({ embed, children }) {
  const [indicatorSelection, setIndicatorSelection] = useState(
    filterDefaults.indicatorSelection
  );
  const [indicatorSelectionTerritory, setIndicatorSelectionTerritory] =
    useState(filterDefaults.indicatorSelectionTerritory);

  const [territorySelection, setTerritorySelection] = useState(
    filterDefaults.territorySelection
  );

  const query = useQuery();
  const [paramsLoaded, setParamsLoaded] = useState(false);

  /**
   * Loads the search params.
   */
  useEffect(() => {
    const indicatorSelectionParamTerritory = query.get(
      'indicatorSelectionTerritory'
    );
    const indicatorSelectionParam = query.get('indicatorSelection');
    const searchParam = query.get('search');

    if (networkByValueT[indicatorSelectionParamTerritory]) {
      setIndicatorSelectionTerritory(
        Math.trunc(indicatorSelectionParamTerritory)
      );
    }

    if (networkByValue[indicatorSelectionParam]) {
      setIndicatorSelection(Math.trunc(indicatorSelectionParam));
    }

    if (searchParam) {
      const decodedURI = decodeURI(searchParam);
      const queryObject = JSON.parse(decodedURI);

      setTerritorySelection(queryObject);

      console.log(String(queryObject.name));
    }
    setParamsLoaded(true);
  }, []);

  const generateRoute = useCallback(
    (start) => {
      let newQuery = start;

      const initialSize = newQuery.length;

      /**
       * This function verifies if there is a need to add a separator between the query params.
       */
      const trySeparator = () => {
        if (newQuery.length > initialSize) {
          newQuery += '&';
        }
      };

      if (indicatorSelection !== filterDefaults.indicatorSelection) {
        trySeparator();
        newQuery += `indicatorSelectionTerritory=${indicatorSelectionTerritory}`;
      }

      if (indicatorSelection !== filterDefaults.indicatorSelection) {
        trySeparator();
        newQuery += `indicatorSelection=${indicatorSelection}`;
      }

      const selectionAux = {};

      Object.keys(
        territorySelection === null || territorySelection === undefined
          ? ''
          : territorySelection
      ).forEach((key) => {
        if (territorySelection[key].length > 0) {
          selectionAux[key] = territorySelection[key];
        }
      });

      if (Object.keys(selectionAux).length > 0) {
        trySeparator();
        const searchValueParams = JSON.stringify(selectionAux);
        const searchValueEncoded = encodeURI(searchValueParams);
        newQuery += `search=${searchValueEncoded}`;
      }

      if (newQuery.length === initialSize) {
        return `/${process.env.REACT_APP_URL_BASE}`;
      }

      return newQuery;
    },
    [indicatorSelection, indicatorSelectionTerritory, territorySelection]
  );

  /**
   * This useEffect puts the current selection into the route.
   */
  useEffect(() => {
    if (paramsLoaded) {
      if (
        window.location.pathname ===
          `/${process.env.REACT_APP_URL_BASE}/filter` ||
        window.location.pathname === `/${process.env.REACT_APP_URL_BASE}` ||
        window.location.pathname === `/${process.env.REACT_APP_URL_BASE}/`
      ) {
        window.history.replaceState(
          null,
          '',
          generateRoute(`/${process.env.REACT_APP_URL_BASE}/filter?`)
        );
      }
    }
  }, [indicatorSelection, territorySelection]);

  return (
    <FilteringContext.Provider
      value={{
        values: {
          embed,
          indicatorSelection,
          indicatorSelectionTerritory,
          territorySelection,
        },
        setters: {
          setIndicatorSelection,
          setIndicatorSelectionTerritory,
          setTerritorySelection,
        },
        functions: {
          generateRoute,
        },
        loaders: {
          paramsLoaded,
        },
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
}

FilteringProvider.defaultProps = {
  embed: false,
};

FilteringProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  embed: PropTypes.bool,
};

export default FilteringContext;
