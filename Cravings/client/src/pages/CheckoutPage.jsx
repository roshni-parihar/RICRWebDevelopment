import React ,{useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const {user} =useAuth();
    const navigate =useNavigate();
    const [cart,setCart]=useState(JSON.parse(localStorage.getItem("cart")));
    const [paymentMethod,setPaymentMethod]=useState("credit-card");
    const[isprocessing, setIsProcessing]=useState(false);
    console.log("Checkoutpage",cart);

    const TAX_RATE =0.05;
    const DELIVERY_CHARGE= 50;

    useEffect(()=>{
      if(!user || !cart|| cart.cartItem.length ===0){
        toast.error("Cart is Empty or Session Expired")
        navigate("/order-now");
      }
    },[]);

    const handleQuantityChange =(itemId, change )=>{
      setCart((prev)=>{
        const updatedItems = prev.cartItem.map((item)=>{
          if(item._id === itemId){
            const newQuantity = Math.max(1,item.quantity + change);
            return {...item,quantity:newQuantity}
          }
          return item;
        })
        const newTotal = updateItems.reduce((sum,item)=>sum + item.price* item.quantity,0)

        return {...prev, cartItem:updatedItems, cartValue:newTotal}
      })
    }
    
 return (
  <div className="bg-gray-100 min-h-screen py-10 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

     
      <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 border-b pb-3">
          Order Summary
        </h2>

        {cart?.cartItem?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 border-b last:border-none"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.images?.[0]?.url}
                alt=""
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold text-lg">
                  {item.itemName}
                </h4>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>

            <div className="font-bold text-lg">
              ₹ {item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

     
      <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-10">
        <h3 className="text-xl font-bold mb-6 border-b pb-3">
          Bill Details
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{cart?.cartItem?.length}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-4">
            <span>Total Amount</span>
            <span>₹ {cart?.cartValue}</span>
          </div>
        </div>

        <button
          className="mt-6 w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  </div>
);

}

export default CheckoutPage