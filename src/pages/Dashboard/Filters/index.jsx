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
          <MenuItem
            value={indicators.waterResources.value}
            onClick={() =>
              // eslint-disable-next-line no-unused-expressions
              {
                setAuxIndicatorSelectionTerritory(
                  indicators.waterResources.value
                );
                setAuxIndicatorSelection(
                  indicators.waterResources.waterSurface.value
                );
              }
            }
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
        </CustomSelect>
      </div>

      <div style={{ marginTop: '30px' }}>
        {(auxIndicatorSelectionTerritory ===
          indicators.waterResources.value && (
          <CustomSelect value={auxIndicatorSelection}>
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
          </CustomSelect>
        )) ||
          (auxIndicatorSelectionTerritory === indicators.mercury.value && (
            <CustomSelect value={auxIndicatorSelection}>
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
            </CustomSelect>
          )) ||
          (auxIndicatorSelectionTerritory === indicators.ground.value && (
            <CustomSelect value={auxIndicatorSelection}>
              <MenuItem
                value={indicators.ground.oil.value}
                onClick={() => {
                  setAuxIndicatorSelection(indicators.ground.oil.value);
                }}
              >
                {t(indicators.ground.oil.translation)}
              </MenuItem>
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
