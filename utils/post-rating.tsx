async function addRating(id, rating){

    const token = localStorage.getItem('token');

    const ratingData = {
        ratingScore: rating
    };

    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/dish/${id}/rating`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ratingData)
    });

    if (!response.ok) {
        console.error("There was an error:", response.statusText);
        return;
    }

    console.log("Succesfully Rated Dish");

}

export default addRating;