import "./App.css";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import TripsList from "./components/List";
import TripsHeader from "./components/TripsHeader";
import FlightsList from "./components/FlightsList";
import Notification from "./components/Notification";
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
  const [page, setPage] = useState(1);
  const [trips, setTrips] = useState([]);
  const [flights, setFlights] = useState([]);
  const [departureDate, setdepartureDate] = useState(new Date());
  const [viewState, setViewState] = useState(INIT_STATE);
  const [hovered, setHovered] = useState({ id: "", state: false });
  const [marker, setMarker] = useState({ id: "", isBouncing: false });
  const [mapCenter, setMapCenter] = useState([
    INIT_STATE.longitude,
    INIT_STATE.latitude,
  ]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showFlightsList, setShowFlightsList] = React.useState(false);
  const [showSearching, setshowSearching] = useState(null);
  const [notification, showNotification] = useState(false);
  const [apiResponse, setResponse] = useState("");

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
        setResponse("could not load space centers...loading offline data");
        setTrips(SPACE_CENTERS.nodes);
      });
  };

  React.useEffect(() => {
    getSpaceTrips(page);
  }, [page]);

  React.useEffect(() => {
    console.log(notification);
  }, [notification]);

  return (
    <AppContext.Provider
      value={{
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
        notification,
        showNotification,
        apiResponse,
        setResponse,
      }}
    >
      <div className="App">
        <div className="='desktop">
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
            setFlights={setFlights}
            showFlightsList={showFlightsList}
            setShowFlightsList={setShowFlightsList}
            showSearching={showSearching}
            setResponse={setResponse}
            showNotification={showNotification}
          />
        </div>

        {notification && (
          <Notification
            message={apiResponse}
            showNotification={showNotification}
          />
        )}

        <div className="mobile">
          {isModalOpen && (
            <Modal
              setIsModalOpen={setIsModalOpen}
              trips={trips}
              departureDate={departureDate}
              setdepartureDate={setdepartureDate}
            />
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
