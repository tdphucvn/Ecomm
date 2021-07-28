import axios from 'axios';

export const getAllOrders = async (accessToken: string) => {
    const config = {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
    };

    return axios.get('http://localhost:5000/orders', config)
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

    return axios.get(`http://localhost:5000/getOrder/${id}`, config)
        .then((res: any) => res.data)
        .catch(err => console.log(err));
};