import React,{useContext} from 'react';
//icons
import{IoMdArrowForward} from 'react-icons/io'
import{FiTrash2} from 'react-icons/fi'
//components
import CartItem from './CartItem'
//import sidebar context
import {SidebarContext} from '../contexts/SidebarContext'
//import cart context
import { CartContext } from '../contexts/CartContext';

const Sidebar = () => {
 const {isOpen,handleClose}=useContext(SidebarContext)
 const{cart,clearCart,total,itemAmount} = useContext(CartContext)
 
  return (
     <div className={`${isOpen ? 'right-0': '-right-full'} w-full bg-white fixed top-0 h-full 
     shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`} 
       >
       <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Shopping Bag({itemAmount})</div>
        {/* icons */}
        <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <IoMdArrowForward className='text-2xl'/>
        </div>
       </div>
       <div className='flex flex-col gap-y-2 h-[330px] lg:h-[350px] overflow-y-auto overflow-x-hidden border-b' >
        {cart.map(item =>{
        return <CartItem item={item} key={item.id}/>
       })}</div>
       <div className=' flex flex-col gap-y-3 py-4 mt-4'>
        <div className='flex w-full justify-between items-center'>
          {/* total */}
          <div className='uppercase font-semibold'>
            <span className='mr-2'>Total:</span>$ {total}
            </div>
            {/* claer cart icon */}
            <div onClick={clearCart} className='cursor-pointer py-4 bg-red-500
             text-white w-12 h-12 flex justify-center  items-center text-xl'>
              <FiTrash2/>
              </div>
        </div>
       
        <button onClick={()=>{
          if(total>0){
            var options = {
              key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the key iD 
              amount: total * 100, // Amount is in currency subunits
              currency: "INR",
              name: "MyShop Checkout",
              description: "This is your order", //This is a sample order id
              theme: {
                color: "#000",
              },
              image:
                "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
            };
          
            var rzpy1 = new window.Razorpay(options);
            rzpy1.open();
            clearCart();
            handleClose();
          }
           else{
            alert("Please Add Product To The Cart")
           }
        }} className='bg-primary flex p-1 justify-center items-center
         text-white w-full font-medium'>Checkout</button>
       </div>
      </div>
      );
};

export default Sidebar;
