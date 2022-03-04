import './App.css'
import Map from './components/Map'
import SearchBar from './components/SearchBar'
import TripsList from './components/List'
import TripsHeader from './components/TripsHeader'
import React, { createContext, useState } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  ApolloLink,
  HttpLink,
} from '@apollo/client'

import { TRIPS } from './data/store'

export const AppContext = createContext()

const link = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin',
  headers: {
    authorization: 'Bearer API_KEY',
  },
})
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

function App() {
  const [spaceCenters, setSpaceCenters] = React.useState([])
  const [trips, setTrips] = React.useState([])
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
  const [hovered, setHovered] = useState({ id: '', state: false })
  const [marker, setMarker] = React.useState({ id: '', isBouncing: false })

  const getSpaceTrips = () => {
    client
      .query({
        query: gql`
          query GetSpaceCenters {
            spaceCenters(pageSize: 1000) {
              nodes {
                id
                name
                description
                latitude
                longitude
                planet {
                  id
                  name
                  code
                }
              }
              pagination {
                total
                page
                pageSize
              }
            }
          }
        `,
      })
      .then((result) => {
        // console.log(result.data.spaceCenters.nodes)
        setTrips(result.data.spaceCenters.nodes)
      })
  }

  React.useEffect(() => {
    getSpaceTrips()
    console.log(marker)
  }, [hovered, marker])

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
        setHovered,
        marker,
        setMarker,
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
