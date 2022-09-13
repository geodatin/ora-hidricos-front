import { ListSubheader, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import AutocompleteSearch from '../../../components/AutocompleteSearch';
import CustomButton from '../../../components/CustomButton';
import CustomSelect from '../../../components/CustomSelect';
import ShareDialog from '../../../components/ShareDialog';
import TitleButton from '../../../components/TitleButton';
import { filterDefaults, indicators } from '../../../constants/options';
import FilteringContext from '../../../contexts/filtering';
import api from '../../../services/api';
import useStyles from './styles';

/**
 * This function provides filters components
 * @returns filters components
 */
export default function Filters() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const [firstLoad, setFirstLoad] = useState(true);

  const setIndicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.setters.setIndicatorSelection
  );

  const setTerritorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.setters.setTerritorySelection
  );

  const classes = useStyles();
  const [applyDisabled, setApplyDisabled] = useState(true);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [noOptionsTextSelector, setNoOptionsTextSelector] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [auxAutocompleteSelection, setAuxAutocompleteSelection] = useState(
    filterDefaults.territorySelection
  );

  const [auxIndicatorSelection, setAuxIndicatorSelection] = useState(
    filterDefaults.indicatorSelection
  );

  const [auxIndicatorSelectionTerritory, setAuxIndicatorSelectionTerritory] =
    useState(filterDefaults.indicatorSelectionTerritory);

  const [inputValue, setInputValue] = useState('');

  /**
   * Set the selection to context.
   */
  function applySelection() {
    setIndicatorSelection(auxIndicatorSelection);
    setTerritorySelection(auxAutocompleteSelection);
    setApplyDisabled(true);
  }

  /**
   * Sets the Apply button disabletion.
   */
  useEffect(() => {
    if (!firstLoad) {
      setApplyDisabled(false);
    } else {
      setFirstLoad(false);
    }
  }, [auxIndicatorSelection, auxIndicatorSelectionTerritory]);

  /**
   * Clear the aux selection.
   */
  function clearSelection() {
    setAuxIndicatorSelection(filterDefaults.indicatorSelection);
    setAuxIndicatorSelectionTerritory(
      filterDefaults.indicatorSelectionTerritory
    );
    setAuxAutocompleteSelection(filterDefaults.territorySelection);
    setAutocompleteOptions([]);
    setInputValue('');
    setApplyDisabled(false);
  }

  function onAutocompleteInputChange(newInput) {
    let subscribed = true;

    if (newInput.length > 0) {
      setNoOptionsTextSelector(true);
      setAutocompleteLoading(true);

      api
        .get(`/territory/${newInput}`, {
          params: {
            type:
              auxIndicatorSelection ===
              indicators.waterResources.waterSurface.value
                ? 'waterSurface'
                : '',
          },
        })
        .then(({ data }) => {
          if (subscribed) {
            setAutocompleteOptions(data);
            setAutocompleteLoading(false);
          }
        });
    } else {
      setNoOptionsTextSelector(false);
      setAutocompleteOptions([]);
    }

    return () => {
      subscribed = false;
    };
  }

  function handleAutocompleteSelect(newItem) {
    setAuxAutocompleteSelection(newItem);
    setApplyDisabled(false);
  }

  useEffect(() => {
    setAuxAutocompleteSelection(filterDefaults.territorySelection);
  }, [auxIndicatorSelection, auxIndicatorSelectionTerritory]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TitleButton
        title={t('specific.filters.title')}
        buttonTitle={t('specific.filters.clearButton')}
        buttonDisabled={
          auxIndicatorSelection === filterDefaults.indicatorSelection &&
          auxIndicatorSelectionTerritory ===
            filterDefaults.indicatorSelectionTerritory &&
          auxAutocompleteSelection === filterDefaults.territorySelection
        }
        onClick={() => clearSelection()}
      />

      <div>
        <CustomSelect value={auxIndicatorSelectionTerritory}>
          {/* <MenuItem
            value={indicators.generalFeatures.value}
            onClick={() => {
              setAuxIndicatorSelectionTerritory(
                indicators.generalFeatures.value
              );
              setAuxIndicatorSelection(
                indicators.generalFeatures.watershedArea.value
              );
            }}
          >
            {t(indicators.generalFeatures.translation)}
          </MenuItem> */}
          <MenuItem
            value={indicators.waterDemand.value}
            onClick={() => {
              setAuxIndicatorSelectionTerritory(indicators.waterDemand.value);
              setAuxIndicatorSelection(indicators.waterDemand.CNARHunion.value);
            }}
          >
            {t(indicators.waterDemand.translation)}
          </MenuItem>

          <MenuItem
            value={indicators.waterResources.value}
            onClick={() => {
              setAuxIndicatorSelectionTerritory(
                indicators.waterResources.value
              );
              setAuxIndicatorSelection(
                indicators.waterResources.waterSurface.value
              );
            }}
          >
            {t(indicators.waterResources.translation)}
          </MenuItem>
          <MenuItem
            value={indicators.mercury.value}
            onClick={() => {
              setAuxIndicatorSelectionTerritory(indicators.mercury.value);
              setAuxIndicatorSelection(indicators.mercury.mercuryHuman.value);
            }}
          >
            {t(indicators.mercury.translation)}
          </MenuItem>
          <MenuItem
            value={indicators.ground.value}
            onClick={() => {
              setAuxIndicatorSelectionTerritory(indicators.ground.value);
              setAuxIndicatorSelection(indicators.ground.oil.value);
            }}
          >
            {t(indicators.ground.translation)}
          </MenuItem>
          {/* <MenuItem
            value={indicators.hydroclimaticVulnerability.value}
            onClick={() => {
              setAuxIndicatorSelectionTerritory(
                indicators.hydroclimaticVulnerability.value
              );
              setAuxIndicatorSelection(
                indicators.hydroclimaticVulnerability.droughtEvents.value
              );
            }}
          >
            {t(indicators.hydroclimaticVulnerability.translation)}
          </MenuItem>
          <MenuItem
            value={indicators.waterGovernance.value}
            onClick={() => {
              setAuxIndicatorSelectionTerritory(
                indicators.waterGovernance.value
              );
              setAuxIndicatorSelection(
                indicators.waterGovernance.authorities.value
              );
            }}
          >
            {t(indicators.waterGovernance.translation)}
          </MenuItem> */}
        </CustomSelect>
      </div>

      <div style={{ marginTop: '30px' }}>
        {(auxIndicatorSelectionTerritory ===
          indicators.generalFeatures.value && (
          <CustomSelect value={auxIndicatorSelection}>
            {/* Área da bacia por país */}
            <MenuItem
              value={indicators.generalFeatures.watershedArea.value}
              onClick={() =>
                setAuxIndicatorSelection(
                  indicators.generalFeatures.watershedArea.value
                )
              }
            >
              {t(indicators.generalFeatures.watershedArea.translation)}
            </MenuItem>

            {/* Porcentagem da área da bacia sobre o território nacional */}
            <MenuItem
              value={indicators.generalFeatures.areaPercentage.value}
              onClick={() =>
                setAuxIndicatorSelection(
                  indicators.generalFeatures.areaPercentage.value
                )
              }
            >
              {t(indicators.generalFeatures.areaPercentage.translation)}
            </MenuItem>

            {/* Unidades hidrológicas superficiais (divisão Otto Pfafstetter) */}
            <MenuItem
              value={indicators.generalFeatures.surfaceHydrologicalUnits.value}
              onClick={() =>
                setAuxIndicatorSelection(
                  indicators.generalFeatures.surfaceHydrologicalUnits.value
                )
              }
            >
              {t(
                indicators.generalFeatures.surfaceHydrologicalUnits.translation
              )}
            </MenuItem>

            {/* Unidades hidrológicas subterrâneas */}
            <MenuItem
              value={
                indicators.generalFeatures.undergroundHydrologicalUnits.value
              }
              onClick={() =>
                setAuxIndicatorSelection(
                  indicators.generalFeatures.undergroundHydrologicalUnits.value
                )
              }
            >
              {t(
                indicators.generalFeatures.undergroundHydrologicalUnits
                  .translation
              )}
            </MenuItem>

            {/* Características Hidrogeoquímicas das águas */}
            <MenuItem
              value={
                indicators.generalFeatures.hydrogeochemicalCharacteristics.value
              }
              onClick={() =>
                setAuxIndicatorSelection(
                  indicators.generalFeatures.hydrogeochemicalCharacteristics
                    .value
                )
              }
            >
              {t(
                indicators.generalFeatures.hydrogeochemicalCharacteristics
                  .translation
              )}
            </MenuItem>
          </CustomSelect>
        )) ||
          (auxIndicatorSelectionTerritory === indicators.waterDemand.value && (
            <CustomSelect value={auxIndicatorSelection}>
              {/* Hidrelétricas 
              <MenuItem
                value={indicators.waterDemand.hydroelectric.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterDemand.hydroelectric.value
                  )
                }
              >
                {t(indicators.waterDemand.hydroelectric.translation)}
              </MenuItem> */}

              {/* População na bacia 
              <MenuItem
                value={indicators.waterDemand.Population.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterDemand.Population.value
                  )
                }
              >
                {t(indicators.waterDemand.Population.translation)}
              </MenuItem>
            */}
              {/* Dados do cadastro nacional de recursos hídricos do Brasil (CNARH) filtro União */}
              <MenuItem
                value={indicators.waterDemand.CNARHunion.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterDemand.CNARHunion.value
                  )
                }
              >
                {t(indicators.waterDemand.CNARHunion.translation)}
              </MenuItem>
              {/* Dados do cadastro nacional de recursos hídricos do Brasil (CNARH) filtro Estado */}
              <MenuItem
                value={indicators.waterDemand.CNARHstate.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterDemand.CNARHstate.value
                  )
                }
              >
                {t(indicators.waterDemand.CNARHstate.translation)}
              </MenuItem>

              {/* Hidrovias */}
              <MenuItem
                value={indicators.waterDemand.Waterways.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterDemand.Waterways.value
                  )
                }
              >
                {t(indicators.waterDemand.Waterways.translation)}
              </MenuItem>
            </CustomSelect>
          )) ||
          (auxIndicatorSelectionTerritory ===
            indicators.waterResources.value && (
            <CustomSelect value={auxIndicatorSelection}>
              {/* Área de Superfície de água */}
              <MenuItem
                value={indicators.waterResources.waterSurface.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterResources.waterSurface.value
                  )
                }
              >
                {t(indicators.waterResources.waterSurface.translation)}
              </MenuItem>
              {/* Zonas Inundáveis 
              <MenuItem
                value={indicators.waterResources.wetlands.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterResources.wetlands.value
                  )
                }
              >
                {t(indicators.waterResources.wetlands.translation)}
              </MenuItem>

              {/* Precipitação anual 
              <MenuItem
                value={indicators.waterResources.annualPrecipitation.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterResources.annualPrecipitation.value
                  )
                }
              >
                {t(indicators.waterResources.annualPrecipitation.translation)}
              </MenuItem>

              {/* Evapotranspiração real 
              <MenuItem
                value={indicators.waterResources.actualEvapotranspiration.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterResources.actualEvapotranspiration.value
                  )
                }
              >
                {t(
                  indicators.waterResources.actualEvapotranspiration.translation
                )}
              </MenuItem>
              {/* Balanço hídrico 
              <MenuItem
                value={indicators.waterResources.waterBalance.value}
                onClick={() =>
                  setAuxIndicatorSelection(
                    indicators.waterResources.waterBalance.value
                  )
                }
              >
                {t(indicators.waterResources.waterBalance.translation)}
              </MenuItem> */}
            </CustomSelect>
          )) ||
          (auxIndicatorSelectionTerritory === indicators.mercury.value && (
            <CustomSelect value={auxIndicatorSelection}>
              {/* Mercúrio em Humanos */}
              <MenuItem
                value={indicators.mercury.mercuryHuman.value}
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.mercury.mercuryHuman.value
                  );
                }}
              >
                {t(indicators.mercury.mercuryHuman.translation)}
              </MenuItem>
              {/* Mercúrio em Peixes */}
              <MenuItem
                value={indicators.mercury.mercuryFish.value}
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.mercury.mercuryFish.value
                  );
                }}
              >
                {t(indicators.mercury.mercuryFish.translation)}
              </MenuItem>

              {/* Indicador Potencial de Poluição Orgânica */}
              <MenuItem
                value={indicators.mercury.IPPO.value}
                onClick={() => {
                  setAuxIndicatorSelection(indicators.mercury.IPPO.value);
                }}
              >
                {t(indicators.mercury.IPPO.translation)}
              </MenuItem>
            </CustomSelect>
          )) ||
          (auxIndicatorSelectionTerritory === indicators.ground.value && (
            <CustomSelect value={auxIndicatorSelection}>
              {/* Lotes petrolíferos */}
              <MenuItem
                value={indicators.ground.oil.value}
                onClick={() => {
                  setAuxIndicatorSelection(indicators.ground.oil.value);
                }}
              >
                {t(indicators.ground.oil.translation)}
              </MenuItem>
              {/* Mineração ilegal */}
              <MenuItem
                value={indicators.ground.illegalMining.value}
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.ground.illegalMining.value
                  );
                }}
              >
                {t(indicators.ground.illegalMining.translation)}
              </MenuItem>
              {/* Lavras de mineração */}
              <MenuItem
                value={indicators.ground.minesMining.value}
                onClick={() => {
                  setAuxIndicatorSelection(indicators.ground.minesMining.value);
                }}
              >
                {t(indicators.ground.minesMining.translation)}
              </MenuItem>
              {/* Agropecuária 
              <MenuItem
                value={indicators.ground.agricultural.value}
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.ground.agricultural.value
                  );
                }}
              >
                {t(indicators.ground.agricultural.translation)}
              </MenuItem>
              {/* Desmatamento 
              <MenuItem
                value={indicators.ground.deforesting.value}
                onClick={() => {
                  setAuxIndicatorSelection(indicators.ground.deforesting.value);
                }}
              >
                {t(indicators.ground.deforesting.translation)}
              </MenuItem> */}
            </CustomSelect>
          )) ||
          (auxIndicatorSelectionTerritory ===
            indicators.hydroclimaticVulnerability.value && (
            <CustomSelect value={auxIndicatorSelection}>
              {/* Recorrência de eventos de secas extremas */}
              <MenuItem
                value={
                  indicators.hydroclimaticVulnerability.droughtEvents.value
                }
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.hydroclimaticVulnerability.droughtEvents.value
                  );
                }}
              >
                {t(
                  indicators.hydroclimaticVulnerability.droughtEvents
                    .translation
                )}
              </MenuItem>
              {/* Recorrência de eventos de cheia */}
              <MenuItem
                value={indicators.hydroclimaticVulnerability.floodEvents.value}
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.hydroclimaticVulnerability.floodEvents.value
                  );
                }}
              >
                {t(
                  indicators.hydroclimaticVulnerability.floodEvents.translation
                )}
              </MenuItem>

              {/* Vulnerabilidade a secas */}
              <MenuItem
                value={
                  indicators.hydroclimaticVulnerability.droughtVulnerability
                    .value
                }
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.hydroclimaticVulnerability.droughtVulnerability
                      .value
                  );
                }}
              >
                {t(
                  indicators.hydroclimaticVulnerability.droughtVulnerability
                    .translation
                )}
              </MenuItem>

              {/* Vulnerabilidade a inundações */}
              <MenuItem
                value={
                  indicators.hydroclimaticVulnerability.floodVulnerability.value
                }
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.hydroclimaticVulnerability.floodVulnerability
                      .value
                  );
                }}
              >
                {t(
                  indicators.hydroclimaticVulnerability.floodVulnerability
                    .translation
                )}
              </MenuItem>
            </CustomSelect>
          )) ||
          (auxIndicatorSelectionTerritory ===
            indicators.waterGovernance.value && (
            <CustomSelect value={auxIndicatorSelection}>
              {/* Autoridades de águas dos países e suas funções */}
              <MenuItem
                value={indicators.waterGovernance.authorities.value}
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.waterGovernance.authorities.value
                  );
                }}
              >
                {t(indicators.waterGovernance.authorities.translation)}
              </MenuItem>
              {/* Legislações de águas dos países */}
              <MenuItem
                value={indicators.waterGovernance.legislation.value}
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.waterGovernance.legislation.value
                  );
                }}
              >
                {t(indicators.waterGovernance.legislation.translation)}
              </MenuItem>

              {/* Publicações e documentos científicos sobre recursos hídricos */}
              <MenuItem
                value={indicators.waterGovernance.publications.value}
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.waterGovernance.publications.value
                  );
                }}
              >
                {t(indicators.waterGovernance.publications.translation)}
              </MenuItem>

              {/* Relatórios dos países sobre recursos hídricos */}
              <MenuItem
                value={indicators.waterGovernance.countryReports.value}
                onClick={() => {
                  setAuxIndicatorSelection(
                    indicators.waterGovernance.countryReports.value
                  );
                }}
              >
                {t(indicators.waterGovernance.countryReports.translation)}
              </MenuItem>
            </CustomSelect>
          ))}
      </div>
      <span className={classes.separator} />
      <div>
        <AutocompleteSearch
          options={autocompleteOptions}
          onSelect={(e) => handleAutocompleteSelect(e)}
          onInputChange={(e, newInput) => {
            onAutocompleteInputChange(newInput);
          }}
          getOptionLabel={(option) => option.name}
          noOptionsText={
            noOptionsTextSelector
              ? t('specific.autocompletesearch.noOptionsText')
              : t('specific.autocompletesearch.emptyText')
          }
          loadingText={t('specific.autocompletesearch.loadingText')}
          loading={autocompleteLoading}
          renderGroup={(params, index) => [
            <ListSubheader
              classes={{ root: classes.autocompleteGroup }}
              key={`${params.group}_${index}`}
              component="div"
            >
              {params.group}
            </ListSubheader>,
            params.children,
          ]}
          renderOption={(props, option) => (
            <li {...props} key={option.code}>
              {option.name}
            </li>
          )}
          paperClass={classes.autocompletePaper}
          defaultValue={auxAutocompleteSelection}
          value={auxAutocompleteSelection}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isOptionEqualToValue={(option, value) => option.code === value.code}
        />
      </div>
      <ShareDialog
        open={open}
        onClose={() => setOpen(false)}
        url={window.location.href}
        shareMessage="a"
        setOpen={(b) => setOpen(b)}
        embedItems={[
          { label: 'label1', key: 'key1', defaultOption: false },
          { label: 'label2', key: 'key2', defaultOption: true },
          { label: 'label3', key: 'key3', defaultOption: true },
        ]}
      />
      <CustomButton
        style={{ marginTop: 15 }}
        disabled={applyDisabled}
        onClick={() => applySelection()}
      >
        {t('specific.filters.apply')}
      </CustomButton>
    </div>
  );
}
