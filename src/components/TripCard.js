import React from 'react'
import styled from 'styled-components'
import rocket from '../assets/icons/Rocket@2x.svg'

const StyledCard = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 35px;
  height: 200px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: '1px solid black';
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: 'Lato';
  font-size: 16;
`

const StyledButton = styled.div`
  width: 100%;
  height: 48px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const TripCard = () => {
  return (
    <div>
      <StyledCard>
        <div style={{ padding: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span className='trip-title'>Nyasia Isla Space Center</span>
            <img src={rocket} alt={rocket} />
          </div>
          <span className='trip-planet'>Earth</span>
          <p style={{ marginTop: 30 }}>12 departures planned today</p>
        </div>

        <StyledButton>SEE ALL FLIGHTS</StyledButton>
      </StyledCard>
    </div>
  )
}

export default TripCard