import { createContext, useEffect, useState } from "react";
import { BaseUrl } from './../Utilities/BaseUrl';
import axios from "axios";

export let FetchApiContext=createContext()
export default function FetchApiContextProvider(props){

    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    const [homeProducts, setHomeProducts] = useState([])
 

    const [loading, setLoading] = useState(false)

  let getAllItems=async(endPoint,callBack)=>{
    setLoading(true)
    let {data} = await axios.get(`${BaseUrl}/api/v1/${endPoint}`)
    callBack(data.data)
    setLoading(false)
  }
  useEffect(() => {
    
    getAllItems('categories',setCategory) 
    getAllItems('products',setProducts) 
    getAllItems('products',setHomeProducts) 
  
   
  }, [])
    return <FetchApiContext.Provider value={{getAllItems,homeProducts,category,products,setProducts,loading}}>
        {props.children}
    </FetchApiContext.Provider>


}

