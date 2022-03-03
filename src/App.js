import './App.css'
import Map from './components/Map'
import SearchBar from './components/SearchBar'
import TripsList from './components/List'
import TripsHeader from './components/TripsHeader'

function App() {
  return (
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
  )
}

export default App
