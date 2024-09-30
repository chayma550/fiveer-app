import React, { useState } from 'react'
import "./featured.scss"
import { useNavigate } from 'react-router-dom'
export default function Featured() {
  const[input,setInput]=useState("")
  const navigate=useNavigate()

const handleSubmit=()=>{
 navigate(`/gigs?search=${input}`)
}


  return (
    <div className='Featured'>
        <div className="container">
            <div className="left">
            <h1>Find the perfect <i>freelance </i>services for your business</h1>
              <div className="search">
              <div className="searchInput">
                <img src="/img/search.png" alt='search'/>
                <input type='text' placeholder='Try "building mobile app"' onChange={e=>setInput(e.target.value)} />
              </div>
              <button className='search_btn' onClick={handleSubmit}>Search</button>
              </div>
                <div className="popular">
              <span>Popular:</span>
              <button>Web Design</button>
              <button>WordPress</button>
              <button>Logo Design</button>
              <button>Ai Servives</button>
              </div>
            </div>
            <div className="right">
                <img src='/img/man.png' alt='man'/>
            </div>
        </div>
    </div>
  )
}
