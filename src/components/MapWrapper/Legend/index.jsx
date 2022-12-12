import L from 'leaflet';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import CustomTooltip from '../../CustomTooltip';
import useStyles from './styles';

/**
 * This component renders a custom map item component
 * @returns Map Item component
 */
export default function MapItem({ children, popupContent, onClick }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const containerRef = useRef();

  /**
   * Disable click propagation
   */
  useEffect(() => {
    if (containerRef?.current) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(containerRef.current);
    }
  }, []);

  return (
    <div ref={containerRef} className={classes.container}>
      <CustomTooltip
        onClick={() => {
          setOpen((o) => !o);
          onClick();
        }}
        className={classes.button}
        title={open ? 'Minimizar legenda.' : 'Abrir legenda.'}
        placement={open ? 'bottom' : 'right'}
      >
        {children}
      </CustomTooltip>
      {open && popupContent && (
        <div className={classes.popup}>{popupContent}</div>
      )}
    </div>
  );
}

MapItem.defaultProps = {
  popupContent: undefined,
  onClick: () => {},
};

MapItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.shape()),
  ]).isRequired,
  popupContent: PropTypes.shape(),
  onClick: PropTypes.func,
};
