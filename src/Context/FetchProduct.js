import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BaseUrl } from "../Utilities/BaseUrl";
import { toast } from "react-toastify";
import { mediaContext } from "./MediaStore";

export const FetchProductContext = createContext();

export default function FetchProductProvider(props) {

  const notify = (msg,type) => {
    toast[type](msg,{
      autoClose:1000 ,
      theme:'dark',
      position:'bottom-center'
    });
  }


  const [addProduct, setAddProduct] = useState([])
  const [cart, setCart] = useState([])
  const [numOfCart, setNumOfCart] = useState(0)
  const [loading, setLoading] = useState(false)
  let token=localStorage.getItem('token')
  const { userData, saveUserData } = useContext(mediaContext);


  let AddProductToCart=async(productId)=>{
    setLoading(true)
    try{
      await axios.post(`${BaseUrl}/api/v1/cart`,{productId},
      {
        headers:{
          'token': `${token}`
      }})
      setLoading(false)
      notify('Product Added To Cart','success')
      getProductCart()
      
    }catch(error){
      notify('error','error')
    }
  }
  let getProductCart=async()=>{
    setLoading(true)
   try{
    let {data}=await axios.get(`${BaseUrl}/api/v1/cart`,{
      headers:{
        'token': `${token}`
    }})
    setLoading(false)
    setCart(data)
    setNumOfCart(data.numOfCartItems)
   
   }catch(error){
    setLoading(false)

   }

  }
  useEffect(() => {
   if(localStorage.getItem("token") && userData !== ''){
    getProductCart()
   }
  }, [userData, saveUserData])


  let deleteProductCart=async(productId)=>{
    setLoading(true)
    try{
      await axios.delete(`${BaseUrl}/api/v1/cart/${productId}`,{
        headers:{
          'token': `${token}`
        }})
        
       await getProductCart()
        notify('Product Deleted From Cart','success')
        setLoading(false)

    }catch(error){
      notify('error','error')

    }
  }

  let UpdateProductCart=async(productId,count,type)=>{
    setLoading(true)
    try{
      await axios.put(`${BaseUrl}/api/v1/cart/${productId}`,{count},{
        headers:{
          'token': `${token}`
        }})
        
        await getProductCart()
        setLoading(false)
        if(type=='increase'){
          notify('product count Increased','success')
        }else{
          notify('product count Decreased','success')
          
        }

    }catch(error){
      notify('error','error')

    }
  }
  let clearCart=async()=>{
    setLoading(true)
    try{
        await axios.delete(`${BaseUrl}/api/v1/cart`,{
        headers:{
            'token':token}})
       

        setCart([])
        setLoading(false)
        notify('products delete successful','success')

    }catch(error){
      setLoading(false)
      notify('errorrrrrr','error')

    }     
}
  

  


  

 

   

  return (
    <FetchProductContext.Provider value={{AddProductToCart,setNumOfCart,
    addProduct,getProductCart,cart,setCart,loading,setLoading,deleteProductCart,
    numOfCart,UpdateProductCart,clearCart
    }}>
      {props.children}
    </FetchProductContext.Provider>
  );
}































// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { BaseUrl } from "../Utilities/BaseUrl";
// import { toast } from "react-toastify";

// export const FetchProductContext = createContext();

// export default function FetchProductProvider(props) {
//   const [loading, setloading] = useState(false)
//   const [loading2, setloading2] = useState(false)
//   const [numOfCart, setnumOfCart] = useState(0)
//   const [totalCartPrice, settotalCartPrice] = useState('')
//   const [userId, setUserId] = useState('')
//   const [cart, setCart] = useState([])

//   const notify = (msg,type) => {
//     toast[type](msg,{
//       autoClose:1000 ,
//       theme:'dark'
//     });
//   }

 
//     const token = localStorage.getItem('token');

    
//     let getProductCart=async()=>{
//       setloading(true)
//       try{
//         let {data}=await axios.get(`${BaseUrl}/api/v1/cart`,{
//           headers:{
//             'token': `${token}`
//           }
//       })
//       setloading(false)
//       setCart(data.data.products)
//       // console.log(data.data.products);
//       setnumOfCart(data.numOfCartItems);
//       settotalCartPrice(data.data.totalCartPrice)
//       setUserId(data.data._id)
      
      
//       } catch(error){
//         setloading(false)
//       }
//   }
//   useEffect(() => {
//     getProductCart()
//   }, [])
  

//     let fetchProductApi = async (productId) => {
//       try {
//         setloading(true)
//          let {data} = await axios.post(`${BaseUrl}/api/v1/cart`, {productId}, {
//           headers: {
//             'token': `${token}`
//           }
//         })
//         setloading(false)
//         getProductCart()
//         notify('success','success')
      
//       } catch (error) {
//         setloading(false)
//         notify('errrrorrrr','error')
//         console.error('Error fetching product:', error);
//       }
//     };

//     let getIdProduct = async(id) =>{
//       await fetchProductApi(id)
//     }


//     let crudProduct=async(id,method,itemCount,funUpdate)=>{
//       setloading2(true)
//       const countPayload = { count: itemCount }
//       await axios({
//           method:method,
//           url:`${BaseUrl}/api/v1/cart/${id}`,
//           data:countPayload,
//           headers:{
//               'token':token
//           }
//       }).then(async(data)=>{
//           if(data){
//               if(method=='delete'){
//                   setloading2(false)
//                   getProductCart()
//                   notify('product delete successful','error')
//                   console.log(cart);
//               }else if(funUpdate=='increased'){
//                   setloading2(false)
//                   getProductCart()
//                   notify('Increased successful','success')
                 
                  

//               }else{
//                   setloading2(false)
//                   getProductCart()
//                   notify('Dencreased successful','success')

//               }
             
             

//           }
//       }).catch((error)=>{
//           notify(error,'error')
//       }) 

//   }

  


//   return (
//     <FetchProductContext.Provider value={{crudProduct,setloading2,loading2,loading,getIdProduct,setnumOfCart,getProductCart,cart,setCart ,numOfCart,totalCartPrice,settotalCartPrice,userId}}>
//       {props.children}
//     </FetchProductContext.Provider>
//   );
// }

