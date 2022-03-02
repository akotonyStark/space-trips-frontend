import React, { useEffect } from 'react'
import { Map } from 'react-map-gl'

const MapBody = () => {
  useEffect(() => {
    console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
  })
  return (
    <div className='map-body'>
      <Map
        initialViewState={{
          width: '100%',
          height: 900,
          latitude: 41.579606918652054,
          longitude: 4.244298260567439,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
          transitionDuration: 1000,
        }}
        mapStyle='mapbox://styles/mapbox/dark-v8'
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      />
    </div>
  )
}

export default MapBody
