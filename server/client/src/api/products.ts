import axios from 'axios';


export const addProduct = async (name: string, price: number, description: string, file: string  | ArrayBuffer, category: string, accessToken: string) => {
    return await axios.post('https://ecommercepage.herokuapp.com/products/addProduct', {name, price, description, file, category} ,{headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true});
};

export const getProducts = async (sortState: string, filterState: string) => {
    return await axios.get(`https://ecommercepage.herokuapp.com/products?sort=${sortState}&filter=${filterState}`, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then(res => res.data.fetchedProducts)
        .catch(err => err.response.message);
};

export const deleteProducts = async (productsIds: Array<string>, accessToken: string) => {
    return await axios.post('https://ecommercepage.herokuapp.com/products/delete', {products: productsIds}, {headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true})
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

export const getCertainProductById = async (productID: string) => {
    return await axios.get(`https://ecommercepage.herokuapp.com/products/${productID}`)
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

export const editProduct = async (productID: string, name: string, price: number, description: string, category: string, accessToken: string) => {
    return await axios.put('https://ecommercepage.herokuapp.com/products/edit', {productID, name, price, description, category}, {headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true})
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