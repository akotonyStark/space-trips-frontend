import React, { useEffect } from 'react'
import TripCard from './TripCard'
import { AppContext } from '../App'

const List = ({ trips }) => {
  return (
    <div className='space-body'>
      {trips.length > 0 &&
        trips.map((center, index) => <TripCard key={index} center={center} />)}
    </div>
  )
}

export default List
