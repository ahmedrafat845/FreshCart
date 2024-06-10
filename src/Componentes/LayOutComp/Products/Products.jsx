import React, { useContext, useState } from 'react'
import { FetchApiContext } from '../../../Context/FetchApi'
import Product from './../Product/Product';
import { Button, Offcanvas } from 'react-bootstrap';
import logo from '../../../finalProject assets/freshcart-logo.svg'

export default function Products() {
  let {setProducts,products,getAllItems,loading}=useContext(FetchApiContext)
  const [searchTerm, setSearchTerm] = useState('');
 
  

   
  let price=(sign)=>{
    getAllItems(`products?sort=${sign}`,setProducts)
  }
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    getAllItems('products', (data) => {
      const filteredProducts = data.filter(product =>
        product.title.toLowerCase().includes(searchValue)
      );
      setProducts(filteredProducts);
    });
  };

  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
    <div className="container mb-5">
      <div className="row">
     


      <div >
           
          <Button  onClick={handleShow} className=" btn btn-secondary  my-4 w-100 ">
            <div className='d-flex justify-content-center'>
            <img className='  me-2  rounded-2' src={logo} alt="" />
            <h5 className='pt-2'>  Sort By  👀</h5>
            
       
           
          

            </div>
         
          </Button>
          <input type="text" className="form-control" placeholder='search by title ...' onChange={handleSearch} />  
          <Offcanvas 
          style={{width: '250px', backgroundColor: localStorage.getItem('CurrentMode') === 'dark' ? 'black' : 'white'}}
          show={show}
          onHide={handleClose}
          placement="end"
          scroll={true}>      
          <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <h3 className='text-success border border-5 p-2'>
                <img className='mb-2 bg-white' src={logo} alt="" />
                  
                  Sort Method </h3>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
         
            <button className='btn btn-danger w-100' onClick={() =>price('-price')}>Hight-Price</button>
            <button className='btn btn-secondary   w-100 my-3' onClick={() =>price('price')}>Less-Price</button>
            <button className='btn btn-danger w-100' onClick={() =>price('-quantity')}>Hight-Quantity</button>
            <button className='btn btn-secondary w-100 my-3' onClick={() =>price('quantity')}>Less-Quantity</button>
            <button className='btn btn-danger w-100' onClick={() =>price('-sold')}>Heigh-Sold</button>
            <button className='btn btn-secondary w-100 my-3' onClick={() =>price('sold')}>Less-Sold</button>
         
            </Offcanvas.Body>
          </Offcanvas>
        </div>



      {loading?
       <div className='loading  d-flex justify-content-center align-items-center'>
       
       <i class="fa-5x fa-solid fa-cart-shopping fa-spin"></i>
     </div>
      
    :
    <Product products={products} />

    }

          
        
      </div>
    </div>



      
    </>
  )
}
