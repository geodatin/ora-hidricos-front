export const indicators = {
  waterResources: {
    name: 'waterResources',
    value: 1,
    translation: 'specific.indicators.type.waterResources',
    // Área de Superfície de água
    waterSurface: {
      name: 'waterSurface',
      value: 1,
      translation: 'specific.indicators.type.waterSurface',
    },
    // Zonas Inundáveis
    wetlands: {
      name: 'wetlands',
      value: 2,
      translation: 'specific.indicators.type.wetlands',
    },
    // Precipitação anual
    annualPrecipitation: {
      name: 'annualPrecipitation',
      value: 3,
      translation: 'specific.indicators.type.annualPrecipitation',
    },
    // Evapotranspiração real
    actualEvapotranspiration: {
      name: 'actualEvapotranspiration',
      value: 4,
      translation: 'specific.indicators.type.actualEvapotranspiration',
    },
    // Balanço hídrico
    waterBalance: {
      name: 'waterBalance',
      value: 5,
      translation: 'specific.indicators.type.waterBalance',
    },
  },
  mercury: {
    name: 'mercury',
    value: 2,
    translation: 'specific.indicators.type.mercury',
    // Mercúrio em Humanos
    mercuryHuman: {
      name: 'mercuryHuman',
      value: 6,
      translation: 'specific.indicators.type.mercuryHuman',
    },
    // Mercúrio em Peixes
    mercuryFish: {
      name: 'mercuryFish',
      value: 7,
      translation: 'specific.indicators.type.mercuryFish',
    },
    // Indicador Potencial de Poluição Orgânica
    IPPO: {
      name: 'IPPO',
      value: 8,
      translation: 'specific.indicators.type.IPPO',
    },
  },
  ground: {
    name: 'ground',
    value: 3,
    translation: 'specific.indicators.type.ground',
    // Lotes petrolíferos
    oil: {
      name: 'oil',
      value: 9,
      translation: 'specific.indicators.type.oil',
    },
    // Mineração ilegal
    illegalMining: {
      name: 'illegalMining',
      value: 10,
      translation: 'specific.indicators.type.illegalMining',
    },
    // Lavras de mineração
    minesMining: {
      name: 'minesMining',
      value: 11,
      translation: 'specific.indicators.type.minesMining',
    },
    // Agropecuária
    agricultural: {
      name: 'agricultural',
      value: 13,
      translation: 'specific.indicators.type.agricultural',
    },
    // Desmatamento
    deforesting: {
      name: 'deforesting',
      value: 14,
      translation: 'specific.indicators.type.deforesting',
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
