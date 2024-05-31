import {Link,useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import cartContext from '../pages/CartContext'

const Navbar = () => {

  const {cart} = useContext(cartContext)
  
  const navigate = useNavigate()

  const goToHomePage = ()=>{
    navigate('/')
  }

  return (
    <>
     <nav className='w-[90%] m-[20px_auto] flex items-center justify-between'>
        <div>
            <img src={'/images/logo.png'} style={{width:75}} onClick={goToHomePage} className=' cursor-pointer'/>
        </div>
            <ul className='flex items-center gap-x-4 font-medium'>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/products'}>Products</Link></li>
                <Link to={'/cart'}>
                    <div className='flex items-center gap-x-1 bg-yellow-500 px-2  rounded-full'>
                       <span>{cart.totalItems ? cart.totalItems : 0 }</span>
                       <img src={'/images/cart.png'}/>
                    </div>
                </Link>
            </ul>
     </nav>
    </>
  )
}

export default Navbar