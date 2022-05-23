export const indicators = {
  waterSurface: {
    name: 'waterSurface',
    value: 1,
    translation: 'specific.indicators.type.waterSurface',
  },
  WQI: {
    name: 'waterQualityIndex',
    value: 2,
    translation: 'specific.indicators.type.WQI',
  },
};

export const filterDefaults = {
  indicatorSelection: indicators.waterSurface.value,
  territorySelection: null,
};
