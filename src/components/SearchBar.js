import React from "react";
import styled from "styled-components";
import arrow from "../assets/icons/Arrow.svg";

import DateTimePicker from "react-datetime-picker";
import SearchInput from "./SearchInput";
import { AppContext } from "../App";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

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

const searchClient = algoliasearch(
  "UORHJCOG49",
  "74fb98e8049e4753ce230f010774b425"
);

const StyledMenu = styled.div`
  padding-left: 5%;
  display: flex;
  justify-content: space-between;
  font-family: "Lato";
  font-size: 16;
  width: 90%;
`;

const StyledMenuItem = styled.div`
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10%;
`;

const StyledButton = styled.div`
  height: 100%;
  width: 10%;
  background-color: #ffd34d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = () => {
  const {
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
  } = React.useContext(AppContext);
  const [depatureDate, setdepatureDate] = React.useState(new Date());

  const handleGetFlights = (value) => {
    let formattedDate = new Date(value);
    let availableFlights = [];
    setdepatureDate(formattedDate);
    //queryFlight
    client
      .query({
        query: gql`
          query GetFlightsList {
            flights(pageSize: 100, departureDay: "2019-09-25") {
              nodes {
                id
                code
                launchSite {
                  id
                  uid
                  name
                  description
                  latitude
                  longitude
                  planet {
                    id
                    name
                  }
                }
                landingSite {
                  id
                  uid
                  name
                  description
                  latitude
                  longitude
                  planet {
                    id
                    name
                  }
                }
                departureAt
                seatCount
                availableSeats
              }
            }
          }
        `,
      })
      .then((result) => {
        let flights = result.data.flights.nodes;

        trips.forEach((trip) => {
          let flightInfo = [];
          flights.forEach((flight) => {
            if (trip.name === flight.launchSite.name) {
              flightInfo.push({
                availableSeats: flight.availableSeats,
                departure: flight.launchSite.name,
              });
              let match = {
                ...trip,
                flightInfo: flightInfo,
              };
              availableFlights.push(match);
            }
          });
        });
      })
      .catch((err) => {
        console.log("error");
      });
    console.log(availableFlights);
  };

  React.useEffect(() => {
    // console.log(depatureDate);
  }, []);

  return (
    <div className="map-header">
      <StyledMenu>
        <StyledMenuItem>
          <span>Departure</span>

          <InstantSearch
            indexName="space-centers"
            searchClient={searchClient}
            style={{ width: 400 }}
          >
            <SearchInput />
          </InstantSearch>
        </StyledMenuItem>

        <StyledMenuItem>
          <div>Departure time</div>
          <div className="datetime-picker">
            {/* <div>9/20/2019 - 12.45am</div> */}
            <DateTimePicker
              calendarIcon={null}
              clearIcon={null}
              onChange={(value) => handleGetFlights(value)}
              value={depatureDate}
            />
          </div>
        </StyledMenuItem>
      </StyledMenu>
      <StyledButton
        className="search-flights"
        onClick={() => console.log("searching...")}
      >
        <img src={arrow} alt="arrow" />
      </StyledButton>
    </div>
  );
};

export default SearchBar;
