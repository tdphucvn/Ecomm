import axios, { AxiosResponse } from 'axios';

type Items = {
    message: string
};

export const renderItems = async () => {
    const res = await axios.get<AxiosResponse<Items>>('http://localhost:5000/items');
    return res.data;
};