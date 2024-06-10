import React from 'react'
import Slider from "react-slick";
import img2 from '../../../images/2.jpg'
import img1 from '../../../images/1.jpg'
import img9 from '../../../images/9.jpg'
import img5 from '../../../images/5.jpg'
import img7 from '../../../images/7.jpg'
import img10 from '../../../images/banner-4.jpeg'

import style from'./MainSlider.module.scss'

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  return (
    <>
    <div className='     my-3'>
    <Slider {...settings}>
   
   <img className={`${style.img}`}  src={img1} alt="" />
   <img className={`${style.img}`}  src={img2} alt="" />  
   <img className={`${style.img}`}  src={img9} alt="" /> 
   <img className={`${style.img}`}  src={img7} alt="" /> 
   <img className={`${style.img}`}  src={img10} alt="" />   


   <img className={`${style.img}`}  src={img5} alt="" />   
     
   </Slider>

    </div>
      
    </>
  )
}
