import './App.css'
import Map from './components/Map'
import SearchBar from './components/SearchBar'
import TripsList from './components/List'
import TripsHeader from './components/TripsHeader'
import React, { createContext, useState } from 'react'
import { SPACE_CENTERS } from './data/store'

export const AppContext = createContext()

function App() {
  const [spaceCenters, setSpaceCenters] = React.useState([])
  const [trips, setTrips] = React.useState(SPACE_CENTERS)
  const [viewState, setViewState] = React.useState({
    width: '100%',
    height: 900,
    latitude: 41.579606918652054,
    longitude: 4.244298260567439,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
    transitionDuration: 1000,
  })
  const [hovered, setHovered] = useState(false)

  const handleHover = () => {
    setHovered(true)
  }

  React.useEffect(() => {
    console.log(hovered)
  }, [hovered])

  return (
    <AppContext.Provider
      value={[
        spaceCenters,
        setSpaceCenters,
        trips,
        setTrips,
        viewState,
        setViewState,
        hovered,
        handleHover,
      ]}
    >
      <div className='App'>
        <div className='container'>
          <TripsHeader />
          <SearchBar />
        </div>
        <div className='container'>
          <TripsList />
          <Map />
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
