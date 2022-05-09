import { Button, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContextSelector } from 'use-context-selector';

import CustomSelect from '../../../components/CustomSelect';
import ShareDialog from '../../../components/ShareDialog';
import TitleButton from '../../../components/TitleButton';
import { indicators } from '../../../constants/options';
import FilteringContext from '../../../contexts/filtering';

/**
 * This function provides filters components
 * @returns filters components
 */
export default function Filters() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const indicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.indicatorSelection
  );

  // eslint-disable-next-line no-unused-vars
  const setIndicatorSelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.setters.setIndicatorSelection
  );

  const [auxIndicatorSelection, setAuxIndicatorSelection] =
    useState(indicatorSelection);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleButton
        title={t('specific.filters.title')}
        buttonTitle={t('specific.filters.clearButton')}
        buttonDisabled={false}
        onClick={() => {}}
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
            value={indicators.IDQ.value}
            onClick={() => {
              setAuxIndicatorSelection(indicators.IDQ.value);
            }}
          >
            {t(indicators.IDQ.translation)}
          </MenuItem>
        </CustomSelect>
      </div>
      <Button onClick={() => setOpen(true)}>Share</Button>
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
    </div>
  );
}
