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
  }, [auxIndicatorSelection]);

  /**
   * Clear the aux selection.
   */
  function clearSelection() {
    setAuxIndicatorSelection(filterDefaults.indicatorSelection);
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

      api.get(`/territory/${newInput}`).then(({ data }) => {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleButton
        title={t('specific.filters.title')}
        buttonTitle={t('specific.filters.clearButton')}
        buttonDisabled={
          auxIndicatorSelection === filterDefaults.indicatorSelection &&
          auxAutocompleteSelection === filterDefaults.territorySelection
        }
        onClick={() => clearSelection()}
      />
      <div>
        <CustomSelect value={auxIndicatorSelection}>
          <MenuItem
            value={indicators.waterSurface.value}
            onClick={() =>
              setAuxIndicatorSelection(indicators.waterSurface.value)
            }
          >
            {t(indicators.waterSurface.translation)}
          </MenuItem>
          <MenuItem
            value={indicators.mercuryHuman.value}
            onClick={() => {
              setAuxIndicatorSelection(indicators.mercuryHuman.value);
            }}
          >
            {t(indicators.mercuryHuman.translation)}
          </MenuItem>
          <MenuItem
            value={indicators.mercuryFish.value}
            onClick={() => {
              setAuxIndicatorSelection(indicators.mercuryFish.value);
            }}
          >
            {t(indicators.mercuryFish.translation)}
          </MenuItem>
        </CustomSelect>
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
