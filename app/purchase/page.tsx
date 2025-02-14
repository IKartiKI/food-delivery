'use client'

import getBasket from '@/utils/get-basket';
import addOrder from '@/utils/post-order';
import { Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const page = () => {

    const [allBasket, setAllBasket] = useState([]);
    const [userData, setUserData] = useState({ phoneNumber: '', email: '' });
    const address = localStorage.getItem("address");
    const [deliveryAddress, setDeliveryAddress] = useState(address);
    const [deliveryDateTime, setDeliveryDateTime] = useState(new Date().toISOString().slice(0,16));
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

        fetchBasket();

        const email = localStorage.getItem('email')?.toString();
        const number = localStorage.getItem("number");
        setUserData({
            phoneNumber: number,
            email: email
        });

    }, [allBasket]);


    const handleOrder = () => (event) => {
        event.preventDefault();
        if (!validateDeliveryTime(deliveryDateTime)) {
            console.log(deliveryDateTime)
            alert("Delivery time must be at least 60 minutes after the current time.");
            return;
        }
        addOrder(deliveryAddress, deliveryDateTime)
        .then(() => {
                router.push("/orders");
            })
        .catch((error) => {
                console.error("Failed to add order:", error);
                alert("Failed to add order. Please try again.");
            });
        // if(address){
        //     addOrder(address);
        // } else {
        //     console.log("Please login again!");
        // }
    }

    const calculateTotal = (basket) => {
        return basket.reduce((total, item) => total + (item.price * item.amount), 0);
    };

    const validateDeliveryTime = (selectedTime) => {
        const currentTime = new Date();
        const selectedTimeObj = new Date(selectedTime);
        const currentTimeMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const selectedTimeMinutes = selectedTimeObj.getHours() * 60 + selectedTimeObj.getMinutes();
        const currentTimeDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
        const selectedTimeDate = new Date(selectedTimeObj.getFullYear(), selectedTimeObj.getMonth(), selectedTimeObj.getDate());

        if (currentTimeDate.getTime()!== selectedTimeDate.getTime()) {
            return true;
        }

        // Check if the selected time is at least serverMinDeliveryTime minutes after the current time
        return selectedTimeMinutes >= currentTimeMinutes + 60;
    };


  return (
    <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Create Order</h1>
        <Divider className="my-4" />    
        <div className='mb-4'>
            <h3 className="text-lg font-semibold mb-2">User Information:</h3>
            <div className='flex justify-between items-center gap-x-4'>
                <div className="w-1/2">
                    <label htmlFor="deliveryNumber" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Phone Number</label>
                    <input type="text" id="deliveryNumber" value={userData.phoneNumber} readOnly className="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="w-1/2">
                    <label htmlFor="deliveryEmail" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Email</label>
                    <input type="text" id="deliveryEmail" value={userData.email} readOnly className="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 mt-4">Delivery Information:</h3>
            <div className='flex justify-between items-center gap-x-4'>
                <div className="w-1/2">
                    <label htmlFor="deliveryAddress" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Delivery Address</label>
                    <input type="text" id="deliveryAddress" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="dark:bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="w-1/2">
                    <label htmlFor="deliveryDateTime" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Delivery Date & Time</label>
                    <input
                        type="datetime-local"
                        id="deliveryDateTime"
                        value={deliveryDateTime}
                        onChange={(e) => setDeliveryDateTime(e.target.value)}
                        min={new Date().toISOString().slice(0,16)}
                        className="dark:bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>
        </div>
        <Divider className="my-4 mt-8 mb-8" />
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allBasket.map((item, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-md dark:bg-gray-800">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                        <div className='flex justify-between'>
                            <h2 className="text-l font-semibold">{item.name}</h2>
                            <p className="text-gray-500">Quantity: {item.amount}</p>
                            <p className="text-lg font-bold">{item.price}  ₽</p>
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
    </div>
  )
}

export default page