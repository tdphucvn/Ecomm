import axios from 'axios';

export const getEmailNewsletter = async (email: string) => {
    return axios.post('/api/contact/newsletter', {email})
    .then(res => alert(res.data.message))
    .catch((error) => {
        if(error.response) {
            return error.response.data.message;
        } else if (error.request) {
            return error.request;
        } else {
            return error.message;
        };
    });
};