import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  color: #f1f1f1;
  background-color: inherit;
  height: 30px;
  width: 100%;
  padding-left: 10px;
  border: 0px;
`

const SearchInput = () => {
  return (
    <div>
      <StyledInput placeholder='Search for Space Trips' />
    </div>
  )
}

export default SearchInput
