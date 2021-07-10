import axios from 'axios';


export const addProduct = async (name: string, price: number, description: string, file: string  | ArrayBuffer, category: string) => {
    return await axios.post('http://localhost:5000/products/addProduct', {name, price, description, file, category} ,{headers: { 'Content-Type': 'application/json' }});
};

export const getProducts = async (sortState: string, filterState: string) => {
    return await axios.get(`http://localhost:5000/products?sort=${sortState}&filter=${filterState}`)
        .then(res => res.data.fetchedProducts)
        .catch(err => err.response.message);
};