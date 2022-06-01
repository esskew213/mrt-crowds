import React from 'react';
import { InfoWindow } from '@react-google-maps/api';

const MapInfoBox = ({
  position = {
    lat: 1.35,
    lng: 103.82,
  },
  name = '',
  code = '',
}) => {
  const options = {
    closeBoxURL: '',
    enableEventPropagation: true,
    boxStyle: {
      padding: '1rem',
      width: 'fit-content',
      maxWidth: '100px',
      height: 'fit-content',
      maxHeight: '30px',
      backgroundColor: 'white',
      boxShadow: '2px 2px 5px 2px',
    },
  };
  return (
    <InfoWindow options={options} position={position}>
      <div>
        {code}: {name}
      </div>
    </InfoWindow>
  );
};

export default MapInfoBox;
