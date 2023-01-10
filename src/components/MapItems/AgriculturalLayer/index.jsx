import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TileLayer } from 'react-leaflet';
import { useContextSelector } from 'use-context-selector';

import FilteringContext from '../../../contexts/filtering';
import api from '../../../services/api';

export default function AgriculturalLayer() {
  const [agriculturalUrl, setAgriculturalUrl] = useState();
  const territorySelection = useContextSelector(
    FilteringContext,
    (filtering) => filtering.values.territorySelection
  );

  const code = territorySelection?.code;

  useEffect(() => {
    api.get('agricultural/tiles').then(({ data }) => {
      setAgriculturalUrl(data);
    });
  }, [code]);

  if (agriculturalUrl === undefined)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );

  return <TileLayer url={agriculturalUrl?.url} zIndex={999} />;
}
