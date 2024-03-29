import React from "react";
import styled from "styled-components";

const StyledTitle = styled.span`
  padding-left: 20px;
  font-weight: 400;
  background: white;
  height: 7vh;
  width: 70%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.span`
  background-color: gold;
  height: 7vh;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: white;
`;

const SaveButton = styled.span`
  background-color: black;
  opacity: 0.7;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: white;
`;

const Modal = ({ setIsModalOpen, trips, departureDate, setdepartureDate }) => {
  return (
    <div className="mobile-modal">
      <div style={styles.headerGroup}>
        <StyledTitle>SPACE TRIPS</StyledTitle>
        <CloseButton id="modal-close" onClick={() => setIsModalOpen(false)}>
          X
        </CloseButton>
      </div>
      <div style={styles.formGroup}>
        <span>Departure</span>
        <select style={{ height: 100, width: "100%" }}>
          {trips.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div style={styles.formGroup}>
        <span>Departure Time</span>
        <input
          type="datetime-local"
          value={departureDate}
          style={{ width: 100, height: 100 }}
          onChange={(e) => setdepartureDate(e.target.value)}
        />
      </div>
      <SaveButton onClick={() => setIsModalOpen(false)}>SAVE</SaveButton>
    </div>
  );
};

export default Modal;

const styles = {
  formGroup: {
    display: "flex",
    flexDirection: "column",
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 2,
  },

  headerGroup: {
    display: "flex",
  },
};
