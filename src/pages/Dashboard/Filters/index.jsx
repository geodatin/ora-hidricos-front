import { MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import CustomButton from '../../../components/CustomButton';
import CustomSelect from '../../../components/CustomSelect';
import ShareDialog from '../../../components/ShareDialog';
import TitleButton from '../../../components/TitleButton';
import { filterDefaults, indicators } from '../../../constants/options';
import FilteringContext from '../../../contexts/filtering';
import useStyles from './styles';

/**
 * This function provides filters components
 * @returns filters components
 */
export default function Filters() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const [firstLoad, setFirstLoad] = useState(true);
  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );
  const classes = useStyles();
  const [applyDisabled, setApplyDisabled] = useState(true);

  const setIndicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.setters.setIndicatorSelection
  );

  const [auxIndicatorSelection, setAuxIndicatorSelection] =
    useState(indicatorSelection);

  /**
   * Set the selection to context.
   */
  function applySelection() {
    setIndicatorSelection(auxIndicatorSelection);
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
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleButton
        title={t('specific.filters.title')}
        buttonTitle={t('specific.filters.clearButton')}
        buttonDisabled={
          auxIndicatorSelection === filterDefaults.indicatorSelection
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
            value={indicators.WQI.value}
            onClick={() => {
              setAuxIndicatorSelection(indicators.WQI.value);
            }}
          >
            {t(indicators.WQI.translation)}
          </MenuItem>
        </CustomSelect>
      </div>
      <span className={classes.separator} />
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
          value={indicators.WQI.value}
          onClick={() => {
            setAuxIndicatorSelection(indicators.WQI.value);
          }}
        >
          {t(indicators.WQI.translation)}
        </MenuItem>
      </CustomSelect>
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
        style={{ marginTop: 0 }}
        disabled={applyDisabled}
        onClick={() => applySelection()}
      >
        {t('specific.filters.apply')}
      </CustomButton>
    </div>
  );
}
