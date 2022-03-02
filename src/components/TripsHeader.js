import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.span`
  padding-left: 50px;
  font-weight: bold;
`

const TripsHeader = () => {
  return (
    <div className='space-header'>
      <StyledTitle>SPACE TRIPS</StyledTitle>
    </div>
  )
}

export default TripsHeader
