import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from '../../data';
import "./slider.scss"
const Slider = ({children}) => {
   
    
  return (
    <div className='slider'>
 <Carousel  showDots={true} responsive={responsive}>
        {children}
      </Carousel>
      </div>
    
  )
}

export default Slider