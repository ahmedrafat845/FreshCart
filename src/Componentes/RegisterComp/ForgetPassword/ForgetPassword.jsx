import React, {useState } from 'react'
import { toast } from 'react-toastify'
import { BaseUrl } from '../../../Utilities/BaseUrl'
import axios from 'axios'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import ErrorList from '../ErrorList/ErrorList'
import style from '../../LayOutComp/CartOrder/CartOrder.module.scss'

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false)
    let navigate=useNavigate()
  
    const notify = (msg,type) => {
      toast[type](msg);
    }
  
    let validationSchema=Yup.object({
      email:Yup.string().required().email(),
      
    })
  
    let Formik = useFormik({
      initialValues:{
        email:'',
      },
      validationSchema
      ,
  
      onSubmit:async(values)=>{
        setLoading(true)
        try{
          let {data}= await axios.post(`${BaseUrl}/api/v1/auth/forgotPasswords`, values)
          notify(data.message,'success')
          setLoading(false)
          navigate('/VerifyCode')
        }catch(error){
            setLoading(false)
            notify(error.response.data.message,'error') 
          }
        }
    })
 
  return (
    <>
    <div className="container mt-5 pt-5">
        <div className="row">
            <div className="col-md-8 m-auto">
                <div className={`${style.orderInputs}   p-5 rounded-2 `}>
                    <h3 className='mb-3 text-success'>Enter Your Email to Reset the Code :</h3>
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

                   <div className=''>
                   <button className="btn btn-danger "  disabled={!(Formik.isValid && Formik.dirty && !loading)}>
                  {loading?(
                    <i class="fa-solid fa-hourglass-start fa-spin"></i>
                      
                  ):(
                    "Reset Code"
                  )}

                    
                    </button> 
                    <Link to="/Login" className='linkk text-success float-end  '>Back to Login ?</Link>
                   </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
      
    </>
  )
}
