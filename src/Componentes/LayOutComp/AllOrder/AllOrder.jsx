import React, { useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../CartOrder/CartOrder.module.scss'
import { FetchProductContext } from '../../../Context/FetchProduct'

export default function AllOrder() {
  let {clearCart}=useContext(FetchProductContext)
  const [boolean, setboolean] = useState(true)
  if(boolean){
    clearCart()
    setboolean(false)
  }
  return (
    <>
     <div className="container pt-5">
        <div className="row">
            <div className="col-md-8 m-auto">
                <h2 className='mb-5'>Successfully orderd ✌🚀</h2>
                <Link to={`/Products`} className='linkk'>
                  <div className={`${style.card}`}>
                    <h2>
                    Browse Our Product 😊
                    </h2>
                  </div>
                   
                </Link>
            </div>
        </div>
    </div>
      
    </>
  )
}
