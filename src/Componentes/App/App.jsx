import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from '../LayOutComp/NotFound/NotFound'
import Home from '../LayOutComp/Home/Home'
import MasterLayOut from '../LayOutComp/MaterLayOut/MasterLayOut';
import SignUp from '../RegisterComp/SignUp/SignUp';
import Login from '../RegisterComp/Login/Login'
import ProtectRouter from '../RegisterComp/ProtectRouter/ProtectRouter';
import ReverseProtect from '../RegisterComp/ReverseProtectRouter/ReverseProtect';
import Categories from './../LayOutComp/Categories/Categories';
import Brands from './../LayOutComp/Brands/Brands';
import Products from './../LayOutComp/Products/Products';
import ProductDetails from '../LayOutComp/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import CategoryDetails from '../LayOutComp/CategoryDetails/CategoryDetails';
import ProductOfBrand from '../LayOutComp/ProductOfBrand/ProductOfBrand';
import Cart from '../LayOutComp/Cart/Cart';
import CartOrder from '../LayOutComp/CartOrder/CartOrder';
import AllOrder from '../LayOutComp/AllOrder/AllOrder';
import VisaOrder from '../LayOutComp/CartOrder/VisaOrder';
import CashOrder from '../LayOutComp/CartOrder/CashOrder';
import Wishlist from '../LayOutComp/Wishlist/Wishlist';
import ForgetPassword from '../RegisterComp/ForgetPassword/ForgetPassword';
import VerifyCode from '../RegisterComp/VerifyCode/VerifyCode';
import ResetPassword from '../RegisterComp/ResetPassword/ResetPassword';
import ChangePassword from '../RegisterComp/ChangePassword/ChangePassword';
import UpdateData from '../RegisterComp/UpdateData/UpdateData';








export default function App() {
  
 







  let   routes=createBrowserRouter([
    {path:'/',element:<MasterLayOut />, errorElement:<NotFound/>,children:([
      {index:true,element:<ProtectRouter>  <Home/>  </ProtectRouter>},
      {path:'Categories',element:<ProtectRouter>  <Categories/>  </ProtectRouter>},
      {path:'/CategoryDetails/:id/:image/:name',element:<ProtectRouter>  <CategoryDetails/>  </ProtectRouter>},
      {path:'Brands',element:<ProtectRouter>  <Brands/>  </ProtectRouter>},
      {path:'Products',element:<ProtectRouter>  <Products/>  </ProtectRouter>},
      {path:'ProductOfBrand/:id',element:<ProtectRouter>  <ProductOfBrand/>  </ProtectRouter>},
      {path:'productDetails/:id',element:<ProtectRouter>  <ProductDetails/>  </ProtectRouter>},
      {path:'Cart',element:<ProtectRouter>  <Cart/>  </ProtectRouter>},
      {path:'CartOrder',element:<ProtectRouter>  <CartOrder/>  </ProtectRouter>},
      {path:'allorders',element:<ProtectRouter>  <AllOrder/>  </ProtectRouter>},
      {path:'VisaOrder',element:<ProtectRouter>  <VisaOrder/>  </ProtectRouter>},
      {path:'CashOrder',element:<ProtectRouter>  <CashOrder/>  </ProtectRouter>},
      {path:'Wishlist',element:<ProtectRouter>  <Wishlist/>  </ProtectRouter>},
      {path:'ChangePassword',element:<ProtectRouter>  <ChangePassword/>  </ProtectRouter>},
      {path:'UpdateData',element:<ProtectRouter>  <UpdateData/>  </ProtectRouter>},
      {path:'Login',element:<ReverseProtect>  <Login/>  </ReverseProtect>},
      {path:'SignUp',element:<ReverseProtect>  <SignUp/>  </ReverseProtect>},
      {path:'ForgetPassword',element:<ReverseProtect>  <ForgetPassword/>  </ReverseProtect>},
      {path:'VerifyCode',element:<ReverseProtect>  <VerifyCode/>  </ReverseProtect>},
      {path:'ResetPassword',element:<ReverseProtect>  <ResetPassword/>  </ReverseProtect>},



    ])}

  ])
  
  return (
    <>

    <ToastContainer  theme='colored'/>
    <RouterProvider router={routes}/>   
    </>
  )
}
