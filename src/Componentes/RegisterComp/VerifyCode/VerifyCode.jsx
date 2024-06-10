import React, {useState } from 'react'
import { toast } from 'react-toastify'
import { BaseUrl } from '../../../Utilities/BaseUrl'
import axios from 'axios'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import ErrorList from '../ErrorList/ErrorList'
import style from '../../LayOutComp/CartOrder/CartOrder.module.scss'

export default function VerifyCode() {
    const [loading, setLoading] = useState(false)
    let navigate=useNavigate()
  
    const notify = (msg,type) => {
      toast[type](msg);
    }
  
    let validationSchema=Yup.object({
        resetCode:Yup.string().required(),
      
    })
  
    let Formik = useFormik({
      initialValues:{
        resetCode:'',
      },
      validationSchema
      ,
  
      onSubmit:async(values)=>{
        setLoading(true)
        try{
          let {data}= await axios.post(`${BaseUrl}/api/v1/auth/verifyResetCode`,
           {resetCode: String(values.resetCode)})
          notify(data.message,'success')
          setLoading(false)
          navigate('/ResetPassword')
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
                    <h3 className='mb-3 text-success'>Enter Your Code to Change the Password :</h3>
                <form onSubmit={Formik.handleSubmit} className="  ">
                    <div>
                      <input
                         onBlur={Formik.handleBlur}
                         onChange={Formik.handleChange} 
                         value={Formik.values.resetCode}
                         className="form-control "
                         type="string"
                         name="resetCode"
                         placeholder="enter your Code.."
                      />
                     <div>
                     <ErrorList Formik={Formik} type={"resetCode"} />
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
                    <Link to="/ForgetPassword" className='linkk text-success float-end  '>Back to Forget Password ?</Link>
                   </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
      
    </>
  )
}
