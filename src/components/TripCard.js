import React from "react";
import styled from "styled-components";
import rocket from "../assets/icons/Rocket@2x.svg";
import { bounce } from "react-animations";
import { keyframes } from "styled-components";

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

const TripCard = ({ spaceCenter, setHovered, marker }) => {
  return (
    <div>
      <StyledCard
        className="trip-card"
        id={spaceCenter.name.split(" ").join("-")}
        onMouseEnter={() =>
          setHovered({
            id: spaceCenter.name.split(" ").join("-"),
            state: true,
          })
        }
        onMouseLeave={() =>
          setHovered({
            id: spaceCenter.name.split(" ").join("-"),
            state: false,
          })
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
            marker.id === spaceCenter.name.split(" ").join("-") ? (
              <Bounce src={rocket} alt={rocket} className="rocket" />
            ) : (
              <img src={rocket} alt={rocket} className="rocket" />
            )}
          </div>
          <span className="trip-planet">{spaceCenter.planet.name}</span>
          <p style={{ marginTop: 30 }}>12 departures planned today</p>
        </div>

        <StyledButton onClick={() => console.log(spaceCenter.uid)}>
          SEE ALL FLIGHTS
        </StyledButton>
      </StyledCard>
    </div>
  );
};

export default TripCard;
