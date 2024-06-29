import React, { useContext} from 'react'
import { FetchProductContext } from '../../../Context/FetchProduct';
import style from './Cart.module.scss'
import { Link } from 'react-router-dom';
import noProduct from '../../../finalProject assets/noCart.png'

export default function Cart() {
   let {cart,loading,deleteProductCart,UpdateProductCart,clearCart} = useContext(FetchProductContext)

    let increaseCounter=(itemCount,id)=>{
       
        
       let newCount=itemCount+1
       UpdateProductCart(id,newCount,'increase')
       
    }
    let decreaseCounter=(itemCount,id) => {
   
        if (itemCount > 1) {
          let newCount = itemCount - 1;
          UpdateProductCart(id,newCount,'decrease');
        } else {
            deleteProductCart(id);
        }
      };


  return (
    <>
    {loading ?(
      <div className="container mt-5">
      <div className='loading loading2  d-flex justify-content-center align-items-center'>
        
        <i class="fa-5x fa-solid fa-cart-shopping fa-spin text-success"></i>
        </div>
        <div className="row">
           
         {cart.numOfCartItems > 0 ? 
          (
            <div >
            <div className="row">
            <div className="col-6 ">
               <h2 className='text-success'>Total Cart Price : {cart.data.totalCartPrice ? cart.data.totalCartPrice: '0'} EGP</h2>
           </div>
           <div className="col-md-6 d-flex justify-content-end">
               <h2  onClick={clearCart} className='btn btn-danger'>Clear All Cart</h2>
           </div>
            </div>

             
             {cart.data.products.map((item,index)=>(
               <div>
             
                   <div key={index} className={`${style.productCart} col-md-12 p-2 my-2 m-auto d-flex justify-content-between border-1 border rounded-3 border-success `} >
                   <div className="caption w-50  d-flex ">
                       <img src={item.product.imageCover} className='w-25 rounded-3' height={160} alt="" />
                      <div className='ms-3 p-2'>
                       <h5>Category : <span className='text-success'> {item.product.category.name}</span></h5>
                       <p>title : <span className='text-success'>{item.product.title}</span></p>
                       <p>price : <span className='text-success'>{(item.price)*(item.count)}</span></p>
                      </div>
                   </div>
                   <div className='d-flex justify-content-end align-items-center  w-25 pe-2'>
                
                   <div className='d-flex justify-content-between'>
                       <div className={`${style.updatePlus}  `}>
                          <a ><i  onClick={() =>increaseCounter(item.count,item.product._id)} className={`${style.plus} fa-solid fa-plus`} ></i></a>
                       </div>
                           <div className={`${style.count}`}>
                           {item.count}
                           </div>
                        <div className={`${style.updateMinus} `}>
                              <a ><i onClick={() =>decreaseCounter(item.count,item.product._id)} className={`${style.minus} fa-solid fa-minus`} ></i></a> 
                       </div>
                   </div>
                   <a onClick={() =>deleteProductCart(item.product._id)} className={`${style.delete}`}><i class="fs-2 text-danger  fa-solid fa-trash ms-4"></i></a>
                   </div>
                  

               </div>
               </div>
                   ))}
       
           <div className='d-flex justify-content-center mt-3'>
               <Link to={`/CartOrder`} className='linkk btn btn-success w-75'>Order Now!</Link>
           </div>
        </div>
          )
         
        :
        <div className='col-md-9 m-auto text-center'>
            <img src={noProduct} className='w-50' alt="" />
        </div>
        }
        </div>
        </div>
        
    ):(
        <div className="container mt-5">
        <div className="row">
           
         {cart.numOfCartItems > 0 ? 
          (
            <div >
            <div className="row">
            <div className="col-6 ">
               <h2 className='text-success'>Total Cart Price : {cart.data.totalCartPrice ? cart.data.totalCartPrice: '0'} EGP</h2>
           </div>
           <div className="col-md-6 d-flex justify-content-end">
               <h2  onClick={clearCart} className='btn btn-danger'>Clear All Cart</h2>
           </div>
            </div>

             
             {cart.data.products.map((item,index)=>(
               <div>
             
                   <div key={index} className={`${style.productCart} col-md-12 p-2 my-2 m-auto d-flex justify-content-between border-1 border rounded-3 border-success `} >
                   <div className="caption w-50  d-flex ">
                       <img src={item.product.imageCover} className='w-25 rounded-3' height={160} alt="" />
                      <div className='ms-3 p-2'>
                       {/* <h5>Brand : <span className='text-success'> {item.product.brand.name}</span></h5> */}
                       <h5>Category : <span className='text-success'> {item.product.category.name}</span></h5>
                       <p>title : <span className='text-success'>{item.product.title}</span></p>
                       <p>price : <span className='text-success'>{(item.price)*(item.count)}</span></p>
                      </div>
                   </div>
                   <div className='d-flex justify-content-end align-items-center  w-25 pe-2'>
                
                   <div className='d-flex justify-content-between'>
                       <div className={`${style.updatePlus}  `}>
                          <a ><i  onClick={() =>increaseCounter(item.count,item.product._id)} className={`${style.plus} fa-solid fa-plus`} ></i></a>
                       </div>
                           <div className={`${style.count}`}>
                           {item.count}
                           </div>
                        <div className={`${style.updateMinus} `}>
                              <a ><i onClick={() =>decreaseCounter(item.count,item.product._id)} className={`${style.minus} fa-solid fa-minus`} ></i></a> 
                       </div>
                   </div>
                   <a onClick={() =>deleteProductCart(item.product._id)} className={`${style.delete}`}><i class="fs-2 text-danger  fa-solid fa-trash ms-4"></i></a>
                   </div>
                  

               </div>
               </div>
                   ))}
       
           <div className='d-flex justify-content-center mt-3'>
               <Link to={`/CartOrder`} className='linkk btn btn-success w-75'>Order Now!</Link>
           </div>
        </div>
          )
         
        :
        <div className='col-md-9 m-auto text-center'>
            <img src={noProduct} className='w-50' alt="" />
        </div>
        }
        </div>
    </div>

    )}
   
      
    </>
  )
}










