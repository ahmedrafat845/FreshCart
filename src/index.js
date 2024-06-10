import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from './reportWebVitals';
import App from './Componentes/App/App';
import MediaContextProvider from './Context/MediaStore';
import FetchApiContextProvider from './Context/FetchApi';
import FetchProductProvider from './Context/FetchProduct';
import 'react-toastify/dist/ReactToastify.css';
import WishlistContextProvider from './Context/Wishlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 
    <MediaContextProvider>
      <FetchApiContextProvider>
        <FetchProductProvider>
          <WishlistContextProvider>
          <App />
          </WishlistContextProvider>
        </FetchProductProvider>
      </FetchApiContextProvider>
    </MediaContextProvider>
    
 // </React.StrictMode>
);

reportWebVitals();
