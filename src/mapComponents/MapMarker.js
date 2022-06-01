import { Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import MapInfoBox from './MapInfoBox';

const colorMap = { l: 'green', m: 'orange', h: 'red' };

const MapMarker = ({
  position = {
    lat: 1.35,
    lng: 103.82,
  },
  name = '',
  code = '',
  crowdLevel = 'l',
}) => {
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);
  const toggleInfoBoxOpen = () => {
    setIsInfoBoxOpen((prevState) => !prevState);
  };
  const svgMarker = {
    path: window.google.maps.SymbolPath.CIRCLE,
    fillColor: colorMap[crowdLevel] || 'black',
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: 'white',
    scale: 7,
  };
  return (
    <>
      <Marker
        position={position}
        onClick={toggleInfoBoxOpen}
        icon={svgMarker}
        onPositionChanged={() => {
          setIsInfoBoxOpen(false);
        }}
      />
      {isInfoBoxOpen && (
        <MapInfoBox position={position} name={name} code={code} />
      )}
    </>
  );
};

export default MapMarker;
