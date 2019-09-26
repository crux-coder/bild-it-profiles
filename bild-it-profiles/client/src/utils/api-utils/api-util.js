import axios from 'axios';
import { config } from './api-config';
import { API_BASE_URL } from './api-constants';

export const apiGetRequest = (url) => {
    return axios.get(`${API_BASE_URL}${url}`, config)
        .then(response => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const apiPostRequest = (url, body) => {
    return axios.post(`${API_BASE_URL}${url}`, body, config)
        .then(response => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const apiDeleteRequest = (url) => {
    return axios.delete(`${API_BASE_URL}${url}`, config)
        .then(response => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
};