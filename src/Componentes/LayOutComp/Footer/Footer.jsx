import React from 'react'
import logo from '../../../finalProject assets/freshcart-logo.svg'

export default function Footer() {
  return (
    <>

<div className=" text-center   " >
 



    <div className="row bg-black">
      <div className="col-md-6 ">
      <div className="text-center">
        <div className="">
          <a  className="btn text-white  m-1" style={{backgroundColor: '#3b5998'}} ><i className="fab fa-facebook-f" /></a>
        
          <a className="btn text-white  m-1" style={{backgroundColor: '#55acee'}} ><i className="fab fa-twitter" /></a>
          <a className="btn text-white  m-1" style={{backgroundColor: '#dd4b39'}} ><i className="fab fa-google" /></a>
      
          <a  className="btn text-white  m-1" style={{backgroundColor: '#ac2bac'}} ><i className="fab fa-instagram" /></a>

          <a  className="btn text-white  m-1" style={{backgroundColor: '#0082ca'}} ><i className="fab fa-linkedin-in" /></a>

          <a  className="btn text-white m-1" style={{backgroundColor: '#333333'}}><i className="fab fa-github" /></a>
        </div>

      </div>
      </div>
    </div>
   

  <div className="text-center " >
            © 2020 Copyright:
    <a className="text-body linkk" >  Fresh Cart</a>
  </div>

</div>




      
    </>
  )
}

