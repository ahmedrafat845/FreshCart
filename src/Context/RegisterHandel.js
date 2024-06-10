import { createContext, useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { BaseUrl } from "../Utilities/BaseUrl";


export let RgisterContext=createContext()

export default function RgisterContextProvider(props){


    const [loading, setLoading] = useState(false)
  
    const notify = (msg,type) => {
      toast[type](msg);
    }
  
    let validationSchema=Yup.object({
      name:Yup.string().required().min(3).max(15),
      phone:Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 11 digits')
      .required('Phone number is required'),
      email:Yup.string().required().email(),
      password:Yup.string()
      .matches(/^[A-Z][a-z0-9@$%&#]{5,}$/, `Password must start with an uppercase
       letter and be at least 6 characters long,
        including lowercase letters, digits, or @, $, %, &, #.`)
      .required('Password is required'),
      rePassword:Yup.string().required()
      .oneOf([Yup.ref('password')],"password and rePassword must be matched")
    })
  
   let RegisterF=(endPoint,navigatee,status1,status2)=>{
    return useFormik({
        initialValues:{
          name:'',
          phone:'',
          email:'',
          password:'',
          rePassword:''
         
    
    
        },
        validationSchema
        ,
    
        onSubmit:(values)=>{
          setLoading(true)
          axios.post(`${BaseUrl}/api/v1/auth/${endPoint}`, values)
          .then((data)=>{
            if(data.status == status1){
                //201
                //200
              notify('successssss','success')
              setLoading(false)
              // window.location.href = `/${navigatee}`;
              
             
            }
          }).catch((error)=>{
            if(error.response.status == status2){
                //409
                //401
              setLoading(false)
              notify(error.response.data.message,'error')
             
              
              
              
    
            }
           
          });
       
    
    
        }
    
    
      })
      
   }
    


    return <RgisterContext.Provider  value={{RegisterF,loading}}>
         {props.children}
    </RgisterContext.Provider>
}