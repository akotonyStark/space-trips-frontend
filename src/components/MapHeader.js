import React from 'react'
import styled from 'styled-components'
import arrow from '../assets/icons/Arrow.svg'

const StyledMenu = styled.div`
  padding-left: 5%;
  display: flex;
  justify-content: space-between;
  font-family: 'Lato';
  font-size: 16;
  width: 90%;
`

const StyledMenuItem = styled.div`
  width: 50%;
  display: flex;
  gap: 10%;
`

const StyledButton = styled.div`
  height: 100%;
  width: 10%;
  background-color: #ffd34d;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MapHeader = () => {
  return (
    <div className='map-header'>
      <StyledMenu>
        <StyledMenuItem>
          <div>Departure</div>
          <div>Search Component</div>
        </StyledMenuItem>

        <StyledMenuItem>
          <div>Departure time</div>
          <div>9/20/2019 - 12.45am</div>
        </StyledMenuItem>
      </StyledMenu>
      <StyledButton>
        <img src={arrow} alt='arrow' />
      </StyledButton>
    </div>
  )
}

export default MapHeader
