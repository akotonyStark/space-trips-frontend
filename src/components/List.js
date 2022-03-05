import React from "react";
import TripCard from "./TripCard";
import { AppContext } from "../App";
import styled from "styled-components";

const StyledButton = styled.button`
  background: gold;
  border: none;
  color: white;
  height: 100%;
`;

const List = () => {
  const [
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
  ] = React.useContext(AppContext);

  return (
    <div className="side-bar">
      <div className="space-body">
        {trips.length > 0 &&
          trips.map((spaceCenter, index) => (
            <TripCard
              key={index}
              spaceCenter={spaceCenter}
              setHovered={setHovered}
              marker={marker}
              setMarker={marker}
            />
          ))}
      </div>
      <div className="container pagination">
        <StyledButton>Prev page</StyledButton>
        <code>Page 1 of 10</code>
        <StyledButton>Next page</StyledButton>
      </div>
    </div>
  );
};

export default List;
