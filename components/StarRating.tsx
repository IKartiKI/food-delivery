const StarRating = ({ rating}: any) => {
    const fullStars = Math.trunc(rating); // Directly use rating for full stars
    const halfStar = rating % 1 !== 0; // Check if there's a half star
    const emptyStars = 10 - fullStars - (halfStar ? 1 : 0); // Calculate empty stars

    return (
        <div className={`flex items-center`}>
            {[...Array(fullStars)].map((_, index) => (
                <svg key={index} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500" onClick={() => handleClick(1)}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.7 5.82 22l1.18-7.86L2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            ))}
            {halfStar && (
                // <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500">
                //     <path fill="url(#half_grad)" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.7 5.82 22l1.18-7.86L2 9.27l6.91-1.01L12 2z"></path>
                // </svg>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-yellow-500" onClick={() => handleClick(0.5)}>
                    <defs>
                        <linearGradient id="half_grad">
                            <stop offset="50%" stop-color="rgb(234 179 8 / var(--tw-text-opacity))"/>
                            <stop offset="50%" stop-color="rgb(156 163 175 / var(--tw-text-opacity))" stop-opacity="1" />
                        </linearGradient>
                    </defs>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.7 5.82 22l1.18-7.86L2 9.27l6.91-1.01L12 2z"
                        fill="url(#half_grad)"/>
                </svg>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <svg key={index} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-gray-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.7 5.82 22l1.18-7.86L2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            ))}
        </div>
    );
};

export default StarRating;