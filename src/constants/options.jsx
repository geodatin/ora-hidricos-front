export const indicators = {
  waterSurface: {
    name: 'waterSurface',
    value: 1,
    translation: 'specific.indicators.type.waterSurface',
  },
  mercuryHuman: {
    name: 'mercuryHuman',
    value: 2,
    translation: 'specific.indicators.type.mercuryHuman',
  },
  mercuryFish: {
    name: 'mercuryFish',
    value: 3,
    translation: 'specific.indicators.type.mercuryFish',
  },
  oil: {
    name: 'oil',
    value: 4,
    translation: 'specific.indicators.type.oil',
  },
  illegalMining: {
    name: 'illegalMining',
    value: 5,
    translation: 'specific.indicators.type.illegalMining',
  },
};

export const countryCodes = {
  8: 'VE',
  5: 'PE',
  4: 'EC',
  7: 'CO',
  9: 'BR',
  6: 'BO',
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
