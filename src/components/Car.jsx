import React from 'react'

function Car({car}) {
  return (
   

    <div className='car p-2 bs1 mt-3'>
        <img src={car.image} className='carimg' />
      <div className='car-content d-flex align-items-center justify-content-between'>
          <div>
        <p>{car.name}</p>
        <p>{car.rentPerHour} Rent Per Hour</p>
        </div>
        <div>
          <button className='btn1 mr-2'>Book Now</button>
        </div>
      </div>
      </div>


  )
}

export default Car
