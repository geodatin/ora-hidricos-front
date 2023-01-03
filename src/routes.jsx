/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
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
import Authorities from './pages/Authorities';
import Dashboard from './pages/Dashboard';
import DataSourceTable from './pages/DataSourceTable';
import DocumentsTable from './pages/DocumentsTable';
import LegislationTable from './pages/LegislationTable';

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <FilteringProvider embed={embed}>
          <MappingProvider>
            <Disclaimer />
            <Dashboard />
          </MappingProvider>
        </FilteringProvider>
      </QueryClientProvider>
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
            title: t('legislation.titleHead'),
            to: `/${process.env.REACT_APP_URL_BASE}/legislation`,
          },
          {
            title: t('authorities.title'),
            to: `/${process.env.REACT_APP_URL_BASE}/authorities`,
          },
          {
            title: t('documents.title'),
            to: `/${process.env.REACT_APP_URL_BASE}/documents`,
          },
          {
            title: t('dataSources.title'),
            to: `/${process.env.REACT_APP_URL_BASE}/dataSource`,
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
          path={`/${process.env.REACT_APP_URL_BASE}/authorities`}
          element={<Authorities />}
        />
        <Route
          exact
          path={`/${process.env.REACT_APP_URL_BASE}/documents`}
          element={<DocumentsTable />}
        />
        <Route
          exact
          path={`/${process.env.REACT_APP_URL_BASE}/dataSource`}
          element={<DataSourceTable />}
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
