async function getOrderId(id){

    const token = localStorage.getItem('token');

    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/order/${id}`, {
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

export default getOrderId;