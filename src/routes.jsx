/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Routes as BaseRoutes,
  Route,
  BrowserRouter,
  Navigate,
  useSearchParams,
} from 'react-router-dom';

import Disclaimer from './components/Disclaimer';
import Header from './components/Header';
import { FilteringProvider } from './contexts/filtering';
import { MappingProvider } from './contexts/mapping';
import { NavigationProvider } from './contexts/navigation';
import Dashboard from './pages/Dashboard';
import LegislationTable from './pages/LegislationTable';

function FilteringWrapper({ redirect, children }) {
  const [searchParams] = useSearchParams();

  if ([...searchParams].length === 0) {
    return <Navigate replace to={redirect} />;
  }

  return children;
}

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
          { title: 'Dashboard', to: `/${process.env.REACT_APP_URL_BASE}` },
          {
            title: 'Legislação',
            to: `/${process.env.REACT_APP_URL_BASE}/legislation`,
          },
        ]}
      />
      <BaseRoutes>
        <Route
          exact
          path={`/${process.env.REACT_APP_URL_BASE}`}
          element={<DefaultPage />}
        />
        <Route
          exact
          path={`/${process.env.REACT_APP_URL_BASE}/legislation`}
          element={<LegislationTable />}
        />
        <Route
          exact
          path={`/${process.env.REACT_APP_URL_BASE}/filter`}
          element={
            <FilteringWrapper redirect={`/${process.env.REACT_APP_URL_BASE}`}>
              <DefaultPage />
            </FilteringWrapper>
          }
        />
        <Route
          exact
          path={`/${process.env.REACT_APP_URL_BASE}/embed`}
          element={<DefaultPage embed />}
        />

        <Route
          path="*"
          element={
            <Navigate replace to={`/${process.env.REACT_APP_URL_BASE}`} />
          }
        />
      </BaseRoutes>
    </BrowserRouter>
  );
}

export default Routes;
