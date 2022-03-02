import React, { useEffect, useState } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'

const MapBody = () => {
  const [viewState, setViewState] = useState({
    width: '100%',
    height: 900,
    latitude: 41.579606918652054,
    longitude: 4.244298260567439,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
    transitionDuration: 1000,
  })

  return (
    <div className='map-body'>
      <Map
        initialViewState={viewState}
        mapStyle='mapbox://styles/mapbox/dark-v8'
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl position='top-right' />
        <NavigationControl position='top-right' />
        <FullscreenControl position='top-right' />
        <ScaleControl />
      </Map>
    </div>
  )
}

export default MapBody
