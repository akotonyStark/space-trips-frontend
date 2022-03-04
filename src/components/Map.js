import React, { useState, useMemo, useContext, useEffect } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'

import YellowPin from '../assets/marker.png'
import RedPin from '../assets/red.png'
import space_image from '../assets/space_image.png'

import { AppContext } from '../App'

const MapBody = ({ hovered }) => {
  const [popupInfo, setPopupInfo] = useState(null)
  const [spaceCenters, , , viewState] = useContext(AppContext)

  useEffect(() => {
    console.log(spaceCenters)
  }, [spaceCenters])

  const pins = useMemo(
    () =>
      spaceCenters.map((center, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={center['_geoloc'].lng}
          latitude={center['_geoloc'].lat}
          anchor='bottom'
        >
          {!hovered ? (
            <img
              src={YellowPin}
              alt='yellow-image'
              onClick={() => setPopupInfo({ ...center, image: space_image })}
            />
          ) : (
            <img
              src={RedPin}
              alt='red-image'
              onClick={() => setPopupInfo({ ...center, image: space_image })}
            />
          )}
        </Marker>
      )),
    [spaceCenters, hovered]
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
            longitude={Number(popupInfo['_geoloc'].lng)}
            latitude={Number(popupInfo['_geoloc'].lat)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <img
              width='100%'
              src={popupInfo.image}
              alt='marker'
              style={{ height: 150 }}
              onClick={() => setPopupInfo(null)}
              title={popupInfo.description}
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
