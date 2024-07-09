import React, { useEffect } from "react";
import "./App.css";
import { useContext } from "react";
import { Context } from "./main";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Home from "./Components/Home/Home";
import Jobs from "./Components/Job/Jobs";
import PostJob from "./Components/Job/PostJob";
import MyJobs from "./Components/Job/MyJobs";
import JobDetails from "./Components/Job/JobDetails";
import Application from "./Components/Application/Application";
import MyApplications from "./Components/Application/MyApplications";
import NotFound from "./Components/NotFound/NotFound";
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import axios from "axios";
import {Toaster} from "react-hot-toast";





const App = () => {
     
      const {isAuthorized,setIsAuthorized,setUser} = useContext(Context);
      
     useEffect(()=>{
           const fetchUser = async () =>{
              try{
                  const response = await axios.get("http://localhost:4000/api/v1/user/getuser",{withCredentials:true});//axios ke zariye hum get karenge yeh url 
                  setUser(response.data.user);//response milega...usme ek key hoti hain aur saath main object/array hote hain aur usme se user data lenge
                  //aur phir usko setUser main store kar de rahe hain
                  setIsAuthorized(true);//aur agar yeh sab method kaam kar raha hain yani ki user Authorized hain aur hum isey true set kar rahe hain
              }
              catch(error){
                 setIsAuthorized(false);
              }
           };
           fetchUser();
     },[isAuthorized]);//useEffect tab tab run karega jab tak jab jab isAuthorized ka value change hota rahega

     
    





  return(
    <>
      <BrowserRouter>
        <Navbar/>
         <Routes>
           <Route path="/login" element={<Login />}/>
           <Route path="/register" element={<Register />}/>
           <Route path="/" element={<Home />}/>
           <Route path="/job/getall" element={<Jobs />}/>
           <Route path="/job/:id" element={<JobDetails />}/>
           <Route path="/job/post" element={<PostJob />}/>
           <Route path="/job/me" element={<MyJobs />}/>
           <Route path="/application/:id" element={<Application />}/>
           <Route path="/application/me" element={<MyApplications />}/>
           <Route path="*" element={<NotFound />}/>
          </Routes>
          <Footer/>
          <Toaster/>
      </BrowserRouter>
    
    </>
  );
};

export default App;