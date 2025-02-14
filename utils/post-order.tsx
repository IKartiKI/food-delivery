async function addOrder(address, time){

    const token = localStorage.getItem('token');

    const orderData = {
        deliveryTime: time,
        address: address
    };

    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData)
    });

    if (!response.ok) {
        console.error("There was an error:", response.statusText);
        return;
    }

    console.log("Succesfully added");

}

export default addOrder;