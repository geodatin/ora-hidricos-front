export const indicators = {
  waterResources: {
    name: 'waterResources',
    value: 1,
    translation: 'specific.indicators.type.waterResources',
    waterSurface: {
      name: 'waterSurface',
      value: 1,
      translation: 'specific.indicators.type.waterSurface',
    },
  },
  mercury: {
    name: 'mercury',
    value: 2,
    translation: 'specific.indicators.type.mercury',
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
  },
  ground: {
    name: 'ground',
    value: 3,
    translation: 'specific.indicators.type.ground',
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
  },
  /* waterSurface: {
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
  }, */
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
  indicatorSelection: indicators.waterResources.waterSurface.value,
  indicatorSelectionTerritory: indicators.waterResources.value,
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
