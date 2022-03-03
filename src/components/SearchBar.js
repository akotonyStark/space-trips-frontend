import React, { useContext } from 'react'
import styled from 'styled-components'
import arrow from '../assets/icons/Arrow.svg'
import SearchInput from './SearchInput'
import { AppContext } from '../App'

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
  height: 50px;
  display: flex;
  align-items: center;
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

const SpaceCenters = styled.select`
  color: #f1f1f1;
  background-color: inherit;
  height: 30px;
  width: 60%;
  padding-left: 10px;
  border: 0px;
`
const SpaceCenterName = styled.option`
  color: #000;
`

const SearchBar = () => {
  const [spaceCenters, setSpaceCenters] = useContext(AppContext)
  return (
    <div className='map-header'>
      <StyledMenu>
        <StyledMenuItem>
          <span>Departure</span>
          <SpaceCenters onChange={(e) => console.log(e.target.value)}>
            {spaceCenters.map((center) => (
              <SpaceCenterName key={center.id}>{center.name}</SpaceCenterName>
            ))}
          </SpaceCenters>
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

export default SearchBar
