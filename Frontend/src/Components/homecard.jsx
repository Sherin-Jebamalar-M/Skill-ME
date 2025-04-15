import React from 'react'
import './homecard.scss'
function Homecard({card}) {
  return (
    <div className='cardd'>
          <img src={card.img} alt="" />
          <h5>{card.text}</h5>
    </div>
  )
}

export default Homecard
