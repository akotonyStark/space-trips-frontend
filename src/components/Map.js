import React, { useEffect, useState, useMemo } from 'react'
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

const TRIPS = [
  {
    city: 'Dallas',
    population: '1,197,816',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dallas_skyline_daytime.jpg/240px-Dallas_skyline_daytime.jpg',
    state: 'Texas',
    latitude: 41.579606918652054,
    longitude: 4.244298260567439,
  },
  {
    city: 'San Jose',
    population: '945,942',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Downtown_San_Jose_skyline.PNG/240px-Downtown_San_Jose_skyline.PNG',
    state: 'California',
    latitude: 45.579606918652054,
    longitude: 4.244298260567439,
  },
  {
    city: 'Austin',
    population: '790,390',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Austin2012-12-01.JPG/240px-Austin2012-12-01.JPG',
    state: 'Texas',
    latitude: 41.579606918652054,
    longitude: 6.244298260567439,
  },
  {
    city: 'Jacksonville',
    population: '821,784',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg/240px-Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg',
    state: 'Florida',
    latitude: 51.579606918652054,
    longitude: 14.244298260567439,
  },
  {
    city: 'San Francisco',
    population: '805,235',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg',
    state: 'California',
    latitude: 61.579606918652054,
    longitude: 10.244298260567439,
  },
  {
    city: 'Columbus',
    population: '787,033',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Columbus-ohio-skyline-panorama.jpg/240px-Columbus-ohio-skyline-panorama.jpg',
    state: 'Ohio',
    latitude: 31.579606918652054,
    longitude: 9.244298260567439,
  },
  {
    city: 'Indianapolis',
    population: '820,445',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Downtown_indy_from_parking_garage_zoom.JPG/213px-Downtown_indy_from_parking_garage_zoom.JPG',
    state: 'Indiana',
    latitude: 39.7767,
    longitude: 9.1459,
  },
  {
    city: 'Fort Worth',
    population: '741,206',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/d/db/FortWorthTexasSkylineW.jpg/240px-FortWorthTexasSkylineW.jpg',
    state: 'Texas',
    latitude: 32.7795,
    longitude: 1.3463,
  },
  {
    city: 'Charlotte',
    population: '731,424',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Charlotte_skyline45647.jpg/222px-Charlotte_skyline45647.jpg',
    state: 'North Carolina',
    latitude: 35.2087,
    longitude: 0.8307,
  },
  {
    city: 'Seattle',
    population: '608,660',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/240px-SeattleI5Skyline.jpg',
    state: 'Washington',
    latitude: 47.6205,
    longitude: 2.3509,
  },
  {
    city: 'Denver',
    population: '600,158',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/DenverCP.JPG/240px-DenverCP.JPG',
    state: 'Colorado',
    latitude: 39.7618,
    longitude: -8.8806,
  },
  {
    city: 'El Paso',
    population: '649,121',
    image:
      'http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg',
    state: 'Texas',
    latitude: 31.8484,
    longitude: 22.427,
  },
]

const MapBody = () => {
  const [popupInfo, setPopupInfo] = useState(null)
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

  const pins = useMemo(
    () =>
      TRIPS.map((trip, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={trip.longitude}
          latitude={trip.latitude}
          anchor='bottom'
        >
          <StylePin src={Pin} onClick={() => setPopupInfo(trip)} />
        </Marker>
      )),
    []
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
              {popupInfo.city}
            </div>
          </Popup>
        )}
        {pins}
      </Map>
    </div>
  )
}

export default MapBody
