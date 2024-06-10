import React, { useContext } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
import style from './Home.module.scss'
import Product from '../Product/Product'
import { FetchApiContext } from '../../../Context/FetchApi'
export default function Home() {
  let {homeProducts}=useContext(FetchApiContext)
  let sliceHomeProducts=homeProducts.slice(0,10)
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <Product products={sliceHomeProducts}/>
      
    </>
  )
}
