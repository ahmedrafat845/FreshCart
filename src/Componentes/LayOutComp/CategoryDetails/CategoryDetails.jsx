
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BaseUrl } from '../../../Utilities/BaseUrl';
import style from './CategoryDetails.module.scss'
import ProductOfCategory from '../ProductOfCategory/ProductOfCategory';
import { FetchApiContext } from '../../../Context/FetchApi';


export default function CategoryDetails() {
  let {loadingg}=useContext(FetchApiContext)


  const [subCategory, setSubCategory] = useState([])
  const [loading, setLoading] = useState(false)
  let { id, image,name } = useParams();
  let cId=id
  const decodedImageUrl = decodeURIComponent(image);

  let getSubCategories=async()=>{
    setLoading(true)
    let {data}=await axios.get(`${BaseUrl}/api/v1/categories/${id}/subcategories`)
    setSubCategory(data.data)
    setLoading(false)
  }
  useEffect(() => {
    getSubCategories() 
  }, [])
  
  
  return (
    <>
    {loading? 
    <div className='loading  d-flex justify-content-center align-items-center'>
       
       <i class="fa-5x fa-solid fa-cart-shopping fa-spin"></i>
     </div>
    :
    <div className="container mt-3">
      <div className="row rowIndex  rounded-4 p-3  ">
        <div className="col-md-4 ">
          <img src={decodedImageUrl} className='w-100 p-2 rounded-4' height={500}alt="" />
         
          
            

        </div>
        <div className="col-md-8 d-flex align-items-center ">
         <div>
          <h2>{name}</h2>
          <h3 className='text-success'>SubCategories :</h3>
          {subCategory?<div className='row mt-3 '>
            {subCategory.map((item,index)=>(
               
                  <div className={`${style.hov} col-md-3 mb-4 me-5 `}key={index}>
                    <div className={`${style.card1} rounded-3`}>
                                
                    </div>
                    <div className={`${style.card2} rounded-3 `}>
                      <h5>{item.name}</h5>
                                    
                
                    </div>
                </div>
              
       

          ))}
          </div>:''}

         </div>


        </div>
      </div>

      <ProductOfCategory cId={cId} name={name}/>
    </div>

    
    }
  
  
      
    

    
    </>
  )
}
