import './App.css'
import Map from './components/Map'
import MapHeader from './components/MapHeader'
import TripsList from './components/List'
import TripsHeader from './components/TripsHeader'

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <TripsHeader />
        <MapHeader />
      </div>
      <div className='container'>
        <TripsList />
        <Map />
      </div>
    </div>
  )
}

export default App
