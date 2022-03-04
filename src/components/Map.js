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
    handleHover,
  ] = useContext(AppContext)

  useEffect(() => {
    // console.log(spaceCenters)
  }, [spaceCenters])

  const handleInteraction = (sp_center) => {
    setPopupInfo({ ...sp_center, image: space_image })
    // setViewState({
    //   ...viewState,
    //   latitude: sp_center['_geoloc'].lat,
    //   longitude: sp_center['_geoloc'].lng,
    // })
  }

  const handleMarkerInteraction = (sp_center) => {
    setPopupInfo({ ...sp_center, image: space_image })
    window.scrollTo(
      0,
      document.querySelector(sp_center.name.split(' ').join('-'))
    )
  }

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
            <a href={`#${center.name.split(' ').join('-')}`}>
              <img
                src={YellowPin}
                alt='yellow-image'
                onClick={() => handleMarkerInteraction(center)}
              />
            </a>
          ) : (
            <a href={`#${center.name.split(' ').join('-')}`}>
              <img
                href={`#${center.name.split(' ').join('-')}`}
                src={RedPin}
                alt='red-image'
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
