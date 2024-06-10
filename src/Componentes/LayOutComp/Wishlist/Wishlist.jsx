import React, { useContext } from 'react'
import { WishlistContext } from '../../../Context/Wishlist'
import Product from './../Product/Product';
import noProduct from '../../../finalProject assets/noCart.png'

export default function Wishlist() {
  let {wishListProduct,loading}=useContext(WishlistContext)
  return (
    <>
   {loading?
     <div className='container'>
         <div className='loading loading2  d-flex justify-content-center align-items-center'>
        
        <i class="fa-5x fa-solid fa-cart-shopping fa-spin text-success"></i>
        </div>
        <div>
    {wishListProduct.count > 0 ?
        <div className="row pt-5">
          <Product products={wishListProduct.data}/>
        </div>
    
 : 
  
  
      <div className="row">
        <div className='col-md-9 m-auto text-center pt-5'>
            <img src={noProduct} className='w-50' alt="" />
        </div>
      </div>


     }

   </div>
   
     </div>
   :
   <div>
    {wishListProduct.count > 0 ?
     <div className="container pt-5">
        <div className="row">
          <Product products={wishListProduct.data}/>
        </div>
     </div>
    
 : 
  
     <div className="container">
      <div className="row">
        <div className='col-md-9 m-auto text-center pt-5'>
            <img src={noProduct} className='w-50' alt="" />
        </div>
      </div>
     </div>

     }

   </div>
   
   
  }

      
    </>
  )
}
