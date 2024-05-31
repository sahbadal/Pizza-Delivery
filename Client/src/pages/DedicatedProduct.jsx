import {  useCallback, useEffect, useState } from "react"
import {  useParams ,useNavigate} from "react-router-dom"


const DedicatedProduct = () => {


    const [product,setProduct] = useState({})

    const params = useParams();
    const navigate = useNavigate();
    

    
    const getData = useCallback( async ()=>{

      try {
        
        let res = await fetch(`/api/pizza/${params.id}`)
        if(!res.ok){
          console.log('Network response is not ok')
        }

        let myRes =  await res.json()
        setProduct(myRes)

      } catch (error) {

        console.log(`Error: ${error.message}`)
        
      }

    },[params.id])

    useEffect(()=>{
      getData();
    },[params.id])



  return (
    <>
      <div className='w-[90%] m-[20px_auto]'>
        <button className='font-bold my-10' onClick={()=>{navigate(-1)}}>Back</button>
        <div className='flex items-center gap-20 w-[500px] shadow-xl rounded-xl overflow-hidden bg-white'>
            <div>
                <img src={product.image} className='max-w-[260px]'/>
            </div>
            <div className='text-center'>
                <h1 className='font-medium my-4 '>{product.name}</h1>
                <p className='bg-gray-200 rounded-full px-2 py-1 my-2'>{product.size}</p>
                <p className=' my-3'>&#8377; {product.price}</p>
                <button className='bg-yellow-500 px-4 py-2 my-2 rounded-full font-bold'>Add to Cart</button>
            </div>
        </div>
      </div>
    
    </>
  )
}

export default DedicatedProduct