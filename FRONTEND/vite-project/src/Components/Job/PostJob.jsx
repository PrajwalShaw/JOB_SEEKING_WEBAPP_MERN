import React, { useContext, useState } from "react";
import {Context} from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PostJob = () =>{
     
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [country,setCountry] = useState("");
    const [city,setCity] = useState("");
    const [location,setLocation] = useState("");
    const [salaryFrom,setSalaryFrom] = useState("");
    const [salaryTo,setSalaryTo] = useState("");
    const [fixedSalary,setFixedSalary] = useState("");
    const [salaryType,setSalaryType] = useState("default");

    const {isAuthorized,user} = useContext(Context);
    const navigateTo = useNavigate();


    const handleJobPost = async(e) =>{
        e.preventDefault();
        if(salaryType === "Fixed Salary"){
            setSalaryFrom("");
            setSalaryTo("");
        }
        else if(salaryType === "Ranged Salary"){
            setFixedSalary("");
        }
        else{
            setSalaryFrom("");
            setSalaryTo("");
            setFixedSalary("");
        }

        await axios.post("http://localhost:4000/api/v1/job/post", fixedSalary.length >= 4 ? {title,category,country,city,location,fixedSalary,description} : {title,category,country,city,location,description,salaryFrom,salaryTo},
          {
            withCredentials : true,
            headers:{
                 "Content-Type" : "application/json"
            }
         }
        ).then((res)=> toast.success(res.data.message))
        .catch((error)=>{
            toast.error(error.response.data.message);
        });
    };
      

        if(!isAuthorized || (user && user.role !== "Employer")){
           navigateTo("/");
        }


    return(
       <>
          <div className="job_post page">
             <div className="container">
                <h2>POST NEW JOB</h2>
                  <form onSubmit={handleJobPost}>
                     <div className="wrapper">
                        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Job Title"/>
                        <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                           <option value="">Select Category</option>
                           <option value="Backend Web Developer">Backend Web Developer</option>
                           <option value="Frontend Web Developer">Frontend Web Developer</option>
                           <option value="Flutter/App Developer">Flutter/App Web Developer</option>
                           <option value="Product Engineer">Product Engineer</option>
                           <option value="Data Science/ML Engineer">Data Science/ML Engineer</option>
                           <option value="Business Analyst">Business Analyst</option>
                           <option value="Project Manager">Project Manager</option>
                           <option value="Devops Engineer">Devops Engineer</option>
                        </select>
                     </div>
                     <div className="wrapper">
                        <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Country"/>
                        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City"/>
                     </div>
                     <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location"/>
                     <div className="salary_wrapper">
                         <select value={salaryType} onChange={(e)=>setSalaryType(e.target.value)}>
                              <option value="default"></option>
                              <option value="Fixed Salary">Fixed Salary</option>
                              <option value="Ranged Salary">Ranged Salary</option>
                         </select>
                         <div>
                            { salaryType === "default"?
                              (
                                <p>Please provide salary type *</p>
                              ): salaryType === "Fixed Salary"? (
                                 <input type="number" value={fixedSalary} placeholder="Enter fixed salary" onChange={(e)=>setFixedSalary(e.target.value)}/>
                              ):(
                                  <div className="ranged_salary"> 
                                      <input type="number" value={salaryFrom} placeholder="Salary from" onChange={(e)=>setSalaryFrom(e.target.value)}/>
                                      <input type="number" value={salaryTo} placeholder="Salary to" onChange={(e)=>setSalaryTo(e.target.value)}/>
                                  </div>
                              )

                            }
                         </div>
                    </div>
                    <textarea rows="10" value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Description"/>
                    <button type="submit">Post Job</button>
                  </form>
             </div>
          </div>
       
       
       
       
       
       </>
    )
}

export default PostJob;