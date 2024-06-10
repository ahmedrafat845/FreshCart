import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorList from '../ErrorList/ErrorList'
import { BaseUrl } from './../../../Utilities/BaseUrl';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import style from '../../LayOutComp/CartOrder/CartOrder.module.scss'






export default function UpdateData() {

  const [loading, setLoading] = useState(false)
  let navigate=useNavigate()
  let token=localStorage.getItem('token')

  const notify = (msg,type) => {
    toast[type](msg,{
        autoClose:1000 ,
    });
  }

  let validationSchema=Yup.object({
    name:Yup.string().required().min(3).max(15),
    phone:Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 11 digits')
    .required('Phone number is required'),
    email:Yup.string().required().email(),
  })

  let Formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
    },
    validationSchema
    ,

    onSubmit:(values)=>{
      setLoading(true)
      axios.put(`${BaseUrl}/api/v1/users/updateMe/`, values,{
        headers:{
            'token': `${token}`
        }})
      .then((data)=>{
        if(data.status=== 200){
            notify('successssss','success')
            navigate('/')
         
          }
        }).catch((error)=>{
          if(error.response.status==400){
            setLoading(false)
            notify(error.response.data.message,'error')
            

        }
       
      });
   


    }


  })
  let goToLogin=()=>{
    navigate("/Login");
  }
  
  





  return (
    <>

<div className='overflow-hidden AllLogin pt-3'>
     <div className="container mt-5 pt-5 ">
        <div className="row">
            <div className="col-md-8 m-auto">
                <div className={`${style.orderInputs}   p-5 rounded-2 `}>
                    <h3 className='mb-3 text-success'>Update Data 😊:</h3>
                <form onSubmit={Formik.handleSubmit} className="  ">
                    <div>
                      <input
                         onBlur={Formik.handleBlur}
                         onChange={Formik.handleChange} 
                         value={Formik.values.name}
                         className="form-control "
                         type="string"
                         name="name"
                         placeholder="enter your name.."
                      />
                     <div>
                     <ErrorList Formik={Formik} type={"name"} />
                     </div>
                    </div>
                    <div>
                      <input
                         onBlur={Formik.handleBlur}
                         onChange={Formik.handleChange} 
                         value={Formik.values.phone}
                         className="form-control "
                         type="number"
                         name="phone"
                         placeholder="enter your phone.."
                      />
                     <div>
                     <ErrorList Formik={Formik} type={"phone"} />
                     </div>
                    </div>
                    <div>
                      <input
                         onBlur={Formik.handleBlur}
                         onChange={Formik.handleChange} 
                         value={Formik.values.email}
                         className="form-control "
                         type="email"
                         name="email"
                         placeholder="enter your email.."
                      />
                     <div>
                     <ErrorList Formik={Formik} type={"email"} />
                     </div>
                    </div>

                   <div className=''>
                   <button disabled={!(Formik.isValid && Formik.dirty && !loading)} type='submit' className='btn btn-success  '>
                   
                      {!loading? ("Update"):
                      <i className='fa-spinner fa-spin fas'></i>
                      
                      }
                 
                   </button> <span>Back to Home ? <Link to={'/'} className='linkk text-success'>Home</Link></span>
                   </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
     </div>




   
      
    </>
  )
}

