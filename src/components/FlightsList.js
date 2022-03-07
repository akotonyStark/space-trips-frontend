import React, { useEffect } from "react";
import styled from "styled-components";

const ResultsItem = styled.div`
  color: black;
  border-bottom: 1px solid #cecece;
  cursor: pointer;
  width: 100%;
  padding-left: 20px;
`;

export default function FlightsList({
  flights,
  showFlightsList,
  setShowFlightsList,
  showSearching,
}) {
  useEffect(() => {
    console.log("Searching:", showSearching);
  }, [showSearching]);
  const handleFlightSelection = (selectedFlight) => {
    setShowFlightsList(false);
    alert(
      "Your booking for Flight Number " + selectedFlight.id + " was successful"
    );
  };

  return (
    <>
      {showFlightsList && (
        <div className="flights-list">
          <div style={styles.header}>
            {showSearching === true ? (
              <h6>Searching Flights...</h6>
            ) : showSearching === false ? (
              <h6>Flights Avalaible</h6>
            ) : null}
          </div>
          <div style={styles.container}>
            {flights.map((flight) => (
              <ResultsItem
                className="flights-results-item"
                key={flight.id}
                onClick={() => handleFlightSelection(flight)}
              >
                <p>Flight Number: {flight.id}</p>
                <p>Launch Site: {flight.launchSite.name}</p>
                <p>Landing Site: {flight.landingSite.name}</p>
              </ResultsItem>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  header: {
    background: "#333333",
    color: "white",
    width: "100%",
    textAlign: "center",
  },
  container: {
    width: "100%",
    maxHeight: 400,
    overflow: "auto",
  },
};
