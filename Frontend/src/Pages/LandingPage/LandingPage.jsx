import React, { useState, useEffect } from "react";
import "./LandingPage.scss"
import Homecard from "../../Components/homecard";
import "./again.scss"
import IndividualIntervalsExample from "./carousal";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    const cardsarray=[
         {img:"/assets/program.png",
          text:"Programming"
         },
         {img:"/assets/uiux.png",
          text:"Graphic Design"
         },
         {img:"/assets/cooking.png",
          text:"Cooking"
         },
         {img:"/assets/photo.png",
          text:"Photography"
         },
         {img:"/assets/music.png",
          text:"Music"
         },
         {img:"/assets/business.png",
          text:"Marketing"
         },
         {img:"/assets/acadamisc.png",
          text:"Academics"
         },
         {img:"/assets/gamin.png",
          text:"Gaming"
         },
         {img:"/assets/health.png",
          text:"Health"
         },
         {img:"/assets/fitness.png",
          text:"Fitness"
         },
         {img:"/assets/content.png",
          text:"Content Creation"
         },
         {img:"/assets/craft.png",
          text:"Handicrafts"
         },
         {img:"/assets/self.png",
          text:"Personal Development"
         },
         {img:"/assets/softskills.png",
          text:"Soft Skills"
         },

    ];

  return (
    <div className="bigbox">
          <div className="div1">
            <h1>SkillsMe - Learn, Swap & Share with Global Community</h1>
            <p>Swap your skills with others, connect through learning, donate essential items to those in need</p>
            <button>Get Started For Free</button>
          </div>
          <div className="div8"><IndividualIntervalsExample/></div>
          <div className="div2">
            <h3>Swap Skills in Various Categories</h3>
          </div>
          <div className="div3">
          <div className="div33">
            {cardsarray.map((card,index)=>
            {
              return <Homecard card ={card}/>
            })}
          </div>
          </div>
              
    <div className='footer'>
      <hr/>
      <div className="conatiner">
        <div className="top">
          <div className="item">
            <h3 className="h"> Categories </h3>
            <span>Art & Design</span>
            <span>Music & Instruments</span>  
            <span>Programming & Tech</span>
            <span>Sports</span>
            <span>Lifestyle</span>
            <span>Handycrafs</span>
            <span>Cooking</span>
            <span>Graphic Design</span>
          </div>
          <div className="item">
            <h3 className="h"> About </h3>
            <span>Careers</span>
            <span>News</span>  
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
          <div className="item">
            <h3 className="h"> Community </h3>
            <span>Community Hub</span>
            <span>Forum</span>  
            <span>Events</span>
            <span>Blogs</span>
            <span>Podcast</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h3 className="h"> Contact Us </h3>
            <span>Email</span>
            <span>Address</span>  
            <span>Location</span>
          </div>
        </div>
        <hr/>
        <div className="bottom">
          
          <div className="right">
           <FaXTwitter/> <FaInstagram/> <FaLinkedin/> <FaSquareFacebook/>          </div>
          <div className="left">
            <h3>SkillME</h3>
          </div>
        </div>
      </div>
    </div>
          

    </div>
  );
};

export default LandingPage;
