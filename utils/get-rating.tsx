async function getRating(id){

    const token = localStorage.getItem('token');

    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/dish/${id}/rating/check`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error("There was an error:", response.statusText);
        return;
    }
       
    const orders = await response.json();
    return orders;

}

export default getRating;