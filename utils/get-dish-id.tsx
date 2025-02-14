// async function getDishId(id, increase = false){

//     let url = `https://food-delivery.int.kreosoft.space/api/dish/${id}`;
//     if (increase) {
//         url += '?increase=true';
//     }

//     const response = await fetch(url , {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//         }
//     });

//     if (!response.ok) {
//         console.error("There was an error:", response.statusText);
//         return;
//     }
       
//     const dish = await response.json();
//     return dish;

// }

// export default getDishId;

import dishesData from './dishes.json'; // Import the JSON file

async function getDishId(id: string, increase = false) {
    const dish = dishesData.dishes.find((dish) => dish.id === id);

    if (!dish) {
        console.error("Dish not found for ID:", id);
        return null;
    }

    return dish;
}

export default getDishId;
