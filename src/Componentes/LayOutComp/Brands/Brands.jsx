import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from './../../../Utilities/BaseUrl';
import style from './Brands.module.scss'
import { Link } from 'react-router-dom';

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [loading, setloading] = useState(false)

  let getBrands=async()=>{
    setloading(true)
    let {data}=await axios.get(`${BaseUrl}/api/v1/brands`)
    setBrands(data.data)
    setloading(false)
  }
  useEffect(() => {
    getBrands()
  
    
  }, [])
  



  return (
    <>
    {loading?
    <div className='loading  d-flex justify-content-center align-items-center'>
       
       <i class="fa-5x fa-solid fa-cart-shopping fa-spin"></i>
    </div>
    
  
  
  
  
  :
  <div className="container mt-5 mb-5">
      <div className="row g-3">
        {brands.map((item,index)=>(
          <div className={` col-md-3  `} key={index}>
           <Link to={`/ProductOfBrand/${item._id}`} className='linkk'>
            <div className={`${style.brand} w-75 rounded-3 p-2 m-auto`}>
            
               <img src={item.image} className='w-100'   alt="" />
            
            </div>
           </Link>

          </div>
        ))}
      </div>
    </div>
      
  }
    </>
  )
}

