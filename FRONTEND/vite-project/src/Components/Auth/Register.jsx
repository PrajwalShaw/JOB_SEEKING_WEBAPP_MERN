import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import {RiLock2Fill } from "react-icons/ri";
import { Link,Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

    const handleRegister = async (e) => {
        e.preventDefault();//unnecessary refreshing na ho iske liye
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/user/register",
                { name, email, password, phone, role },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            toast.success(data.message);
            setEmail("");
            setPhone("");
            setName("");
            setRole("");
            setPassword("");
            setIsAuthorized(true);//ab user authorized ho gaya isliye humne true set kar diya. Ab register karne ke baad usko cookies milegi
        }
        catch (error) {
            toast.error(error.response.data.message);//error ek array hain,uske andar response array hain,uske andar data object hain,followed by message(key-value pair)
        }

    };

    if (isAuthorized) {
        return <Navigate to={"/"} />
    }



    return <>
            <header className="registration-header">
                <main>
                    <section className="user-container login-section--display">
                        <div className="registration">
                            <div className="grid-two--column">
                                <div className="form-text">
                                    <h2>Welcome back!!</h2>
                                    <p>To stay connected with us login with your personal info</p>
                                    <button className="login-btn">
                                    <Link to={"/login"} className="login-btn">Login Here</Link>
                                        </button>
                                        {/* <Link to={"/login"}>
                                          <button className="login-btn">Login Here</button>
                                        </Link> */}
                                </div>

                                <div className="registration-form">
                                    <h2>Create Account</h2>
                                    <p>Use your email for registration</p>
                                    <form action="#">
                                        <div className="input-field">
                                               <div>
                                                  <FaRegUser/>
                                                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                                                        <option value="">Select Role</option>
                                                        <option value="Employer">Employer</option>
                                                        <option value="Job Seeker">Job Seeker</option>
                                                    </select>
                                                    {/* <FaRegUser/> */}
                                                </div>
                                                {/* <FaRegUser/> */}
                                        </div>
                                        <div className="input-field">
                                            <label >
                                                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Name"/>
                                            </label>
                                            <FaPencilAlt/>
                                        </div>
                                        <div className="input-field">
                                            <label>
                                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                                            </label>
                                            <MdOutlineMailOutline/>
                                        </div>
                                        <div className="input-field">
                                            <label>
                                                <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone"/>
                                            </label>
                                            <FaPhoneFlip/>
                                        </div>
                                        <div className="input-field">
                                            <label>
                                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                                            </label>
                                            <RiLock2Fill/>
                                        </div>
                                        <button onClick={handleRegister} type="submit">Register</button>
                                       
                                    </form>
                                </div>
                            </div>
                        </div>
                       </section>
                     </main>
                    </header>

    </>;
     
 };

 export default Register;