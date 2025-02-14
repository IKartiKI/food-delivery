'use client'

import { addToCart, removeFromCart, updateCartCount, updateQuantity } from '@/actions/actions';
import addBasket from '@/utils/add-basket';
import delBasket from '@/utils/del-basket';
import getBasket from '@/utils/get-basket';
import addOrder from '@/utils/post-order';
import { Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
    const [allBasket, setAllBasket] = useState([]);
    const cartCount = useSelector(state => state.cart.cartCount);
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const data = await getBasket();
                setAllBasket(data);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        fetchBasket(); // Call the async function
    }, [allBasket]);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if(token){
          return true;
        } else {
          return false;
        }
    }

    const handleDelete = (index, dishId) => {
        const existingItem = cartItems.find(item => item.id === dishId);
        if (existingItem && existingItem.quantity > 1) {
            dispatch(updateQuantity(dishId, existingItem.quantity - 1));
            dispatch(updateCartCount(dishId, existingItem.quantity - 1));
        } else if (existingItem) {
            dispatch(removeFromCart(dishId));
        }
        // dispatch(updateCartCount(cartCount-1));
        delBasket(dishId);
        const newBasket = allBasket.filter((item, itemIndex) => itemIndex !== index);
        setAllBasket(newBasket);
    };

    const handleAddCart = (dishId) => (event) => {
        if(checkAuth()){
          event.preventDefault();
          const existingItem = allBasket && allBasket.find(item => item.id === dishId);
          if (existingItem) {
            dispatch(updateQuantity(dishId, existingItem.quantity + 1));
            dispatch(updateCartCount(dishId, existingItem.quantity + 1));
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
    // const existingItem = cartItems.find(item => item.id === dishId);
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

    const handleOrder = () => (event) => {
        router.push('/purchase');
    }

    const calculateTotal = (basket) => {
        return basket.reduce((total, item) => total + (item.price * item.amount), 0);
    };

  return (
    <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <Divider className="my-4" />
        {!allBasket || allBasket.length === 0 ? (
            <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <p className="text-4xl font-bold text-gray-700">Your cart is empty.</p>
            </div>
        ) : (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allBasket.map((item, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-md dark:bg-gray-800">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                            <div className='flex justify-between'>
                                <h2 className="text-l font-semibold">{item.name}</h2>
                                <p className="text-gray-500">{item.description}</p>
                                <p className="text-lg font-bold">{item.price}  ₽</p>
                            </div>
                            <div className='justify-between flex mt-2 items-center space-x-4'>
                                <div>
                                    <button onClick={() => handleDelete(index, item.id)} className="text-red-500">
                                        <img src="trash.png" alt="Delete" style={{ width: '25px', height: 'auto' }}/>
                                    </button>
                                </div>
                                <div className='flex items-center'>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l" onClick={handleRemoveFromCart(item.id)}>
                                        -
                                    </button>
                                    <div className="px-4">{item.amount}</div> {/* Display current quantity */}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r" onClick={handleAddCart(item.id)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mb-4 mt-8">
                    <h2 className="text-xl font-semibold">Total: ₽ {calculateTotal(allBasket)}</h2>
                    <button onClick={handleOrder()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Order
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}

export default page


