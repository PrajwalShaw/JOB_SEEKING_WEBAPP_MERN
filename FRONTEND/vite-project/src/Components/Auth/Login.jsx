import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import {  FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import {RiLock2Fill } from "react-icons/ri";
import { Link,Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const { isAuthorized, setIsAuthorized } = useContext(Context);

    const handleLogin = async (e) => {
        e.preventDefault();//unnecessary refreshing na ho iske liye
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/user/login",
                {  email, password, role },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            toast.success(data.message);
            setEmail("");
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
                        <div className="login">
                            <div className="grid-two--column">
                                <div className="form-text">
                                    <h2>Hello friend!!</h2>
                                     <p>Enter your details and start your journey with us</p>
                                      <button className="login-btn">
                                        <Link to={"/register"} className="login-btn">Register Here</Link>
                                      </button>
                                        {/* <Link to={"/login"}>
                                          <button className="login-btn">Login Here</button>
                                        </Link> */}
                                </div>

                                <div className="login-form">
                                    <h2>Login</h2>
                                    <p>Use your account</p>
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
                                            <label>
                                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                                            </label>
                                            <MdOutlineMailOutline/>
                                        </div>
                                        <div className="input-field">
                                            <label>
                                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                                            </label>
                                            <RiLock2Fill/>
                                        </div>
                                        <button onClick={handleLogin} type="submit">Login</button>
                                       
                                    </form>
                                </div>
                            </div>
                        </div>
                       </section>
                     </main>
                    </header>

    </>;
     
 };

 export default Login;