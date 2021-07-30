import axios from 'axios';

export const loginRequest = async (username: string, password: string) => {
    return axios.post('https://ecommercepage.herokuapp.com/authentication/login', {username, password}, {withCredentials: true})
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
    return axios.post('https://ecommercepage.herokuapp.com/authentication/register', {username, password, email, firstName, lastName}, {withCredentials: true})
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

export const logoutRequest = async () => {
  return axios.delete('https://ecommercepage.herokuapp.com/authentication/logout', {withCredentials: true})
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