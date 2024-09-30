import React from 'react'
import { Link } from 'react-router-dom'
import "./cartCard.scss"
 const CatCard = ({item}) => {
  
  return (
    <Link to="/gigs?cat=design" className='link'>

    <div className='catCards'>

          <div className="container">

        <img src={item.img} alt=''/>
        <span className='desc'>{item.desc}</span>
        <span className='title'>{item.title}</span>

        </div>

    </div>
    </Link>

  )
}

export default CatCard
