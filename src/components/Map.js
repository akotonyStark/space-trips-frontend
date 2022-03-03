import React, { useState, useMemo, useContext } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'

import Pin from '../assets/marker.png'
import styled from 'styled-components'
import { AppContext } from '../App'

const StylePin = styled.img`
  width: 24px;
  height: 30px;
`

const MapBody = () => {
  const [popupInfo, setPopupInfo] = useState(null)
  const [, trips, , viewState, ,] = useContext(AppContext)

  const pins = useMemo(
    () =>
      trips.map((trip, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={trip.longitude}
          latitude={trip.latitude}
          anchor='bottom'
        >
          <StylePin src={Pin} onClick={() => setPopupInfo(trip)} />
        </Marker>
      )),
    [trips]
  )

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

        {popupInfo && (
          <Popup
            anchor='bottom'
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <img
              width='100%'
              src={popupInfo.image}
              style={{ height: 150 }}
              onClick={() => setPopupInfo(null)}
            />
            <div
              style={{
                height: 30,
                fontFamily: 'Lato',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {popupInfo.name}
            </div>
          </Popup>
        )}
        {pins}
      </Map>
    </div>
  )
}

export default MapBody
