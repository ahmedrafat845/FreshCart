import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import Details from '../Detailes/Detailes';


export default function ProductDetails() {

 let {id}= useParams()
 

  
  return (
    <>
    <Details endpoint={"products/"} id={id}/>
    
    </>
  )
}
