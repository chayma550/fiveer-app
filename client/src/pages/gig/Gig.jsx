import React from 'react'
import Slider from '../../components/Slider/Slider'
import "./gig.scss"
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Link, useParams } from 'react-router-dom';
import Reviews from '../../components/Reviews/Reviews';
import star from "../../img/star.png"
import clock from "../../img/clock.png"
import recycle from "../../img/recycle.png"
import greencheck from "../../img/greencheck.png"
export default function Gig() {
  const{id}=useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs/single/${id}`
        )
        .then((res) => {
          return res.data;
        }),
  });
  const userId=data?.userId;
  //users
  const { isLoading:isLoadingUser,
         error:errorUser,
          data:dataUser } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest
        .get(
          `/users/${userId}`
        )
        .then((res) => {
          return res.data;
        }),
        enabled:!!userId,
  });


  return (
    <div className="gig">
       {isLoading ?"loading " :error ?"Something was wrong!!":
      <div className="container">  
        <div className="left">
          <span className="breadcrumbs">Fiverr  Graphics & Design</span>
          <h1>{data.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={data.img}
              alt=""
            />
            <span>Anna Bell</span>
            {!isNaN (data.totalStars/data.starNumber)&&(
            <div className="stars">
              {Array(Math.round(data.totalStars/data.starNumber)).fill().map((item,i)=>(
             <img src={star} alt="" key={i}/>
              ))}
              <span>{ Math.round(data.totalStars/data.starNumber)}</span>
            </div>
            ) }
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
          
            <img
              src={data.img}
              alt=""
            />
          </Slider>
          <h2>About This Gig</h2>
          <p>
           {data.desc}
          </p>
          {isLoadingUser?"loading":errorUser?"something was wrong!":<div className="seller">
            <h2>About The Seller</h2>
            {isLoadingUser?"loading":errorUser?"something was wrong !":<div className="user">
              <img
                src={dataUser.img||"/img/noavatar.jpg"}
                alt=""
              />
              <div className="info">
                <span>{dataUser.username}</span>
                <div className="stars">
                {Array(Math.round(data.totalStars/data.starNumber)).fill().map((item,i)=>(
             <img src={star} alt="" key={i}/>
              ))}
              <span>{ Math.round(data.totalStars/data.starNumber)}</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>}
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
             {dataUser.desc}
              </p>
            </div>
          </div>}
         <Reviews gigId={id}/>
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>{data.price }$</h2>
          </div>
          <p>
            {data.desc}
          </p>
          <div className="details">
            <div className="item">
              <img src={clock} alt="" />
              <span>{data.deliveryDate} Days Delivery</span>
            </div>
            <div className="item">
              <img src={recycle} alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data.features.map((feature)=>(
              <div className="item" key={feature}>
              <img src={greencheck} alt="" />
              <span>{feature}</span>
            </div>
            ))}
            
            
          </div>
          <Link to={`/pay/${id}`}>
          <button>Continue</button>
          </Link>
        </div>
        
      </div>
    }
    </div>

  )
}
