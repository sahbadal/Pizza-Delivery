
import {Link} from 'react-router-dom'
import { useContext ,useState} from 'react';
import cartContext from '../pages/CartContext';
const SingleProduct = (props) => {
  
  const [isAdding,setIsAdding] = useState(false)
 
    const {myProduct} = props;

    const {cart,setCart} = useContext( cartContext);


    const addToCart = (event,myProduct)=>{
      event.preventDefault();

      let _cart = {...cart}

      if(!_cart.items){
        _cart.items = {}
      }

      if(_cart.items[myProduct.id]){
        _cart.items[myProduct.id] += 1;
      }else{
        _cart.items[myProduct.id] = 1;
      }
      
      if(!_cart.totalItems){
        _cart.totalItems = 0;
      }
      _cart.totalItems += 1;
      setCart(_cart);

      setIsAdding(true)
      setTimeout(() => {

        setIsAdding(false)
        
      }, 1000);

    }

  return (
    <>
     
      <Link to={`/products/${myProduct.id}`}>
       <div className='w-[240px] shadow-xl rounded-xl overflow-hidden bg-white'>
            <img src={myProduct.image} className='w-full object-cover'/>
            <div className='text-center'>
                <h1 className='font-bold my-4'>{myProduct.name}</h1>
                <span className='bg-gray-200 rounded-full px-2 py-1'>{myProduct.size}</span>
            </div>
            <div className='flex items-center justify-between px-5 py-4'>
                <p>&#8377; {myProduct.price}</p>
                <button disabled={isAdding} onClick={(event)=>{addToCart(event,myProduct)}} className={`${ isAdding ? 'bg-green-500' : 'bg-yellow-500' } px-2 py-1 rounded-full font-bold`}>
                  ADD{isAdding?'ED':''}</button>
            </div>
       </div>
      </Link>
    
    </>
  )
}

export default SingleProduct