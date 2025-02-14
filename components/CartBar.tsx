'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const CartBar = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="sidebar"
        />
      )}
      <motion.div
        transition={{ type: 'spring', stiffness: 100 }}
        animate={{ width: isOpen ? '300px' : '60px' }}
        className="top-0 left-0 h-full bg-black z-50"
      >
        {/* Sidebar content goes here */}
        <button className="p-4">Close</button>
      </motion.div>
    </>
    
  )
}

export default CartBar