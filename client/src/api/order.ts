import axios from 'axios';

export const getAllOrders = async (accessToken: string) => {
    const config = {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
    };

    return axios.get('/orders', config)
        .then((res: any) => res.data)
        .catch(err => console.log(err));
};

export const getOrder = async (id: string, accessToken: string) => {
    const config = {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
    };

    return axios.get(`/orders/${id}`, config)
        .then((res: any) => res.data.order)
        .catch(err => {
            console.log(err.response);
            throw err.response;
        });
};