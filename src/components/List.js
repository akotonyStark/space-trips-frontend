import React from 'react'
import TripCard from './TripCard'
import { AppContext } from '../App'

const List = () => {
  const [, trips, , , , , handleHover] = React.useContext(AppContext)
  return (
    <div className='space-body'>
      {trips.length > 0 &&
        trips.map((spaceCenter, index) => (
          <TripCard
            key={index}
            spaceCenter={spaceCenter}
            handleHover={handleHover}
          />
        ))}
    </div>
  )
}

export default List
