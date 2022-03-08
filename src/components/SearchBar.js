import React from "react";
import styled from "styled-components";
import arrow from "../assets/icons/Arrow.svg";

import DateTimePicker from "react-datetime-picker";
import SearchInput from "./SearchInput";
import { AppContext } from "../App";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks";

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
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  const { departureDate, setdepartureDate } = React.useContext(AppContext);

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
              style={{ border: "none" }}
              calendarIcon={null}
              clearIcon={null}
              onChange={(value) => setdepartureDate(value)}
              value={departureDate}
            />
          </div>
        </StyledMenuItem>
      </StyledMenu>
      <StyledButton
        className="search-flights"
        onClick={() => console.log("toggle mobile view")}
      >
        <img src={arrow} alt="arrow" />
      </StyledButton>
    </div>
  );
};

export default SearchBar;
