import Swal from 'sweetalert2'
import {sendPost, sendGet} from '@/models/ApiCall';
const baseUrl = 'https://api.uweflix.naffah.me';
export async function authenticate(email, password) {

    const response = await sendPost(`${baseUrl}/token`, {username: email, password: password});

    if ( response.response.status != 200 ) {
        Swal.fire({
            title: "Umm",
            text: "Unable to login",
            icon: "error"
        });
    } else {
        localStorage.setItem('user_token', response.data.access_token);
    }
    
}

// nishawl.naseer@outlook.com
// h0KcT2U8tFJZ5H1LSexLBQ6T