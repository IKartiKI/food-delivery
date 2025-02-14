async function getBasket(){

    const token = localStorage.getItem('token');

    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/basket`, {
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
       
    const basket = await response.json();
    return basket;

}

export default getBasket;