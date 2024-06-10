import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorList from '../ErrorList/ErrorList'
import { BaseUrl } from './../../../Utilities/BaseUrl';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import style from '../../LayOutComp/CartOrder/CartOrder.module.scss'
import { mediaContext } from '../../../Context/MediaStore'






export default function ChangePassword() {
  let {saveUserData}=useContext(mediaContext)
  const [loading, setLoading] = useState(false)
  let navigate=useNavigate()
  let token=localStorage.getItem('token')

  const notify = (msg,type) => {
    toast[type](msg,{
      autoClose:1000 ,
    });
  }

  let validationSchema=Yup.object({
    currentPassword:Yup.string().required('Password is required'),
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
      currentPassword:'',
      password:'',
      rePassword:''
    },
    validationSchema
    ,

    onSubmit:(values)=>{
      setLoading(true)
      axios.put(`${BaseUrl}/api/v1/users/changeMyPassword`, values,{
        headers:{
            'token': `${token}`
        }})
      .then((data)=>{
        if(data.status=== 200){
          notify('successssss','success')
          localStorage.removeItem('token')
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
  let goToLogin=()=>{
    navigate("/Login");
  }
  
  





  return (
    <>

<div className='  overflow-hidden AllLogin pt-3'>
     <div className="container mt-5 pt-5 ">
        <div className="row">
            <div className="col-md-8 m-auto">
                <div className={`${style.orderInputs}   p-5 rounded-2 `}>
                    <h3 className='mb-3 text-success'>Change Password 😊:</h3>
                <form onSubmit={Formik.handleSubmit} className="  ">
                   
                    <div>
                      <input
                         onBlur={Formik.handleBlur}
                         onChange={Formik.handleChange} 
                         value={Formik.values.currentPassword}
                         className="form-control "
                         type="string"
                         name="currentPassword"
                         placeholder="enter your currentPassword.."
                      />
                     <div>
                     <ErrorList Formik={Formik} type={"currentPassword"} />
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
                   
                      {!loading? ("ChangePassword"):
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

