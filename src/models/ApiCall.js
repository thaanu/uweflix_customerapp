import axios from "axios";

async function sendPost(url, data = {}, withToken = false ) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    };
    if ( withToken ) {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem('user_token');
    }
    return await axios.post( url, data, headers);
}

async function sendGet(url, withToken = false ) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    };
    if ( withToken ) {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem('user_token');
    }
    return await axios.get( url, headers );
}

export {sendPost, sendGet}