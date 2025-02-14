'use client'

import getOrders from '@/utils/get-orders';
import addOrderId from '@/utils/post-order-id';
import { Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [allOrders, setAllOrders] = useState([]);
    const router = useRouter();

    const formattedDate = (orderTime) => {

        const dateObject = new Date(orderTime);

        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;

        return formattedDate;
    }

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

    const confirmOrder = (orderId) => {

        addOrderId(orderId)
        .then(() => {
            console.log("Successfully Confirmed Order");
        })
        .catch((error) => {
            console.error("Failed to confirm order:", error);
            alert("Failed to confirm order. Please try again.");
        });
    }

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const data = await getOrders();
                setAllOrders(data);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        fetchBasket(); // Call the async function
    }, [allOrders]);

  return (
    <div className="container mx-auto px-4 flex flex-wrap justify-between items-start">
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
                <Divider className="my-4" />
                {!allOrders || allOrders.length === 0 ? (
                    <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <p className="text-4xl font-bold text-gray-700">You don't have any orders.</p>
                    </div>
                ) : (
                    <div>
                    {allOrders.map((order, index) => (
                        <div key={index} onClick={() => router.push(`orders/${order.id}`)} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4 cursor-pointer">
                            <div className="space-y-2 dark:text-black">
                                <p className="text-lg font-bold">{`Order from ${formattedDate(order.orderTime)}`}</p>
                                <p className="text-gray-500">{`Delivery Time: ${formattedDateTime(order.deliveryTime)}`}</p>
                                <p className="text-gray-500">{`Status: ${order.status}`}</p>
                            </div>
                            <div className="space-y-2">
                                {order.status=='InProcess' && (
                                    <button onClick={() => confirmOrder(order.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    Confirm Order
                                    </button>
                                )}
                                <h2 className="text-lg font-semibold dark:text-black">Total Cost: {order.price} ₽</h2>
                            </div>
                        </div>
                    
                    ))}
                </div>
            )}
        </div>
    </div>

  )
}

export default page