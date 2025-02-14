async function delBasket(id, increase = false){

    const token = localStorage.getItem('token');

    let url = `https://food-delivery.int.kreosoft.space/api/basket/dish/${id}`;
    if (increase) {
        url += '?increase=true';
    }

    const response = await fetch(url , {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        console.error("There was an error:", response.statusText);
        return;
    }

    console.log("Succesfully deleted");

}

export default delBasket;