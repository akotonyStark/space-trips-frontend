import React, { useContext } from "react";
import styled from "styled-components";
import rocket from "../assets/icons/Rocket.svg";
import { bounce } from "react-animations";
import { keyframes } from "styled-components";

import { gql } from "@apollo/client";
import { AppContext } from "../App";
import { FLIGHTS } from "../data/store";
import { convertToID, client } from "../utils/helperFunctions";

const Bounce = styled.img`
  animation: 1s ${keyframes`${bounce}`} infinite;
`;

const StyledCard = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 35px;
  height: 200px;
  background-color: #fff;
  border: "1px solid black";
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: "Lato";
  transition: transform 0.5s;
`;

const StyledButton = styled.div`
  width: 100%;
  height: 48px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
`;

const TripCard = ({ spaceCenter }) => {
  const {
    setHovered,
    marker,
    setMapCenter,
    departureDate,
    setFlights,
    setShowFlightsList,
    setshowSearching,
    showNotification,
    setResponse,
  } = useContext(AppContext);

  const handleGetFlights = (fromID) => {
    setshowSearching(true);
    setShowFlightsList(true);

    let departure = new Date(departureDate).toISOString().slice(0, 10);
    client
      .query({
        query: gql`
          # Write your query or mutation here
          query GetFlightsList {
            flights(from: ${fromID}, departureDay: "${departure}", pageSize: 100) {
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
      .then((res) => {
        setFlights(res.data.flights.nodes);

        if (res.data.flights.nodes.length === 0) {
          setshowSearching(null);
          showNotification(true);
          setResponse(
            "No flights available at this space station on this date."
          );
        } else {
          setshowSearching(false);
        }
      })
      .catch((error) => {
        setFlights(FLIGHTS.nodes);
        if (FLIGHTS.nodes.length === 0) {
          setshowSearching(null);
          showNotification(true);
          setResponse(
            "No flights available at this space station on this date."
          );
        } else {
          setshowSearching(false);
        }
      });
  };

  return (
    <div>
      <StyledCard
        className="trip-card"
        id={convertToID(spaceCenter.name)}
        onMouseEnter={() =>
          setHovered({
            id: convertToID(spaceCenter.name),
            state: true,
          })
        }
        onMouseLeave={() =>
          setHovered({
            id: convertToID(spaceCenter.name),
            state: false,
          })
        }
        onClick={() =>
          setMapCenter([spaceCenter.longitude, spaceCenter.latitude])
        }
      >
        <div style={{ padding: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="trip-title">{spaceCenter.name}</span>
            {marker.isBouncing &&
            marker.id === convertToID(spaceCenter.name) ? (
              <Bounce src={rocket} alt={rocket} className="rocket" />
            ) : (
              <img src={rocket} alt={rocket} className="rocket" />
            )}
          </div>
          <span className="trip-planet">{spaceCenter.planet.name}</span>
          <p style={{ marginTop: 30 }}>12 departures planned today</p>
        </div>

        <StyledButton
          title="click to view all flights"
          onClick={() => handleGetFlights(spaceCenter.id)}
        >
          SEE ALL FLIGHTS
        </StyledButton>
      </StyledCard>
    </div>
  );
};

export default TripCard;
