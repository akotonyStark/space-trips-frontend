import "./App.css";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import TripsList from "./components/List";
import TripsHeader from "./components/TripsHeader";
import FlightsList from "./components/FlightsList";
import React, { createContext, useState } from "react";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

import { SPACE_CENTERS } from "./data/store.js";
import Modal from "./components/Modal";

export const AppContext = createContext();

const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
  credentials: "same-origin",
  headers: {
    authorization: "Bearer API_KEY",
  },
});
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const INIT_STATE = {
  width: "100%",
  height: 900,
  latitude: 41.579606918652054,
  longitude: 4.244298260567439,
  zoom: 3.5,
  bearing: 0,
  pitch: 0,
  transitionDuration: 1000,
};

function App() {
  const [page, setPage] = React.useState(1);
  const [spaceCenters, setSpaceCenters] = React.useState([]);
  const [trips, setTrips] = React.useState([]);
  const [flights, setFlights] = React.useState([]);
  const [departureDate, setdepartureDate] = React.useState(new Date());
  const [viewState, setViewState] = React.useState(INIT_STATE);
  const [hovered, setHovered] = useState({ id: "", state: false });
  const [marker, setMarker] = React.useState({ id: "", isBouncing: false });
  const [mapCenter, setMapCenter] = React.useState([
    INIT_STATE.longitude,
    INIT_STATE.latitude,
  ]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showFlightsList, setShowFlightsList] = React.useState(false);
  const [showSearching, setshowSearching] = useState(null);

  const getSpaceTrips = (page) => {
    client
      .query({
        query: gql`
          query GetSpaceCenters {
            spaceCenters(page: ${page}, pageSize: 100) {
              nodes {
                id
                uid
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
        setTrips(result.data.spaceCenters.nodes);
      })
      .catch((err) => {
        console.log("could not load data");
        console.log("...reverting to offline data");
        setTrips(SPACE_CENTERS.nodes);
      });
  };

  React.useEffect(() => {
    getSpaceTrips(page);
  }, [page]);

  React.useEffect(() => {
    console.log("Show FLights status: ", showFlightsList);
  }, [showFlightsList]);

  return (
    <AppContext.Provider
      value={{
        spaceCenters,
        setSpaceCenters,
        trips,
        setTrips,
        flights,
        setFlights,
        departureDate,
        setdepartureDate,
        viewState,
        setViewState,
        hovered,
        setHovered,
        marker,
        setMarker,
        mapCenter,
        setMapCenter,
        page,
        setPage,
        showFlightsList,
        setShowFlightsList,
        showSearching,
        setshowSearching,
      }}
    >
      <div className="App">
        <div className="container">
          <TripsHeader setIsModalOpen={setIsModalOpen} />
          <SearchBar />
        </div>
        <div className="container">
          <TripsList />
          <Map />
        </div>

        <FlightsList
          flights={flights}
          showFlightsList={showFlightsList}
          setShowFlightsList={setShowFlightsList}
          showSearching={showSearching}
        />

        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen} spaceCenters={spaceCenters} />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
