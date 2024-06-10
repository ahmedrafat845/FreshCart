import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BaseUrl } from '../../../Utilities/BaseUrl'
import Product from '../Product/Product'

export default function ProductOfBrand() {

    const [PBrand, setPBrand] = useState([])
    const [loading, setLoading] = useState(false)
    let {id}=useParams()
    

    let getPBrand=async()=>{
        setLoading(true)
        let {data}=await axios.get(`${BaseUrl}/api/v1/products?brand=${id}`)
        setPBrand(data.data)
        setLoading(false)
    }
    useEffect(() => {
        getPBrand()
      
    
      
    }, [])
    

  return (
    <>
    {loading?
     <div className='loading  d-flex justify-content-center align-items-center'>
       
     <i class="fa-5x fa-solid fa-cart-shopping fa-spin"></i>
    </div> 
    

    :
    <div className="container">
        <div className="row">
        <Product products={PBrand}/>
        </div>
    </div>

    }
   
   
      
    </>
  )
}
