import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import arrow from '../assets/icons/Arrow.svg'
import { AppContext } from '../App'
import DateTimePicker from 'react-datetime-picker'
import SearchInput from './SearchInput'

import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
} from 'react-instantsearch-hooks'

const searchClient = algoliasearch(
  'UORHJCOG49',
  '74fb98e8049e4753ce230f010774b425'
)

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
  const [spaceCenters, , setTrips, viewState, setViewState] =
    useContext(AppContext)

  const [depatureDate, setdepatureDate] = useState(new Date('2019/9/20'))

  const handleSelectChage = (name) => {
    let res = spaceCenters.filter((center) => center.name === name)

    setTrips((prev) => res)
    setViewState({
      ...viewState,
      longitude: res[0].longitude,
      latitude: res[0].latitude,
    })
  }

  return (
    <div className='map-header'>
      <StyledMenu>
        <StyledMenuItem>
          <span>Departure</span>
          {/* <SpaceCenters onChange={(e) => handleSelectChage(e.target.value)}>
            {spaceCenters.map((center) => (
              <SpaceCenterName key={center.id}>{center.name}</SpaceCenterName>
            ))}
          </SpaceCenters> */}

          <>
            <InstantSearch
              indexName='space-centers'
              searchClient={searchClient}
            >
              <div>
                {/* <SearchBox className='search-input'  /> */}
                {/* <Hits hitComponent={Hit} /> */}
              </div>
              <SearchInput />
            </InstantSearch>
          </>
        </StyledMenuItem>

        <StyledMenuItem>
          <div>Departure time</div>
          <div className='datetime-picker'>
            <div>9/20/2019 - 12.45am</div>
            {/* <DateTimePicker
              // calendarIcon={null}
              onChange={(value) => console.log(value)}
              value={depatureDate}
            /> */}
          </div>
        </StyledMenuItem>
      </StyledMenu>
      <StyledButton>
        <img src={arrow} alt='arrow' />
      </StyledButton>
    </div>
  )
}

function Hit(props) {
  return (
    <div>
      <ul>{props.hit.name}</ul>
    </div>
  )
}

export default SearchBar
