import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.scss";
import newRequest from "../../utils/newRequest"
import noavatar from "../../img/noavatar.jpg"
function Navbar() {
  
  const [active, setActive] = useState(false);
  const[open,setOpen]=useState(false)
  const{pathname}=useLocation()

  /* if we scroll down the page the narvabr still active*/
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);


/*importer le user de localstrage*/
  const currentUser=JSON.parse(localStorage.getItem("currentUser"))
/*envoyer vers un nouvelle fenetre*/
  const navigate = useNavigate();

/*logout user*/
  const handleLogout=async()=>{
    try{
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser",null)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className={active ||pathname!=="/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          <span className="dot">.</span>
          </Link>
        </div>
        <div className="links">
          <span>Liverr Business</span>
          <span>Explore</span>
          <span>English</span>
        {!currentUser?.isSeller&&<span>Become a Seller</span>   }        
        {!currentUser&& <Link to="/login"><button >Join</button></Link>} 
        {currentUser&&(
          <div className="user" onClick={() => setOpen(!open)}>
            <img src={currentUser.img ||{noavatar}} alt=""/>
            <span>{currentUser?.username}</span>
            {open&&(
              
            <div className="options">
              {
                currentUser?.isSeller&&(
                  <>
                  <Link className="link" to="/gigs">Gigs</Link>
                  <Link className="link"  to="/add">Add new gig</Link>
                  </>
                )
              }
              <Link className="link"  to="/orders">Orders</Link>
              <Link className="link"  to="/messages">Messages</Link>
              <Link className="link"  onClick={handleLogout}>Logout</Link>
              

            </div>
            )}
          </div>
        )}
    </div>
    </div>
 {/*une condition pour afficher le code */} 
    {active ||pathname!=="/" &&(
      <>
    <hr/>

    <div className="menu">
    <Link className="link" to="/">
              Graphics & Design
            </Link>
            <Link className="link" to="/">
              Video & Animation
            </Link>
            <Link className="link " to="/">
              Writing & Translation
            </Link>
            <Link className="link " to="/">
              AI Services
            </Link>
            <Link className="link" to="/">
              Digital Marketing
            </Link>
            <Link className="link" to="/">
              Music & Audio
            </Link>
            <Link className="link" to="/">
              Programming & Tech
            </Link>
            <Link className="link " to="/">
              Business
            </Link>
            <Link className="link " to="/">
              Lifestyle
            </Link>
    </div>
    </>
    )}
    </div>
  );
}

export default Navbar;