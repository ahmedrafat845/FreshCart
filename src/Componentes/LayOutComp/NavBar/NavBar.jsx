import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { mediaContext } from '../../../Context/MediaStore';
import logo from '../../../finalProject assets/freshcart-logo.svg'
import heart from '../../../images/heart.png'
import { useTheme } from '@emotion/react';
import { FetchProductContext } from '../../../Context/FetchProduct';
import { WishlistContext } from '../../../Context/Wishlist';
import { NavDropdown } from 'react-bootstrap';



export default function NavBar({setmyMode}) {
  let {userData,LogOut}= useContext(mediaContext)
  let {getProductCart,cart,setCart}=useContext(FetchProductContext)
  let {getWishListProducts,wishListProduct,setWishListProduct}= useContext(WishlistContext)
  let theme=useTheme()  

  const handleLogoutAndClearCart = () => {
    LogOut(); 
    setCart([]);
    setWishListProduct([]) 
  };
  return (
    <>
      <Navbar expand="lg" className={` px-5   ${localStorage.getItem('CurrentMode')==='dark'?'bg-black ' :'bg-body-secondary'}`} >
        <Container fluid>
          <Navbar.Brand  className="fw-bold fs-4 text-muted   ">
            <a href="#">
              <img src={logo} alt="" className={`fw-bold fs-4 p-1  ${localStorage.getItem('CurrentMode')==='dark'?'bg-white rounded-3 ' :''}`} />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto  my-lg-0 fs-5" navbarScroll>
              {userData ? (
                <>
                  <Nav.Link href="#">
                    <Link className={` nav-link ${localStorage.getItem('CurrentMode')==='dark'?'text-white   ' :''}`} to="">
                      Home
                    </Link>
                  </Nav.Link>
                  <Nav.Link >
                    <Link className={` nav-link ${localStorage.getItem('CurrentMode')==='dark'?'text-white   ' :''}`} to="Products">
                      Products
                    </Link>
                  </Nav.Link>
                  <Nav.Link href="#">
                    <Link className={` nav-link ${localStorage.getItem('CurrentMode')==='dark'?'text-white   ' :''}`} to="Categories">
                      Categories
                    </Link>
                  </Nav.Link>
                  <Nav.Link href="#">
                    <Link className={` nav-link ${localStorage.getItem('CurrentMode')==='dark'?'text-white   ' :''}`} to="Brands">
                      Brands
                    </Link>
                  </Nav.Link>
                  
                </>
              ) : (
                ""
              )}
            </Nav>
            <Form className="d-lg-flex     justify-content-end  w-25 pe-4 my-3">
            <Nav.Link className='pt-1'>
              <a href='#' onClick={()=>{
                localStorage.setItem('CurrentMode',theme.palette.mode === 'light'?'dark':'light')
                setmyMode(theme.palette.mode === 'light'?'dark':'light')

              }} className='btn'><i className={`fa-solid fa-moon fs-5  ${localStorage.getItem('CurrentMode')==='dark'?'text-white   ' :''}`}></i></a>

              </Nav.Link>

               


             
             

              {userData ? (
                <>
                <NavDropdown  className={`mt-2 px-3   fs-5 linkk ${localStorage.getItem('CurrentMode')==='dark'?'text-white   ' :'text-secondary'}`} title={<i className="fa-solid fa-address-card"></i>} id="basic-nav-dropdown">
                <NavDropdown.Divider />
                  <NavDropdown.Item className='NavDropdown'><Link to='ChangePassword' className='linkk text-success'>Change Password</Link></NavDropdown.Item>
                
                  <div className='line my-2'></div>
                  <NavDropdown.Item className='NavDropdown text-center'><Link to='UpdateData' className='linkk text-success'>Update Data</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
                 <Nav.Link className='pt-2 me-4 pe-2'>
                 <Link to='Wishlist' onClick={getWishListProducts}  className={` position-relative   fs-5 linkk ${localStorage.getItem('CurrentMode')==='dark'?'text-white   ' :''}`}>
                    <i className=" fa-solid fa-heart text-danger"></i>
                    <span className="position-absolute top-0 start-100 ms-3 translate-middle badge rounded-pill bg-secondary ">
                  
                    {wishListProduct.count?wishListProduct.count:'0'}
                     
                    </span>
                  </Link>
                 </Nav.Link>



                 <Nav.Link className='pt-2 me-5'>
                 <Link to='Cart' onClick={getProductCart}  className={` position-relative   fs-5 linkk ${localStorage.getItem('CurrentMode')==='dark'?'text-white   ' :''}`}>
                     <i className={`fa-solid fa-cart-shopping  text-success`}></i>
                    <span className="position-absolute top-0 start-100 ms-3 translate-middle badge rounded-pill bg-danger">
                      {cart.numOfCartItems ? cart.numOfCartItems:'0'}
                     
                    </span>
                  </Link>

                 </Nav.Link>
                 <Nav.Link>
                 <Link href="#">
                    <button onClick={handleLogoutAndClearCart} className="btn btn-danger   ">
                      LogOut
                    </button>
                  </Link>

                 </Nav.Link>
                  

                 
                </>
              ) : (
                <>
                  <Link to="Login">
                    <button className="btn btn-warning ">LogIn</button>
                  </Link>
                  <Link to="SignUp">
                    <button className="btn btn-danger  ms-5 ">SignUp</button>
                  </Link>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
