import {useEffect, useState,useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { BaseUrl } from './../../../Utilities/BaseUrl';
import { FetchProductContext } from './../../../Context/FetchProduct';



export default function Details({endpoint,id}) {

  let {AddProductToCart,loading}=useContext(FetchProductContext)
  const [productDetails, setProductDetails] = useState([]);
  const [imagess, setImages] = useState([])
  const [imageSrc, setImageSrc] = useState('')
  const [loadingProduct, setloadingProduct] = useState(false)
  const [isFading, setIsFading] = useState(false);


  let getProductDetails=async()=>{
    setloadingProduct(true)
    let {data}=await axios.get(`${BaseUrl}/api/v1/${endpoint}${id}`)
    setProductDetails(data.data);
    setImages(data.data.images)
    setImageSrc(data.data.imageCover);
    setloadingProduct(false)

  }
  useEffect(() => {
    getProductDetails()
  
  }, [id])


  let getImageSrc=(e)=>{
    setIsFading(true);
    setTimeout(() => {
      setImageSrc(e.target.src);
      setIsFading(false);
    }, 300); 
  
  }
 

  
  return (
    <>
    {loadingProduct?(
       <div className='loading  d-flex justify-content-center align-items-center'>
       
       <i class="fa-5x fa-solid fa-cart-shopping fa-spin"></i>
     </div>
      
    ):(
     
      <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-3  ">
              {imagess.map((item,index)=>(
                <div className="smallImage my-3 " key={index}>
                <img onClick={getImageSrc} src={item} className='w-100' alt="" />
               </div>

              ))}
             

            </div>
            <div className="col-md-9">
              <div className="mainImage position-sticky top-0">
              <img
                  src={imageSrc}
                  className={`w-100 p-4 image-transition ${!isFading && 'show'}`}
                  alt=""
                />
              </div>
            </div>
          </div>
          

        </div>
        <div className="col-md-5">
        {productDetails.brand && 
        <div className='d-flex justify-content-between '>
           <h2>{productDetails.brand.name}</h2>
        </div>
        } 
       
    
        {productDetails.category && <h4><span className='text-success'>Category :</span> {productDetails.category.name}</h4>}  
          <h4><span className='text-success'>Title :</span>{productDetails.title}</h4>
          

          <p className='my-3'>{productDetails.description}</p>
          <table className='table border '>
            <tbody >
              <tr className='row-spacing border-5'>
                <th className='text-success fs-5'>Quantity:</th>
                <th className='bg-warning fs-5 text-white rounded-2'>{productDetails.quantity}</th>
              </tr>
              <tr className='row-spacing border-5'>
                <th className='text-success fs-5'>Sold:</th>
                <th className='bg-secondary fs-5  text-white rounded-2'>{productDetails.sold}</th>
              </tr>
              <tr className='row-spacing border-5'>
                <th className='text-success fs-5'>Price:</th>
                <th className='bg-danger text-white fs-5  rounded-2'>{productDetails.price} EGP</th>
              </tr>
            </tbody>
           </table>
          


          <div >
            <i className='fas  fa-star rating-color'></i>
            <span className='fs-4  ms-2'>{productDetails.ratingsAverage}</span>
          </div>
          <button onClick={() =>AddProductToCart(productDetails._id)} className='btn btn-success w-100'>
            {loading? <i class="fa-solid fa-cart-shopping fa-spin"></i>:" Add to Card"}
            
          </button>
        </div>
        <div className="col-md-2">
        {productDetails.brand && 
           <img className='w-100 rounded-2 border-success border-2 border' src={productDetails.brand.image} alt="" />
        } 

        </div>
      </div> 
    </div>
    )}
      
    </>
  )
}
