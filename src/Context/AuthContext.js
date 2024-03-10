import { createContext, useState } from "react";
import { auth,provider } from "./../Firebase";
import { signInWithPopup } from "firebase/auth";

const AuthContext = createContext({});
const AuthProvider=({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState({});
  const [postPreview, setPostPreview] = useState(null);
//   const  halndleLogin=()=>{

//     signInWithPopup(auth,provider).then((userLoginData)=>{
//         // setUserLogin(userLoginData)
//         // console.log(userLoginData.user.uid)
//         // localStorage.setItem("email",userLoginData.user.email,"username",userLoginData.user.displayName)
//         // // data==userLogin
//         setAuthUser(userLoginData.user.uid)
//         console.log(authuser)
//         // if(authuser){

//         //     // use to navigate
//         //   navigate("/");
//         // }else{
//         //     console.log("err");
//         // }
//     })
// }

  // const login = (logindata) => {
  //   // Your login logic here, e.g., make API request to authenticate user
  //   // For simplicity, I'
  // };

  // const logout = () => {
  //   // Your logout logic here
  //   setIsLoggedIn(false);
  //   setUser(null);
  // };

    return (
    <AuthContext.Provider value={{  authUser, setAuthUser ,isLoggedIn, setIsLoggedIn,postPreview, setPostPreview}}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthProvider,AuthContext} 





{/* // AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Your login logic here, e.g., make API request to authenticate user
    // For simplicity, I'm just setting isLoggedIn to true
    setIsLoggedIn(true);
    setUser({ username });
  };

  const logout = () => {
    // Your logout logic here
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext }; */}
