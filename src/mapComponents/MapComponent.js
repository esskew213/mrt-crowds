import MapMarker from './MapMarker';
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  maxWidth: '800px',

  height: '500px',
};

const center = {
  lat: 1.35,
  lng: 103.82,
};

function MapComponent({
  crowdData = [
    {
      crowd_level: 'l',
      id: 186,
      retrieved_at: '2022-05-30T13:40:00+00:00',
      stn_code: 'NE10',
      stations: {
        stn_name: 'Potong Pasir',
        stn_code: 'NE10',
        mrt_line: 'NEL',
        lat: 1.331316,
        lng: 103.868779,
      },
    },
  ],
}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      options={{ maxZoom: 11.5, minZoom: 11.5 }}
      zoom={1}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons={false}
    >
      {crowdData &&
        crowdData.map((stn, idx) => {
          return (
            <MapMarker
              key={idx}
              position={{ lat: stn.stations.lat, lng: stn.stations.lng }}
              name={stn.stations.stn_name}
              code={stn.stn_code}
              crowdLevel={stn.crowd_level}
            />
          );
        })}
    </GoogleMap>
  ) : null;
}

export default React.memo(MapComponent);
