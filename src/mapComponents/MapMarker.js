import { Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import MapInfoBox from './MapInfoBox';

const crowdednessConverter = (code) => {
  switch (code) {
    case 'l':
      return 'green';

    case 'm':
      return 'orange';

    case 'h':
      return 'red';

    default:
      return 'black';
  }
};

const MapMarker = ({
  position = {
    lat: 1.35,
    lng: 103.82,
  },
  name = '',
  code = '',
  crowdLevel = 'l',
}) => {
  console.log('CROWD', crowdLevel);
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);
  const toggleInfoBoxOpen = () => {
    setIsInfoBoxOpen((prevState) => !prevState);
  };
  const svgMarker = {
    path: window.google.maps.SymbolPath.CIRCLE,
    fillColor: 'transparent',
    fillOpacity: 1,
    strokeWeight: 4,
    strokeColor: crowdednessConverter(crowdLevel),
    scale: 5,
  };
  return (
    <>
      <Marker
        position={position}
        onClick={toggleInfoBoxOpen}
        icon={svgMarker}
      />
      {isInfoBoxOpen && (
        <MapInfoBox position={position} name={name} code={code} />
      )}
    </>
  );
};

export default MapMarker;
