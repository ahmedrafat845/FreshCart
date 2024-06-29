import React, { useContext, useState, useSyncExternalStore } from 'react'
import style from './CartOrder.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FetchProductContext } from '../../../Context/FetchProduct'
import { BaseUrl } from '../../../Utilities/BaseUrl'
import { toast } from 'react-toastify'
import axios from 'axios'
import ErrorList from '../../RegisterComp/ErrorList/ErrorList'
import { useNavigate } from 'react-router-dom'


export default function CashOrder() {
    const [Loading, setLoading] = useState(false)
    let token=localStorage.getItem('token')
    let {cart,setCart}=useContext(FetchProductContext)
    let navigate=useNavigate()

    const notify = (msg,type) => {
        toast[type](msg,{
          autoClose:1000 ,
          theme:'dark'
        });
      }


    let validationSchema=Yup.object({
    
        details:Yup.string().required().min(3).max(45),
        phone:Yup.string().required(),
        city:Yup.string().required().min(3).max(35),
        
      })

    let Formik=useFormik({
        initialValues:{
                details:'',
                phone:'',
                city:'',

        }
        ,validationSchema,

        onSubmit:(values)=>{
            setLoading(true)
            axios.post(`${BaseUrl}/api/v1/orders/${cart.data._id}`, values,{
                headers:{
                    token:token
                }
            })
            .then((data)=>{
              if(data.status=== 201){
                setCart([])
                notify('successssss','success')
                setLoading(false)
                
                navigate('/')
                
              }
            }).catch((error)=>{
              if(error.response.status==404){
                setLoading(false)
                notify(error.response.data.message,'error')
                
      
              }
             
            });
         
      
      
          }
    })

  return (
    <>
   <div className="container ">
    <div className="row pt-5">
        <div className="col-md-9  m-auto mt-3">
            <div className={`${style.orderInputs}  p-5`}>
                <form onSubmit={Formik.handleSubmit}   className='m-auto w-100 text-center'>
                    <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} value={Formik.values.details} className='form-control '     name='details' type="text" placeholder='enter details' />
                    <ErrorList Formik={Formik} type={"details"} />
                    <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} value={Formik.values.phone} className='form-control my-4' name='phone' type="number" placeholder='enter mobile phone'/>
                    <ErrorList Formik={Formik} type={"phone"} />
                    <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} value={Formik.values.city} className='form-control'      name='city' type="text" placeholder='enter your city' />
                    <ErrorList Formik={Formik} type={"city"} />
                    <button className='btn btn-success w-100 mt-4'>
                        {Loading?
                        <i className="fa-solid fa-cart-shopping fa-spin"></i>
                        :"Order"}
                        </button>
                </form>
            </div>
        </div>
    </div>
   </div>
      
    </>
  )
}
