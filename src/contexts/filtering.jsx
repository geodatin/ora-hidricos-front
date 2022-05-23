/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

import { filterDefaults } from '../constants/options';

const FilteringContext = createContext({});

/**
 * The FilteringProvider is a context to provide the dashboard filtering options.
 * */
export function FilteringProvider({ embed, children }) {
  const [indicatorSelection, setIndicatorSelection] = useState(
    filterDefaults.indicatorSelection
  );
  const [territorySelection, setTerritorySelection] = useState(
    filterDefaults.territorySelection
  );

  return (
    <FilteringContext.Provider
      value={{
        values: {
          embed,
          indicatorSelection,
          territorySelection,
        },
        setters: {
          setIndicatorSelection,
          setTerritorySelection,
        },
        functions: {},
        loaders: {},
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
