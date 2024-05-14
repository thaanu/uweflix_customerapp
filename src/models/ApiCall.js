import axios from "axios";

async function sendPost(url, data = {}, withToken = false ) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    };
    if ( withToken ) {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem('user_token');
    }
    const response = await axios.post( url, data, headers);

    console.log("API", response);
}

export {sendPost}