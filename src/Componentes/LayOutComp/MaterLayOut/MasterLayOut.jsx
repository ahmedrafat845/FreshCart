import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Footer from '../Footer/Footer';



export default function MasterLayOut() {
  const [myMode, setmyMode] = useState(localStorage.getItem('CurrentMode')
  ===null?'light':localStorage.getItem('CurrentMode')==='light'?'light':'dark'
)
  
  

  const darkTheme = createTheme({
    palette: {
      mode: myMode,
    },
  });
  return (
    <>
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
            
             <NavBar  setmyMode={setmyMode}/>
           
             <div className='line'></div>
          
             <Outlet/>
        </ThemeProvider>
   
      
    </>
  )
}
