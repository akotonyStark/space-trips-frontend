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

const MapBody = () => {
  const [popupInfo, setPopupInfo] = useState(null)
  const [
    spaceCenters,
    setSpaceCenters,
    trips,
    setTrips,
    viewState,
    setViewState,
    hovered,
    setHovered,
    marker,
    setMarker,
  ] = useContext(AppContext)

  useEffect(() => {
    // console.log(spaceCenters)
  }, [spaceCenters])

  const handleMarkerInteraction = (sp_center) => {
    setPopupInfo({ ...sp_center, image: space_image })
    setMarker({ id: sp_center.name.split(' ').join('-'), isBouncing: true })
  }

  const pins = useMemo(
    () =>
      trips.map((center, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={center.longitude}
          latitude={center.latitude}
          anchor='bottom'
        >
          {hovered.state && hovered.id == center.name.split(' ').join('-') ? (
            <a href={`#${center.name.split(' ').join('-')}`}>
              <img
                src={RedPin}
                alt='red-image'
                onClick={() => handleMarkerInteraction(center)}
              />
            </a>
          ) : (
            <a href={`#${center.name.split(' ').join('-')}`}>
              <img
                src={YellowPin}
                alt='yellow-image'
                onClick={() => handleMarkerInteraction(center)}
              />
            </a>
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
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
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
