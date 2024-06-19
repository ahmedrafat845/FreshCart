import React, { useContext } from 'react'
import { WishlistContext } from '../../../Context/Wishlist'
import Product from './../Product/Product';
import noProduct from '../../../finalProject assets/noCart.png'

export default function Wishlist() {
  let {wishListProduct,loading}=useContext(WishlistContext)
  return (
    <>

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
   
   


      
    </>
  )
}
