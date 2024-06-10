import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { FetchProductContext } from "./FetchProduct";


export let mediaContext=createContext(null)


export default function MediaContextProvider(props){

    const [userData, setuserData] = useState('')



    let saveUserData=()=>{
      let encodedToken=localStorage.getItem("token")
     console.log(encodedToken);
      let decodedToken=jwtDecode(encodedToken)
      setuserData(decodedToken)
    
    }
    useEffect(() => {
      if(localStorage.getItem("token")){
        saveUserData()
      }
     
    }, [])
  
    let LogOut=()=>{
      localStorage.removeItem("token")
      setuserData('')
     
      return <Navigate to="/Login"/>
    }
    




    return <mediaContext.Provider value={{saveUserData,userData,LogOut}}>
     {props.children}
    </mediaContext.Provider>
}