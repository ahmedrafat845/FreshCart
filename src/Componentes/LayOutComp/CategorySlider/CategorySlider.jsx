
import React, { useContext } from 'react'
import Slider from "react-slick";
import { FetchApiContext } from '../../../Context/FetchApi';


export default function CategorySlider() {
  let {category}= useContext(FetchApiContext)
 
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
  };
  
  return (
    <>
     <div className='container  text-center   my-5'>
      <h2 className='my-5'>Shop Popular Categories</h2>

     <Slider {...settings}>
     {category.map((item,index)=>(
   
        <div key={index}>
          <img  src={item.image} className='w-100 px-2' height={200} alt="" />
          <h5>{item.name}</h5>
        </div>
    
        

      ))}
       </Slider>
   

    </div>
      
    </>
  )
}
