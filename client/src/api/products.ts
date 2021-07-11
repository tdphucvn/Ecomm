import axios from 'axios';


export const addProduct = async (name: string, price: number, description: string, file: string  | ArrayBuffer, category: string, accessToken: string) => {
    return await axios.post('http://localhost:5000/products/addProduct', {name, price, description, file, category} ,{headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }});
};

export const getProducts = async (sortState: string, filterState: string) => {
    return await axios.get(`http://localhost:5000/products?sort=${sortState}&filter=${filterState}`)
        .then(res => res.data.fetchedProducts)
        .catch(err => err.response.message);
};

export const deleteProducts = async (productsIds: Array<string>) => {
    return await axios.post('http://localhost:5000/products/delete', {products: productsIds}, {headers: { 'Content-Type': 'application/json' }})
        .then(res => ({
            data: res.data,
            status: res.status,
        }))
        .catch(error => {
            if(error.response) {
            return ({
                data: error.response.data,
                status: error.response.status,
            });
            } else if (error.request) {
            throw new Error(error.request);
            } else {
            throw new Error(error.message);
            };
        });
};