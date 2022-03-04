import React from 'react'
import TripCard from './TripCard'
import { AppContext } from '../App'

const List = () => {
  const [, , trips, , , , , handleHover] = React.useContext(AppContext)
  return (
    <div className='space-body'>
      {trips.length > 0 &&
        trips.map((spaceCenter) => (
          <TripCard
            key={spaceCenter.id}
            spaceCenter={spaceCenter}
            handleHover={() => handleHover(spaceCenter)}
          />
        ))}

      <div>
        <button>Next Page</button>
      </div>
    </div>
  )
}

export default List
