import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { Popup, useMapEvents } from 'react-leaflet';

import { darkScheme } from '../../../constants/schemes';
import api from '../../../services/api';
import Typography from '../../Typography';
import useStyles from '../styles';

export default function GetPopupWatershed() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const [popup, setPopup] = useState();
  const [tilesCoord, setTilesCoord] = useState();

  useEffect(() => {
    api
      .get(`territory/watershed/tiles/properties/${popup?.lng}/${popup?.lat}`)
      .then(({ data }) => {
        setTilesCoord(data);
      })
      .catch((error) => {
        if (error.response) {
          setTilesCoord(undefined);
        }
      });
  }, [popup]);

  useMapEvents({
    click(e) {
      setPopup(e.latlng);
    },
  });

  return tilesCoord === undefined ? null : (
    <Popup
      key={theme === darkScheme ? `dark` : `light`}
      className={classes.popup}
      position={[popup?.lat, popup?.lng]}
    >
      <Typography variant="caption" format="bold">
        {tilesCoord?.name}
      </Typography>
      <div className={classes.separator} />

      {tilesCoord?.id === 1 && (
        <>
          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.area')}
            </Typography>
            <Typography variant="caption">630.947,44</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.population')}
            </Typography>
            <Typography variant="caption">3.744.488</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.countries')}
            </Typography>
            <Typography variant="caption">Brasi, Guiana</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.cities')}
            </Typography>
            <Typography variant="caption">
              Manaus, Óbidos, Santarém, Macapá
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.rivers')}
            </Typography>
            <Typography variant="caption">
              Amazonas, Jatapu, Trombetas, Paru, Maicuru, Jari
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.main')}
            </Typography>
            <Typography variant="caption">
              Agropecuária, urbanização e mineração
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.total')}
            </Typography>
            <Typography variant="caption">30</Typography>
          </div>
        </>
      )}
      {tilesCoord?.id === 2 && (
        <>
          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.area')}
            </Typography>
            <Typography variant="caption">509.486,81</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.population')}
            </Typography>
            <Typography variant="caption">3.244.488</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.countries')}
            </Typography>
            <Typography variant="caption">Brasi</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.cities')}
            </Typography>
            <Typography variant="caption">
              São Fi Jo Xingu, Altamira, Porto de Moz, Tucumã e Ourilândia do
              Norte
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.rivers')}
            </Typography>
            <Typography variant="caption">
              Xingu, Irir, Iriri Novo, Fresco
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.main')}
            </Typography>
            <Typography variant="caption">
              Desmatamento, agropecuária, urbanização, mineração e
              infraestrutura elétrica
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.total')}
            </Typography>
            <Typography variant="caption">30</Typography>
          </div>
        </>
      )}
      {tilesCoord?.id === 3 && (
        <>
          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.area')}
            </Typography>
            <Typography variant="caption">493.142,49</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.population')}
            </Typography>
            <Typography variant="caption">1.597.186</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.countries')}
            </Typography>
            <Typography variant="caption">Brasi</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.cities')}
            </Typography>
            <Typography variant="caption">
              Alta Floresta, Nova Bandeirantes, Primavera, Sinop
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.rivers')}
            </Typography>
            <Typography variant="caption">
              Juruena, Ponta de Pedro, do Sangue, São Manuel
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.main')}
            </Typography>
            <Typography variant="caption">
              Agropecuária, desmatamento, urbanização e mineração
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.total')}
            </Typography>
            <Typography variant="caption">59</Typography>
          </div>
        </>
      )}
      {tilesCoord?.id === 4 && (
        <>
          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.area')}
            </Typography>
            <Typography variant="caption">1.369.060,84</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.population')}
            </Typography>
            <Typography variant="caption">10.364.999</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.countries')}
            </Typography>
            <Typography variant="caption">Bolívia, Brasil, Peru</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.cities')}
            </Typography>
            <Typography variant="caption">
              La Paz, Trinidad, Puerto Maldonado, Porto Velho, Sta Cruz de La
              Sierra
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.rivers')}
            </Typography>
            <Typography variant="caption">
              Madre de Dios, Mamoré, Madeira, Itonomas, Guaporé, Aripuanã
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.main')}
            </Typography>
            <Typography variant="caption">
              Queimadas, desmatamento, agropecuária, mineração legal e ilegal, e
              urbanização
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.total')}
            </Typography>
            <Typography variant="caption">180</Typography>
          </div>
        </>
      )}
      {tilesCoord?.id === 5 && (
        <>
          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.area')}
            </Typography>
            <Typography variant="caption">701.252,25</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.population')}
            </Typography>
            <Typography variant="caption">2.576.342</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.countries')}
            </Typography>
            <Typography variant="caption">
              Brasil, Colômbia, Guiana, Venezuela
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.cities')}
            </Typography>
            <Typography variant="caption">
              La Paz, Trinidad, Puerto Maldonado, Porto Velho, Sta Cruz de La
              Sierra
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.rivers')}
            </Typography>
            <Typography variant="caption">
              Boa Vista, San Carlos de Río Negro, La Guadalupe, Mitú
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.main')}
            </Typography>
            <Typography variant="caption">
              Desmatamento, urbanização, agropecuária e mineração
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.total')}
            </Typography>
            <Typography variant="caption">68</Typography>
          </div>
        </>
      )}
      {tilesCoord?.id === 6 && (
        <>
          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.area')}
            </Typography>
            <Typography variant="caption">2.208.708,69</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.population')}
            </Typography>
            <Typography variant="caption">14.451.905</Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.countries')}
            </Typography>
            <Typography variant="caption">
              Bolívia, Brasil, Colômbia, Equador, Peru
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.cities')}
            </Typography>
            <Typography variant="caption">
              Caquetá, Putumayo, Rio Branco, Huancayo, Cusco
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.rivers')}
            </Typography>
            <Typography variant="caption">
              Purus, Juruá, Marañon, Solimões, Caquetá, Japurá
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.main')}
            </Typography>
            <Typography variant="caption">
              Desmatamento, agropecuária e mineração, legal e ilegal
            </Typography>
          </div>

          <div className={classes.popupItem}>
            <Typography variant="caption" className={classes.popupItemTitle}>
              {t('map.points.watershed.total')}
            </Typography>
            <Typography variant="caption">305</Typography>
          </div>
        </>
      )}
    </Popup>
  );
}
