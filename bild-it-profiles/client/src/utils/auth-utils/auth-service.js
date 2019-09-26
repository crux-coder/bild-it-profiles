import decode from 'jwt-decode';
import { API_BASE_URL } from '../api-utils/api-constants';
import axios from 'axios';


export default class AuthService {
    // Initializing important variables
    constructor(props) {
        this.domain = API_BASE_URL;
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.props = props;
    }

    login(email, password) {
        // Get a token from api server using the fetch api
        return axios(`${this.domain}/users/login`, {
            method: 'POST',
            data: {
                email,
                password
            }
        }).then(res => {
            this.setToken(res.data.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from localstorage
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(token) {
        // Saves user token to localStorage
        localStorage.setItem('accessToken', token);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('accessToken');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('accessToken');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }
        return axios(`${this.domain}${url}`, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => {
                return response
            })
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
