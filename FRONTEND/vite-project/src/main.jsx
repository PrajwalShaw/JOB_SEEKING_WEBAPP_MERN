import React, { useState,createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({isAuthorized: false});//createContext main jo values hain jinhe apne Context Provider
//ke through bheja hua hain unhe aap createContext ke through access karenge

const AppWrapper = () =>{
  const [isAuthorized,setIsAuthorized] = useState(false);
  const [user,setUser] = useState({});
   //AppWrapper main component create kiya hua hain aur ab main isme app ko wrap karunga
   return(
      <Context.Provider value={{isAuthorized,setIsAuthorized,user,setUser}}>
         <App/>
      </Context.Provider>
   );


};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>
);
