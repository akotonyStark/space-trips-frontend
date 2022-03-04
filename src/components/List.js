import React from 'react'
import TripCard from './TripCard'
import { AppContext } from '../App'

const List = () => {
  const [
    spaceCenters,
    setSpaceCenters,
    trips,
    setTrips,
    viewState,
    setViewState,
    hovered,
    setHovered,
    marker,
    setMarker,
  ] = React.useContext(AppContext)

  return (
    <div className='space-body'>
      {trips.length > 0 &&
        trips.map((spaceCenter) => (
          <TripCard
            key={spaceCenter.id}
            spaceCenter={spaceCenter}
            setHovered={setHovered}
            marker={marker}
            setMarker={marker}
          />
        ))}

      <div>
        <button>Next Page</button>
      </div>
    </div>
  )
}

export default List
