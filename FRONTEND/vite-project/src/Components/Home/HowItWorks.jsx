import React from "react";
import {FaUserPlus} from "react-icons/fa";
import {MdFindInPage} from "react-icons/md";
import {IoMdSend} from "react-icons/io";

const HowItWorks = () =>{
    return(
        <div className="howitworks">
            <div className="container">
                <h2>How HIRE HUB works?</h2>
                <div className="banner">
                   <div className="card">
                      <FaUserPlus/>
                      <p>Create account</p>
                      <p>Elevate your career journey by joining our community of professionals—register and create your account on our job-seeking website today!</p>
                   </div>
                   <div className="card">
                      <MdFindInPage/>
                      <p>Apply for Jobs/Post for jobs</p>
                      <p>Unlock your career potential or find exceptional talent on our premier job platform. Apply for jobs or post jobs and embrace endless possibilities today!</p>
                   </div>
                   <div className="card">
                      <IoMdSend/>
                      <p>Apply for Jobs/Select best candidate</p>
                      <p>Embark on your dream career or discover the perfect candidate with our exclusive platform. Apply for jobs or find the best talent with unparalleled ease.</p>
                   </div>
                </div>
            </div>

        </div>
    )
}

export default HowItWorks;