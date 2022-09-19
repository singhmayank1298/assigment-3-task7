import { useState,useEffect } from "react";
import React from "react";

const AuthContext= React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin:(email,password)=>{}
}); // it will make a object it take default state ,we can pass any data type
                                        // default value is useable when you does not creat Provider



 export  const AuthContextProvider=(props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(()=>{
  const storageUser=localStorage.getItem('isLoggedIn')
  if(storageUser==='1'){
    setIsLoggedIn(true)
  }

  },[])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn',"1")
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

    return (<AuthContext.Provider 
    value={{
    isLoggedIn:isLoggedIn,
     onLogout:logoutHandler,
     onLogin:loginHandler,
    }}>
    {props.children}</AuthContext.Provider>)
   }
export default AuthContext
