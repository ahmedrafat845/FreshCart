import React, { useContext } from 'react'
import { FetchApiContext } from '../../../Context/FetchApi'
import { Link } from 'react-router-dom'

export default function Categories() {
  let {category,loading}=useContext(FetchApiContext)
  


  return (
    <>
     {loading?
      <div className='loading  d-flex justify-content-center align-items-center'>
       
      <i class="fa-5x fa-solid fa-cart-shopping fa-spin"></i>
   </div>
     
    :
    <div className="container pt-5 mb-5">
    <div className="row">
      {category.map((item, index) => {
        let encodedImageUrl = encodeURIComponent(item.image);
        return (
          <div className="col-md-3 p-4 text-center transformScale" key={index}>
            <Link to={`/CategoryDetails/${item._id}/${encodedImageUrl}/${item.name}`} className='linkk'>
              <img src={item.image} className='w-100 rounded-3 border' height={250} alt="" />
              <h5>{item.name}</h5>
            </Link>
          </div>
        );
      })}
    </div>
  </div>
    }
      
    </>
  )
}
