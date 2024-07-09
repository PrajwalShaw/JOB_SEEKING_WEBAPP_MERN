import React from "react";
import { SiPhonepe } from "react-icons/si";
import { SiZomato } from "react-icons/si";
import { SiTcs } from "react-icons/si";

const PopularCompanies = () =>{
    const companies = [
        {
          id: 1,
          title: "PhonePe",
          location: "Pune,Maharastra",
          openPositions: 5,
          icon: <SiPhonepe />,
        },
        {
          id: 2,
          title: "Zomato",
          location: "Gurugram,Haryana",
          openPositions: 3,
          icon: <SiZomato/>,
        },
        {
          id: 3,
          title: "TCS",
          location: "Bhuneshwar,Odissa",
          openPositions: 20,
          icon: <SiTcs />,
        },
      ];
    return(
        <div className="companies">
            <div className="container">
                 <h3>TOP COMPANIES</h3>
                 <div className="banner">
                 {companies.map((element)=>{
                    return(
                        <div className="card" key={element.id}>
                            <div className="content">
                               <div className="icon">{element.icon}</div>
                                 <div className="text">
                                    <p>{element.title}</p>
                                     <p>{element.location}</p>
                                     <p>{element.openPositions} open positons</p>
                                </div>
                           </div>
                        </div>
                    )
                })}
                 </div>
            </div>

        </div>
    )
};

export default PopularCompanies;