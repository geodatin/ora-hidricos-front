import React from 'react';
import { useTranslation } from 'react-i18next';

import { useDisclaimer } from '../../hooks/useDisclaimer';
import CustomDialog from '../CustomDialog';
import Typography from '../Typography';

/**
 * This component renders a disclaimer.
 */
export default function Disclaimer() {
  const { isDisclaimerOpened, closeDisclaimer } = useDisclaimer();
  const { t } = useTranslation();

  return (
    <CustomDialog
      open={isDisclaimerOpened}
      title={t('disclaimer.about')}
      onClose={closeDisclaimer}
      button={{ isEnabled: true, text: t('disclaimer.close') }}
    >
      <Typography variant="p" style={{ fontSize: '16px' }}>
        <Typography variant="bold">
          {t('disclaimer.paragraphOneTitle')}
        </Typography>{' '}
        {t('disclaimer.paragraphOne')}
      </Typography>

      <Typography variant="p" style={{ fontSize: '16px', marginTop: 20 }}>
        <Typography variant="bold">
          {t('disclaimer.paragraphTwoTitle')}
        </Typography>{' '}
        {t('disclaimer.paragraphTwo')}
      </Typography>

      <Typography variant="p" style={{ fontSize: '16px', marginTop: 20 }}>
        <Typography variant="bold">
          {t('disclaimer.paragraphThreeTitle')}
        </Typography>{' '}
        {t('disclaimer.paragraphThree')}
      </Typography>

      <Typography variant="p" style={{ fontSize: '16px', marginTop: 20 }}>
        <Typography variant="bold">
          {t('disclaimer.paragraphFourTitle')}
        </Typography>{' '}
        {t('disclaimer.paragraphFour')}
      </Typography>
    </CustomDialog>
  );
}
