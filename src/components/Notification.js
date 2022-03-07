import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  background: #333333;
  box-shadow: 0 1px 2px 0 gold;
  z-index: 8000;
  color: white;
  width: 40%;
  height: 50px;
  textalign: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  font-family: "Lato";
`;
const Notification = ({ message, showNotification }) => {
  return (
    <StyledContainer>
      {message}
      <button onClick={() => showNotification(false)}>OK</button>
    </StyledContainer>
  );
};

export default Notification;
