// import { useMediaQuery } from '@mui/material';

// import Breadcrumb from '../../components/Breadcrumb';
// import HLayout from '../../components/Layout/Horizontal';
// import MobileExpandLayout from '../../components/Layout/Mobile/Expand';
// import VLayout from '../../components/Layout/Vertical';
// import NavList from '../../components/NavList';
// import { breakpoints } from '../../constants/constraints';
// import Methods from './Methods';
// import useStyles from './styles';
import React from 'react';
import SwaggerUI from 'swagger-ui-react';

import 'swagger-ui-react/swagger-ui.css';
/**
 * This component renders a API methods page
 * @returns API methods page
 */
export default function ApiMethods() {
  return (
    <div>
      <SwaggerUI url="https://dev-rh-ora.geodatin.com/api/docs/" />
    </div>
  );
}
// const classes = useStyles();
// const isMobile = useMediaQuery(breakpoints.max.md);

/* const methods = [
    {
      title: 'Territory',
      id: '1',
      description: 'Search for the territory with like strings.',
      url: 'https://dev-rh-ora.geodatin.com/api/territory/name',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample: 'https://dev-rh-ora.geodatin.com/api/territory/name',
      response: [
        {
          key: 'name',
          type: 'string',
          description: 'Search string for the territory',
        },
      ],
      bodyParams: [
        {
          key: 'name',
          type: 'string',
          description: 'Search string for the territory',
        },
      ],
      urlParams: [
        {
          key: 'name',
          description: 'Search string for the territory',
        },
      ],
    },
    {
      title: 'Tabela de estações fluviométricas 2',
      id: '2',
      description: 'Método que retorna o total de estações.',
      url: 'https://dev-redes-ora.geodatin.com/api/station/count',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample:
        'https://dev-redes-ora.geodatin.com/api/ostation/count',
      response: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      bodyParams: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      urlParams: [
        {
          key: 'count',
          description: 'Contagem numérica de estações',
        },
      ],
    },
    {
      title: 'Tabela de estações fluviométricas 3',
      id: '3',
      description: 'Método que retorna o total de estações.',
      url: 'https://dev-redes-ora.geodatin.com/api/station/count',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample:
        'https://dev-redes-ora.geodatin.com/api/ostation/count',
      response: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      bodyParams: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      urlParams: [
        {
          key: 'count',
          description: 'Contagem numérica de estações',
        },
      ],
    },
    {
      title: 'Tabela de estações fluviométricas 4',
      id: '4',
      description: 'Método que retorna o total de estações.',
      url: 'https://dev-redes-ora.geodatin.com/api/station/count',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample:
        'https://dev-redes-ora.geodatin.com/api/ostation/count',
      response: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      bodyParams: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      urlParams: [
        {
          key: 'count',
          description: 'Contagem numérica de estações',
        },
      ],
    },
    {
      title: 'Tabela de estações fluviométricas 5',
      id: '5',
      description: 'Método que retorna o total de estações.',
      url: 'https://dev-redes-ora.geodatin.com/api/station/count',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample:
        'https://dev-redes-ora.geodatin.com/api/ostation/count',
      response: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      bodyParams: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      urlParams: [
        {
          key: 'count',
          description: 'Contagem numérica de estações',
        },
      ],
    },
    {
      title: 'Tabela de estações fluviométricas 6',
      id: '6',
      description: 'Método que retorna o total de estações.',
      url: 'https://dev-redes-ora.geodatin.com/api/station/count',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample:
        'https://dev-redes-ora.geodatin.com/api/ostation/count',
      response: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      bodyParams: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      urlParams: [
        {
          key: 'count',
          description: 'Contagem numérica de estações',
        },
      ],
    },
    {
      title: 'Tabela de estações fluviométricas 7',
      id: '7',
      description: 'Método que retorna o total de estações.',
      url: 'https://dev-redes-ora.geodatin.com/api/station/count',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample:
        'https://dev-redes-ora.geodatin.com/api/ostation/count',
      response: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      bodyParams: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      urlParams: [
        {
          key: 'count',
          description: 'Contagem numérica de estações',
        },
      ],
    },
    {
      title: 'Tabela de estações fluviométricas 8',
      id: '8',
      description: 'Método que retorna o total de estações.',
      url: 'https://dev-redes-ora.geodatin.com/api/station/count',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample:
        'https://dev-redes-ora.geodatin.com/api/ostation/count',
      response: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      bodyParams: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      urlParams: [
        {
          key: 'count',
          description: 'Contagem numérica de estações',
        },
      ],
    },
    {
      title: 'Tabela de estações fluviométricas 9',
      id: '9',
      description: 'Método que retorna o total de estações.',
      url: 'https://dev-redes-ora.geodatin.com/api/station/count',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample:
        'https://dev-redes-ora.geodatin.com/api/ostation/count',
      response: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      bodyParams: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      urlParams: [
        {
          key: 'count',
          description: 'Contagem numérica de estações',
        },
      ],
    },
    {
      title: 'Tabela de estações fluviométricas 10',
      id: '10',
      description: 'Método que retorna o total de estações.',
      url: 'https://dev-rede  s-ora.geodatin.com/api/station/count',
      type: { name: 'GET', color: '#A1BA09' },
      requisitionExample:
        'https://dev-redes-ora.geodatin.com/api/ostation/count',
      response: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      bodyParams: [
        {
          key: 'count',
          type: 'number',
          description: 'Contagem numérica de estações',
        },
      ],
      urlParams: [
        {
          key: 'count',
          description: 'Contagem numérica de estações',
        },
      ],
    },
  ];

  const methodsList = (
    <NavList
      title="MÉTODOS"
      list={methods.map((method) => ({ id: method.id, value: method.title }))}
    />
  );

  const breadcrumb = <Breadcrumb items={['API', 'Todos os métodos']} />;

  return isMobile ? (
    <MobileExpandLayout
      upRowBar={{
        className: classes.breadBarMobileWrapper,
        children: breadcrumb,
      }}
      expandable={{
        className: classes.methodsListMobileWrapper,
        children: methodsList,
      }}
      mainContainer={{
        className: classes.methodsMobileWrapper,
        children: <Methods methods={methods} />,
      }}
    />
  ) : (
    <HLayout
      leftColumn={{
        className: classes.methodsListWrapper,
        children: methodsList,
      }}
      mainContainer={{
        className: classes.breadMapWrapper,
        children: (
          <VLayout
            upRow={{
              className: classes.breadBarWrapper,
              children: breadcrumb,
            }}
            mainContainer={{
              className: classes.methodsWrapper,
              children: <Methods methods={methods} />,
            }}
          />
        ),
      }}
    />
  );
}
*/
