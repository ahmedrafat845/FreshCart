import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../../Utilities/BaseUrl'
import Product from '../Product/Product'

export default function ProductOfCategory({cId,name}) {
    const [cProduct, setcProduct] = useState([])
    const [loadingg, setloadingg] = useState(false)

    let getCategoryProducts=async()=>{
      setloadingg(true)
        let {data}=await axios.get(`${BaseUrl}/api/v1/products?category[in]=${cId}`)
        setcProduct(data.data)
        setloadingg(false)
    }
    useEffect(() => {
        getCategoryProducts()
      
    
      
    }, [])
    



  return (
    <>
     {loadingg?
      <div className='loading  d-flex justify-content-center align-items-center'>
          
        <i class="fa-5x fa-solid fa-cart-shopping fa-spin"></i>
      </div>
     
    
    :
    <div className="container">
    <div className="row">
        <h2>Products Related To {name}</h2>
      <Product products={cProduct}/>
    </div>
  </div>
    }
    </>
  )
}
