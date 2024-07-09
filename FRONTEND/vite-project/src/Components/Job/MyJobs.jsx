import React from "react";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../main"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

const MyJobs = () => {

    const [myJobs, setMyJobs] = useState([]);
    const [editingMode, setEditingMode] = useState(null);
    const { isAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    //fetching all jobs of an employer
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/v1/job/getmyjobs", { withCredentials: true });//api se data fetch kar rahe hain
                setMyJobs(data.myjobs);//myjobs se hi set kiya tha backend main
            }
            catch (error) {
                toast.error(error.response.data.message);
                setMyJobs([]);
            }
        };
        fetchJobs();
    }, [])//[] .....matlab jab jab page refresh hoga tab tab yeh run hoga(useEffect)


    if (!isAuthorized || (user && user.role !== "Employer")) {
        navigateTo("/");
    }

    //Function for enabling editing mode
    const handleEnableEdit = (jobId) => {
        setEditingMode(jobId)
    }

    //function for disenabling editing mode
    const handleDisableEdit = (jobId) => {
        setEditingMode(jobId);
    }

    //function for editing job
    const handleUpdateJob = async (jobId) => {
        const updateJob = myJobs.find((job) => job._id === jobId);//job id match kar raha hu jiska edit karna
        await axios.put(`http://localhost:4000/api/v1/job/update/${jobId}`, updateJob, {
            withCredentials: true,
        }).then((res) => {
            toast.success(res.data.message);
            setEditingMode(null);
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };

    //function to delete job
    const handleJobDelete = async (jobId) => {
        await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, { withCredentials: true }).then((res) => {
            toast.success(res.data.message);
            setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));//main jab page refresh karu toh jobs filter ho jaye yani ki jo job delete kar diya uske alawa jitne jobs hain woh sab show ho humko
        }).catch((error) => [toast.error(error.response.data.message)]);
    };


    const handleInputChange = (jobId, field, value) => {
        setMyJobs((prevJobs) => //setMyJobs ke andar prevJobs hain
            prevJobs.map((job) => //here job is like an element
                job._id === jobId ? { ...job, [field]: value } : job //agar element ki id uss job ke barabar ho jo humne bheji hain toh humko uska field change karna hain
            )
        );
    };






    return (
        <>
            <div className="myJobs page">
                <div className="container">
                    <h2>YOUR POSTED JOBS</h2>
                    {myJobs && myJobs.length > 0 ? (
                        <>
                            <div className="banner">
                                {myJobs.map(element => {
                                    return (
                                        <div className="card" key={element._id}>
                                            <div className="content">
                                                <div className="short_fields">
                                                    <div>
                                                        <span>Title</span>
                                                        <input type="text" disabled={editingMode !== element._id ? true : false} value={element.title} onChange={(e) => handleInputChange(element._id, "title", e.target.value)} />

                                                    </div>
                                                    <div>
                                                        <span>Country</span>
                                                        <input type="text" disabled={editingMode !== element._id ? true : false} value={element.country} onChange={(e) => handleInputChange(element._id, "country", e.target.value)} />

                                                    </div>
                                                    <div>
                                                        <span>City</span>
                                                        <input type="text" disabled={editingMode !== element._id ? true : false} value={element.city} onChange={(e) => handleInputChange(element._id, "city", e.target.value)} />

                                                    </div>
                                                    <div>
                                                        <span>Category</span>
                                                        <select value={element.category} onChange={(e) => handleInputChange(element._id, "category", e.target.value)} disabled={editingMode !== element._id ? true : false}>
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
                                                    <div>
                                                        <span>
                                                            Salary:{" "}
                                                            {element.fixedSalary ? (<input type="number"
                                                                value={element.fixedSalary}
                                                                onChange={(e) => handleInputChange(element._id, "fixedSalary", e.target.value)}
                                                                disabled={editingMode !== element._id ? true : false} />)
                                                                : (
                                                                    <div>
                                                                        <input type="number"
                                                                            value={element.salaryFrom}
                                                                            onChange={(e) => handleInputChange(element._id, "salaryFrom", e.target.value)}
                                                                            disabled={editingMode !== element._id ? true : false} />
                                                                        <input type="number"
                                                                            value={element.salaryTo}
                                                                            onChange={(e) => handleInputChange(element._id, "salaryTo", e.target.value)}
                                                                            disabled={editingMode !== element._id ? true : false} />
                                                                    </div>
                                                                )

                                                            }
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span>
                                                            Expire:
                                                        </span>
                                                        <select value={element.expired} 
                                                        onChange={(e) => handleInputChange(element._id, "expired", e.target.value)} 
                                                        disabled={editingMode !== element._id ? true : false}>
                                                            <option value={true}>TRUE</option>
                                                            <option value={false}>FALSE</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="long_field">
                                                    <div>
                                                        <span>Description:</span>
                                                        <textarea  rows="5" value={element.description} 
                                                        onChange={(e) => handleInputChange(element._id, "description", e.target.value)} 
                                                        disabled={editingMode !== element._id ? true : false}/>
                                                    </div>
                                                     <div>
                                                        <span>Location:</span>
                                                        <textarea  rows="5" value={element.location} 
                                                        onChange={(e) => handleInputChange(element._id, "location", e.target.value)} 
                                                        disabled={editingMode !== element._id ? true : false}/>
                                                    </div>
                                                </div>
                                            </div>
                                              <div className="button_wrapper">
                                                 <div className="edit_btn_wrapper">
                                                      {
                                                         editingMode === element._id ? (
                                                            <>
                                                              <button onClick={()=> handleUpdateJob(element._id)} className="check_btn"><FaCheck/></button>
                                                               <button onClick={()=> handleDisableEdit(element._id)} className="cross_btn"><RxCross2/></button>
                                                            </>
                                                         ):(
                                                             <button onClick={()=> handleEnableEdit(element._id)} className="edit_btn">Edit</button>
                                                         )
                                                      }
                                                 </div>
                                                 <button onClick={()=> handleJobDelete(element._id)} className="delete_btn">
                                                    Delete
                                                 </button>
                                              </div>
                                        </div>
                                    )
                                })

                                }
                            </div>

                        </>
                    ) : (
                        <p>No jobs posted till now</p>
                    )}
                </div>
            </div>





        </>
    )
}

export default MyJobs;