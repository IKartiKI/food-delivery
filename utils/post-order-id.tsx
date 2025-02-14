async function addOrderId(id){

    const token = localStorage.getItem('token');

    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/order/${id}/status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        console.error("There was an error:", response.statusText);
        return;
    }

    console.log("Succesfully Confirmed Order");

}

export default addOrderId;