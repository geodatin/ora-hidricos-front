/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Routes as BaseRoutes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';

import Disclaimer from './components/Disclaimer';
import Header from './components/Header';
import { FilteringProvider } from './contexts/filtering';
import { MappingProvider } from './contexts/mapping';
import { NavigationProvider } from './contexts/navigation';
import Dashboard from './pages/Dashboard';
import DataLibrary from './pages/DataLibrary';

function DefaultPage({ embed }) {
  return (
    <NavigationProvider>
      <FilteringProvider embed={embed}>
        <MappingProvider>
          <Disclaimer />
          <Dashboard />
        </MappingProvider>
      </FilteringProvider>
    </NavigationProvider>
  );
}

function Routes() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <Header
        projectName={t('general.projectName')}
        items={[
          { title: 'Dashboard', to: '/' },
          { title: 'Data library', to: '/library' },
        ]}
      />
      <BaseRoutes>
        <Route exact path="/" element={<DefaultPage />} />
        <Route exact path="/embed" element={<DefaultPage embed />} />

        <Route exact path="/library" element={<DataLibrary />} />
        <Route path="*" element={<Navigate to="/" />} />
      </BaseRoutes>
    </BrowserRouter>
  );
}

export default Routes;
