import addRating from '@/utils/post-rating';
import React, { useState } from 'react';

const RateUs = ({id , totalStars = 10 }) => {
  const [rating, setRating] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleStarClick = (value) => {
    setRating(value);
    addRating(id, rating);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
  };

  return (
    <>
        {showThankYou? (
            <div className="p-4 flex justify-center">
                <p className="text-lg font-medium text-green-600">Thank you for rating!</p>
            </div>
        ):(
            <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => (
                <button
                key={index}
                onClick={() => handleStarClick(index + 1)}
                className={`star ${index + 1 <= rating? 'filled' : ''}`}
                >
                ★
                </button>
            ))}
            </div>
        )}
    </>
  );
};

export default RateUs;
