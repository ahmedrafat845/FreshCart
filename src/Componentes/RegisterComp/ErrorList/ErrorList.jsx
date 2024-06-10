import React from 'react'

export default function ErrorList({Formik,type}) {
      
    
  return (
    <>    

        

               {Formik.errors[type] && Formik.touched[type] ? 
                 
                    <div className='alert alert-danger text-danger'>
                      {Formik.errors[type]}
                      </div>
                  :('')
               }


      
    </>
  )
}



{/* {errorList ? (
            <div>
            {errorList
                .filter(item => item.context.label === name)
                .map(item => (
                <p className='ms-3 text-danger' key={item.id}>{item.message}</p>
                ))}
            </div>
        ) : (
            ''
        )} */}
