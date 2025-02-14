'use client'

import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
 const [user, setUser] = useState({
    fullName: '',
    email: '',
    birthDate: '',
    gender: '',
    address: '',
    phoneNumber: ''
 });

 useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://food-delivery.int.kreosoft.space/api/account/profile`, {
            method: 'GET', // Changed to GET for fetching data
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            localStorage.setItem("username", data.fullName);
            localStorage.setItem("address", data.address);
            localStorage.setItem("number", data.phoneNumber);
            const formattedUser = {
                ...data,
                birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : '',
            };
            setUser(formattedUser);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
 }, []);

 const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    if (name === 'birthDate') {
        const formattedDate = value ? new Date(value).toISOString().split('T')[0] : '';
        setUser({ ...user, [name]: formattedDate });
    } else {
        setUser({ ...user, [name]: value });
    }
 };

 const handleSubmit = async (event:any) => {
    event.preventDefault();
    try 
    {
      const token = localStorage.getItem('token');
      const credentials = {
        fullname: user.fullName as string,
        birthDate: new Date(user.birthDate as string),
        gender: user.gender as string,
        address: user.address as string,
        phoneNumber: user.phoneNumber as string,
      }
      const response = await fetch(`https://food-delivery.int.kreosoft.space/api/account/profile`, 
      {
      method: 'PUT', 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
          throw new Error('Failed to fetch user data');
      }
      console.log("Successfully Updated!");

    } catch (error) {
      console.error('Failed to update profile:', error);
      // Optionally, show an error message
    }
 };

 return (
  
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 lg:p-14 shadow-input bg-white dark:bg-black">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={user.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={user.birthDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save Changes
          </button>
        </form>
      </div>
 );
};

export default ProfilePage;
