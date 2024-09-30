import React from 'react'
import Featured from '../../components/Featured/Featured'
import TrustedBy from '../../components/TrustedBy/TrustedBy'
import Slider from '../../components/Slider/Slider'
import "./home.scss"
import CatCard from '../../components/CatCard/CatCard'
import { projects,cards } from '../../data'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
export default function Home() {

  return (
    <div className='home'>
      <Featured/>
      <TrustedBy/>
      <Slider >
      {cards.map(card=>(
        <CatCard item={card} key={card.id}/>
  
    ))}
        </Slider>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>The best part?Everything.</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
             <span>The best for every budget</span> 
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
             <span> Quality work done quickly</span>
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
             <span>Protected payments, every time</span> 
            </div>
            <p>
              Always know what youll pay upfront. Your payment is not released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              <span>24/7 support</span>
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            </div>
            
          <div className="item">
            <video src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7" controls />
          </div>
        </div>
      </div>
      <div className="features dark">
          <div className="container">
              <div className="item">
                <h1 className='text'>fiverr <i>business</i></h1>

              
                <h1>Advanced solutions and professional talent for businesses</h1>
                <span className='text'>Fiverr Pro</span>
                <div className="title">
                  <img src='./img/check.png' alt=''/>
                  <p>Access top freelancers and professional business tools for any project</p>

                </div>

                <span>Fiverr Certified</span>
                <div className="title">
                  <img src='./img/check.png' alt=''/>
                  <p>Build your own branded marketplace of certified experts</p>

                </div>

                <span>Fiverr Enterprise</span>
                <div className="title">
                  <img src='./img/check.png' alt=''/>
                  <p>Manage your freelance workforce and onboard additional talent with an end-to-end SaaS solution</p>

                </div>
                <button>Learn more </button>
              </div>
              <div className="item">
                <img  src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/51c35c7cecf75e6a5a0110d27909a2f5-1690202609364/EN.png" alt='image'/>
              </div>
          </div>
      </div>
      <h1>Inspiring work made on Fiverr</h1>
      <Slider >
        {projects.map(project=>(
          <ProjectCard item={project} key={project.id}/>
        ))}
      </Slider>
    </div>
  )
}
