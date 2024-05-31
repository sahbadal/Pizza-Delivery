import { useContext, useEffect, useState } from 'react';
import cartContext from './CartContext';

const Cart = () => {

  let total = 0;

  const [products, setProducts] = useState([]);

  const { cart ,setCart} = useContext(cartContext);

  useEffect(() => {
    if (!cart.items) {
      return;
    }

    fetch('/api/product/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.pizzas && Array.isArray(data.pizzas)) {
          setProducts(data.pizzas);
        } else {
          console.error('No Array found:', data);
          setProducts([]);
        }
      })

  }, [cart]);

  const getQnt = (productId) =>{
    return cart.items[productId]
  }

  const increament = (productid) =>{
    const exitingQnt = cart.items[productid];
    const _cart = {...cart}
    _cart.items[productid] = exitingQnt + 1;
    _cart.totalItems += 1;
    setCart(_cart)
  }

  const decreament = (productid) =>{
    const exitingQnt = cart.items[productid];
    if(exitingQnt === 1){
      return;
    }
    const _cart = {...cart}
    _cart.items[productid] = exitingQnt - 1;
    _cart.totalItems -= 1;
    setCart(_cart)
  }

  const getSum = (productId,price) => {
    const sum = price * getQnt(productId)
    total += sum;
    return sum;
  }

  const handleClick = (productId) =>{
    const _cart = {...cart};
    const qty = _cart.items[productId]
    delete _cart.items[productId]
    _cart.totalItems -= qty;
    setCart(_cart)
    // const updateProductsList = products.filter((product)=> product.id !== productId)
    // setProducts(updateProductsList)

  }

  const handleOrder = () =>{
    window.alert('Order placed succesfully');
    setProducts([]);
    setCart({})

  }

  return (
     products.length ?

      <div className='container mx-auto lg:w-1/2 w-full pb-24'>
        <h1 className='font-bold my-12'>Cart Items</h1>
        <ul>
          {products.map(product => {
            return (
              <li key={product.id} className='mb-7'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img src={product.image} className='h-16' />
                    <span className='w-40 font-bold ml-8'>{product.name}</span>
                  </div>
                  <div>
                    <button onClick={() =>{decreament(product.id)}} className='bg-yellow-500 px-3 py-1 rounded-full leading-none font-bold'>-</button>
                    <b className='px-3'>{getQnt(product.id)}</b>
                    <button onClick={() =>{increament(product.id)}} className='bg-yellow-500 px-3 py-1 rounded-full leading-none font-bold'>+</button>
                  </div>
                  <div>
                    <span className='font-bold'>&#8377; {getSum(product.id,product.price)}</span>
                  </div>
                  <div>
                    <button onClick={()=>{handleClick(product.id)}} className=' bg-red-600 text-white px-4 py-2 rounded-full leading-none font-bold'>Delete</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <hr className='my-7 border-gray-300' />
        <div className=' text-right'>
          <h1><b>Grand Total:</b> &#8377; {total}</h1>
        </div>
        <div className='text-right mt-5'>
          <button onClick={handleOrder} className='bg-yellow-500 px-3 py-2 leading-none rounded-full font-bold'>
            Order Now
          </button>
        </div>
      </div>
      : 
      <img className='mx-auto w-[40%] mt-12' src={'/images/empty-cart.png'} />
  );
}

export default Cart;
