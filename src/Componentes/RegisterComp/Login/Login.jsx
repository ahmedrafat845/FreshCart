import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorList from '../ErrorList/ErrorList'
import { BaseUrl } from './../../../Utilities/BaseUrl';
import {  Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { mediaContext } from '../../../Context/MediaStore'
import style from '../../LayOutComp/CartOrder/CartOrder.module.scss'
import { FetchProductContext } from '../../../Context/FetchProduct'
import { WishlistContext } from '../../../Context/Wishlist'






export default function Login() {
  let {saveUserData}=useContext(mediaContext)
  let {getProductCart}=useContext(FetchProductContext)
  let {getWishListProducts}= useContext(WishlistContext)

  const [loading, setLoading] = useState(false)
  let navigate=useNavigate()

  const notify = (msg,type) => {
    toast[type](msg,{
      autoClose:1000 ,
    });
  }

  let validationSchema=Yup.object({
    
    email:Yup.string().required().email(),
    password:Yup.string().required('Password is required'),
    
  })

  let Formik = useFormik({
    initialValues:{
    
      email:'',
      password:'',
     
     


    },
    validationSchema
    ,

    onSubmit:(values)=>{
      setLoading(true)
      axios.post(`${BaseUrl}/api/v1/auth/signin`, values)
      .then((data)=>{
        if(data.status=== 200){
          notify('successssss','success')
          localStorage.setItem('token',data.data.token)
          saveUserData()
          setLoading(false)
          navigate('/')
        }
      }).catch((error)=>{
        if(error.response.status==401){
          setLoading(false)
          notify(error.response.data.message,'error')
          

        }
       
      });
   


    }


  })

  let goToRegister = () => {
    navigate("/signUp");
  };

  
  





  return (
    <>
     <div className='  overflow-hidden AllLogin pt-3'>
     <div className="container mt-5 pt-5 ">
        <div className="row">
            <div className="col-md-8 m-auto">
                <div className={`${style.orderInputs}   p-5 rounded-2 `}>
                    <h3 className='mb-3 text-success'>Welcome To Our Login 😊:</h3>
                <form onSubmit={Formik.handleSubmit} className="  ">
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

                   <div className=''>
                   <button disabled={!(Formik.isValid && Formik.dirty && !loading)} type='submit' className='btn btn-success  '>
                   
                      {!loading? ("Login"):
                      <i className='fa-spinner fa-spin fas'></i>
                      
                      }
                 
                   </button> 
                   <span>  Do not have account ? <Link to={'/SignUp'} className='linkk text-success'>SignUp</Link></span>
                 <Link to={'/ForgetPassword'} className='linkk text-success float-end'>Forget Your Password ?{" "}</Link>
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


// <form onSubmit={Formik.handleSubmit}   className='p-2 text-center '>
                


//                 <div>
//                    <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} value={Formik.values.email} className='form-control ' type='email' name='email' placeholder='enter your email..'/>
                 
//                    <div className={`${style.errorList}`}>
//                    <ErrorList Formik={Formik} type={"email"} />
 
//                  </div>
//                 </div>
 
//                <div>
//                    <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} value={Formik.values.password} className='form-control' type='password' name='password' placeholder='enter your password..'/>
                   
//                    <div className={`${style.errorList}`}>
//                    <ErrorList Formik={Formik} type={"password"} />
 
//                  </div>
//                </div>
//                  <button disabled={!(Formik.isValid && Formik.dirty && !loading)} type='submit' className='btn btn-success   w-50'>
                   
//                       {!loading? ("Login"):
//                       <i className='fa-spinner fa-spin fas'></i>
                      
//                       }
                 
//                    </button>
//                  <p className='mt-2 text-success'>do not have account ?{" "} <a href='' className='text-danger' onClick={goToRegister} >SignUp</a> </p>
//                  <Link to={'/ForgetPassword'} className='mt-2 text-success linkk'>Forget Your Password ?{" "}</Link>
 
                 
 
//                </form>

