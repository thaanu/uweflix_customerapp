import {sendPost} from '@/models/ApiCall';
const baseUrl = 'https://api.uweflix.naffah.me';
export async function authenticate(email, password) {
    
    const response = await sendPost(`${baseUrl}/token`, {username: email, password: password});

    console.log('api_call_response', response);

    if ( response.response.status != 200 ) {
        alert("Whoops");
    } else {
        localStorage.setItem('user_token', response.data.access_token);
    }
    
}

// nishawl.naseer@outlook.com
// h0KcT2U8tFJZ5H1LSexLBQ6T