import React, { useEffect, useState, useMemo, useContext } from 'react'
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

const StylePin = styled.img`
  width: 24px;
  height: 30px;
`

const MapBody = ({ viewState }) => {
  const [popupInfo, setPopupInfo] = useState(null)
  // const [flights, setFlights] = useState([
  //   {
  //     name: 'Nyasia Flight One',
  //     departureTime: '9/20/2019',
  //     latitude: 41.579606918652054,
  //     longitude: 4.244298260567439,
  //     image:
  //       'http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg',
  //   },
  //   {
  //     name: 'Nyasia Flight Two',
  //     departureTime: '9/20/2019',
  //     latitude: 45.579606918652054,
  //     longitude: 4.244298260567439,
  //     image:
  //       'http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg',
  //   },
  // ])

  useEffect(() => {
    // console.log(flights)
  })

  // const pins = useMemo(
  //   () =>
  //     flights.map((trip, index) => (
  //       <Marker
  //         key={`marker-${index}`}
  //         longitude={trip.longitude}
  //         latitude={trip.latitude}
  //         anchor='bottom'
  //       >
  //         <StylePin src={Pin} onClick={() => setPopupInfo(trip)} />
  //       </Marker>
  //     )),
  //   []
  // )

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
        {/* {pins} */}
      </Map>
    </div>
  )
}

export default MapBody
