import React, { useCallback, useEffect, useState } from 'react'
import SingleProduct from './SingleProduct'
import cartContext from '../pages/CartContext'
import { useContext } from 'react'

const ProductsComponent = () => {

    const [data,setData] = useState([])

    const fetchData = useCallback( async () =>{

        try {
            
            let response = await fetch('/api/pizza');

            if(!response.ok) {
                console.log('Newtwork response is not ok')
            }

            let JsonData = await response.json()
            console.log(JsonData)
            setData(JsonData)

        } catch (error) {

            console.log(`Error: ${error.message}`)
            
        }

    },[])

    useEffect(() =>{

        fetchData();

    },[])

    // const {name} = useContext(cartContext)

  return (
    <>
     <div className='w-[90%] m-[20px_auto]'>
         <h1 className='font-bold text-xl'>Products</h1>
          <div className='grid ml-10 sm:ml-0 grid-cols-1 gap-10 my-7 sm:grid-cols-5 '>
            {
                data.map(product=> <SingleProduct key={product.id} myProduct={product}/>)
            }
          </div>
      </div>
    </>
  )
}

export default ProductsComponent