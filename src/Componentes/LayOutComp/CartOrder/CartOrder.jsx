import React from 'react'
import { Link } from 'react-router-dom'
import style from './CartOrder.module.scss'

export default function CartOrder() {
  return (
    <>
    <div className="container mt-5 pb-5 mb-5 pt-5">
      <div className="row justify-content-center mt-5 text-center">
        <h2 >Order by :</h2>
        <div className="col-md-4 ">
         
            <Link to={'/VisaOrder'} className='linkk'>
              <div className={`${style.card}`}>
                <h2>
                  visa
                </h2>
               </div>
            </Link>

        

        </div>
        <div className="col-md-4 ">
        <Link to={'/CashOrder'} className='linkk'>
        <div className={`${style.card}`}>
                <h2>
                  cash
                </h2>
               </div>
            </Link>

        </div>
      </div>
    </div>
      
    </>
  )
}
