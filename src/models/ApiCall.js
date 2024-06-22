import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
};

async function sendPost(url, data = {}, withToken = false ) {
    if ( withToken ) {
        headers['Authorization'] = `Bearer ${localStorage.getItem('user_token')}`;
    }
    return await axios.post( `${baseURL}${url}`, data, {headers: headers} );
}

async function sendGet(url, withToken = false ) {
    if ( withToken ) {
        headers['Authorization'] = `Bearer ${localStorage.getItem('user_token')}`;
    }
    return await axios.get( `${baseURL}${url}`, {headers: headers} );
}

export {sendPost, sendGet}