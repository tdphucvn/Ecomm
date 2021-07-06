import axios from 'axios';

export const loginRequest = async (username: string, password: string) => {
    axios.post('http://localhost:5000/authentication/login', {username, password})
      .then(res => {
          return res.data;
      })
      .catch(error => {
        if(error.response) {
          return error.response.data.message;
        } else if (error.request) {
          return error.request;
        } else {
          console.log('Error', error.message);
        };
      });
};