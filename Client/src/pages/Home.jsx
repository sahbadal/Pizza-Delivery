import ProductsComponent from '../components/ProductsComponent'
 
 const Home = () => {
   return (
     <>
      <section className='w-[90%] m-[50px_auto] flex flex-col-reverse sm:flex-row items-center justify-between'>
         <div>
          <p className='font-medium'><i>Are you hungry ?</i></p>
          <h1 className='font-bold text-5xl my-3'>Dont't wait !</h1>
          <button className='bg-yellow-500 px-5 py-1 mt-8 sm:mt-4 rounded-full text-white font-medium hover:bg-yellow-600'>Order Now</button>
         </div>
         <div className='w-full sm:w-1/2 mb-10'>
          <img src={'/images/pizza.png'}/> 
         </div>
      </section>
      <div>
        <ProductsComponent/>
      </div>
     </>
   )
 }
 
 export default Home