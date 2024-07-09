import React from "react";
import { FaBuilding, FaSuitcase, FaUserPlus,FaUsers } from "react-icons/fa";

const HeroSection = () => {

   const details = [
     {
        id:1,
        title:"200+",
        subTitle:"Live Job",
        icon: <FaSuitcase/>
     },
     {
        id:2,
        title:"30+",
        subTitle:"Companies",
        icon: <FaBuilding/>
     },
     {
        id:3,
        title:"100+",
        subTitle:"Job Seekers",
        icon: <FaUsers/>
     },
     {
        id:4,
        title:"50+",
        subTitle:"Employers",
        icon: <FaUserPlus/>
     }
   ];







    return (
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Welcome to HIRE HUB!</h1>
            <h2>Cry No More, Get A Job Today</h2>
            <h2>We Have The Job For You!!</h2>
            <p>Unlock your career potential with our job-seeking platform, where top employers meet talented professionals. Discover your dream job and advance your career today!</p>
          </div>
          <div className="image">
              <img src="job-finder.jpg" alt="image hain ji" />
          </div>
        </div>
        <div className="details">
            {
               details.map((element)=>{
                   return(
                     <div className="card" key={element.id}>
                        <div className="icon">{element.icon}</div>
                        <div className="content">
                            <p>{element.title}</p>
                            <p>{element.subTitle}</p>
                        </div>
                     </div>
                   )
               })
            }
        </div>
      </div>








    )
}

export default HeroSection;