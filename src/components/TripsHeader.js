import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const StyledTitle = styled.span`
  padding-left: 20px;
`;

const TripsHeader = ({ setIsModalOpen }) => {
  return (
    <>
      <div className="space-header">
        <StyledTitle>SPACE TRIPS</StyledTitle>
      </div>
      <div
        className="look-for-flight-mobile"
        onClick={() => setIsModalOpen(true)}
      >
        <span style={{ paddingRight: 10 }}>LOOK FOR A FLIGHT</span>
        <FaSearch />
      </div>
    </>
  );
};

export default TripsHeader;
