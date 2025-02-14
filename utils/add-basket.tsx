async function addBasket(id){

    const token = localStorage.getItem('token');

    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/basket/dish/${id}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        console.error("There was an error:", response.statusText);
        return;
    }

    console.log("Succesfully added");
    console.log(response);

}

export default addBasket;