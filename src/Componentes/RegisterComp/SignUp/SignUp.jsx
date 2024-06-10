import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorList from '../ErrorList/ErrorList'
import { BaseUrl } from './../../../Utilities/BaseUrl';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import style from '../../LayOutComp/CartOrder/CartOrder.module.scss'






export default function SignUp() {

  const [loading, setLoading] = useState(false)
  let navigate=useNavigate()

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
    password:Yup.string()
    .matches(/^[A-Z][a-z0-9@$%&#]{5,}$/, `Password must start with an uppercase
     letter and be at least 6 characters long,
      including lowercase letters, digits, or @, $, %, &, #.`)
    .required('Password is required'),
    rePassword:Yup.string().required()
    .oneOf([Yup.ref('password')],"password and rePassword must be matched")
  })

  let Formik = useFormik({
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
      axios.post(`${BaseUrl}/api/v1/auth/signup`, values)
      .then((data)=>{
        if(data.status=== 201){
          notify('successssss','success')
          setLoading(false)
          navigate('/Login')
        }
      }).catch((error)=>{
        if(error.response.status==409){
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
                    <h3 className='mb-3 text-success'>Welcome To Our SignUp 😊:</h3>
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
                    <div>
                      <input
                         onBlur={Formik.handleBlur}
                         onChange={Formik.handleChange} 
                         value={Formik.values.password}
                         className="form-control "
                         type="password"
                         name="password"
                         placeholder="enter your password.."
                      />
                     <div>
                     <ErrorList Formik={Formik} type={"password"} />
                     </div>
                    </div>
                    <div>
                      <input
                         onBlur={Formik.handleBlur}
                         onChange={Formik.handleChange} 
                         value={Formik.values.rePassword}
                         className="form-control "
                         type="password"
                         name="rePassword"
                         placeholder="enter your rePassword.."
                      />
                     <div>
                     <ErrorList Formik={Formik} type={"rePassword"} />
                     </div>
                    </div>

                   <div className=''>
                   <button disabled={!(Formik.isValid && Formik.dirty && !loading)} type='submit' className='btn btn-success  '>
                   
                      {!loading? ("SignUp"):
                      <i className='fa-spinner fa-spin fas'></i>
                      
                      }
                 
                   </button> <span> have account ? <Link to={'/Login'} className='linkk text-success'>Login</Link></span>
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

