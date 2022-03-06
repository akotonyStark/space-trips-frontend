import "./App.css";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import TripsList from "./components/List";
import TripsHeader from "./components/TripsHeader";
import React, { createContext, useState } from "react";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

import { TRIPS } from "./data/store.js";
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
  const [viewState, setViewState] = React.useState(INIT_STATE);
  const [hovered, setHovered] = useState({ id: "", state: false });
  const [marker, setMarker] = React.useState({ id: "", isBouncing: false });
  const [mapCenter, setMapCenter] = React.useState([
    INIT_STATE.longitude,
    INIT_STATE.latitude,
  ]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        setTrips(TRIPS.spaceCenters.nodes);
      });
  };

  const getAllFlights = () => {};

  React.useEffect(() => {
    getSpaceTrips(page);
  }, [page]);

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
        mapCenter,
        setMapCenter,
        page,
        setPage,
      ]}
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
        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen} spaceCenters={spaceCenters} />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
