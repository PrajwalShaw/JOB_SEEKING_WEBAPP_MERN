import React from "react";
import {MdOutlineDesignServices,MdOutlineWebhook,MdAccountBalance} from "react-icons/md";
import {TbAppsFilled} from "react-icons/tb";
import {FaReact} from "react-icons/fa";
import {GiArtificialIntelligence} from "react-icons/gi";

const PopularCategories = () =>{
    const categories = [
        {
          id: 1,
          title: "Backend Web Developer",
          subTitle: "10+Open Positions",
          icon: <MdOutlineDesignServices />,
        },
        {
          id: 2,
          title: "App Developer/Flutter Developer",
          subTitle: "50+ Open Positions",
          icon: <TbAppsFilled />,
        },
        {
          id: 3,
          title: "Frontend Web Developer",
          subTitle: "30+ Open Positions",
          icon: <MdOutlineWebhook />,
        },
        {
          id: 4,
          title: "Product Engineer",
          subTitle: "50+ Open Postions",
          icon: <FaReact />,
        },
        {
          id: 5,
          title: "Data Science/ML Engineer",
          subTitle: "20+ Open Positions",
          icon: <GiArtificialIntelligence />,
        },
        {
          id: 6,
          title: "Business Analyst",
          subTitle: "50+ Open Positions",
          icon: < MdAccountBalance />,
        },
    ]
    return(
        <div className="categories">
            <h3>POPULAR JOB CATEGORIES</h3>
            <div className="banner">
                {categories.map((element)=>{
                    return(
                        <div className="card" key={element.id}>
                           <div className="icon">{element.icon}</div>
                           <div className="text">
                              <p>{element.title}</p>
                              <p>{element.subTitle}</p>
                           </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default PopularCategories;