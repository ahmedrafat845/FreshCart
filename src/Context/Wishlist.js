import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { BaseUrl } from "../Utilities/BaseUrl";
import { toast } from "react-toastify";
import { mediaContext } from "./MediaStore";


export const WishlistContext=createContext()

export default function WishlistContextProvider(props){
    const [loading, setLoading] = useState(false)

    const [wishListProduct, setWishListProduct] = useState([])
    const { userData, saveUserData } = useContext(mediaContext);

    let token=localStorage.getItem('token')

    const notify = (msg,type) => {
        toast[type](msg,{
          autoClose:800 ,
          theme:'dark',
          position:'bottom-center'
        });
      }

    let postWishListProduct=async(productId)=>{
        try{
            await axios.post(`${BaseUrl}/api/v1/wishlist`,{productId},{
                headers:{
                    'token': `${token}`
                }
            })
            notify('product added successfull','success')
            getWishListProducts()
        }catch(error){
            notify(error,'error')
          }
    }
    let deleteWishListProduct=async(productId)=>{
        try{
            await axios.delete(`${BaseUrl}/api/v1/wishlist/${productId}`,{
                headers:{
                    'token': `${token}`
                }
            })
            notify('product deleted successfull','success')
            getWishListProducts()
        }catch(error){
            notify(error,'error')
          }
    }
   
    

    let getWishListProducts=async()=>{
        setLoading(true)
       try{
        let {data}=await axios.get(`${BaseUrl}/api/v1/wishlist`,{
            headers:{
                'token': `${token}`
            }
        })
        setLoading(false)
        setWishListProduct(data)
       }catch(error){
        setLoading(false)
        notify('error9','error')
    }
    }
    useEffect(() => {
        if(localStorage.getItem('token')){
            getWishListProducts()
        }
    },  [userData, saveUserData])










return(
    
    <WishlistContext.Provider value={{postWishListProduct,loading,
    deleteWishListProduct,getWishListProducts,wishListProduct,setWishListProduct}}>
        {props.children}
        
    </WishlistContext.Provider>

)
}