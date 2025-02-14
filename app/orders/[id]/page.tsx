'use client'
import getOrderId from '@/utils/get-order-id';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const pathname = usePathname();
    const id = pathname.split('/')[2];
    const [orderDetails, setOrderDetails] = useState(null);
    

    useEffect(() => {
        const fetchOrderDetails = async () => {
          try {
            const response = await getOrderId(id);
            setOrderDetails(response);
          } catch (error) {
            console.error("Failed to fetch order details:", error);
          }
        };
    
        fetchOrderDetails();
    }, []);

    const formattedDateTime = (orderTime) => {

      const dateObject = new Date(orderTime);

      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();

      const formattedDate = `${day}.${month}.${year}`;
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      const formattedDateTime = `${formattedDate} ${formattedTime}`

      return formattedDateTime;
    }

  return (
    <div>
      {orderDetails? (
        <>
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <div className="bg-white shadow-md rounded-lg p-6 w-full items-center dark:text-black dark:bg-gray-200">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Order ID:</h3>
            <p>{orderDetails.id}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Order Time:</h3>
            <p>{formattedDateTime(orderDetails.orderTime)}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Delivery Time:</h3>
            <p>{formattedDateTime(orderDetails.deliveryTime)}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Status:</h3>
            <p>{orderDetails.status}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Price:</h3>
            <p>{orderDetails.price} ₽</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Address:</h3>
            <p>{orderDetails.address}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Dishes:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orderDetails.dishes.map(dish => (
                <li key={dish.id} className="bg-gray-100 p-4 rounded-lg justify-between flex">
                  <div>
                    <p className="font-semibold">{dish.name}</p>
                    <p className="text-gray-600">Price: {dish.price}</p>
                    <p className="text-gray-600">Amount: {dish.amount}</p>
                    <p className="text-gray-600">Total Price: {dish.totalPrice} ₽</p>
                  </div>
                  <img src={dish.image} alt={dish.name} className="w-24 h-24 object-cover rounded mb-2" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>      
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  )
}

export default page