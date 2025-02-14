'use client'

import StarRating from '@/components/StarRating';
import getDishId from '@/utils/get-dish-id';
import { Button, Card, Skeleton } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  { addToCart, removeFromCart, updateCartCount, updateQuantity }  from '@/actions/actions';
import addBasket from '@/utils/add-basket';
import getBasket from '@/utils/get-basket';
import delBasket from '@/utils/del-basket';
import getOrders from '@/utils/get-orders';
import getOrderId from '@/utils/get-order-id';
import RateUs from '@/components/RateUs';
import getRating from '@/utils/get-rating';

const page = () => {

  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const [item, setItem] = useState(null);
  const cartCount = useSelector(state => state.cart.cartCount);
  const dispatch = useDispatch();
  const [allBasket, setAllBasket] = useState([]);
  const [orderedBefore, setOrderedBefore] = useState(false);
  

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if(token){
      return true;
    } else {
      return false;
    }
  }

  const handleAddCart = (dishId) => (event) => {
    if(checkAuth()){
      event.preventDefault();
      const existingItem = allBasket && allBasket.find(item => item.id === dishId);
      if (existingItem) {
        dispatch(updateQuantity(dishId, existingItem.quantity + 1));
      } else {
        dispatch(addToCart({ id: dishId, quantity: 1 }));
      }
      addBasket(dishId);
    } else {
      event.preventDefault();
      alert("You need to be logged in to add items to the cart.");
    }

  };

  const handleRemoveFromCart = (dishId) => (event) => {
    event.preventDefault();
    const existingItem = allBasket && allBasket.find(item => item.id === dishId);
    console.log("Check :", existingItem);
    if (existingItem) {
        if (existingItem.amount > 1) {
        delBasket(dishId, true);
        } else {
            dispatch(removeFromCart(dishId));
            delBasket(dishId);
            setAllBasket(allBasket.filter(id => id !== dishId));
        }
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      const itemDetails = await getDishId(id);
      const giveRating = await getRating(id);
      if(giveRating){
        setOrderedBefore(true);
      }
      setItem(itemDetails);
    };

    fetchData();
 }, [id]);

 useEffect(() => {
  const fetchBasket = async () => {
      try {
          const data = await getBasket();
          setAllBasket(data);
      } catch (error) {
          console.error("Error fetching dishes:", error);
      }
  };

  fetchBasket(); 
}, [allBasket]);


 if(!item){
  return(
    <Skeleton />
  );
 }

if(checkAuth()){
  const itemInBasket = allBasket.find(basketItem => basketItem.id === item.id);
  const displayAmount = itemInBasket? itemInBasket.amount : item.amount;
}

  return (
  <div className="min-h-screen py-6 flex flex-col justify-center items-center  dark:text-white">
    <div className="max-w-3xl w-full mx-auto bg-white dark:rounded-xl rounded-lg dark:shadow-lg shadow-md overflow-hidden">
      <div className="p-8 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6">{item.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img className="object-cover w-full h-64 rounded-lg" src={item.image} alt={item.name} />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-lg mb-4">{item.description}</p>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <p className="text-lg font-medium">Category:</p>
                  <p className="text-lg font-medium">{item.category}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium">Price:</p>
                  <p className="text-lg font-medium">₽{item.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Vegetarian:</p>
                  <span className={`inline-block px-2 py-1 leading-none rounded-full font-semibold uppercase tracking-wide text-xs ${item.vegetarian ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {item.vegetarian ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
                {orderedBefore? (
                    <div className="flex justify-between items-center ">
                      <p className="text-lg font-medium ">Give Rating:</p>
                      <div className="p-4 border-t border-b text-xs text-gray-700">
                        <div className="p-4 flex items-start text-sm text-gray-600">
                          {/* <StarRating rating={item.rating}/> */}
                          <RateUs id={id} totalStars={10}/>
                        </div>       
                      </div>
                    </div>
                ): (
                  <div className="flex justify-between items-center ">
                    <p className="text-lg font-medium ">Rating:</p>
                    <div className="p-4 border-t border-b text-xs text-gray-700">
                      <div className="p-4 flex items-start text-sm text-gray-600">
                        <StarRating rating={item.rating} />
                      </div>       
                    </div>
                  </div>  
                )}  
              </div>
            </div>
            {!displayAmount || displayAmount === 0 ? (
              <div className="p-4 flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddCart(item.id)}>
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className='flex items-center p-4 justify-center'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l" onClick={handleRemoveFromCart(item.id)}>
                    -
                </button>
                <div className="px-4">{displayAmount}</div> {/* Display current quantity */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r" onClick={handleAddCart(item.id)}>
                    +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default page