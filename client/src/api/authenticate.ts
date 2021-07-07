import axios from 'axios';

export const loginRequest = async (username: string, password: string) => {
    return axios.post('http://localhost:5000/authentication/login', {username, password})
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

export const registerRequest = async (username: string, password: string, email: string, firstName: string, lastName: string) => {
    return axios.post('http://localhost:5000/authentication/register', {username, password, email, firstName, lastName})
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