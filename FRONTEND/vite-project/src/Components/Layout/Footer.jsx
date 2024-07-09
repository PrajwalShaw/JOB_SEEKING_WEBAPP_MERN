import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import {FaFacebook,FaLinkedin,FaGithub} from "react-icons/fa";

const Footer = () =>{
        const {isAuthorized} = useContext(Context);

    return(
        <footer className={isAuthorized ? "footerShow" : "footerHide"}>

          <div>&copy; All rights reserved by Prajwal Shaw </div>
           <Link to={"/"} target="_blank"><FaFacebook/></Link>
           <Link to={"https://www.linkedin.com/in/prajwal-shaw-59ab10237/"} target="_blank"><FaLinkedin/></Link>
           <Link to={"/"} target="_blank"><FaGithub/></Link>


        </footer>
       
    )
}

export default Footer;