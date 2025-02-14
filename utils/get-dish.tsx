'use server'
import axios from "axios";

const options = {
    method: 'GET',
    url: `${process.env.API_KEY}/api/dish`,
    params: {category: 'wok'},
    headers: {
        accept: 'application/json'
    }
};

//const url = `${process.env.API_KEY}/api/dish`;

async function getDish(currentPage, filters){
    const categories = filters.category || [];
    let sort = filters.sort || '';

    const params = new URLSearchParams({
    });

    if (categories.length > 0) {
        categories.forEach(category => {
            params.append( "categories", category.value);
        });
    }

    if (sort != '') {
        sort = 'sorting=' + sort;
    }

    
    const response = await fetch(`https://food-delivery.int.kreosoft.space/api/dish?page=${currentPage}&vegetarian=${filters.vegetarian}&${params.toString()}&${sort}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        }
    });

    // const headers = {
    //     accept: 'application/json',
    // }
    // const response = await axios.get(`https://food-delivery.int.kreosoft.space/api/dish`);

    if (!response.ok) {
        console.error("There was an error:", response.statusText);
        return;
    }
       
    const dish = await response.json();
    //const dish = response.data.dishes;
        //const dishNames = dishes.map(dish => dish.name);
    return dish;

}

export default getDish;