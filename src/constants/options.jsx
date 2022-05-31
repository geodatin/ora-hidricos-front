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

export const embedItems = [
  {
    key: 'leftBar',
    translation: 'specific.embed.leftBar',
    defaultOption: true,
  },
  {
    key: 'rightBar',
    translation: 'specific.embed.rightBar',
    defaultOption: true,
  },
  { key: 'topBar', translation: 'specific.embed.topBar', defaultOption: true },
  {
    key: 'embeding',
    translation: 'specific.embed.embeding',
    defaultOption: false,
  },
];

export const mobileNavs = {
  map: {
    value: 0,
  },
  filters: {
    value: 1,
  },
  notifications: {
    value: 2,
  },
  panel: {
    value: 3,
  },
};

export const layoutConfigs = {
  isLeftHidden: [false, true, true, false],
  isRightHidden: [false, false, true, true],
};
