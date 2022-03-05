import React from "react";
import styled from "styled-components";
import { icons } from "react-icons";

const StyledTitle = styled.span`
  padding-left: 20px;
  font-weight: 300;
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
        LOOK FOR A FLIGHT
      </div>
    </>
  );
};

export default TripsHeader;
