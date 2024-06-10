import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchProductContext } from '../../../Context/FetchProduct';
import { WishlistContext } from '../../../Context/Wishlist';
import noProduct from '../../../finalProject assets/noCart.png'


export default function Product({products,count}) {
  const {AddProductToCart,deleteProductCart,cart } = useContext(FetchProductContext);
  const {postWishListProduct,deleteWishListProduct,wishListProduct}= useContext(WishlistContext)
  const [wishListIds, setWishListIds] = useState([])
  const [cartIds, setCartIds] = useState([])
  const [loading, setLoading] = useState(false)
  const [wishLoading, setWishLoading] = useState(false)


  useEffect(() => {
    
    if (wishListProduct.data) {
      setWishListIds(wishListProduct.data.map(item => item._id));
    }
    if (cart.data && cart.data.products) {
      setCartIds(cart.data.products.map(item => item.product._id));
    }
   

  }, [wishListProduct,cart]);

  const handleAddToCart = async (id,method) => {

    setLoading(prev => ({ ...prev, [id]: true }));
    if(method=='post'){
      await AddProductToCart(id);
    }else{
      await deleteProductCart(id)
    }
    setLoading(prev => ({ ...prev, [id]: false }));
  };

  const handelWishlistId = async (id,method) => {

    setWishLoading(prev => ({ ...prev, [id]: true }));
    if(method=='post'){
      await postWishListProduct(id)
    }else{
      await deleteWishListProduct(id)
    }
    setWishLoading(prev => ({ ...prev, [id]: false }));
  };
  



  return (
    <>
   <div className="container">
   <div className='row g-4'>
  
      {products.map((item, index) => {
        
      const isWishlisted = wishListIds.includes(item._id);
      const isCarted = cartIds.includes(item._id)

       return(
        <div className={`col-md-3 `} key={index}>
          <div className={`my-3 w-100 p-3 product transformScale  ${isCarted? 'product-red-BoxShadow':''}`}>
            
         <div>
         <span
                onClick={() => handelWishlistId(item._id, isWishlisted ? 'delete' : 'post')}
                
              >
                {wishLoading[item._id]?
                <i className='fa-cart-shopping fa-solid fa-spin text-danger'></i>
                :
                <i className={`fa-heart  pointerIcon text-danger  ${isWishlisted ? 'fa-solid ' : 'fa-regular'}`}></i>
                
              }

              </span>
         </div>
          <Link to={'/ProductDetails/' + item._id} className='linkk'>
            <img src={item.imageCover} className='w-75 ms-4 bg-black' height={200} alt="" />
            <h6 className='text-success pt-2'>{item.category.name}</h6>
            <p>{item.title.split(' ').slice(0, 1).join(' ')}</p>
            <div className="d-flex justify-content-between">
              <span>{item.price} EGP</span>
              <div>
                <i className='fas fa-star rating-color'></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>
          <button
            onClick={() => handleAddToCart(item._id, isCarted ? 'delete' : 'post')}
            className={`btn  w-100 mb-2 ${isCarted ? 'btn-danger' : 'btn-success'}`}
            disabled={loading[item._id]}
          >
            {loading[item._id] ? <i className="fa-solid fa-cart-shopping fa-spin"></i> : (isCarted ? "Remove from Cart" : "Add to Cart")}
          </button>
          </div>
       
        </div>
       )


       
   })}
   
    </div>
   </div>
     
    </>
  );
}
