import React, { useContext } from "react";
import TripCard from "./TripCard";
import { AppContext } from "../App";
import styled from "styled-components";
import loader from "../assets/loader-one.gif";

export const StyledButton = styled.button`
  background: gold;
  border: none;
  color: white;
  height: 100%;
`;

const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 40%;
`;

const List = () => {
  const { trips, setHovered, marker, setMapCenter, page, setPage } =
    useContext(AppContext);

  const nextPage = (page) => {
    setPage((prev) => page + 1);
  };

  const prevPage = (page) => {
    setPage((prev) => page - 1);
  };

  return (
    <div className="side-bar">
      <div className="space-body">
        {trips.length < 1 ? (
          <StyledLoader className="loader">
            <img
              src={loader}
              alt="loader"
              style={{ width: 150, height: 150 }}
            />
            <p>Loading...</p>
          </StyledLoader>
        ) : null}

        {trips.length > 0 &&
          trips.map((spaceCenter, index) => (
            <TripCard
              key={index}
              spaceCenter={spaceCenter}
              setHovered={setHovered}
              marker={marker}
              setMarker={marker}
              setMapCenter={setMapCenter}
            />
          ))}
      </div>
      {trips.length > 0 && (
        <div className="container pagination">
          <StyledButton id="prev" onClick={() => prevPage(page)}>
            Prev page
          </StyledButton>
          <code>Page {page} of 16</code>
          <StyledButton id="next" onClick={() => nextPage(page)}>
            Next page
          </StyledButton>
        </div>
      )}
    </div>
  );
};

export default List;
